import {IClassProps} from "@essence/essence-constructor-share";
import {saveToStore, getFromStore, camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import * as React from "react";
import {useDisposable} from "mobx-react-lite";
import {getComponent} from "@essence/essence-constructor-share/components";
import {IBuilderConfig} from "@essence/essence-constructor-share/types";
import {reaction} from "mobx";

/* eslint-disable sort-keys */
const getComponentBc = (bc: IBuilderConfig) => ({
    ckParent: bc.ckParent,
    ckPageObject: bc.ckPageObject,
    ckObject: bc.ckObject,
    ckQuery: bc.ckQuery,
    cvDisplayed: "Тема",
    clearable: "false",
    datatype: "COMBO",
    displayfield: bc.displayfield || "name",
    noglobalmask: "true",
    querymode: "remote",
    records: [{name: "Темная тема", value: "dark"}, {name: "Светлая тема", value: "light"}],
    type: "IFIELD",
    getglobal: "g_sys_theme",
    setglobal: "g_sys_theme_change",
    valuefield: bc.valuefield || "value",
});
/* eslint-enable camelcase */

interface IComboClassProps extends IClassProps {
    editing?: boolean;
}

export const ThemeCombo: React.FC<IClassProps> = (props) => {
    const bc = React.useMemo(() => getComponentBc(props.bc), [props.bc]);
    const getGlobal = camelCaseMemoized(bc.getglobal);
    const setGlobal = camelCaseMemoized(bc.setglobal);
    const themeGlobal = props.pageStore.globalValues.get(getGlobal);
    const currentTheme = getFromStore("theme", themeGlobal);

    if (themeGlobal !== currentTheme) {
        props.pageStore.updateGlobalValues({
            [getGlobal]: currentTheme,
        });
    }
    useDisposable(() => {
        return reaction(
            () => props.pageStore.globalValues.get(setGlobal),
            (theme) => {
                if (theme && currentTheme !== theme) {
                    saveToStore("theme", theme);
                    document.location.reload();
                }
            },
        );
    });
    const Comp: React.ComponentType<IComboClassProps> | null = getComponent(bc.type);

    if (!Comp) {
        return null;
    }

    return <Comp {...props} bc={bc} editing />;
};
