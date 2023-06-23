import i18next, {BackendModule, ReadCallback, Services, InitOptions, TFunction, WithT} from "i18next";
import {initReactI18next, withTranslation, useTranslation, Translation} from "react-i18next";
import Backend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import {request} from "../request/request";
import {VAR_LANG_ID, VAR_NAMESPACE_VALUE, VAR_SETTING_LANG} from "../constants/variables";
import {snackbarStore} from "../models/SnackbarModel";
import {settingsStore} from "../models/SettingsModel";
import {getFromStore, addListenLoaded} from "./storage";

const ENABLE_CACHE = false;

class I18nBackend implements BackendModule {
    type: "backend" = "backend";

    services: Services;

    options: Record<string, any>;

    i18nextOptions: InitOptions;

    init(services: Services, backendOptions: Record<string, any>, i18nextOptions: InitOptions): void {
        this.services = services;
        this.options = backendOptions;
        this.i18nextOptions = i18nextOptions;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    create(): void {}

    read(languages: string, namespaces: string, callback: ReadCallback) {
        callback(null, {});
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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    this.services.resourceStore.addResourceBundle(languages, namespaces, res);

                    return;
                }
            })
            .catch((error) => {
                snackbarStore.checkExceptResponse(error);
            });
    }
}

export function initI18n() {
    const defaultLng = settingsStore.settings[VAR_SETTING_LANG];
    const lang = getFromStore<string>("lang", defaultLng);

    i18next
        .use(Backend)
        .use(initReactI18next)
        .init({
            backend: {
                backendOptions: ENABLE_CACHE ? [{}, {}] : [{}],
                backends: ENABLE_CACHE ? [LocalStorageBackend, I18nBackend] : [I18nBackend],
            },
            defaultNS: "meta",
            fallbackLng: defaultLng,
            initImmediate: true,
            interpolation: {
                escapeValue: false,
            },
            lng: lang,
            ns: ["meta", "message", "static"],
            react: {
                bindI18n: "languageChanged loaded",
            },
        });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.i18next = i18next;
    addListenLoaded(async () => {
        const defaultLng = settingsStore.settings[VAR_SETTING_LANG];
        const lang = getFromStore<string>("lang", defaultLng);

        i18next.changeLanguage(lang!);
    });
}

export {i18next, TFunction, WithT, withTranslation, useTranslation, Translation};
