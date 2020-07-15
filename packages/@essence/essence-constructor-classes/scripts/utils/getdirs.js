/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");

function getdirs(p) {
    return fs.readdirSync(p).filter(function (f) {
        return fs.statSync(path.join(p, f)).isDirectory();
    });
}

module.exports = getdirs;
