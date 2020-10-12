#!/usr/bin/env node

/* eslint-disable sort-keys, no-sync, no-process-exit, no-console */
const path = require("path");
const os = require("os");
const commander = require("commander");
const fs = require("fs-extra");
const chalk = require("chalk");
const spawn = require("cross-spawn");

const packageJson = require("./package.json");

let projectName = "";

const program = commander
    // .command(packageJson.name)
    .version(packageJson.version)
    .arguments("<project-directory>")
    .usage(`${chalk.green("<project-directory>")} [options]`)
    .option("--example", "Make example application")
    .action((name) => {
        projectName = name;
    })
    .allowUnknownOption()
    .parse(process.argv);

if (projectName === "") {
    console.error("Please specify the project directory:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`);
    console.log();
    console.log("For example:");
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("module-simple")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);

    process.exit(1);
}

const root = path.resolve(projectName);
const appName = path.basename(root);

console.log(root);

fs.ensureDirSync(projectName);

const packageJsonNew = {
    name: appName,
    version: packageJson.version,
    private: true,
    scripts: {
        start: "constructor-scripts start",
        initialize: "constructor-scripts init",
        postinstall: "yarn constructor-dll-build",
        build: "constructor-scripts build",
        zip: "constructor-scripts zip",
        deploy: "constructor-scripts deploy",
    },
    eslint: {
        extends: "@essence-community/eslint-config-react",
    },
};

const dependencies = ["@material-ui/core", "react", "react-dom", "mobx@5.15.4", "mobx-react@6.3.0"];

const essencePackages = [
    "@essence-community/constructor-dll",
    "@essence-community/constructor-share",
    "@essence-community/constructor-scripts",
];

if (program.example) {
    packageJsonNew.example = true;
}

fs.writeFileSync(path.join(root, "package.json"), JSON.stringify(packageJsonNew, null, 2) + os.EOL);
fs.copyFileSync(path.join(__dirname, "eslintrc"), path.join(root, ".eslintrc"));
fs.copyFileSync(path.join(__dirname, "prettierrc"), path.join(root, ".prettierrc"));
// fs.copyFileSync(path.join(__dirname, "gitignore"), path.join(root, ".gitignore"));

// Spawn.sync("yarnpkg", ["--cwd", root], {stdio: "inherit"});
spawn.sync("yarnpkg", ["add", ...dependencies, ...essencePackages], {cwd: root, stdio: "inherit"});

const packages = ["@types/node", "@types/react", "typescript", "@essence-community/eslint-config-react", "eslint"];

spawn.sync("yarnpkg", ["add", "-D", ...packages], {cwd: root, stdio: "inherit"});

spawn.sync("yarnpkg", ["initialize"], {cwd: root, stdio: "inherit"});
