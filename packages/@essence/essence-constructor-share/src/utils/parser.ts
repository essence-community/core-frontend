import * as esprima from "esprima";
import memoize from "memoizee";
import {camelCaseMemoized} from "./transform";

interface IParseReturnType {
    runer: (values?: any) => any;
    variables: string[];
}

interface IValues {
    [$key: string]: string | number | boolean ;
}

interface IQuasi {
    value: {
        raw: string;
    }
}

interface IParsedItem {
    type?: string,
    operator?: "=" | "!=" | "!" | "!==" | "&&" | "+" | "<" | "==" | "===" | ">" | "in" | "||";
    expressions?: IParsedItem[];
    name?: string;
    left?: IParsedItem;
    right?: IParsedItem;
    argument?: {
        type: string;
        name: string;
    };
    prefix?: boolean;
    value?: string;
    object?: {[key: string]: string};
    property?: IParsedItem;
    properties?: IProperty[];
    elements?: IParsedItem[];
    test?: IParsedItem;
    consequent?: IParsedItem;
    alternate?: IParsedItem;
    quasis?: IQuasi[];
}

interface IProperty {
    key: IParsedItem;
    value: IParsedItem
}
interface IParsedBody {
    expression: IParsedItem
    type: string;
}

interface IToken {
    type: string;
    value: string;
}
interface IParsedSrc {
    body: IParsedBody[];
    sourceType: string;
    type: string;
    tokens?: IToken[] ; 
}

const operators: any = {
    "!": ({argument}: IParsedItem, values: {[key: string]: string}) => !parseOperations(argument, values),
    // tslint:disable-next-line
    "!=": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) != parseOperations(right, values),
    "!==": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) !== parseOperations(right, values),
    "&&": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) && parseOperations(right, values),
    "+": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) + parseOperations(right, values),
    "<": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) < parseOperations(right, values),
    // tslint:disable-next-line
    "==": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) == parseOperations(right, values),
    "===": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) === parseOperations(right, values),
    ">": ({left, right}: IParsedItem, values: {[key: string]: string}) => parseOperations(left, values) > parseOperations(right, values),
    in: ({left, right}: IParsedItem, values: {[key: string]: string}) => {
        const value = parseOperations(right, values);

        return (Array.isArray(value) ? value : [value]).indexOf(parseOperations(left, values)) !== -1;
    },
    "||": ({left, right}: any, values: any) => parseOperations(left, values) || parseOperations(right, values),
};

function parseOperations(expression: IParsedItem, values: IValues): any {
    if (!expression) {
        return null;
    }
    switch (expression.type) {
        case "UnaryExpression":
        case "BinaryExpression":
        case "LogicalExpression":
            return operators[expression.operator] ? operators[expression.operator](expression, values) : false;
        case "SequenceExpression":
            return expression.expressions.map((exp: IParsedItem) => parseOperations(exp, values));
        case "Literal":
            return expression.value;
        case "Identifier":
            return values.get
                // @ts-ignore
                ? values.get(camelCaseMemoized(expression.name))
                : values[camelCaseMemoized(expression.name)];
        case "AssignmentExpression":
            return parseOperations(expression.right, values);
        case "ObjectExpression":
            return expression.properties.reduce((acc: IValues, property: IProperty) => {
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
            return expression.expressions ? expression.expressions.reduce(
                (acc, expr, index) => `${acc}${parseOperations(expr, values)}${expression.quasis[index + 1].value.raw}`,
                expression.quasis[0].value.raw
            ) : "";
        default:
            // tslint:disable:next-line no-console
            console.error("expression not found: ", expression);

            return undefined;
    }
}

export const parse = (src: string, withTokens: boolean = false): IParseReturnType => {
    let parsedSrc: IParsedSrc = null;

    try {
        parsedSrc = esprima.parseScript(`result = ${src}`, {tokens: withTokens}) as IParsedSrc;
    } catch (error) {
        // tslint:disable:next-line no-console
        console.error("Ошбика при выполнении parse: ", error.message);

        return {
            runer: () => "Ошибка парсинга",
            variables: [],
        };
    }

    return {
        runer: (values: {[key: string]: string} = {}) =>
            parsedSrc ? parseOperations(parsedSrc.body[0].expression, values) : "Ошибка запуска",
        variables: withTokens
            ? parsedSrc.tokens
                  .filter((token: IToken) => token.type === "Identifier" && token.value !== "result")
                  .map((token: IToken) => token.value)
                  .filter((value: string, idx: number, arr: string[]) => arr.indexOf(value) === idx)
            : [],
    };
};

export const parseMemoize = memoize(parse);
