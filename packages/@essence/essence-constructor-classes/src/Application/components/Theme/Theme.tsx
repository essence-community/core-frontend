import * as React from "react";
import {ThemeProvider, createMuiTheme, useTheme} from "@material-ui/core";
import {IApplicationModel} from "@essence-community/constructor-share/types";
import {mergeOverridesDeep, isIE, getFromStore} from "@essence-community/constructor-share/utils";
import {getThemeDark} from "./themeDark/getThemeDark";
import {getThemeLight} from "./themeLight/getThemeLight";
import {getThemeDarkOverrides} from "./themeDark/getThemeDarkOverrides";
import {getThemeLightOverrides} from "./themeLight/getThemeLightOverrides";
import {getThemeOverridesDefault} from "./getThemeOverridesDefault";
import {getThemeIEOverrides} from "./getThemeIEOverrides";

interface IThemeProps {
    applicationStore: IApplicationModel;
}

export const Theme: React.FC<IThemeProps> = (props) => {
    const materialTheme = useTheme();
    /*
     * !
     * const [themeType, setThemeType] = React.useState(
     *     applicationStore.globalValues.get(VAR_SETTING_THEME) as "light" | "dark",
     * );
     * React.useEffect(
     *     () => reaction(() => applicationStore.globalValues.get(VAR_SETTING_THEME) as "light" | "dark", setThemeType),
     *     [applicationStore.globalValues],
     * );
     */

    const theme = React.useMemo(() => {
        const themeType = getFromStore("theme");
        const getTheme = themeType === "dark" ? getThemeDark : getThemeLight;
        const getThemeOverrides = themeType === "dark" ? getThemeDarkOverrides : getThemeLightOverrides;
        const themeVariables = getTheme(materialTheme);
        let overrides = getThemeOverrides(themeVariables);

        overrides = mergeOverridesDeep(overrides, getThemeOverridesDefault(themeVariables));

        if (isIE()) {
            overrides = mergeOverridesDeep(overrides, getThemeIEOverrides());
        }

        return createMuiTheme({
            ...themeVariables,
            overrides,
        });
    }, [materialTheme]);

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
