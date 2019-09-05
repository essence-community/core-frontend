/* eslint-disable no-console, no-sync, no-magic-numbers */
process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

const path = require("path");
const fs = require("fs-extra");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const {printFileSizesAfterBuild, measureFileSizesBeforeBuild} = require("react-dev-utils/FileSizeReporter");
const config = require("../config/webpack.config");

const compiler = webpack(config);
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;
const appBuildPath = resolveApp("dist");

compiler.hooks.invalid.tap("invalid", () => {
    console.log("Compiling...");
});

function printMessages(messages) {
    if (!messages.errors.length && !messages.warnings.length) {
        console.log("Compiled successfully!");
    } else if (messages.errors.length) {
        console.log("Failed to compile.");
        messages.errors.forEach((err) => console.log(err));
    } else if (messages.warnings.length) {
        console.log("Compiled with warnings.");
        messages.warnings.forEach((warn) => console.log(warn));
    }
}

measureFileSizesBeforeBuild(appBuildPath).then((previousFileSizes) => {
    fs.emptyDirSync(appBuildPath);

    compiler.run((err, stats) => {
        if (err) {
            if (!err.message) {
                throw err;
            }

            return printMessages(
                formatWebpackMessages({
                    errors: [err.message],
                    warnings: [],
                }),
            );
        }

        printMessages(formatWebpackMessages(stats.toJson({all: false, errors: true, warnings: true})));
        printFileSizesAfterBuild(
            stats,
            previousFileSizes,
            appBuildPath,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE,
        );

        return true;
    });
});
