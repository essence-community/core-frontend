/* eslint-disable sort-keys */
const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const REACT_APP = /^REACT_APP_/i;
const filteredEnv = Object.entries(process.env)
    .filter((val) => REACT_APP.test(val[0]))
    .reduce((env, arr) => {
        env[arr[0]] = JSON.stringify(arr[1]);

        return env;
    }, {});

const isEnvProduction = process.env.NODE_ENV === "production";

process.env.BABEL_ENV = isEnvProduction ? "production" : "development";
process.env.NODE_ENV = isEnvProduction ? "production" : "development";

module.exports = {
    mode: isEnvProduction ? "production" : "development",
    entry: {
        vendor: [
            "react",
            "react-dom",
            "@essence/essence-constructor-share",
            "mobx",
            "mobx-react",
            "mobx-react-form",
            "@material-ui/core",
            "@material-ui/styles",
        ].filter(Boolean),
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "..", "dist", "assets"),
        filename: isEnvProduction ? "[name].[contenthash:8].min.js" : "[name].js",
        library: "essenceconstructorshare",
    },
    optimization: {
        namedModules: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        /*
                         * We want terser to parse ecma 8 code. However, we don't want it
                         * to apply any minfication steps that turns valid ecma 5 code
                         * into invalid ecma 5 code. This is why the 'compress' and 'output'
                         * sections only apply transformations that are ecma 5 safe
                         * https://github.com/facebook/create-react-app/pull/4234
                         */
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        /*
                         * Disabled because of an issue with Uglify breaking seemingly valid code:
                         * https://github.com/facebook/create-react-app/issues/2376
                         * Pending further investigation:
                         * https://github.com/mishoo/UglifyJS2/issues/2011
                         */
                        comparisons: false,
                        /*
                         * Disabled because of an issue with Terser breaking valid code:
                         * https://github.com/facebook/create-react-app/issues/5250
                         * Pending futher investigation:
                         * https://github.com/terser-js/terser/issues/120
                         */
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        /*
                         * Turned on because emoji and regex is not minified properly using default
                         * https://github.com/facebook/create-react-app/issues/2488
                         */
                        // eslint-disable-next-line camelcase
                        ascii_only: true,
                    },
                },
                /*
                 * Use multi-process parallel running to improve the build speed
                 * Default number of concurrent runs: os.cpus().length - 1
                 */
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true,
            }),
        ],
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "..", "dist", "manifest.json"),
            name: "vendor",
        }),
        new webpack.DllPlugin({
            context: path.join(__dirname, "..", "one_level", "two_level", "three_level"),
            path: path.join(__dirname, "..", "dist", "manifest_essence.json"),
            name: "vendor",
        }),
        new webpack.DefinePlugin({
            "process.env": filteredEnv,
        }),
    ],
};
