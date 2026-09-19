const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
    babelrc: false,
    configFile: false,
    plugins: [[require.resolve("@babel/plugin-proposal-decorators"), {version: "2023-11"}]],
    presets: [
        [require.resolve("@babel/preset-typescript"), {allExtensions: true, isTSX: true}],
        [require.resolve("@babel/preset-env"), {bugfixes: true, modules: "commonjs"}],
        require.resolve("@babel/preset-react"),
    ],
});
