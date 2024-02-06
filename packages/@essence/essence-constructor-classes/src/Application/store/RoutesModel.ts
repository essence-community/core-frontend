import {action, makeObservable, observable, ObservableMap} from "mobx";
import {getFromStore, saveToStore, STORE_FAVORITS_KEY} from "@essence-community/constructor-share";
import {IBuilderConfig, IRoutesModel, IApplicationModel, IOptions} from "@essence-community/constructor-share/types";
import {RecordsModel} from "@essence-community/constructor-share/models";

interface IRoutesModelOptions {
    searchValues?: IOptions["searchValues"];
}
export class RoutesModel implements IRoutesModel {
    recordsStore: RecordsModel;

    @observable favorits: ObservableMap = observable.map(getFromStore(STORE_FAVORITS_KEY, {}));

    constructor(bc: IBuilderConfig, applicationStore: IApplicationModel, options?: IRoutesModelOptions) {
        this.recordsStore = new RecordsModel(bc, {...options, applicationStore, pageStore: null});
        makeObservable(this);
    }

    setFavoritsAction = action("setFavoritsAction", (ckId: string) => {
        this.favorits.set(ckId, !this.favorits.get(ckId));

        saveToStore(STORE_FAVORITS_KEY, this.favorits.toJSON());
    });
}
