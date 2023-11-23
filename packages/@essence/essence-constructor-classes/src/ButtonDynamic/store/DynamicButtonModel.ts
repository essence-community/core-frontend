/* eslint-disable sort-keys */
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants/variables";
import {RecordsModel} from "@essence-community/constructor-share/models/RecordsModel";
import {StoreBaseModel} from "@essence-community/constructor-share/models/StoreBaseModel";
import {
    IRecordsModel,
    IStoreBaseModelProps,
    IBuilderConfig,
    IRecord,
    IBuilderMode,
    IHandlerOptions,
} from "@essence-community/constructor-share/types";
import {deepFind} from "@essence-community/constructor-share/utils";
import {computed} from "mobx";

export interface IChildren {
    bc: IBuilderConfig;
    rec: IRecord;
}

export class DynamicButtonModel extends StoreBaseModel {
    recordsStore: IRecordsModel;
    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }
    @computed get menuBtn(): IBuilderConfig {
        return {
            ...this.bc,
            handler: this.defaultHandlerBtnAction,
            recordsrule: undefined,
            records: undefined,
            onlyicon: typeof this.bc.onlyicon === "undefined" ? true : this.bc.onlyicon,
            iconfont: "mdi-dots-horizontal",
            iconfontname: "mdi",
            [VAR_RECORD_PAGE_OBJECT_ID]: `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_menu`,
            [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
            type: "BTN",
        };
    }
    @computed get btns(): IChildren[] {
        if (this.bc.childs && this.bc.childs.length) {
            return this.bc.childs.map((child) => ({
                bc: {...child, [VAR_RECORD_PARENT_ID]: this.bc[VAR_RECORD_PARENT_ID]},
                rec: child as any,
            }));
        }

        return this.recordsStore.records.map((rec, index) => {
            const btnBc = {
                ...this.bc,
                [VAR_RECORD_PAGE_OBJECT_ID]:
                    rec[VAR_RECORD_PAGE_OBJECT_ID] ||
                    `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_${rec[this.recordsStore.recordId] || index}`,
                type: "BTN",
            };

            if (this.bc.valuefield && this.bc.valuefield.length) {
                this.bc.valuefield.forEach(({in: keyIn, out}) => {
                    const [isExistForm, resForm] = deepFind(rec, keyIn);

                    if (isExistForm) {
                        btnBc[out] = resForm;
                    }
                });
            }

            return {
                bc: btnBc,
                rec,
            } as IChildren;
        });
    }
    constructor(props: IStoreBaseModelProps) {
        super(props);
        const {bc, pageStore} = props;

        this.recordsStore = new RecordsModel(bc, {
            applicationStore: pageStore.applicationStore,
            pageStore,
        });
    }

    reloadStoreAction = () => this.recordsStore.loadRecordsAction({});

    clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    defaultHandlerBtnAction = async (_mode: IBuilderMode, _bc: IBuilderConfig, options: IHandlerOptions = {}) => {
        if (options.popoverCtx) {
            if (options.popoverCtx.open) {
                options.popoverCtx.onClose();
            } else {
                options.popoverCtx.onOpen();
            }
        }

        return true;
    };
    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
        updateBtnAction: this.defaultHandlerBtnAction,
    };
}
