// @flow
import {action, extendObservable} from "mobx";
import get from "lodash/get";
import noop from "lodash/noop";
import {VAR_RECORD_MASTER_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {getWindowChilds} from "@essence-community/constructor-share/utils";
import {type BuilderBaseType, type BuilderModeType} from "../../BuilderType";
import {StoreBaseModel} from "../StoreBaseModel";
import {
    type WindowModelInterface,
    type WindowModelConstructorType,
    type WindowModelConfigType,
    type WindowSaveConfigType,
    type WindowBcType,
} from "./WindowModelTypes";

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

        this.childs = getWindowChilds({
            pageStore,
            values,
            windowBc: bc,
        });

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
                const success = await store.saveAction(
                    form.values,
                    btnBc.modeaction || btnBc.mode || this.config.mode || this.bc.mode,
                    {
                        actionBc: btnBc,
                        files,
                        form,
                        windowStore: this,
                    },
                );

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
            const success = await store.onPrintExcel(form.values, btnBc);

            if (success) {
                this.closeAction();
            }
        }
    };
}
