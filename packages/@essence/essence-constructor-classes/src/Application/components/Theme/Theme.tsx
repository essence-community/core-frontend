import * as React from "react";
import {createTheme, useTheme, ThemeProvider as MuiThemeProvider} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import {IApplicationModel, IEssenceTheme} from "@essence-community/constructor-share/types";
import {
    isIE,
    getFromStore,
    addListenLoaded,
    remListenLoaded,
} from "@essence-community/constructor-share/utils";
import {settingsStore} from "@essence-community/constructor-share/models/SettingsModel";
import {VAR_SETTING_THEME} from "@essence-community/constructor-share/constants";
import {reaction} from "mobx";
import {merge} from "lodash";
import {getThemeDark} from "./themeDark/getThemeDark";
import {getThemeLight} from "./themeLight/getThemeLight";
import {getThemeDarkComponents} from "./themeDark/getThemeDarkComponents";
import {getThemeLightComponents} from "./themeLight/getThemeLightComponents";
import {getThemeComponentsDefault} from "./getThemeComponentsDefault";
import {getThemeIEComponents} from "./getThemeIEComponents";

interface IThemeProps {
    applicationStore: IApplicationModel;
}

const themeList = {
    dark: getThemeDark,
    light: getThemeLight,
};

const componentsList = {
    dark: getThemeDarkComponents,
    light: getThemeLightComponents,
};

function getThemeType(): "dark" | "light" | string {
    const settingTheme = settingsStore.settings[VAR_SETTING_THEME] as "dark" | "light" | string | undefined;
    const theme = getFromStore("theme") as "dark" | "light" | string | undefined;

    if (!theme && settingTheme) {
        return settingTheme;
    }

    return theme || "light";
}

export const Theme: React.FC<IThemeProps> = (props) => {
    const {applicationStore} = props;
    const materialTheme = useTheme<IEssenceTheme>();
    const [themeType, setThemeType] = React.useState(getThemeType);

    /*
     * !
     * React.useEffect(
     *     () => reaction(() => applicationStore.globalValues.get(VAR_SETTING_THEME) as "light" | "dark", setThemeType),
     *     [applicationStore.globalValues],
     * );
     */

    React.useEffect(
        () =>
            reaction(
                () => applicationStore.globalValues.get(VAR_SETTING_THEME) as "light" | "dark" | string,
                setThemeType,
            ),
        [applicationStore.globalValues],
    );

    React.useEffect(() => {
        const fn = async () => {
            const theme = getFromStore("theme") as "dark" | "light" | string | undefined;

            if (theme) {
                setThemeType(theme);
            }
        };

        addListenLoaded(fn);

        return () => remListenLoaded(fn);
    }, []);

    const theme = React.useMemo(() => {
        const getTheme = themeList[themeType] ? themeList[themeType] : themeList.light;
        const getThemeComponents = componentsList[themeType] ? componentsList[themeType] : componentsList.light;
        const themeVariables = getTheme(materialTheme);
        let components = getThemeComponents(themeVariables);

        components = merge(components, getThemeComponentsDefault(themeVariables));

        if (isIE()) {
            components = merge(components, getThemeIEComponents());
        }

        return createTheme({
            ...themeVariables,
            components,
        });
    }, [materialTheme, themeType]);

    React.useEffect(() => {
        applicationStore.updateGlobalValuesAction({[VAR_SETTING_THEME]: themeType});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [applicationStore]);

    return <MuiThemeProvider theme={theme}><ThemeProvider theme={theme}>{props.children}</ThemeProvider></MuiThemeProvider>;
};
