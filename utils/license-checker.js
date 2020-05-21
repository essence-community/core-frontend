/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const {spawn} = require("child_process");
const checker = require("license-checker");

const utilsPath = path.join(__dirname, "packages", "@essence", "essence-constructor-utils");
const websitePath = path.join(__dirname, "packages", "@essence", "essence-constructor-website");

function getConfig(packagePath) {
    return {
        production: true,
        start: packagePath,
    };
}

function parseLib(name, version, libConfig) {
    return {
        name,
        version,
        ...libConfig,
    };
}

function printResult(libsGroup) {
    let count = 0;

    for (const libName in libsGroup) {
        if (Object.prototype.hasOwnProperty.call(libsGroup, libName)) {
            libsGroup[libName].forEach((lib) => {
                const color = lib.licenses === "MIT" ? "\x1b[0m" : "\x1b[31m";

                console.log(`${color}${lib.name}@${lib.version} ${lib.licenses}`);
            });

            if (libsGroup[libName].length > 1) {
                console.warn(`\x1b[33mСуществует несколько версий ${libName}`);
            }

            count += 1;
        }
    }

    console.log(`\x1b[0mВсего ${count}`);
}

function logLicenses(json) {
    const libs = {};

    for (const libNameWithVersion in json) {
        if (Object.prototype.hasOwnProperty.call(json, libNameWithVersion)) {
            const [version, ...libNames] = libNameWithVersion.split("@").reverse();
            const libName = libNames.reverse().join("@");

            libs[libName] = [...(libs[libName] || []), parseLib(libName, version, json[libNameWithVersion])];
        }
    }

    printResult(libs);
}

function handleChecker(configPath) {
    return (err, json) => {
        console.log("\x1b[34m####---###");
        console.log(`\x1b[0m Анализ папки ${configPath}`);
        console.log("\x1b[34m####---###");
        if (err) {
            console.log(err);
        } else {
            logLicenses(json);
        }
    };
}

function handleAnalyzePackages() {
    return Promise.all(
        [utilsPath, websitePath].map(
            (configPath) =>
                new Promise((resolve) => {
                    console.log(`\x1b[0mУстановка пакетов в папке ${configPath}`);
                    const child = spawn("yarn", ["--ignore-scripts", "-s"], {cwd: configPath});

                    child.stderr.on("data", (data) => {
                        console.log(`ps stderr: ${data}`);
                    });

                    child.on("close", () => {
                        checker.init(getConfig(configPath), (err, json) => {
                            handleChecker(configPath)(err, json);

                            resolve();
                        });
                    });
                }),
        ),
    );
}

fs.rename(`${__dirname}/package.json`, `${__dirname}/package.old.json`, () => {
    handleAnalyzePackages().then(() => {
        fs.rename(`${__dirname}/package.old.json`, `${__dirname}/package.json`, () => {
            spawn("yarn");
        });
    });
});
