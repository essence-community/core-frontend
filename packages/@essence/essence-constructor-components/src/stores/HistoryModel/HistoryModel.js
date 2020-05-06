// @flow
import {extendObservable, action} from "mobx";
import isUndefined from "lodash/isUndefined";
import groupBy from "lodash/groupBy";
import {VALUE_SELF_FIRST} from "@essence-community/constructor-share/constants";
import {type BuilderModeType, type BuilderBaseType} from "../../BuilderType";
import {mergeComponents} from "../../utils/builder";
import {type RecordsModelType, RecordsModel} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {
    getHistoryAddButtonConfig,
    getBtnAuditConfig,
    getHistoryEditButtonConfig,
    getHistoryCloneButtonConfig,
    getHistoryLeftButtonConfig,
    getHistoryRefreshButtonConfig,
    getHistoryRemoveButtonConfig,
    getHistoryRightButtonConfig,
    getSaveBtnConfig,
    getCancelBtnConfig,
} from "./HistoryModelBtnConfigs";
import {
    type HistoryModelInterface,
    type HistoryPanelBtnsConfigType,
    type BuilderHistoryBcType,
} from "./HistoryModelTypes";

export class HistoryModel extends StoreBaseModel implements HistoryModelInterface {
    recordsStore: RecordsModelType;

    editing: boolean;

    bc: BuilderHistoryBcType;

    mode: BuilderModeType;

    selectedRecord: Object | null;

    btnsConfig: HistoryPanelBtnsConfigType;

    constructor(props: StoreBaseModelPropsType) {
        super(props);

        const recordsStore = new RecordsModel({defaultvalue: VALUE_SELF_FIRST, ...this.bc}, this.pageStore);

        this.recordsStore = recordsStore;
        this.btnsConfig = this.getBtnsConfig(this.bc);

        extendObservable(this, {
            editing: false,
            mode: "1",
            get selectedRecord() {
                return recordsStore.selectedRecord;
            },
        });
    }

    getBtnsConfig = (bc: BuilderHistoryBcType): HistoryPanelBtnsConfigType => {
        const {components, overrides} = mergeComponents(bc.topbtn, {
            "Override Add Button": getHistoryAddButtonConfig(bc),
            "Override Audit Button": getBtnAuditConfig(bc),
            "Override Cancel Button": getCancelBtnConfig(bc),
            "Override Clone Button": getHistoryCloneButtonConfig(bc),
            "Override Delete Button": getHistoryRemoveButtonConfig(bc),
            "Override Edit Button": getHistoryEditButtonConfig(bc),
            "Override Left Button": getHistoryLeftButtonConfig(bc),
            "Override Refresh Button": getHistoryRefreshButtonConfig(bc),
            "Override Right Button": getHistoryRightButtonConfig(bc),
            "Override Save Button": getSaveBtnConfig(bc),
        });

        const {BTN = [], BTNCOLLECTOR} = groupBy(components, "type");

        return {btns: BTN, btnsCollector: BTNCOLLECTOR, overrides};
    };

    defaultHandlerBtnAction = action(
        "defaultHandlerBtnAction",
        // eslint-disable-next-line default-param-last
        (mode: BuilderModeType = "1", bc: BuilderBaseType, {files, form} = {}) => {
            switch (mode) {
                case "1":
                    return this.addAction();
                case "2":
                    return this.editAction();
                case "3":
                case "4":
                    return this.recordsStore.saveAction(this.recordsStore.records[0], bc.modeaction || mode, {
                        actionBc: bc,
                        form,
                        query: bc.updatequery,
                    });
                case "6":
                    return this.cloneAction();
                case "7":
                    return this.recordsStore.downloadAction(this.recordsStore.records[0], bc.modeaction || mode, {
                        actionBc: bc,
                        form,
                        query: bc.updatequery,
                    });
                case "8":
                    return this.recordsStore.saveAction(this.recordsStore.records[0], bc.modeaction || mode, {
                        actionBc: bc,
                        files,
                        form,
                        query: bc.updatequery,
                    });
                default:
                    return false;
            }
        },
    );

    // eslint-disable-next-line default-param-last
    updateBtnAction = (mode: BuilderModeType = "1", bc: Object, obj: Object) =>
        this.defaultHandlerBtnAction(mode, bc, obj);

    reloadStoreAction = action("reloadStoreAction", async () => {
        await this.recordsStore.loadRecordsAction();
        await this.recordsStore.setFirstRecord();
    });

    clearStoreAction = action("clearStoreAction", () => {
        this.recordsStore.clearChildsStoresAction();
    });

    addAction = action("addAction", () => {
        this.mode = "1";
        this.recordsStore.setSelectionAction();
        this.editing = true;
    });

    editAction = action("editAction", () => {
        this.mode = "2";
        this.editing = true;
    });

    cloneAction = action("cloneAction", () => {
        this.mode = "6";
        this.editing = true;
    });

    saveAction = action("saveAction", async (mode: BuilderModeType, btnBc: BuilderBaseType, {form}: {form: Form}) => {
        await form.validate();

        if (!form.isValid) {
            return false;
        }

        const result = await this.recordsStore.saveAction(form.values, btnBc.modeaction || this.mode, {
            actionBc: btnBc,
            form,
            query: btnBc.updatequery,
        });

        if (result) {
            this.editing = false;
        }

        return result;
    });

    closeAction = action("closeAction", () => {
        this.recordsStore.setFirstRecord();
        this.editing = false;
    });

    removeRecordAction = action("removeRecordAction", async (mode: BuilderModeType, btnBc: BuilderBaseType) => {
        const result = await this.recordsStore.removeSelectedRecordAction({
            actionBc: btnBc,
        });

        if (result) {
            this.recordsStore.setFirstRecord();
        }
    });

    handleNextStepAction = action("handleNextStepAction", () => {
        if (!this.hidden && !this.disabled) {
            setTimeout(() => {
                this.addAction();
            });
        }
    });

    loadRecordsAction = action("loadRecordsAction", async () => {
        await this.recordsStore.loadRecordsAction();

        if (isUndefined(this.recordsStore.selectedRecordId)) {
            this.recordsStore.setFirstRecord();
        }
    });

    setNextRecord = () => this.recordsStore.setNextRecord();

    setPrevRecord = () => this.recordsStore.setPrevRecord();

    // Закрытие окна редактрования, приходит из метамодели
    onCloseWindow = this.closeAction;

    // Сохранения данных, приходит из метамодели
    onSimpleSave = this.saveAction;
}
