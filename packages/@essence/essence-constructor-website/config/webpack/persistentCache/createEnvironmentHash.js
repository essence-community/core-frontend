"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {createHash} = require("crypto");

module.exports = (env) => {
    const hash = createHash("md5");

    hash.update(JSON.stringify(env));

    return hash.digest("hex");
};
