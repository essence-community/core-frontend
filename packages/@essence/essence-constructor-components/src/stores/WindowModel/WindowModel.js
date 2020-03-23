// @flow
import {action, extendObservable} from "mobx";
import get from "lodash/get";
import noop from "lodash/noop";
import pick from "lodash/pick";
import omit from "lodash/omit";
import flattenDepth from "lodash/flattenDepth";
import {parse} from "@essence-community/constructor-share/utils/parser";
import {
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {type PageModelType} from "../PageModel";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {StoreBaseModel} from "../StoreBaseModel";
import {
    type WindowModelInterface,
    type WindowModelConstructorType,
    type WindowModelConfigType,
    type WindowSaveConfigType,
    type WindowBcType,
} from "./WindowModelTypes";

const FIELD_HOIST_ATTRIBUTES = ["required"];
const FIELD_OMIT_ATTRIBUTES_AUTOBUILD = ["width", "hiddenrules"];

const getDetailColumns = (detailBc?: Array<BuilderBaseType>) => {
    if (!detailBc) {
        return [];
    }

    return flattenDepth(
        detailBc.map((panel) =>
            panel.childs ? panel.childs.map((child) => (child.childs ? child.childs : child)) : [],
        ),
        2,
    )
        .filter((field) => field.type === "IFIELD" || field.type === "IPERIOD")
        .map((field) => omit(field, FIELD_OMIT_ATTRIBUTES_AUTOBUILD));
};

const getValidChild = (
    editors: Array<BuilderBaseType>,
    pageStore: PageModelType,
    values?: Object,
): BuilderBaseType | {} => {
    const getValue = (name) => (values && values[name] ? values[name] : pageStore.globalValues.get(name));

    const findEditor = editors.find((editor: BuilderBaseType) => {
        return !editor.activerules || parse(editor.activerules).runer({get: getValue});
    });

    // If not found fallback to first editor
    return findEditor || editors[0];
};

const getChilds = ({bc, mainStore, pageStore, values}) => {
    const columns =
        bc.edittype === "inline" && mainStore ? mainStore.gridColumns : [...(bc.columns || []), ...(bc.childs || [])];
    const fieldHoistAttributes = FIELD_HOIST_ATTRIBUTES;

    const childs = columns.map((field: Object) => {
        const fieldProps =
            field.editors && field.editors !== "false" && field.editors.length > 0
                ? getValidChild(field.editors, pageStore, values)
                : field;

        return {
            // CORE-1430: Для FieldPeriod не должно быть column: undefined
            ...(field.column ? {column: field.column} : {}),
            editmode: field.editmode,
            ...(bc.autobuild === "true" ? omit(fieldProps, FIELD_OMIT_ATTRIBUTES_AUTOBUILD) : fieldProps),
            // eslint-disable-next-line sort-keys
            [VAR_RECORD_DISPLAYED]: field[VAR_RECORD_DISPLAYED],
            edittype: bc.edittype,
            visibleinwindow: field.visibleinwindow,
            ...pick(field, fieldHoistAttributes),
            ...(bc.edittype === "inline" ? {width: "100%"} : {}),
        };
    });

    if (bc.edittype !== "inline") {
        return [...childs, ...getDetailColumns(bc.detail)];
    }

    return childs;
};

export class WindowModel extends StoreBaseModel implements WindowModelInterface {
    name = "window";

    initialValues: Object;

    cancel: boolean;

    addMore: boolean;

    windowBc: WindowBcType;

    childs: Array<BuilderBaseType>;

    btns: Array<BuilderBaseType>;

    config: $ReadOnly<WindowModelConfigType>;

    gridStore: ?GridModelType;

    constructor({bc, pageStore, mode, values}: WindowModelConstructorType) {
        super({bc, pageStore});
        // TODO: Проверить что this.bc нечего не ломает

        this.windowBc = bc;
        this.btns = bc.bottombtn || [];
        this.config = {
            mode,
        };

        this.childs = getChilds({bc, mainStore: this.getMainStore(), pageStore, values});

        extendObservable(
            this,
            {
                addMore: false,
                cancel: false,
                get gridStore() {
                    return this.getMainStore();
                },
                initialValues: values || {},
            },
            undefined,
            {deep: false},
        );
    }

    getMainStore = () => {
        for (const ckPageObjectMain of [this.bc[VAR_RECORD_MASTER_ID], this.bc[VAR_RECORD_PARENT_ID]]) {
            const store = ckPageObjectMain && this.pageStore.stores.get(ckPageObjectMain);

            if (store) {
                return store;
            }
        }

        return undefined;
    };

    closeAction = action("closeAction", () => {
        this.pageStore.windowsOne.remove(this);
        get(this.getMainStore(), "winReloadStores", noop)();
    });

    resetCancelAction = action("resetCancelAction", () => {
        this.cancel = false;
    });

    setCancelAction = action("setCancelAction", () => {
        const isSilent = this.btns.some((btn) => btn.handler === "onCloseWindowSilent");

        if (isSilent) {
            this.closeAction();
        } else {
            this.cancel = true;
        }
    });

    setAddMoreAction = action("setAddMoreAction", (event: any, value: boolean) => {
        this.addMore = value;
    });

    saveAction = action(
        "saveAction",
        // eslint-disable-next-line max-statements
        async (mode: BuilderModeType, btnBc: BuilderBaseType, {form, files}: WindowSaveConfigType) => {
            await form.validate({showErrors: true});

            const store = this.getMainStore();

            if (form.isValid && store && store.saveAction) {
                const success = await store.saveAction(form.values(), {
                    actionBc: btnBc,
                    files,
                    form,
                    mode: btnBc.modeaction || btnBc.mode || this.config.mode,
                    windowStore: this,
                });

                if (success) {
                    if (this.addMore) {
                        this.pageStore.resetStepAction();
                        this.initialValues = {};
                    } else {
                        this.closeAction();
                    }
                }

                return success;
            }

            return false;
        },
    );

    /**
     * Закрытие модального окна с сообщением
     */
    onCloseWindow = this.closeAction;

    /**
     * Закрытие модального окна без сообщения
     */
    onCloseWindowSilent = this.closeAction;

    /**
     * Сохраняем значение по кнопке "Save"
     */
    onSimpleSaveWindow = this.saveAction;

    onPrintExcel = async (mode: BuilderModeType, btnBc: BuilderBaseType, {form}: WindowSaveConfigType) => {
        await form.validate({showErrors: true});

        const store = this.getMainStore();

        if (form.isValid && store && store.onPrintExcel) {
            const success = await store.onPrintExcel(form.values(), btnBc);

            if (success) {
                this.closeAction();
            }
        }
    };
}
