// @flow
import {getFromStore} from "@essence-community/constructor-share/utils";
import isFunction from "lodash/isFunction";
import merge from "lodash/merge";

const styleTheme = getFromStore("theme", "light");

type ThemeStylesType = {
    dark?: Object,
    light?: Object,
};

export const getThemeStyles = (themeStylesConfig: ThemeStylesType, defaultStyles?: Object = {}) => {
    const styles = themeStylesConfig[styleTheme];

    return (theme: Object) =>
        merge(
            {},
            isFunction(styles) ? styles(theme) : styles,
            isFunction(defaultStyles) ? defaultStyles(theme) : defaultStyles,
        );
};
