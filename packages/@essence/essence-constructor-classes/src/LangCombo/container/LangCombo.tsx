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
import {ApplicationContext} from "@essence-community/constructor-share/context";

const getComponentBc = (bc: IBuilderConfig, defaultValue?: string): IBuilderConfig => ({
    [VAR_RECORD_DISPLAYED]: "static:4ae012ef02dd4cf4a7eafb422d1db827",
    [VAR_RECORD_OBJECT_ID]: bc[VAR_RECORD_OBJECT_ID],
    [VAR_RECORD_PAGE_OBJECT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
    [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
    [VAR_RECORD_QUERY_ID]: bc[VAR_RECORD_QUERY_ID] || "MTGetLang",
    autoload: true,
    column: bc.column || "lang",
    datatype: "combo",
    defaultvalue: defaultValue,
    displayfield: bc.displayfield || "cv_name",
    getglobal: VAR_SETTING_LANG,
    noglobalmask: true,
    setglobal: [{in: "ck_id", out: VAR_SETTING_LANG}],
    type: "IFIELD",
    valuefield: bc.valuefield || [{in: "ck_id", out: bc.column || "lang"}],
});

const getLang = () => getFromStore("lang", settingsStore.settings[VAR_SETTING_LANG]);

export const LangCombo: React.FC<IClassProps> = (props) => {
    const {pageStore} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const [currentLang, setCurrentLang] = React.useState(getLang);

    React.useEffect(() => {
        const fn = async () => {
            const curLang = getFromStore("lang") as string | undefined;

            if (curLang) {
                setCurrentLang((oldLang) => {
                    if (oldLang !== curLang) {
                        if (applicationStore) {
                            applicationStore.updateGlobalValuesAction({
                                [VAR_SETTING_LANG]: curLang || "",
                            });
                        }
                        pageStore.updateGlobalValues({
                            [VAR_SETTING_LANG]: curLang,
                        });

                        return curLang;
                    }

                    return oldLang;
                });
            }
        };

        addListenLoaded(fn);

        return () => remListenLoaded(fn);
    }, []);

    React.useEffect(() => {
        const curLang = getLang();

        if (settingsStore.settings[VAR_SETTING_LANG] !== curLang) {
            if (applicationStore) {
                applicationStore.updateGlobalValuesAction({
                    [VAR_SETTING_LANG]: curLang || "",
                });
            }
            pageStore.updateGlobalValues({
                [VAR_SETTING_LANG]: curLang,
            });
        }
    }, [applicationStore, pageStore]);

    const bc = React.useMemo(() => getComponentBc(props.bc, currentLang), [props.bc, currentLang]);

    React.useEffect(() => {
        return reaction(
            () => pageStore.globalValues.get(VAR_SETTING_LANG),
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
                    pageStore.updateGlobalValues({
                        [VAR_SETTING_LANG]: curLang,
                    });
                }
            },
        );
    }, [applicationStore, pageStore]);

    return (
        <>
            {mapComponentOne(bc, (Comp) => (
                <Comp {...props} bc={bc} />
            ))}
        </>
    );
};
