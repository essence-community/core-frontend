import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps, IRecord} from "@essence-community/constructor-share/types";
import {computed} from "mobx";
import {Form, IForm} from "@essence-community/constructor-share/Form";
import {VAR_RECORD_MASTER_ID} from "@essence-community/constructor-share/constants";

export class GuiEditorPropertyModel extends StoreBaseModel {
    recordsStore: IRecordsModel;

    @computed
    get selectedRecord(): IRecord | undefined {
        return this.recordsStore.selectedRecord;
    }

    @computed
    get properties(): Record<string, any> {
        return this.recordsStore.records.reduce((acc) => {
            return acc;
        }, {});
    }

    form: IForm;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
        this.form = new Form({
            bc: props.bc,
            editing: true,
            hooks: {
                onValueChange: this.onValueChange,
            },
            mode: "2",
            placement: "GUI_EDITOR_PROPERTY",
            values: this.bc.records[0],
        });
    }

    onValueChange = (form: IForm): void => {
        const masterStore = this.pageStore.stores.get(this.bc[VAR_RECORD_MASTER_ID]);

        if (masterStore) {
            masterStore.invokeHandler("onValueChange", ["2", this.bc, {form}]);
        }
    };

    reloadStoreAction = (): Promise<IRecord> => this.recordsStore.loadRecordsAction({});

    clearStoreAction = (): void => this.recordsStore.clearChildsStoresAction();

    handlers = {};
}
