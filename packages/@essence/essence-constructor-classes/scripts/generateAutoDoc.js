/* eslint-disable @typescript-eslint/no-var-requires, no-console */
const path = require("path");
const fs = require("fs");
const documentation = require("documentation");
const getdirs = require("./utils/getdirs");
const fetchSession = require("./utils/fetchSession");
const fetchClassAttrs = require("./utils/fetchClassAttrs");
const updateClassAutoDoc = require("./utils/updateClassAutoDoc");

const dirs = getdirs(path.join(__dirname, "..", "src"));

function generateDocs() {
    return Promise.all(
        dirs.map((dir) => {
            const modulePath = path.join(__dirname, "..", "src", dir);
            const configPath = path.join(modulePath, "config.json");
            const config = fs.existsSync(configPath) && require(configPath);

            if (config && config.docs) {
                return documentation
                    .build(
                        config.docs.map((doc) => path.join(modulePath, ...doc)),
                        {
                            parseExtension: ["ts", "tsx"],
                            shallow: false,
                        },
                    )
                    .then(documentation.formats.md)
                    .then((output) => ({config, dir, output}));
            }
        }),
    ).then((docs) => docs.filter(Boolean));
}

function writeToFile(classDirName, docOutput) {
    const typeFilePath = path.join(__dirname, "..", "src", classDirName, "README.md");

    fs.writeFile(typeFilePath, docOutput, (errSave) => {
        console.log(errSave || `Success updated: ${classDirName}`);
    });
}

fetchSession().then((session) => {
    Promise.all([generateDocs(), fetchClassAttrs(session)]).then(([docsResult, classes]) => {
        return Promise.all(
            docsResult
                .filter(({config}) => classes[config.name])
                .map(({config, dir, output}) => {
                    const data = {
                        ...classes[config.name],
                        cv_auto_documentation: output.replace(/<!-- [\w. ]+ -->/, ""),
                    };

                    delete data.cv_manual_documentation;

                    writeToFile(dir, data.cv_auto_documentation);

                    return updateClassAutoDoc(session, classes[config.name].ck_id, data).then((res) => {
                        if (res && res.data[0].cv_error) {
                            console.log("Ошибка: ", res.data[0].cv_error);
                        } else {
                            console.log(`Updated doc for ${config.name}`);
                        }
                    });
                }),
        );
    });
});
