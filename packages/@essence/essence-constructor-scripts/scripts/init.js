/* eslint-disable sort-keys, no-sync, global-require, no-process-exit */
/*
 * Makes the script crash on unhandled rejections instead of silently
 * ignoring them. In the future, promise rejections that are not handled will
 * terminate the Node.js process with a non-zero exit code.
 */
process.on("unhandledRejection", (err) => {
    throw err;
});

const path = require("path");
const {execSync} = require("child_process");
const fs = require("fs-extra");
const chalk = require("chalk");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

function isInGitRepository() {
    try {
        execSync("git rev-parse --is-inside-work-tree", {stdio: "ignore"});

        return true;
    } catch (error) {
        return false;
    }
}

// eslint-disable-next-line max-statements
function tryGitInit(appPath) {
    let didInit = false;

    try {
        execSync("git --version", {stdio: "ignore"});
        if (isInGitRepository()) {
            return false;
        }

        execSync("git init", {stdio: "ignore"});
        didInit = true;

        execSync("git add -A", {stdio: "ignore"});
        // eslint-disable-next-line prettier/prettier
        execSync("git commit -m \"Initial commit from Create React App\"", {
            stdio: "ignore",
        });

        return true;
    } catch (error) {
        if (didInit) {
            try {
                fs.removeSync(path.join(appPath, ".git"));
            } catch (removeErr) {
                // Ignore.
            }
        }

        return false;
    }
}

const appPath = path.dirname(require.resolve(path.join(__dirname, "..", "package.json")));
const modulePath = resolveApp("");
const appPackage = require(path.join(modulePath, "package.json"));
const isTS = Boolean(appPackage.devDependencies.typescript);

// Copy the files for the user
let templatePath = "";

if (appPackage.example) {
    templatePath = path.join(appPath, "template_example");
} else if (isTS) {
    templatePath = path.join(appPath, "template_typescript");
} else {
    templatePath = path.join(appPath, "template");
}

if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, modulePath);
    fs.moveSync(path.join(modulePath, "gitignore"), path.join(modulePath, ".gitignore"));
} else {
    console.error(`Could not locate supplied template: ${chalk.green(templatePath)}`);

    process.exit(1);
}

if (tryGitInit(appPath)) {
    console.log();
    console.log("Initialized a git repository.");
}

console.log();
console.log(`Success! Created ${appPackage.name} at ${appPath}`);
console.log("Inside that directory, you can run several commands:");
console.log();
console.log(chalk.cyan(`  Rename module name in src/index.${isTS ? "ts" : "js"}`));
console.log();
console.log(chalk.cyan("  yarn start"));
console.log("    Starts the development server.");
console.log();
console.log(chalk.cyan("  yarn build"));
console.log("    Bundles the app into static files for production.");
console.log();
console.log(chalk.cyan("  yarn test"));
console.log("    Starts the test runner.");
console.log();
console.log("We suggest that you begin by typing:");
console.log();
console.log(chalk.cyan("  cd"), appPackage.name);
console.log(`  ${chalk.cyan("yarn start")}`);
console.log();
console.log("Happy hacking!");
