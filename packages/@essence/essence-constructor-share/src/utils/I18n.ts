import i18next, {BackendModule, ReadCallback, Services, InitOptions, TFunction, WithT} from "i18next";
import {initReactI18next, withTranslation, useTranslation, Translation} from "react-i18next";
import {request} from "../request/request";
import {VAR_LANG_ID, VAR_NAMESPACE_VALUE, VAR_SETTING_LANG} from "../constants/variables";
import {snackbarStore, settingsStore} from "../models";
import {getFromStore} from "./storage";

class I18nBackend implements BackendModule {
    type: "backend" = "backend";

    services: Services;

    options: object;

    i18nextOptions: InitOptions;

    init(services: Services, backendOptions: object, i18nextOptions: InitOptions): void {
        this.services = services;
        this.options = backendOptions;
        this.i18nextOptions = i18nextOptions;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    create(): void {}

    read(languages: string, namespaces: string, callback: ReadCallback) {
        request({
            json: {
                filter: {
                    [VAR_LANG_ID]: languages,
                    [VAR_NAMESPACE_VALUE]: namespaces,
                },
            },
            list: false,
            query: "MTGetLocale",
        })
            .then((res: any) => {
                if (snackbarStore.checkValidResponseAction(res) && res) {
                    callback(null, res);

                    return;
                }
                callback(null, {});
            })
            .catch((error) => {
                snackbarStore.checkExceptResponse(error);
                callback(null, {});
            });
    }
}

export function initI18n() {
    const defaultLng = settingsStore.settings[VAR_SETTING_LANG];
    const lang = getFromStore<string>("lang", defaultLng);

    i18next
        .use(new I18nBackend())
        .use(initReactI18next)
        .init({
            defaultNS: "meta",
            fallbackLng: defaultLng,
            initImmediate: true,
            interpolation: {
                escapeValue: false,
            },
            lng: lang,
            ns: ["meta", "message"],
            react: {
                bindI18n: "languageChanged loaded",
            },
        });
    // @ts-ignore
    window.i18next = i18next;
}

export {i18next, TFunction, WithT, withTranslation, useTranslation, Translation};
