import {IClassProps} from "@essence/essence-constructor-share";
import {
    saveToStore,
    getFromStore,
    camelCaseMemoized,
    useTranslation,
    TFunction,
} from "@essence/essence-constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence/essence-constructor-share/constants/variables";
import * as React from "react";
import {useDisposable} from "mobx-react-lite";
import {getComponent} from "@essence/essence-constructor-share/components";
import {IBuilderConfig} from "@essence/essence-constructor-share/types";
import {reaction} from "mobx";

/* eslint-disable sort-keys */
const getComponentBc = (bc: IBuilderConfig, trans: TFunction) => ({
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_OBJECT_ID]: bc[VAR_RECORD_OBJECT_ID],
    [VAR_RECORD_QUERY_ID]: bc[VAR_RECORD_QUERY_ID],
    [VAR_RECORD_DISPLAYED]: "0b5e4673fa194e16a0c411ff471d21d2",
    clearable: "false",
    datatype: "COMBO",
    displayfield: bc.displayfield || "name",
    noglobalmask: "true",
    querymode: "remote",
    records: [
        {name: trans("66ef0068472a4a0394710177f828a9b1"), value: "dark"},
        {name: trans("fd7c7f3539954cc8a55876e3514906b5"), value: "light"},
    ],
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
    const [trans] = useTranslation("meta");
    const bc = React.useMemo(() => getComponentBc(props.bc, trans), [props.bc, trans]);
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
