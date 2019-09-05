const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../config/webpack.config");

// eslint-disable-next-line no-magic-numbers
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = process.env.HOST || "0.0.0.0";
const isInteractive = process.stdout.isTTY;

const compiler = webpack(config);

const devServer = new WebpackDevServer(compiler);

function clearConsole() {
    process.stdout.write(process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H");
}

devServer.listen(DEFAULT_PORT, HOST, (err) => {
    if (err) {
        return console.log(err);
    }

    if (isInteractive) {
        clearConsole();
    }

    console.log(chalk.cyan(`Starting the development server on http://${HOST}:${DEFAULT_PORT} ...\n`));

    return undefined;
});
