import {RecordsModel, StoreBaseModel} from "@essence-community/constructor-share/models";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {
    IBuilderConfig,
    IBuilderMode,
    IHandlerOptions,
    IRecord,
    IRecordsModel,
    IStoreBaseModelProps,
} from "@essence-community/constructor-share/types";
import {action, computed, observable} from "mobx";
import {createPropertyForm} from "../utils/createPropertyForm";
import {revokeChilds} from "../utils/patchChilds";

export class GuiEditorModel extends StoreBaseModel {
    @observable selectedBc: IBuilderConfig | null = null;
    @observable selectedObjectId: string | null = null;
    @observable draggedCls: Record<string, unknown> | null = null;

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

    @action
    onDragSelect = (cls: Record<string, never>): void => {
        this.draggedCls = cls;
    };

    @action
    onOpenProperties = (bc: IBuilderConfig, properties: any[]): void => {
        const winBc = createPropertyForm(this.bc, properties, bc);

        this.pageStore.createWindowAction(winBc);
    };

    @action
    onSave = (): void => {
        const [record] = this.recordsStore.records;

        this.recordsStore.saveAction(
            {
                ...record,
                children: revokeChilds(record.children as any),
                ck_icon: null,
                ck_id: "CE84ABF1EF5941C6A7B8E8E03BEB9402",
                ck_parent: "000334084E3B4CE4B54960414385DA29",
                ck_user: "4fd05ca9-3a9e-4d66-82df-886dfa082113",
                ck_view: "system",
                cl_menu: 1,
                cl_static: 0,
                cn_action_edit: "516",
                cn_action_view: "515",
                cn_order: "40",
                cr_type: "2",
                ct_change: "2021-06-29T16:11:57",
                cv_icon_font: null,
                cv_icon_name: null,
                cv_name: "0f7e4e0b0cc84ecbb546e3bb4a5feb79",
                cv_url: null,
                cv_view_description: "Essence Core View",
                leaf: "true",
                root: "b749ad285f72426bbdfda8d89d181444",
            },
            "2",
            {
                actionBc: this.bc,
            },
        );
    };

    @action
    handleValueChange = (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHandlerOptions): Promise<boolean> => {
        const {form} = options;
        const pageObjectId = form.values[VAR_RECORD_PAGE_OBJECT_ID] as string;
        const cls = this.classes[pageObjectId];

        Object.entries(form.values).forEach(([key, newValue]) => {
            if (newValue !== cls[key] || key === "hidden") {
                console.log("Change:", key, "from:", cls[key], "to:", newValue);
                cls[key] = newValue;
            }
        });

        return Promise.resolve(true);
    };

    handlers = {
        onValueChange: this.handleValueChange,
    };
}
