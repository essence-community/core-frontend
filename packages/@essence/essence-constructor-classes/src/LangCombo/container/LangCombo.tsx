import {IClassProps} from "@essence-community/constructor-share";
import {settingsStore} from "@essence-community/constructor-share/models";
import {saveToStore, getFromStore, i18next} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_SETTING_LANG,
} from "@essence-community/constructor-share/constants/variables";
import * as React from "react";
import {useDisposable} from "mobx-react-lite";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {reaction} from "mobx";
import {ApplicationContext} from "@essence-community/constructor-share/context";

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
    datatype: "combo",
    defaultvalue: defaultValue,
    displayfield: bc.displayfield || "cv_name",
    getglobal: VAR_SETTING_LANG,
    noglobalmask: "true",
    querymode: "remote",
    setglobal: VAR_SETTING_LANG,
    type: "IFIELD",
    valuefield: bc.valuefield || "ck_id",
});

const getLang = () => getFromStore("lang", settingsStore.settings[VAR_SETTING_LANG]);

interface IComboClassProps extends IClassProps {
    editing?: boolean;
}

export const LangCombo: React.FC<IClassProps> = (props) => {
    const applicationStore = React.useContext(ApplicationContext);
    const [currentLang, setCurrentLang] = React.useState(getLang);

    React.useEffect(() => {
        const curLang = getLang();

        if (settingsStore.settings[VAR_SETTING_LANG] !== curLang) {
            if (applicationStore) {
                applicationStore.updateGlobalValuesAction({
                    [VAR_SETTING_LANG]: curLang || "",
                });
            }
            props.pageStore.updateGlobalValues({
                [VAR_SETTING_LANG]: curLang,
            });
        }
    }, [applicationStore, props.pageStore]);

    const bc = React.useMemo(() => getComponentBc(props.bc, currentLang), [props.bc, currentLang]);

    useDisposable(() => {
        return reaction(
            () => props.pageStore.globalValues.get(bc.setglobal),
            (lang: string) => {
                const curLang = getLang();

                if (lang && curLang !== lang) {
                    saveToStore("lang", lang);
                    setCurrentLang(lang);
                    i18next.changeLanguage(lang);
                } else if (!lang) {
                    if (applicationStore) {
                        applicationStore.updateGlobalValuesAction({
                            [VAR_SETTING_LANG]: curLang || "",
                        });
                    }
                    props.pageStore.updateGlobalValues({
                        [bc.getglobal]: curLang,
                    });
                }
            },
        );
    });

    return (
        <>
            {mapComponentOne(bc, (Comp) => (
                <Comp {...props} bc={bc} />
            ))}
        </>
    );
};
