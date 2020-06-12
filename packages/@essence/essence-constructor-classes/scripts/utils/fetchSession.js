/* eslint-disable no-console, @typescript-eslint/camelcase */

function fetchSession() {
    return (
        httpRequest(
            `${GATE_URL}?action=auth&query=Login`,
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
exports.default = fetchSession;
