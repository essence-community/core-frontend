/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const documentation = require("documentation");
const streamArray = require("stream-array");
const vfs = require("vinyl-fs");

documentation
    .build(
        [
            "./demo/demoHTMLDoc.ts",
            "./packages/@essence/essence-constructor-share/src/models/WindowModel/WindowModel.ts",
            "./packages/@essence/essence-constructor-classes/src/Application/store/ApplicationModel.ts",
        ],
        {parseExtension: ["ts"], shallow: false},
    )
    .then(documentation.formats.html)
    .then((output) => {
        streamArray(output).pipe(vfs.dest("./html_doc"));
    });
