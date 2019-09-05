/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
const fs = require("fs");
const path = require("path");
const request = require("request");

const tsModuleTypeFile = path.join(__dirname, "..", "module.d.ts");
const tsTypeFile = path.join(__dirname, "..", "src", "types", "Builder.ts");
const {GATE_URL} = process.env;

if (!GATE_URL) {
    throw new Error("GATE_URL should be set in env");
}

request.post(
    {
        form: {
            cv_login: "test_core",
            cv_password: "test_core",
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
                page_object: "7C45F8C65E064F65E053809BA8C0A3B1",
                session,
            },
            json: true,
            url: `${GATE_URL}?action=sql&query=MTAttr`,
        },
        (error, response, body) => {
            const types = [];

            body.data.forEach((attribute) => {
                types.push(`        // ${attribute.cv_description.replace(/<br\/?>/g, " ")}`);
                types.push(`        ${attribute.ck_id}?: ${attribute.cv_static_type || "string"},`);
            });

            writeToFile(
                tsModuleTypeFile,
                ["    export interface BuilderConfigType {", ...types, "    };"],
                "BUILDER_CONFIG",
            );
            writeToFile(tsTypeFile, ["    export interface BuilderConfigType {", ...types, "    };"], "BUILDER_CONFIG");
        },
    );
}

function writeToFile(pathToFile, types, replaceStr) {
    fs.readFile(pathToFile, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const result = data.replace(
                new RegExp(`// ${replaceStr}_START[\\s\\S]*// ${replaceStr}_END`, "g"),
                [`// ${replaceStr}_START`, ...types, `    // ${replaceStr}_END`].join("\n"),
            );

            fs.writeFile(pathToFile, result, (errSave) => {
                console.log(errSave || "Success created");
            });
        }
    });
}
