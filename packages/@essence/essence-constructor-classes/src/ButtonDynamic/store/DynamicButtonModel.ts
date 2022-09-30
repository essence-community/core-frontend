import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {RecordsModel} from "@essence-community/constructor-share/models/RecordsModel";
import {StoreBaseModel} from "@essence-community/constructor-share/models/StoreBaseModel";
import {IRecordsModel, IStoreBaseModelProps, IBuilderConfig, IRecord} from "@essence-community/constructor-share/types";
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
    @computed get btns(): IChildren[] {
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
}
