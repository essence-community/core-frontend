/* eslint-disable no-sync */
const path = require("path");
const fs = require("fs-extra");
const spawn = require("cross-spawn");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

try {
    spawn.sync("yarnpkg", ["publish"], {
        cwd: resolveApp("lib"),
        stdio: "inherit",
    });
} catch (error) {
    console.error(error.message);
}
