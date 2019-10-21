/* eslint default-param-last: ["warn"] */
import {forOwn} from "lodash";
import {IBuilderConfig} from "../types";
import {isEmpty} from "./base";

const DEFAULT_OVERRIDE_FIELD = [
    "confirmquestion",
    "disabled",
    "disabledrules",
    "extraplugingate",
    "filetypes",
    "getglobaltostore",
    "handler",
    "hidden",
    "hiddenrules",
    "maxfile",
    "mode",
    "modeaction",
    "redirecturl",
    "redirectusequery",
    "timeout",
    "updatequery",
    "columnsfilter",
    "filemode",
];

export interface IMergeOptions {
    exclude?: string[];
    include?: string[];
}

type KeyBuilderConfig = keyof IBuilderConfig;

export function mergeComponents<T extends Record<string, Record<string, string>>>(
    bcComponents: IBuilderConfig[] = [],
    overrides: T,
    options: IMergeOptions = {
        exclude: [],
        include: [],
    },
): {components: IBuilderConfig[]; overrides: T} {
    const {exclude = [], include = []} = options;
    const components = bcComponents.filter((component) => component.cvName && !(component.cvName in overrides));

    bcComponents.forEach((component) => {
        if (component.cvName && component.cvName in overrides) {
            const overrideComponent = overrides[component.cvName];

            /*
             * Определяем что нужно наследовать, не все параметры правильно ложатся
             * например: cv_name и cv_displayed может повлиять на отображение
             */
            forOwn(
                [...DEFAULT_OVERRIDE_FIELD, ...include]
                    .filter((value) => exclude.indexOf(value) === -1)
                    .reduce(
                        (obj, value: KeyBuilderConfig) => ({
                            ...obj,
                            [value]: component[value],
                        }),
                        {},
                    ),
                (value, key: KeyBuilderConfig) => {
                    if (!isEmpty(value)) {
                        overrideComponent[key] = value;
                    }
                },
            );
        }
    });

    return {components, overrides};
}
