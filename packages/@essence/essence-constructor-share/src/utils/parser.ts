/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-lines-per-function */
/* eslint-disable sort-keys */
import * as lodash from "lodash";
/* eslint-disable @typescript-eslint/no-use-before-define, no-use-before-define */
import * as esprima from "esprima";
// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions, import/no-unresolved
import {Expression, Property, Pattern, Super, LogicalExpression, UnaryExpression, BlockStatement} from "estree";
import memoize from "memoizee";
import {FieldValue} from "../types";
import {loggerRoot} from "../constants";
import {i18next} from "./I18n";
import {isEmpty} from "./base";

interface IGetValue {
    get: (key: string) => FieldValue;
}

export interface IParseReturnType {
    runer: (values?: Record<string, FieldValue> | IGetValue) => undefined | string | boolean | number;
    variables: string[];
    hasError: boolean;
}

interface IValues {
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
                logger.warn("Parsed error %s", value, err);
            }
        }

        return (Array.isArray(value) ? value : [value]).indexOf(parseOperations(left, values)) !== -1;
    },
    "||": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) || parseOperations(right, values),
};

const utils = {
    JSON,
    isEmpty,
    lodash,
    Object,
    Array,
    encodeURIComponent,
    decodeURIComponent,
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
            // @ts-ignore
            if (expression.isMember) {
                return (
                    (values.get
                        ? // @ts-ignore
                          values.get(expression.value, true)
                        : // @ts-ignore
                          values[expression.value]) || expression.value
                );
            }

            return expression.value;
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

            return (
                (values.get ? values.get(expression.name, true) : values[expression.name]) ||
                // @ts-ignore
                (expression.isMember && expression.name)
            );
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
                    logger.info(e);
                }
            }
            if (
                (expression.object.type === "ObjectExpression" ||
                    expression.object.type === "ArrayExpression" ||
                    expression.object.type === "Identifier") &&
                expression.property.type === "Identifier"
            ) {
                expression.property.name =
                    ((values.get
                        ? values.get(expression.property.name, true)
                        : values[expression.property.name]) as any) || expression.property.name;
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
