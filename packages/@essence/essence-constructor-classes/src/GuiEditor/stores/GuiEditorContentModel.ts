import {
    VAR_RECORD_CV_CV_TYPE,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {IRecordsModel, IStoreBaseModelProps, IRecord, IBuilderConfig} from "@essence-community/constructor-share/types";
import {action, computed} from "mobx";
import {patchChilds} from "../utils/patchChilds";
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

    @computed
    get childs(): IBuilderConfig[] {
        const {records} = this.editorStore.recordsStore;

        if (records.length === 0) {
            return [];
        }

        const children = records[0].children as IBuilderConfig[];

        return patchChilds(children);
    }

    constructor(props: IGuiEditorContentModelProps) {
        super(props);
        this.editorStore = props.editorStore;

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
    }

    canInsert(bc: IBuilderConfig): any | false {
        const {draggedCls} = this.editorStore;
        const parentBc = bc.ck_parent ? this.editorStore.classes[bc.ck_parent] : undefined;

        if (!draggedCls) {
            return false;
        }

        if (!parentBc) {
            return draggedCls.cl_final;
        }

        return (draggedCls.parents as any).find(
            (cls) => cls.cv_type === parentBc.type && cls.cv_datatype == parentBc.datatype,
        );
    }

    getProperties(propertiesBc: IBuilderConfig): null | any[] {
        const cls = this.recordsStore.records.find(
            (r) => r[VAR_RECORD_CV_CV_TYPE] === propertiesBc.type && r.cv_datatype == propertiesBc.datatype,
        );

        if (cls && cls.properties) {
            return cls.properties as any[];
        }

        return null;
    }

    @action
    onInsert(bc: IBuilderConfig): void {
        const {draggedCls} = this.editorStore;

        if (draggedCls) {
            const newBc: IBuilderConfig = {
                [VAR_RECORD_PAGE_OBJECT_ID]: "",
                [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PARENT_ID],
                datatype: draggedCls.cv_datatype as string,
                type: draggedCls.cv_type as string,
            };

            // this.editorStore.handleInsert(bc, newBc )
            this.editorStore.classes[bc.ck_parent].childs.push(newBc);
            this.editorStore.recordsStore.setRecordsAction([...this.editorStore.recordsStore.records]);
        }
    }

    reloadStoreAction = (): Promise<IRecord> => this.recordsStore.loadRecordsAction({});

    clearStoreAction = (): void => this.recordsStore.clearChildsStoresAction();

    handlers = {};
}
