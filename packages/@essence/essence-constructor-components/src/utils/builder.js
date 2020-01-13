// @flow
import forOwn from "lodash/forOwn";
import isEmptyLodash from "lodash/isEmpty";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_NAME, VAR_RECORD_CN_ORDER} from "@essence/essence-constructor-share/constants";
import {getMasterObject} from "@essence/essence-constructor-share/utils";
import {isEmpty} from "../utils/base";
import {type PageModelType} from "../stores/PageModel";
import {type RecordsModelType} from "../stores/RecordsModel";
import {type BuilderBaseType} from "../BuilderType";

type CheckAutoloadPropsType = {
    bc: BuilderBaseType,
    pageStore: PageModelType,
    recordsStore?: RecordsModelType,
};

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
    VAR_RECORD_CN_ORDER,
];

export type TMergeOptions = {
    exclude?: Array<string>,
    include?: Array<string>,
};

export function mergeComponents<T: Object>(
    // eslint-disable-next-line default-param-last
    bcComponents: Array<Object> = [],
    overrides: T,
    options: TMergeOptions = {
        exclude: [],
        include: [],
    },
): {components: Array<Object>, overrides: T} {
    const {exclude = [], include = []} = options;
    const components = bcComponents.filter((component) => !(component[VAR_RECORD_NAME] in overrides));

    bcComponents.forEach((component) => {
        if (component[VAR_RECORD_NAME] in overrides) {
            const overrideComponent = overrides[component[VAR_RECORD_NAME]];

            /*
             * Определяем что нужно наследовать, не все параметры правильно ложатся
             * например: cv_name и cv_displayed может повлиять на отображение
             */
            forOwn(
                [...DEFAULT_OVERRIDE_FIELD, ...include]
                    .filter((value) => exclude.indexOf(value) === -1)
                    .reduce(
                        (obj, value) => ({
                            ...obj,
                            [value]: component[value],
                        }),
                        {},
                    ),
                (value, key) => {
                    if (!isEmpty(value)) {
                        overrideComponent[key] = value;
                    }
                },
            );
        }
    });

    return {components, overrides};
}

export function checkAutoload({bc, pageStore, recordsStore}: CheckAutoloadPropsType) {
    if (!recordsStore || bc.datatype === "tree" || bc.datatype === "grid") {
        return false;
    }

    if (bc.autoload === "true" && (isEmpty(bc[VAR_RECORD_MASTER_ID]) || bc.reqsel !== "true")) {
        return true;
    }

    if (!isEmpty(bc[VAR_RECORD_MASTER_ID]) && bc.autoload === "true") {
        return !isEmptyLodash(getMasterObject(bc[VAR_RECORD_MASTER_ID], pageStore, bc.getmastervalue));
    }

    return false;
}
