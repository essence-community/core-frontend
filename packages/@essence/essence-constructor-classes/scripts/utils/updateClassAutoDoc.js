/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
const querystring = require("querystring");
const httpRequest = require("./httpRequest");

function updateClassAutoDoc(session, ckId, data) {
    return httpRequest(
        "action=dml&query=Modify",
        querystring.stringify({
            json: JSON.stringify({
                data: data,
                service: {
                    ck_main: ckId,
                    ck_page: "3",
                    ck_page_object: "F8391D91DA5B448299C85A79F8340B50",
                    cl_warning: 0,
                    cv_action: "U",
                },
            }),
            page_object: "F8391D91DA5B448299C85A79F8340B50",
            session,
        }),
    );
}

module.exports = updateClassAutoDoc;
