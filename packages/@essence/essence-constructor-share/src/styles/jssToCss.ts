/* eslint-disable sort-keys, max-statements */
const UNITLESS: Record<string, boolean> = {
    animationIterationCount: true,
    aspectRatio: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexShrink: true,
    fontWeight: true,
    gridArea: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnStart: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowStart: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true,
};

export type StyleSheet = Record<string, any>;

export function isPlainObject(value: unknown): value is Record<string, any> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function evalFns(value: any, props: any, name: string): any {
    if (typeof value === "function") {
        return evalFns(value(props), props, name);
    }
    if (!isPlainObject(value)) {
        return value;
    }

    const out: StyleSheet = {};

    for (const key of Object.keys(value)) {
        out[key] = evalFns(value[key], props, name);
    }


    return out;
}

export function resolveStyles(styles: any, theme: any, props: any, name: string): StyleSheet {
    let resolved = typeof styles === "function" ? styles(theme) : styles;

    if (typeof resolved === "function") {
        resolved = resolved(props);
    }
    const override = theme.components?.[name]?.styleOverrides;
    const res = evalFns(resolved, props, name) || {};
    const resOverride = override ? evalFns(override, props, name) : {};

    Object.entries(resOverride || {}).forEach(([key, value]) => {
        res[key] = Object.assign(res[key] || {}, value || {});
    });

    return res;
}

export function createClassMap(name: string, id: number, sheet: StyleSheet): Record<string, string> {
    const classes: Record<string, string> = {};

    for (const key of Object.keys(sheet)) {
        if (key === "@global") {
            continue;
        }
        classes[key] = `${name}-${key}-${id}`;
    }

    return classes;
}

function rewriteDollar(key: string, classes: Record<string, string>): string {
    return key.replace(/\$([\w-]+)/g, (_, ref: string) => (classes[ref] ? `.${classes[ref]}` : `$${ref}`));
}

function hyphenate(prop: string): string {
    return prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`).replace(/^ms-/, "-ms-");
}

function formatValue(prop: string, value: any): string {
    if (typeof value === "number" && value !== 0 && !UNITLESS[prop]) {
        return `${value}px`;
    }

    return String(value);
}

export function objectToCss(selector: string, obj: any): string {
    if (!isPlainObject(obj)) {
        return "";
    }

    const decls: string[] = [];
    const nested: string[] = [];

    for (const key of Object.keys(obj)) {
        const value = obj[key];

        if (value == null || value === false) {
            continue;
        }

        if (key === "@global") {
            if (isPlainObject(value)) {
                for (const globalSel of Object.keys(value)) {
                    nested.push(objectToCss(`${selector} ${globalSel}`, value[globalSel]));
                }
            }
            continue;
        }

        if (isPlainObject(value)) {
            if (key.charAt(0) === "@") {
                nested.push(`${key}{${objectToCss(selector, value)}}`);
            } else {
                const nestedSel = key.indexOf("&") >= 0 ? key.replace(/&/g, selector) : `${selector} ${key}`;

                nested.push(objectToCss(nestedSel, value));
            }
            continue;
        }

        decls.push(`${hyphenate(key)}:${formatValue(key, value)};`);
    }

    return (decls.length ? `${selector}{${decls.join("")}}` : "") + nested.join("");
}

function rewriteObject(obj: any, classes: Record<string, string>): any {
    if (!isPlainObject(obj)) {
        return obj;
    }

    const out: StyleSheet = {};

    for (const key of Object.keys(obj)) {
        out[rewriteDollar(key, classes)] = rewriteObject(obj[key], classes);
    }

    return out;
}

export function sheetToCss(sheet: StyleSheet, classes: Record<string, string>): string {
    let css = "";

    for (const key of Object.keys(sheet)) {
        const value = rewriteObject(sheet[key], classes);

        if (key === "@global") {
            if (isPlainObject(value)) {
                for (const sel of Object.keys(value)) {
                    css += objectToCss(sel, value[sel]);
                }
            }
            continue;
        }

        css += objectToCss(`.${classes[key]}`, value);
    }

    return css;
}
