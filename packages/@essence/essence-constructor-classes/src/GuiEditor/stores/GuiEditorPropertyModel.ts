import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps, IRecord} from "@essence-community/constructor-share/types";
import {computed} from "mobx";
import {GuiEditorModel} from "./GuiEditorModel";

interface IGuiEditorContentModelProps extends IStoreBaseModelProps {
    editorStore: GuiEditorModel;
}

export class GuiEditorContentModel extends StoreBaseModel {
    recordsStore: IRecordsModel;
    editorStore: GuiEditorModel;

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

    constructor(props: IGuiEditorContentModelProps) {
        super(props);
        this.editorStore = props.editorStore;

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
    }

    reloadStoreAction = (): Promise<IRecord> => this.recordsStore.loadRecordsAction({});

    clearStoreAction = (): void => this.recordsStore.clearChildsStoresAction();

    handlers = {};
}
