/* eslint-disable no-console, @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
const querystring = require("querystring");
const httpRequest = require("./httpRequest");

function fetchSession() {
    return (
        httpRequest(
            "action=auth&query=Login",
            querystring.stringify({
                cv_login: "admin_core",
                cv_password: "admin_core",
            }),
        )
            // parseAttributes(session);
            .then((body) => body.data[0].session)
            .catch((err) => {
                console.log(err);
            })
    );
}

module.exports = fetchSession;
