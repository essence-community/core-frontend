import {IClassProps} from "@essence-community/constructor-share";
import {settingsStore} from "@essence-community/constructor-share/models";
import {
    saveToStore,
    getFromStore,
    i18next,
    addListenLoaded,
    remListenLoaded,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_SETTING_LANG,
} from "@essence-community/constructor-share/constants/variables";
import * as React from "react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {reaction} from "mobx";

const getLang = () => getFromStore("lang", settingsStore.settings[VAR_SETTING_LANG]);
const getComponentBc = (bc: IBuilderConfig, lang = getLang()): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:4ae012ef02dd4cf4a7eafb422d1db827",
    [VAR_RECORD_OBJECT_ID]: bc[VAR_RECORD_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
    [VAR_RECORD_QUERY_ID]: bc[VAR_RECORD_QUERY_ID] || "MTGetLang",
    autoload: true,
    column: bc.column || "cv_sys_lang",
    datatype: "combo",
    defaultvalue: lang,
    displayfield: bc.displayfield || "cv_name",
    idproperty: "ck_id",
    initvalue: lang,
    noglobalmask: true,
    querymode: "remote",
    readonly: false,
    setglobal: [{in: "ck_id", out: VAR_SETTING_LANG}],
    type: "IFIELD",
    valuefield: bc.valuefield || [{in: "ck_id"}],
});

export const LangCombo: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;
    const {applicationStore} = pageStore;
    // eslint-disable-next-line no-unused-vars
    const [, setCurrentLang] = React.useState(getLang);
    const bc = React.useMemo(() => getComponentBc(props.bc), [props.bc]);

    React.useEffect(() => {
        const fn = async () => {
            const curLang = bc.initvalue;

            if (curLang) {
                setCurrentLang((oldLang) => {
                    if (oldLang !== curLang) {
                        if (applicationStore) {
                            applicationStore.updateGlobalValuesAction({
                                [VAR_SETTING_LANG]: curLang || "",
                            });
                        } else {
                            pageStore.updateGlobalValues({
                                [VAR_SETTING_LANG]: curLang,
                            });
                        }

                        return curLang;
                    }

                    return oldLang;
                });
            }
        };

        addListenLoaded(fn);

        return () => remListenLoaded(fn);
    }, [applicationStore, bc.initvalue, pageStore]);

    React.useEffect(() => {
        const curLang = bc.initvalue;

        if (settingsStore.settings[VAR_SETTING_LANG] !== curLang) {
            if (applicationStore) {
                applicationStore.updateGlobalValuesAction({
                    [VAR_SETTING_LANG]: curLang || "",
                });
            } else {
                pageStore.updateGlobalValues({
                    [VAR_SETTING_LANG]: curLang,
                });
            }
        }
    }, [applicationStore, bc.initvalue, pageStore]);

    React.useEffect(() => {
        if (!pageStore.globalValues.get(VAR_SETTING_LANG)) {
            const curLang = bc.initvalue;

            pageStore.updateGlobalValues({
                [VAR_SETTING_LANG]: curLang,
            });
        }

        return reaction(
            () => pageStore.globalValues.get(VAR_SETTING_LANG),
            (lang: string) => {
                const curLang = getLang();

                if (lang && curLang !== lang) {
                    saveToStore("lang", lang);
                    setCurrentLang(lang);
                    i18next.changeLanguage(lang);
                    if (applicationStore) {
                        applicationStore.updateGlobalValuesAction({
                            [VAR_SETTING_LANG]: curLang || "",
                        });
                    }
                }
            },
            {
                fireImmediately: true,
            },
        );
    }, [applicationStore, bc.initvalue, pageStore]);

    return (
        <>
            {mapComponentOne(bc, (Comp) => (
                <Comp {...props} bc={bc} />
            ))}
        </>
    );
};
