/* eslint-disable no-console, no-process-exit, no-sync */
const path = require("path");
const fs = require("fs-extra");
const AWS = require("aws-sdk");
const chalk = require("chalk");

const {ACCESS_KEY_ID, SECRET_ACCESS_KEY, RIAK_PROXY} = process.env;
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (...relativePath) => path.resolve(appDirectory, ...relativePath);
const packageJson = require(resolveApp("package.json"));
const packageJsonScripts = require(path.join(__dirname, "..", "package.json"));

if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY || !RIAK_PROXY) {
    console.log(
        `Для успешной загрузки модуля нужно устнавовить ${chalk.cyan("ACCESS_KEY_ID")} и ${chalk.cyan(
            "SECRET_ACCESS_KEY",
        )} и ${chalk.cyan("RIAK_PROXY")} в переменные окружения!`,
    );
    console.log();
    console.log(`Для ${chalk.cyan("Linux")} пользователей:`);
    console.log(`    ${chalk.cyan("ACCESS_KEY_ID=val SECRET_ACCESS_KEY=val RIAK_PROXY=val yarn deploy")}`);
    console.log();
    console.log(`Для ${chalk.cyan("Windows")} пользователей:`);
    console.log(
        `    ${chalk.cyan("set ACCESS_KEY_ID=val && set SECRET_ACCESS_KEY=val && set RIAK_PROXY=val && yarn deploy")}`,
    );
    console.log();
    console.log(`Для ${chalk.cyan("Jenkins")} необходимо прописать в начале запуска скрипта`);
    console.log();

    process.exit(1);
}

const bucketName = "module";
const manifestName = "manifests/manifest.json";
const manifestVersionName = `manifests/manifest-${packageJsonScripts.version}.json`;

const ep = new AWS.Endpoint("http://s3.amazonaws.com");
const credentials = new AWS.Credentials({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
});
const config = {
    apiVersion: "2006-03-01",
    credentials,
    endpoint: ep,
    httpOptions: {
        proxy: RIAK_PROXY,
    },
    region: "us-east-1",
    s3DisableBodySigning: true,
    s3ForcePathStyle: true,
    signatureVersion: "v2",
    sslEnabled: false,
};
const s3 = new AWS.S3(new AWS.Config(config));
const CONTENT_TYPES = {
    css: "text/css",
    js: "application/javascript",
};

function uploadManifest(manifest, moduleDate, isMainManifest) {
    s3.putObject(
        {
            ACL: "public-read",
            Body: Buffer.from(JSON.stringify(manifest)),
            Bucket: bucketName,
            ContentType: "application/json",
            Key: isMainManifest ? manifestName : manifestVersionName,
        },
        (err) => {
            if (err) {
                throw err;
            }

            if (!isMainManifest) {
                console.log(`Модуль ${chalk.cyan(packageJson.name)} успешно опубликован.`);
                console.log(`Версия модуля: ${chalk.cyan(packageJson.version)}.`);
                console.log();
                console.log("Доступные файлы:");
                moduleDate.files.forEach((filePath) => {
                    console.log(`    ${chalk.cyan(`${RIAK_PROXY}/${bucketName}${filePath}`)}`);
                });
            }
        },
    );
}

function updateManifest(files, isMainManifest) {
    s3.getObject(
        {
            Bucket: bucketName,
            Key: isMainManifest ? manifestName : manifestVersionName,
        },
        (err, resData) => {
            let manifest = {
                data: [],
            };

            if (!err) {
                manifest = JSON.parse(resData.Body.toString());
            } else if (err && err.code !== "NoSuchKey") {
                throw err;
            }

            const restModules = manifest.data.filter(
                ({name, version}) =>
                    isMainManifest
                        ? name !== packageJson.name || version !== packageJson.version
                        : name !== packageJson.name,
            );

            const moduleDate = {
                files: files.map(({key}) => `/${key}`),
                manifest: `/${packageJson.name}/${packageJson.version}/schema_manifest.json`,
                name: packageJson.name,
                version: packageJson.version,
                versionapi: packageJsonScripts.version,
            };

            // eslint-disable-next-line id-length
            manifest.data = [...restModules, moduleDate].sort((a, b) => {
                switch (true) {
                    case a.name < b.name:
                        return -1;
                    case a.name > b.name:
                        return 1;
                    case a.version < b.version:
                        return 1;
                    case a.version > b.version:
                        return -1;
                    default:
                        return 0;
                }
            });
            manifest.success = true;

            uploadManifest(manifest, moduleDate, isMainManifest);
        },
    );
}

function uploadFiles() {
    if (!fs.existsSync(resolveApp("dist"))) {
        console.log();
        console.log(`Не могу найти сборку в папке ${chalk.cyan("dist")}`);
        console.log(`Необходимо собрать приложения с помощью ${chalk.cyan("yarn build")}!`);
        console.log();

        process.exit(1);
    }

    const files = fs.readdirSync(resolveApp("dist")).map((fileName) => ({
        ContentType: CONTENT_TYPES[fileName.split(".").pop()],
        file: fs.readFileSync(resolveApp("dist", fileName)),
        fileName,
    }));

    if (fs.existsSync(resolveApp("src", "schema_manifest.json"))) {
        files.push({
            ContentType: "application/json",
            file: fs.readFileSync(resolveApp("src", "schema_manifest.json")),
            fileName: "schema_manifest.json",
        });
    }

    Promise.all(
        files.map(
            ({file, fileName, ContentType}) =>
                new Promise((resolve, reject) => {
                    const key = `${packageJson.name}/${packageJson.version}/${fileName}`;

                    s3.putObject(
                        {
                            ACL: "public-read",
                            Body: file,
                            Bucket: bucketName,
                            ContentType,
                            Key: key,
                        },
                        (err, data) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve({data, fileName, key});
                            }
                        },
                    );
                }),
        ),
    ).then((data) => {
        updateManifest(data, true);
        updateManifest(data, false);
    });
}

uploadFiles();
