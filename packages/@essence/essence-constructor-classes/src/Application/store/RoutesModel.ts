import {action, observable, extendObservable, ObservableMap} from "mobx";
import {
    getFromStore,
    saveToStore,
    IBuilderConfig,
    STORE_FAVORITS_KEY,
    IRoutesModel,
    IApplicationModel,
} from "@essence/essence-constructor-share";
import {RecordsModel} from "@essence/essence-constructor-share/models";

export class RoutesModel implements IRoutesModel {
    favorits: ObservableMap;

    recordsStore: RecordsModel;

    constructor(bc: IBuilderConfig, applicationStore: IApplicationModel) {
        this.recordsStore = new RecordsModel(bc, {applicationStore});

        extendObservable(this, {
            favorits: observable.map(getFromStore(STORE_FAVORITS_KEY, {})),
        });
    }

    setFavoritsAction = action("setFavoritsAction", (ckId: string) => {
        this.favorits.set(ckId, !this.favorits.get(ckId));

        saveToStore(STORE_FAVORITS_KEY, this.favorits.toJSON());
    });
}
