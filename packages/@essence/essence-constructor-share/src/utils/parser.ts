import * as moment from "moment";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
/* eslint-disable sort-keys */
import * as lodash from "lodash";
/* eslint-disable @typescript-eslint/no-use-before-define, no-use-before-define */
import * as esprima from "esprima";
import {
    Expression,
    Property,
    Pattern,
    Super,
    LogicalExpression,
    UnaryExpression,
    BlockStatement,
    Literal,
    // eslint-disable-next-line import/no-extraneous-dependencies, import/extensions, import/no-unresolved
} from "estree";
import memoize from "memoizee";
import QueryString from "qs";
import {FieldValue} from "../types";
import {loggerRoot} from "../constants";
import {i18next} from "./I18n";
import {decodePathUrl, encodePathUrl, isEmpty} from "./base";
import {BigNumberBase} from "./bignumber";

export interface IGetValue {
    get: (key: string) => FieldValue;
}

export interface IParseReturnType {
    runer: (values?: Record<string, FieldValue> | IGetValue) => undefined | string | boolean | number;
    variables: string[];
    hasError: boolean;
}

export interface IValues {
    get?($key: string, isEmpty?: boolean): FieldValue;
    [$key: string]: FieldValue;
}

const logger = loggerRoot.extend("parser");

const operators: any = {
    "!": ({argument}: UnaryExpression, values: IValues) => !parseOperations(argument, values),
    "!=": ({left, right}: LogicalExpression, values: IValues) =>
        // eslint-disable-next-line eqeqeq
        parseOperations(left, values) != parseOperations(right, values),
    "!==": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) !== parseOperations(right, values),
    "&&": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) && parseOperations(right, values),
    "+": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) + parseOperations(right, values),
    "-": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) - parseOperations(right, values),
    "*": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) * parseOperations(right, values),
    "/": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) / parseOperations(right, values),
    "<": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) < parseOperations(right, values),
    "==": ({left, right}: LogicalExpression, values: IValues) =>
        // eslint-disable-next-line eqeqeq
        parseOperations(left, values) == parseOperations(right, values),
    "===": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) === parseOperations(right, values),
    ">": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) > parseOperations(right, values),
    in: ({left, right}: LogicalExpression, values: IValues) => {
        let value = parseOperations(right, values);

        if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) {
            try {
                value = JSON.parse(value);
            } catch (err) {
                logger("Parsed error %s", value, err);
            }
        }

        return (Array.isArray(value) ? value : [value]).indexOf(parseOperations(left, values)) !== -1;
    },
    "||": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) || parseOperations(right, values),
};
const BigNumber = BigNumberBase;

// @ts-ignore
BigNumber.from = function (val: any, conf: any) {
    if (isEmpty(val)) {
        return "";
    }
    try {
        return new BigNumber(val, conf);
    } catch (e) {
        return "";
    }
};
// @ts-ignore
BigNumber.prototype.from = BigNumber.from;

const utils = {
    BigNumber,
    JSON,
    isEmpty,
    lodash,
    Object,
    Array,
    encodeURIComponent,
    decodeURIComponent,
    i18next,
    moment,
    QueryString,
    encodePathUrl,
    decodePathUrl,
};

type utilsKey = keyof typeof utils;

