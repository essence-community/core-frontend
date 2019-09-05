/* eslint-disable no-sync */
const path = require("path");
const spawn = require("cross-spawn");
const fs = require("fs-extra");

const appDirectory = fs.realpathSync(process.cwd());

spawn.sync("yarnpkg", [], {
    cwd: path.join(appDirectory, "packages", "@essence", "essence-constructor-dll"),
    stdio: "inherit",
});

spawn.sync("yarnpkg", ["build"], {
    cwd: path.join(appDirectory, "packages", "@essence", "essence-constructor-dll"),
    stdio: "inherit",
});
