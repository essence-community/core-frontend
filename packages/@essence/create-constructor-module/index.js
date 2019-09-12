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
    .option("-t, --typescript", "Use typescript")
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
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green("mpdule-simple")}`);
    console.log();
    console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);

    process.exit(1);
}

const root = path.resolve(projectName);
const appName = path.basename(root);

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
        test: "constructor-scripts test",
        zip: "constructor-scripts zip",
        deploy: "constructor-scripts deploy",
    },
    dependencies: {
        "@material-ui/core": "3.5.1",
        axios: "0.18.0",
        "mdi-react": "3.4.0",
        mobx: "5.9.0",
        "mobx-react": "5.4.2",
        "mobx-react-form": "1.35.1",
        moment: "2.x",
        react: "16.8.6",
        "react-dom": "16.8.6",
    },
};

const essencePackages = [
    "@essence/essence-constructor-dll",
    "@essence/essence-constructor-share",
    "@essence/essence-constructor-scripts",
];

if (program.example) {
    packageJsonNew.example = true;
}

fs.writeFileSync(path.join(root, "package.json"), JSON.stringify(packageJsonNew, null, 2) + os.EOL);

spawn.sync("yarnpkg", ["--cwd", root], {stdio: "inherit"});
spawn.sync("yarnpkg", ["add", ...essencePackages], {cwd: root, stdio: "inherit"});

if (program.typescript || packageJsonNew.example) {
    const packages = [
        "@types/node",
        "@types/react",
        "@types/react-dom",
        "@types/jest",
        "typescript",
        "tslint",
        "tslint-config-prettier",
        "tslint-eslint-rules",
        "@babel/preset-typescript",
    ];

    spawn.sync("yarnpkg", ["add", "-D", ...packages], {cwd: root, stdio: "inherit"});
}

spawn.sync("yarnpkg", ["initialize"], {cwd: root, stdio: "inherit"});
