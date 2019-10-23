// @flow
import forOwn from "lodash/forOwn";
import isEmptyLodash from "lodash/isEmpty";
import {isEmpty} from "../utils/base";
import {type PageModelType} from "../stores/PageModel";
import {type RecordsModelType, getMasterObject, getMasterData} from "../stores/RecordsModel";
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
    "cnOrder",
];

export type TMergeOptions = {
    exclude?: Array<string>,
    include?: Array<string>,
};

export function mergeComponents<T: Object>(
    bcComponents: Array<Object> = [],
    overrides: T,
    options: TMergeOptions = {
        exclude: [],
        include: [],
    },
): {components: Array<Object>, overrides: T} {
    const {exclude = [], include = []} = options;
    const components = bcComponents.filter((component) => !(component.cvName in overrides));

    bcComponents.forEach((component) => {
        if (component.cvName in overrides) {
            const overrideComponent = overrides[component.cvName];

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

    if (bc.autoload === "true" && (isEmpty(bc.ckMaster) || bc.reqsel !== "true")) {
        return true;
    }

    if (!isEmpty(bc.ckMaster) && bc.autoload === "true") {
        return !isEmptyLodash(
            getMasterData(getMasterObject(bc.ckMaster, pageStore), bc.idproperty || "ck_id", pageStore.globalValues),
        );
    }

    return false;
}
