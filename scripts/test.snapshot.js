// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "test";
process.env.NODE_ENV = "test";
process.env.PUBLIC_URL = "";
process.env.REACT_APP_REQUEST = "MOCK";
process.env.DEBUG = "none";

const jest = require("jest");
const prompt = require("prompt");

const argv = process.argv.slice(2);

if (process.env.LOGIN && process.env.PASSWORD) {
    jest.run(argv);
} else {
    // eslint-disable-next-line handle-callback-err
    prompt.get(["login", "password"], (err, result) => {
        process.env.LOGIN = result.login;
        process.env.PASSWORD = result.password;

        jest.run(argv);
    });
}
