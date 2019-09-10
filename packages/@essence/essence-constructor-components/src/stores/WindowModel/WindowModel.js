// @flow
import {action, extendObservable} from "mobx";
import get from "lodash/get";
import noop from "lodash/noop";
import pick from "lodash/pick";
import omit from "lodash/omit";
import flattenDepth from "lodash/flattenDepth";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {type GridModelType} from "../GridModel/GridModelType";
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
        detailBc.map(
            (panel) => (panel.childs ? panel.childs.map((child) => (child.childs ? child.childs : child)) : []),
        ),
        2,
    )
        .filter((field) => field.type === "IFIELD" || field.type === "IPERIOD")
        .map((field) => omit(field, FIELD_OMIT_ATTRIBUTES_AUTOBUILD));
};

const getChilds = ({bc, gridStore}) => {
    const columns =
        bc.edittype === "inline" && gridStore ? gridStore.gridColumns : [...(bc.columns || []), ...(bc.childs || [])];
    const fieldHoistAttributes = FIELD_HOIST_ATTRIBUTES;

    const childs = columns.map((field: Object) => {
        const fieldProps =
            field.editors && field.editors !== "false" && field.editors.length > 0 ? field.editors[0] : field;

        return {
            column: field.column,
            editmode: field.editmode,
            ...(bc.autobuild === "true" ? omit(fieldProps, FIELD_OMIT_ATTRIBUTES_AUTOBUILD) : fieldProps),
            // eslint-disable-next-line sort-keys
            cvDisplayed: field.cvDisplayed,
            edittype: bc.edittype,
            visibileinwindow: field.visibileinwindow,
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

    gridStore: ?GridModelType;

    btns: Array<BuilderBaseType>;

    config: $ReadOnly<WindowModelConfigType>;

    constructor({bc, gridStore, pageStore, mode, values}: WindowModelConstructorType) {
        super({bc, pageStore});
        // TODO: Проверить что this.bc нечего не ломает

        this.windowBc = bc;
        this.gridStore = gridStore;
        this.btns = bc.bottombtn || [];
        this.config = {
            mode,
        };

        this.childs = getChilds({bc, gridStore});

        extendObservable(
            this,
            {
                addMore: false,
                cancel: false,
                initialValues: values || {},
            },
            undefined,
            {deep: false},
        );
    }

    closeAction = action("closeAction", () => {
        this.pageStore.windowsOne.remove(this);
        get(this.gridStore, "winReloadStores", noop)();
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
        async (mode: BuilderModeType, btnBc: BuilderBaseType, {form, files}: WindowSaveConfigType) => {
            await form.validate({showErrors: true});

            if (form.isValid && this.gridStore) {
                const success = await this.gridStore.saveAction(form.values(), {
                    actionBc: btnBc,
                    files,
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

    onUpdateModule = async (mode: BuilderModeType, btnBc: BuilderBaseType, props: WindowSaveConfigType) => {
        const {form} = props;

        await form.validate({showErrors: true});

        if (form.isValid && this.gridStore) {
            const success = await this.gridStore.onUpdateModule(
                btnBc.modeaction || btnBc.mode || this.config.mode,
                btnBc,
                {...props, values: props.form.values()},
            );

            if (success) {
                if (this.addMore) {
                    this.pageStore.resetStepAction();
                    this.initialValues = {};
                } else {
                    this.closeAction();
                }
            }
        }
    };

    /**
     * Закрытие модального окна с сообщением
     */
    onCloseWindow = this.closeAction;

    /**
     * Закрытие модального окна без сообщения
     */
    onCloseWindowSilent = this.closeAction;

    /**
     * Сохраняем значение по кнопке "Сохранить"
     */
    onSimpleSaveWindow = this.saveAction;

    onPrintExcel = async (mode: BuilderModeType, btnBc: BuilderBaseType, {form}: WindowSaveConfigType) => {
        await form.validate({showErrors: true});

        if (form.isValid && this.gridStore) {
            const success = await this.gridStore.onPrintExcel(form.values(), btnBc);

            if (success) {
                this.closeAction();
            }
        }
    };
}
