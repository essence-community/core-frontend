module.exports = function (api) {
    api.cache(true);

    return {
        presets: [["@babel/preset-typescript", { isTSX: true, allExtensions: true }], ["@babel/preset-env", { loose: true }], "@babel/preset-react"],
        plugins: [['@babel/plugin-proposal-decorators', { version: "legacy" }], ["@babel/plugin-transform-class-properties", { loose: true }]]
    };
};
