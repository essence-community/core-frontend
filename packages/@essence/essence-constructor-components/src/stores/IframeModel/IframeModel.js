// @flow
import {action} from "mobx";
import {VALUE_SELF_ALWAYSFIRST} from "@essence/essence-constructor-share/constants";
import {type BuilderBaseType} from "../../BuilderType";
import {type RecordsModelType, RecordsModel} from "../RecordsModel";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type IframeModelInterface} from "./IframeModelTypes";

export class IframeModel extends StoreBaseModel implements IframeModelInterface {
    recordsStore: RecordsModelType;

    bc: BuilderBaseType;

    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        super({bc, pageStore});

        const recordsStore = new RecordsModel({defaultvalue: VALUE_SELF_ALWAYSFIRST, ...this.bc}, this.pageStore);

        this.recordsStore = recordsStore;
    }

    reloadStoreAction = action("reloadStoreAction", async () => {
        await this.recordsStore.loadRecordsAction();
    });
}
