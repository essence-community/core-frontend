import {RecordsModel, StoreBaseModel} from "@essence-community/constructor-share/models";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IBuilderConfig, IRecord, IRecordsModel, IStoreBaseModelProps} from "@essence-community/constructor-share/types";
import {action, computed, observable} from "mobx";

export class GuiEditorModel extends StoreBaseModel {
    @observable selectedBc: IBuilderConfig = null;
    @observable selectedObjectId: string | null = null;

    recordsStore: IRecordsModel;

    @computed
    get selectedRecord(): IRecord | undefined {
        return this.recordsStore.selectedRecord;
    }

    @computed
    get classes(): Record<string, IBuilderConfig> {
        const classes: Record<string, IBuilderConfig> = {};
        const children = this.recordsStore.records[0]?.children;

        function eachChildren(childs?: IBuilderConfig[]) {
            if (Array.isArray(childs)) {
                childs.forEach((child) => {
                    eachChildren(child.contextmenus);
                    eachChildren(child.bottombtn);
                    eachChildren(child.childs);
                    eachChildren(child.childwindow);
                    eachChildren(child.columns);
                    eachChildren(child.filters);
                    eachChildren(child.detail);
                    if (Array.isArray(child.editors)) {
                        eachChildren(child.editors);
                    }
                    classes[child[VAR_RECORD_PAGE_OBJECT_ID]] = child;
                });
            }
        }

        if (children) {
            eachChildren(this.recordsStore.records[0]?.children as IBuilderConfig[]);
            classes["root"] = children as IBuilderConfig;
        }

        return classes;
    }

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(props.bc, {
            applicationStore: props.applicationStore,
            pageStore: props.pageStore,
        });
    }

    reloadStoreAction = (): Promise<IRecord> => this.recordsStore.loadRecordsAction({});

    clearStoreAction = (): void => this.recordsStore.clearChildsStoresAction();

    handlers = {};

    @action
    onSelect = (bc: IBuilderConfig): void => {
        this.selectedBc = bc;
        this.selectedObjectId = `${bc[VAR_RECORD_PAGE_OBJECT_ID]}-editor`;
    };

    @action
    onDeselect = (): void => {
        this.selectedBc = null;
        this.selectedObjectId = null;
    };
}