function parseOperations(expression: Expression | Pattern | Super | BlockStatement, values: IValues): any {
    if (!expression) {
        return null;
    }
    switch (expression.type) {
        case "UnaryExpression":
        case "BinaryExpression":
        case "LogicalExpression":
            return operators[expression.operator] ? operators[expression.operator](expression, values) : false;
        case "SequenceExpression":
            return expression.expressions.map((exp: Expression) => parseOperations(exp, values));
        case "Literal":
            const liteValue = expression as Literal;

            if (
                // @ts-ignore
                expression.isMember &&
                (typeof liteValue.raw === "undefined" ||
                    (liteValue.raw &&
                        // eslint-disable-next-line quotes
                        !(liteValue.raw.startsWith('"') && liteValue.raw.endsWith('"')) &&
                        !(liteValue.raw.startsWith("'") && liteValue.raw.endsWith("'"))))
            ) {
                const value = values.get ? values.get(liteValue.value as any, true) : values[liteValue.value as any];

                return typeof value === "undefined"
                    ? // @ts-ignore
                      liteValue.value || value
                    : value;
            }

            return liteValue.value;
        case "Identifier":
            // @ts-ignore
            if (!expression.isMember && expression.name === "undefined") {
                return undefined;
            }
            // @ts-ignore
            if (!expression.isMember && expression.name === "null") {
                return null;
            }
            // @ts-ignore
            if (!expression.isMember && expression.name === "true") {
                return true;
            }
            // @ts-ignore
            if (!expression.isMember && expression.name === "false") {
                return false;
            }

            const value = values.get ? values.get(expression.name, true) : values[expression.name];

            return typeof value === "undefined"
                ? // @ts-ignore
                  (expression.isMember && expression.name) || value
                : value;
        case "AssignmentExpression":
            return parseOperations(expression.right, values);
        case "ObjectExpression":
            return expression.properties.reduce((acc: IValues, prop: Property) => {
                // @ts-ignore
                prop.key.isMember = true;
                acc[parseOperations(prop.key, values)] = parseOperations(prop.value, values);

                return acc;
            }, {});
        case "ArrayExpression":
            return expression.elements.map((element: any) => parseOperations(element, values));
        case "ConditionalExpression":
            return parseOperations(expression.test, values)
                ? parseOperations(expression.consequent, values)
                : parseOperations(expression.alternate, values);
        case "MemberExpression":
            if (expression.property.type === "Literal") {
                // @ts-ignore
                expression.property.isMember = true;
            }

            let res = parseOperations(expression.object, values);

            if (typeof res === "string" && (res.charAt(0) === "{" || res.charAt(0) === "[")) {
                try {
                    res = JSON.parse(res);
                } catch (e) {
                    logger(e);
                }
            }
            if (
                (expression.object.type === "ObjectExpression" ||
                    expression.object.type === "ArrayExpression" ||
                    expression.object.type === "Identifier") &&
                expression.property.type === "Identifier"
            ) {
                // @ts-ignore
                if (!expression.property.originname) {
                    // @ts-ignore
                    expression.property.originname = expression.property.name;
                }
                expression.property.name =
                    ((values.get
                        ? // @ts-ignore
                          values.get(expression.property.originname, true)
                        : // @ts-ignore
                          values[expression.property.originname]) as any) || expression.property.originname;
            }
            const property = parseOperations(
                expression.property,
                res
                    ? {
                          get: (key) => {
                              if (Array.isArray(res) || typeof res === "object" || typeof res === "function") {
                                  const result = res[key] || (values.get ? values.get(key, true) : values[key]);

                                  if (typeof result === "function") {
                                      result.parentFn = res;
                                  }

                                  return result;
                              }

                              return values.get ? values.get(key, true) : values[key];
                          },
                      }
                    : values,
            );

            return res &&
                (expression.object.type === "ObjectExpression" || expression.object.type === "ArrayExpression")
                ? res[property] || property
                : property;
        case "TemplateLiteral":
            return expression.expressions
                ? expression.expressions.reduce(
                      (acc, expr, index) =>
                          `${acc}${parseOperations(expr, values)}${expression.quasis[index + 1].value.raw}`,
                      expression.quasis[0].value.raw,
                  )
                : "";
        case "CallExpression":
            const fn = parseOperations(expression.callee, {
                get: (key) => {
                    return utils[key as utilsKey] || (values.get ? values.get(key, true) : values[key]);
                },
            });

            return typeof fn === "function"
                ? fn.apply(
                      fn.parentFn || fn,
                      expression.arguments.map((arg) =>
                          // @ts-ignore
                          parseOperations(arg, values),
                      ),
                  )
                : "";
        case "ArrowFunctionExpression":
            return (...ags: any[]) =>
                parseOperations(expression.body, {
                    get: (key) => {
                        const resArrow = ags.reduce((resParam, val, ind) => {
                            // @ts-ignore
                            resParam[expression.params[ind]?.name] = val;

                            return resParam;
                        }, {});

                        if (Object.keys(resArrow).length) {
                            return resArrow[key] || (values.get ? values.get(key, true) : values[key]);
                        }

                        return values.get ? values.get(key, true) : values[key];
                    },
                });
        case "BlockStatement":
            const paramsBlock = {} as Record<string, any>;
            let result = "";
            const paramGetBlock = {
                get: (key: string) => {
                    if (Object.prototype.hasOwnProperty.call(paramsBlock, key)) {
                        return paramsBlock[key];
                    }

                    return values.get ? values.get(key, true) : values[key];
                },
            };

            expression.body.forEach((ext) => {
                switch (ext.type) {
                    case "VariableDeclaration":
                        ext.declarations.forEach((extVar) => {
                            paramsBlock[
                                parseOperations(extVar.id, paramGetBlock) || (extVar.id as any).name
                            ] = extVar.init ? parseOperations(extVar.init, paramGetBlock) : undefined;
                        });
                        break;
                    case "ReturnStatement":
                        result = ext.argument ? parseOperations(ext.argument, paramsBlock) : "";
                        break;
                    default:
                        parseOperations(ext as any, paramGetBlock);
                        break;
                }
            });

            return result;
        default:
            logger("expression not found: ", expression);

            return undefined;
    }
}

export const parse = (src: string, withTokens = false): IParseReturnType => {
    let parsedSrc: esprima.Program | null = null;

    try {
        parsedSrc = esprima.parseScript(`result = ${src}`, {tokens: withTokens});
    } catch (error) {
        logger(i18next.t("static:993c801f7f8b4284b3b1a0f624496ac8"), error.message);

        return {
            hasError: true,
            runer: () => String(i18next.t("static:4b067f4b55154c46b0a8d6b34d4d9bfb")),
            variables: [],
        };
    }

    return {
        hasError: false,
        runer: (values: IValues = {}) => {
            const expression = parsedSrc ? (parsedSrc.body[0] as any).expression : undefined;

            return expression
                ? parseOperations(expression, values)
                : i18next.t("static:b621b9209813416dba9d5c12ccc93fdf");
        },
        variables:
            withTokens && parsedSrc && parsedSrc.tokens
                ? parsedSrc.tokens
                      .filter((token: esprima.Token) => token.type === "Identifier" && token.value !== "result")
                      .map((token: esprima.Token) => token.value)
                      .filter((value: string, idx: number, arr: string[]) => arr.indexOf(value) === idx)
                : [],
    };
};

export const parseMemoize = memoize(parse);
