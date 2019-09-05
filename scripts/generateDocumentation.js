const documentation = require("documentation");
const streamArray = require("stream-array");
const vfs = require("vinyl-fs");

documentation
    .build(["./demo/demoHTMLDoc.ts"], {parseExtension: ["ts"], shallow: false})
    .then(documentation.formats.html)
    .then((output) => {
        streamArray(output).pipe(vfs.dest("./html_doc"));
    });
