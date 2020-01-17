import {IClassProps} from "@essence-community/constructor-share";
import {settingsStore} from "@essence-community/constructor-share/models";
import {saveToStore, getFromStore, i18next} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants/variables";
import * as React from "react";
import {useDisposable} from "mobx-react-lite";
import {getComponent} from "@essence-community/constructor-share/components";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {reaction} from "mobx";

const GLOBAL_VALUE = "g_sys_lang";

const getComponentBc = (bc: IBuilderConfig, defaultValue?: string) => ({
    [VAR_RECORD_DISPLAYED]: "static:4ae012ef02dd4cf4a7eafb422d1db827",
    [VAR_RECORD_OBJECT_ID]: bc[VAR_RECORD_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
    [VAR_RECORD_QUERY_ID]: bc[VAR_RECORD_QUERY_ID],
    [VAR_RECORD_QUERY_ID]: "MTGetLang",
    autoload: "true",
    clearable: "false",
    column: bc.column || "lang",
    datatype: "COMBO",
    defaultvalue: defaultValue,
    displayfield: bc.displayfield || "cv_name",
    getglobal: GLOBAL_VALUE,
    noglobalmask: "true",
    querymode: "remote",
    setglobal: GLOBAL_VALUE,
    type: "IFIELD",
    valuefield: bc.valuefield || "ck_id",
});

interface IComboClassProps extends IClassProps {
    editing?: boolean;
}

export const LangCombo: React.FC<IClassProps> = (props) => {
    const langGlobal = settingsStore.settings[GLOBAL_VALUE];
    let currentLang = getFromStore("lang", langGlobal);

    if (langGlobal !== currentLang) {
        props.pageStore.updateGlobalValues({
            [GLOBAL_VALUE]: currentLang,
        });
    }
    const bc = React.useMemo(() => getComponentBc(props.bc, currentLang), [props.bc, currentLang]);

    useDisposable(() => {
        return reaction(
            () => props.pageStore.globalValues.get(bc.setglobal),
            (lang: string) => {
                if (lang && currentLang !== lang) {
                    saveToStore("lang", lang);
                    currentLang = lang;
                    i18next.changeLanguage(lang);
                } else if (!lang) {
                    props.pageStore.updateGlobalValues({
                        [bc.getglobal]: currentLang,
                    });
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
