const path = require("path");
const copyDir = require("copy-dir");

const myArgs = process.argv.slice(2);
let [source, dest] = myArgs;

if (source[0] === ".") {
    source = path.join(__dirname, "..", source);
}
if (dest[0] === ".") {
    dest = path.join(__dirname, "..", dest);
}

copyDir(source, dest, (err) => {
    if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
});
