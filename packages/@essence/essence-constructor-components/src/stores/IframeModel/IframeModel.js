// @flow
import {action} from "mobx";
import {type BuilderBaseType} from "../../BuilderType";
import {type RecordsModelType, RecordsModel} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type IframeModelInterface} from "./IframeModelTypes";

export class IframeModel extends StoreBaseModel implements IframeModelInterface {
    recordsStore: RecordsModelType;

    bc: BuilderBaseType;

    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        super({bc, pageStore});

        const recordsStore = new RecordsModel({defaultvalue: "alwaysfirst", ...this.bc}, this.pageStore);

        this.recordsStore = recordsStore;
    }

    reloadStoreAction = action("reloadStoreAction", async () => {
        await this.recordsStore.loadRecordsAction();
    });
}
