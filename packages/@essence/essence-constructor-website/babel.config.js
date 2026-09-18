module.exports = function (api) {
    api.cache(true);

    return {
        presets: [["@babel/preset-typescript", { isTSX: true, allExtensions: true }], ["@babel/preset-env", { bugfixes: true }], "@babel/preset-react"],
        plugins: [["@babel/plugin-proposal-decorators", {version: "2023-11"}]]
    };
};
