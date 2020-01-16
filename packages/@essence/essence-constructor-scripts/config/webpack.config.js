/* eslint-disable require-unicode-regexp, prefer-named-capture-group */
/* eslint-disable no-sync, sort-keys, global-require */
const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const packageJson = require(resolveApp("package.json"));
const isEnvProduction = process.env.NODE_ENV === "production";
const isTS = Boolean(packageJson.devDependencies.typescript);
// Check if TypeScript is setup
const useCssModule = fs.existsSync(resolveApp("src", "index.css"));
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

process.env.BABEL_ENV = isEnvProduction ? "production" : "development";
process.env.NODE_ENV = isEnvProduction ? "production" : "development";

// Common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        !isEnvProduction && require.resolve("style-loader"),
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            // Options: Object.assign({}, shouldUseRelativeAssetPaths ? {publicPath: "../../"} : undefined),
        },
        {
            loader: require.resolve("css-loader"),
            options: cssOptions,
        },
        {
            /*
             * Options for PostCSS as we reference these options twice
             * Adds vendor prefixing based on your specified browser support in
             * package.json
             */
            loader: require.resolve("postcss-loader"),
            options: {
                /*
                 * Necessary for external CSS imports to work
                 * https://github.com/facebook/create-react-app/issues/2677
                 */
                ident: "postcss",
                plugins: () => [
                    require("postcss-flexbugs-fixes"),
                    require("postcss-preset-env")({
                        autoprefixer: {
                            flexbox: "no-2009",
                        },
                        stage: 3,
                    }),
                ],
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
        },
    ].filter(Boolean);

    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
            },
        });
    }

    return loaders;
};

const entries = {
    [packageJson.name]: [path.resolve(resolveApp("src"), isTS ? "index.ts" : "index.js")],
};

if (!isEnvProduction) {
    entries[`${packageJson.name}-render`] = [path.resolve(resolveApp("src"), isTS ? "render.tsx" : "render.js")];
}

module.exports = {
    mode: isEnvProduction ? "production" : "development",
    entry: entries,
    output: {
        filename: isEnvProduction ? "[name].[contenthash:8].js" : "[name].js",
    },
    module: {
        strictExportPresence: true,
        rules: [
            // Disable require.ensure as it's not a standard language feature.
            {parser: {requireEnsure: false}},
            {
                oneOf: [
                    /*
                     * Process application JS with Babel.
                     * The preset includes JSX, Flow, TypeScript, and some ESnext features.
                     */
                    {
                        test: /\.(js|mjs|jsx|ts|tsx)$/,
                        include: resolveApp("src"),
                        loader: require.resolve("babel-loader"),
                        options: {
                            customize: require.resolve("babel-preset-react-app/webpack-overrides"),

                            plugins: [
                                [
                                    require.resolve("babel-plugin-named-asset-import"),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                                            },
                                        },
                                    },
                                ],
                            ],
                            presets: ["react-app"],
                            /*
                             * This is a feature of `babel-loader` for webpack (not Babel itself).
                             * It enables caching results in ./node_modules/.cache/babel-loader/
                             * directory for faster rebuilds.
                             */
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,
                            compact: isEnvProduction,
                        },
                    },
                    /*
                     * Process any JS outside of the app with Babel.
                     * Unlike the application JS, we only compile the standard ES features.
                     */
                    {
                        test: /\.(js|mjs)$/,
                        exclude: /@babel(?:\/|\\{1,2})runtime/,
                        loader: require.resolve("babel-loader"),
                        options: {
                            babelrc: false,
                            configFile: false,
                            compact: false,
                            presets: [[require.resolve("babel-preset-react-app/dependencies"), {helpers: true}]],
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,

                            /*
                             * Babel sourcemaps are needed for debugging into node_modules
                             * code.  Without the options below, debuggers like VSCode
                             * show incorrect code and set breakpoints on the wrong lines.
                             */
                            sourceMaps: shouldUseSourceMap,
                            inputSourceMap: shouldUseSourceMap,
                        },
                    },
                    useCssModule && {
                        test: /\.css$/,
                        exclude: /\.module\.css$/,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction && shouldUseSourceMap,
                        }),
                        /*
                         * Don't consider CSS imports dead code even if the
                         * containing package claims to have no side effects.
                         * Remove this when webpack adds a warning or an error for this.
                         * See https://github.com/webpack/webpack/issues/6571
                         */
                        sideEffects: true,
                    },
                    useCssModule && {
                        test: /\.module\.css$/,
                        use: getStyleLoaders({
                            importLoaders: 1,
                            sourceMap: isEnvProduction && shouldUseSourceMap,
                            modules: true,
                            // GetLocalIdent: getCSSModuleLocalIdent,
                        }),
                    },
                ].filter(Boolean),
            },
        ],
    },
    optimization: {
        minimize: isEnvProduction,
        minimizer: [
            // This is only used in production mode
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
                sourceMap: shouldUseSourceMap,
            }),
            // This is only used in production mode
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    // Parser: safePostCssParser,
                    map: false,
                },
            }),
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    plugins: [
        !isEnvProduction &&
            new HtmlWebpackPlugin({
                inject: true,
                excludeChunks: [packageJson.name],
                template: path.resolve(resolveApp("public"), "index.html"),
            }),
        !isEnvProduction &&
            new CopyWebpackPlugin([
                {from: path.join(__dirname, "..", "..", "constructor-dll", "dist", "assets"), to: "static/"},
            ]),
        !isEnvProduction &&
            new HtmlWebpackIncludeAssetsPlugin({
                assets: [
                    {
                        path: "static",
                        glob: "*.js",
                        globPath: path.join(__dirname, "..", "..", "constructor-dll", "dist", "assets"),
                    },
                ],
                append: false,
            }),
        new webpack.DllReferencePlugin({
            context: resolveApp(""),
            manifest: require("../../constructor-dll/dist/manifest.json"),
            name: "essenceconstructorshare",
        }),
        !isEnvProduction && new webpack.HotModuleReplacementPlugin(),
        isEnvProduction &&
            new MiniCssExtractPlugin({
                /*
                 * Options similar to the same options in webpackOptions.output
                 * both options are optional
                 */
                filename: "[name].[contenthash:8].css",
            }),
    ].filter(Boolean),
    /*
     * Turn off performance processing because we utilize
     * our own hints via the FileSizeReporter
     */
    performance: false,
};
