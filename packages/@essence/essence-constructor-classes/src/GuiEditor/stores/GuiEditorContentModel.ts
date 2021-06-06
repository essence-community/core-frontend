import {VAR_RECORD_ID, VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps, IRecord, IBuilderConfig} from "@essence-community/constructor-share/types";
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
    get relations(): any {
        return {};
    }

    constructor(props: IGuiEditorContentModelProps) {
        super(props);
        this.editorStore = props.editorStore;

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
    }

    canInsert(): boolean {
        return true;
    }

    handleInsert(bc: IBuilderConfig, classId: string): void {
        const record = this.recordsStore.records.find((r) => r[VAR_RECORD_ID] === classId);
        const newBc: IBuilderConfig = {
            [VAR_RECORD_PAGE_OBJECT_ID]: "",
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
            datatype: record.cv_datatype as string,
            type: record.cv_type as string,
        };

        // this.editorStore.handleInsert(bc, newBc )
        this.editorStore.classes[bc.ck_parent].childs.push(newBc);
        this.editorStore.recordsStore.setRecordsAction([...this.editorStore.recordsStore.records]);
    }

    reloadStoreAction = (): Promise<IRecord> => this.recordsStore.loadRecordsAction({});

    clearStoreAction = (): void => this.recordsStore.clearChildsStoresAction();

    handlers = {};
}
