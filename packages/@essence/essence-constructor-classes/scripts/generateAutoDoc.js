/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const fs = require("fs");
const documentation = require("documentation");
const getdirs = require("./utils/getdirs");

const dirs = getdirs(path.join(__dirname, "..", "src"));

dirs.map((dir) => {
    const modulePath = path.join(__dirname, "..", "src", dir);
    const configPath = path.join(modulePath, "config.json");
    const config = fs.existsSync(configPath) && require(configPath);

    if (config && config.docs) {
        documentation
            .build(
                config.docs.map((doc) => path.join(modulePath, ...doc)),
                {parseExtension: ["ts"], shallow: false},
            )
            .then(documentation.formats.md)
            .then((output) => {
                console.log(output);
            });
    }
});
