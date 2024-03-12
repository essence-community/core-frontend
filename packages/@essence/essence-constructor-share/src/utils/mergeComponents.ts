/* eslint default-param-last: ["warn"] */
import {forOwn} from "lodash";
import {IBuilderConfig} from "../types";
import {VAR_RECORD_NAME} from "../constants";
import {isEmpty} from "./base";

const DEFAULT_OVERRIDE_FIELD: KeyBuilderConfig[] = [
    "actiongate",
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
    "readonly",
    "readonlyrules",
    "timeout",
    "updatequery",
    "columnsfilter",
    "filemode",
    "tipmsg",
    "info",
    "iconfontname",
    "iconfont",
    "activerules",
];

export interface IMergeOptions {
    exclude?: KeyBuilderConfig[];
    include?: KeyBuilderConfig[];
}

type KeyBuilderConfig = keyof IBuilderConfig;

export function mergeComponents<T extends Record<string, IBuilderConfig>>(
    bcComponents: IBuilderConfig[] = [],
    overrides: T,
    options: IMergeOptions = {
        exclude: [],
        include: [],
    },
): {components: IBuilderConfig[]; overrides: T; overridesOrigin: Record<string, IBuilderConfig>} {
    const {exclude = [], include = []} = options;
    const overridesOrigin = {} as Record<string, IBuilderConfig>;
    const components = bcComponents.filter((component) => {
        const name = component[VAR_RECORD_NAME];

        return name && !(name in overrides);
    });

    bcComponents.forEach((component) => {
        const name = component[VAR_RECORD_NAME];

        if (name && name in overrides) {
            const overrideComponent = overrides[name];

            overridesOrigin[name] = component;

            /*
             * Определяем что нужно наследовать, не все параметры правильно ложатся
             * например: cv_name и cv_displayed может повлиять на отображение
             */
            forOwn(
                [...DEFAULT_OVERRIDE_FIELD, ...include]
                    .filter((value: KeyBuilderConfig) => exclude.indexOf(value) === -1)
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

    return {components, overrides, overridesOrigin};
}
