#!/usr/bin/env node

/* eslint-disable no-console, no-sync */

process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";

const path = require("path");
const fs = require("fs-extra");
const webpack = require("webpack");
const formatWebpackMessages = require("react-dev-utils/formatWebpackMessages");
const config = require("../config/webpack.config");

fs.removeSync(path.join(__dirname, "..", "dist"));

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

const compiler = webpack(config);

// eslint-disable-next-line max-statements
compiler.run((err, stats) => {
    if (err) {
        throw err;
    }

    const statsJSON = stats.toJson({all: false, assets: true, errors: true, warnings: true});
    const messages = formatWebpackMessages(statsJSON);

    console.log();
    console.log(`Dll compiled ${messages.errors.length > 0 ? "failed" : "successfully"}!`);

    console.log();
    printMessages(messages);
    console.log();

    if (messages.errors.length === 0) {
        console.log("Для разработки необходимо собрать `yarn build:dev` в essence-constructor-dll!");
        console.log("Files:");
        statsJSON.assets.forEach((asset) => {
            console.log(`    ${asset.name}`);
        });
    }

    console.log();
});
