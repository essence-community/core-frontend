/* eslint-disable no-console */
/* eslint-disable no-use-before-define, @typescript-eslint/no-use-before-define */
/* eslint-disable camelcase, @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const request = require("request");

const tsTypeFile = path.join(__dirname, "..", "src", "types", "Builder.ts");
const {GATE_URL} = process.env;
const ATTR_SKIP = [
    "bottombtn",
    "childs",
    "childwindow",
    "columns",
    "editors",
    "filters",
    "topbtn",
    "contextmenus",
    "detail",
    "records",
    "type",
];
const CARRY_LINES_REGEXP = /\r\n|\r|\n|<br\/?>/giu;

if (!GATE_URL) {
    throw new Error("GATE_URL should be set in env");
}

function converType(type) {
    switch (type) {
        case "text":
        case "localization":
            return "string";
        default:
            return type;
    }
}

request.post(
    {
        form: {
            cv_login: "admin_core",
            cv_password: "admin_core",
        },
        json: true,
        url: `${GATE_URL}?action=auth&query=Login`,
    },
    (error, response, body) => {
        const [{session}] = body.data;

        parseAttributes(session);
    },
);

function parseAttributes(session) {
    request.post(
        {
            form: {
                json: JSON.stringify({
                    filter: {
                        jl_filter: [],
                        jl_sort: [{direction: "ASC", property: "ck_id"}],
                        jn_fetch: 1000,
                        jn_offset: 0,
                    },
                    master: {},
                }),
                page_object: "54B1DA0008CE4D5EB80FD9BADCFBA61F",
                session,
            },
            json: true,
            url: `${GATE_URL}?action=sql&query=MTAttr`,
        },
        (error, response, body) => {
            const types = [];

            body.data.forEach((attribute) => {
                if (ATTR_SKIP.indexOf(attribute.ck_id) === -1) {
                    types.push(`    // ${attribute.cv_description.replace(CARRY_LINES_REGEXP, " ")}`);
                    types.push(`    ${attribute.ck_id}?: ${converType(attribute.ck_d_data_type || "string")};`);
                }
            });

            writeToFile(tsTypeFile, ["export interface IBuilderBaseConfig {", ...types, "};"], "BUILDER_CONFIG");
        },
    );
}

function writeToFile(pathToFile, types, replaceStr) {
    fs.readFile(pathToFile, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const result = data.replace(
                new RegExp(`// ${replaceStr}_START[\\s\\S]*// ${replaceStr}_END`, "gu"),
                [`// ${replaceStr}_START`, ...types, `// ${replaceStr}_END`].join("\n"),
            );

            fs.writeFile(pathToFile, result, (errSave) => {
                console.log(errSave || "Success created");
            });
        }
    });
}
