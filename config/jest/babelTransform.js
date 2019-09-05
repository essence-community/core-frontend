const babelJest = require("babel-jest");

module.exports = babelJest.createTransformer({
    babelrc: false,
    configFile: false,
    presets: [require.resolve("babel-preset-react-app"), require.resolve("@babel/preset-typescript")],
});
