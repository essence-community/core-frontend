/* eslint-disable @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
const querystring = require("querystring");
const httpRequest = require("./httpRequest");

function fetchClassAttrs(session) {
    return httpRequest(
        "action=sql&query=MTClassDoc",
        querystring.stringify({
            json: JSON.stringify({
                filter: {
                    jl_filter: [],
                    jl_sort: [{direction: "DESC", property: "ck_id"}],
                    jn_fetch: 1000,
                    jn_offset: 0,
                },
            }),
            page_object: "8CCD5F9C1925486BAF5018B17F6C0E26",
            session,
        }),
    ).then((body) =>
        body.data.reduce((acc, cls) => {
            acc[cls.cv_name] = cls;

            return acc;
        }, {}),
    );
}

module.exports = fetchClassAttrs;
