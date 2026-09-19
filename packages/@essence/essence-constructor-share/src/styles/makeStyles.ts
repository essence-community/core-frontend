import {useTheme} from "@mui/material/styles";
import {createClassMap, resolveStyles, sheetToCss} from "./jssToCss";

export type StyleRules<Props extends object = object, ClassKey extends string = string> = Record<
    ClassKey,
    any | ((props: Props) => any)
>;

type Styles<Theme, Props extends object, ClassKey extends string> =
    | StyleRules<Props, ClassKey>
    | ((theme: Theme) => StyleRules<Props, ClassKey> | ((props: Props) => StyleRules<Props, ClassKey>));

interface IMakeStylesOptions {
    name?: string;
}

let instanceId = 0;

function upsertStyleTag(id: string, cssText: string): void {
    if (typeof document === "undefined") {
        return;
    }

    let el = document.getElementById(id) as HTMLStyleElement | null;

    if (!el) {
        el = document.createElement("style");
        el.id = id;
        document.head.appendChild(el);
    }

    if (el.textContent !== cssText) {
        el.textContent = cssText;
    }
}

export function makeStyles<Theme = any, Props extends object = any, ClassKey extends string = string>(
    styles: Styles<Theme, Props, ClassKey>,
    options: IMakeStylesOptions = {},
): (props?: Props) => Record<ClassKey, string> {
    const id = ++instanceId;
    const name = options.name || "makeStyles";
    const styleId = `essence-styles-${name}-${id}`;

    return function useStyles(props?: Props): Record<ClassKey, string> {
        const theme = useTheme<Theme>();
        const sheet = resolveStyles(styles, theme, props);
        const classes = createClassMap(name, id, sheet) as Record<ClassKey, string>;

        upsertStyleTag(styleId, sheetToCss(sheet, classes));

        return classes;
    };
}
