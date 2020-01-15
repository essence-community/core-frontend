/* eslint-disable no-sync */
const path = require("path");
const fs = require("fs-extra");
const spawn = require("cross-spawn");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const packageJson = require(path.resolve(resolveApp("package.json")));

try {
    const newPackageJson = {
        ...packageJson,
        main: "index.js",
        module: "index.module.js",
        private: false,
        typings: "index.d.ts",
    };

    delete newPackageJson.devDependencies;
    delete newPackageJson.workspaces;
    delete newPackageJson.scripts;

    fs.emptyDirSync(resolveApp("lib"));
    fs.writeFileSync(resolveApp(path.join("lib", "package.json")), JSON.stringify(newPackageJson, null, 2));
    fs.copyFileSync(resolveApp(path.join("yarn.lock")), resolveApp(path.join("lib", "yarn.lock")));
    fs.copyFileSync(resolveApp(path.join("README.md")), resolveApp(path.join("lib", "README.md")));

    spawn.sync("tsc", ["--project", appDirectory], {
        stdio: "inherit",
    });
} catch (error) {
    console.error(error.message);
}
