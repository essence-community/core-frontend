/* eslint-disable no-console, camelcase, @typescript-eslint/camelcase, @typescript-eslint/no-var-requires */
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const httpRequest = require("./httpRequest");
const getdirs = require("./utils/getdirs");
const fetchSession = require("./utils/fetchSession");

const {GATE_URL} = process.env;
const ATTR_BUILDER = [
    "bottombtn",
    "childs",
    "childwindow",
    "columns",
    "editors",
    "filters",
    "topbtn",
    "contextmenus",
    "detail",
];
const CARRY_LINES_REGEXP = /\r\n|\r|\n|<br\/?>/giu;

function converType(attribute) {
    if (ATTR_BUILDER.includes(attribute.ck_attr)) {
        return "IBuilderConfig[]";
    }

    if (attribute.ck_attr === "records") {
        return "Record<string, FieldValue>[];";
    }

    if (attribute.ck_attr === "type") {
        return `"${attribute.cv_value}"`;
    }

    switch (attribute.ck_d_data_type) {
        case "text":
        case "localization":
        case "cssmeasure":
            return "string";
        case "enum":
            return attribute.cv_data_type_extra.map((attr) => `"${attr.cv_data_type_extra_value}"`).join(" | ");
        case "integer":
            return "number";
        default:
            return attribute.ck_d_data_type || "string";
    }
}

function writeToFile(classDirName, types) {
    const typeFilePath = path.join(__dirname, "..", "src", classDirName, "types.ts");
    let content = types.join("\n");
    const deps = ["IBuilderConfig", "FieldValue"].filter((dep) => content.includes(dep));

    if (deps.length) {
        content = `import {${deps.join(", ")}} from "@essence-community/constructor-share/types";\n\n${content}`;
    }

    fs.writeFile(typeFilePath, `${content}\n`, (errSave) => {
        console.log(errSave || `Success fetched: ${classDirName}`);
    });
}

function parseAttributes(session, dir, classId) {
    httpRequest(
        "action=sql&query=MTClassAttr",
        querystring.stringify({
            json: JSON.stringify({
                ck_attr_type: "all",
                filter: {
                    jl_filter: [],
                    jl_sort: [{direction: "DESC", property: "ck_id"}],
                    jn_fetch: 1000,
                    jn_offset: 0,
                },
                master: {ck_id: classId},
            }),
            page_object: "54B1DA0008CE4D5EB80FD9BADCFBA61F",
            session,
        }),
    ).then((body) => {
        const types = [];

        body.data.forEach((attribute) => {
            const optional = attribute.cv_value ? "" : "?";

            if (typeof attribute.cv_description === "string") {
                attribute.cv_description.split(CARRY_LINES_REGEXP).forEach((message) => {
                    types.push(`    // ${message}`);
                });
            }

            types.push(`    ${attribute.ck_attr}${optional}: ${converType(attribute)};`);
        });

        types.push("    // Служебные параметры");
        types.push("    ck_parent: string;");
        types.push("    ck_page_object: string;");

        writeToFile(dir, ["export interface IBuilderClassConfig {", ...types, "}"]);
    });
}

function fetchClassAttrs(session) {
    return (
        httpRequest(
            `${GATE_URL}?action=sql&query=MTClass`,
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
        )
            // parseAttributes(session);
            .then((body) =>
                body.data.reduce((acc, cls) => {
                    acc[cls.cv_name] = cls;

                    return acc;
                }, {}),
            )
    );
}

function fetchAllTypes(dirs) {
    fetchSession()
        .then((session) => {
            return fetchClassAttrs(session).then((classes) => [session, classes]);
        })
        .then(([session, classes]) => {
            return Promise.all(
                dirs.map((dir) => {
                    const configPath = path.join(__dirname, "..", "src", dir, "config.json");
                    const config = fs.existsSync(configPath) && require(configPath);

                    if (config && classes[config.name]) {
                        return parseAttributes(session, dir, classes[config.name].ck_id);
                    }

                    return undefined;
                }),
            );
        })
        .catch((err) => {
            console.log(err);
        });
}

fetchAllTypes(getdirs(path.join(__dirname, "..", "src")));
