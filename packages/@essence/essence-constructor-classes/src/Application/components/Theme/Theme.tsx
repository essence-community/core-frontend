import * as React from "react";
import {ThemeProvider, createMuiTheme, useTheme} from "@material-ui/core";
import {IApplicationModel} from "@essence-community/constructor-share/types";
import {
    mergeOverridesDeep,
    isIE,
    getFromStore,
    addListenLoaded,
    remListenLoaded,
} from "@essence-community/constructor-share/utils";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {VAR_SETTING_THEME} from "@essence-community/constructor-share/constants";
import {reaction} from "mobx";
import {getThemeDark} from "./themeDark/getThemeDark";
import {getThemeLight} from "./themeLight/getThemeLight";
import {getThemeDarkOverrides} from "./themeDark/getThemeDarkOverrides";
import {getThemeLightOverrides} from "./themeLight/getThemeLightOverrides";
import {getThemeOverridesDefault} from "./getThemeOverridesDefault";
import {getThemeIEOverrides} from "./getThemeIEOverrides";

interface IThemeProps {
    applicationStore: IApplicationModel;
}

function getThemeType(): "dark" | "light" {
    const settingTheme = settingsStore.settings[VAR_SETTING_THEME] as "dark" | "light" | undefined;
    const theme = getFromStore("theme") as "dark" | "light" | undefined;

    if (!theme && settingTheme) {
        return settingTheme;
    }

    return theme || "light";
}

export const Theme: React.FC<IThemeProps> = (props) => {
    const {applicationStore} = props;
    const materialTheme = useTheme();
    const [themeType, setThemeType] = React.useState(getThemeType);

    /*
     * !
     * React.useEffect(
     *     () => reaction(() => applicationStore.globalValues.get(VAR_SETTING_THEME) as "light" | "dark", setThemeType),
     *     [applicationStore.globalValues],
     * );
     */

    React.useEffect(
        () => reaction(() => applicationStore.globalValues.get(VAR_SETTING_THEME) as "light" | "dark", setThemeType),
        [applicationStore.globalValues],
    );

    React.useEffect(() => {
        const fn = async () => {
            const theme = getFromStore("theme") as "dark" | "light" | undefined;

            if (theme) {
                setThemeType(theme);
            }
        };

        addListenLoaded(fn);

        return () => remListenLoaded(fn);
    }, []);

    const theme = React.useMemo(() => {
        const getTheme = themeType === "dark" ? getThemeDark : getThemeLight;
        const getThemeOverrides = themeType === "dark" ? getThemeDarkOverrides : getThemeLightOverrides;
        const themeVariables = getTheme(materialTheme);
        let overrides = getThemeOverrides(themeVariables);

        overrides = mergeOverridesDeep(overrides as any, getThemeOverridesDefault(themeVariables));

        if (isIE()) {
            overrides = mergeOverridesDeep(overrides as any, getThemeIEOverrides());
        }

        return createMuiTheme({
            ...themeVariables,
            overrides,
        });
    }, [materialTheme, themeType]);

    React.useEffect(() => {
        applicationStore.updateGlobalValuesAction({[VAR_SETTING_THEME]: themeType});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationStore]);

    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
