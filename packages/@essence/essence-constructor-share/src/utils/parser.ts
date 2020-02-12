/* eslint-disable @typescript-eslint/no-use-before-define, no-use-before-define */
import * as esprima from "esprima";
// eslint-disable-next-line import/no-extraneous-dependencies, import/extensions, import/no-unresolved
import {Expression, Property, Pattern, Super, LogicalExpression, UnaryExpression} from "estree";
import memoize from "memoizee";
import {FieldValue} from "../types";
import {loggerRoot} from "../constants";
import {i18next} from "./I18n";

interface IGetValue {
    get: (key: string) => FieldValue;
}

export interface IParseReturnType {
    runer: (values?: Record<string, FieldValue> | IGetValue) => undefined | string | boolean | number;
    variables: string[];
}

interface IValues {
    get?($key: string): FieldValue;
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
        const value = parseOperations(right, values);

        return (Array.isArray(value) ? value : [value]).indexOf(parseOperations(left, values)) !== -1;
    },
    "||": ({left, right}: LogicalExpression, values: IValues) =>
        parseOperations(left, values) || parseOperations(right, values),
};

function parseOperations(expression: Expression | Pattern | Super, values: IValues): any {
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
            return expression.value;
        case "Identifier":
            return values.get ? values.get(expression.name) : values[expression.name];
        case "AssignmentExpression":
            return parseOperations(expression.right, values);
        case "ObjectExpression":
            return expression.properties.reduce((acc: IValues, property: Property) => {
                acc[parseOperations(property.key, values)] = parseOperations(property.value, values);

                return acc;
            }, {});
        case "ArrayExpression":
            return expression.elements.map((element: any) => parseOperations(element, values));
        case "ConditionalExpression":
            return parseOperations(expression.test, values)
                ? parseOperations(expression.consequent, values)
                : parseOperations(expression.alternate, values);
        case "MemberExpression":
            return parseOperations(expression.object, values)[parseOperations(expression.property, values)];
        case "TemplateLiteral":
            return expression.expressions
                ? expression.expressions.reduce(
                      (acc, expr, index) =>
                          `${acc}${parseOperations(expr, values)}${expression.quasis[index + 1].value.raw}`,
                      expression.quasis[0].value.raw,
                  )
                : "";
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
            runer: () => String(i18next.t("static:4b067f4b55154c46b0a8d6b34d4d9bfb")),
            variables: [],
        };
    }

    return {
        runer: (values: IValues = {}) => {
            // @ts-ignore
            const expression = parsedSrc ? parsedSrc.body[0].expression : undefined;

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
