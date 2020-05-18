/* eslint-disable max-lines */
import {action, observable, ObservableMap, computed} from "mobx";
import {
    i18next,
    isEmpty,
    mapValueToArray,
    createWindowProps,
    getDefaultWindowBc,
    getExcelWindow,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_LEAF,
    loggerRoot,
} from "@essence-community/constructor-share/constants";
import {
    IBuilderConfig,
    ICkId,
    IStoreBaseModel,
    IStoreBaseModelProps,
    IRecordsModel,
    IRecord,
    IBuilderMode,
    ILoadRecordsProps,
    IHandlerOptions,
    HandlerType,
} from "@essence-community/constructor-share/types";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {
    gridScrollToRecordAction,
    gridSetGlobalValues,
    getGridColumns,
    getGridHeight,
    setGridSelections,
    setGridSelectionsTop,
    getBtnBcWithCkWindow,
    updateGridWidth,
    getGridValues,
    printExcel,
} from "../../utils";
import {WIDTH_MAP, GRID_ROW_HEIGHT, GRID_ROWS_COUNT, TABLE_CELL_MIN_WIDTH} from "../../constants";
import {getOverrideExcelButton, getOverrideWindowBottomBtn} from "../../utils/getGridBtnsConfig";
import {updatePercentColumnsWidth, setWidthForZeroWidthCol} from "./actions";
import {GridSaveConfigType} from "./GridModel.types";

const logger = loggerRoot.extend("GridModel");

export class GridModel extends StoreBaseModel implements IStoreBaseModel {
    refs: Map<ICkId, HTMLElement> = new Map();

    rootNode: boolean;

    gridColumnsInitial: IBuilderConfig[];

    valueFields: [string, string][];

    recordsStore: IRecordsModel;

    initialHeight: number | undefined;

    constructor(props: IStoreBaseModelProps) {
        super(props);

        this.recordsStore = new RecordsModel(
            {...this.bc, setrecordtoglobal: undefined},
            {
                applicationStore: this.pageStore.applicationStore,
                pageStore: this.pageStore,
                parentStore: this,
            },
        );
        this.initialHeight = getGridHeight(this.bc);

        this.valueFields = [[this.recordsStore.recordId, this.recordsStore.recordId]];
        this.gridColumnsInitial = getGridColumns(this.bc);
        this.gridColumns = this.gridColumnsInitial;

        const columnsWithZeroWidth: string[] = [];

        this.gridColumns.forEach(({[VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject, datatype, width}) => {
            const colWidth = (datatype && WIDTH_MAP[datatype as keyof typeof WIDTH_MAP]) || width;

            if (colWidth) {
                this.columnsWidth.set(ckPageObject, colWidth);
            } else if (columnsWithZeroWidth.indexOf(ckPageObject) === -1) {
                columnsWithZeroWidth.push(ckPageObject);
            }
        });

        if (columnsWithZeroWidth.length > 0) {
            setWidthForZeroWidthCol(this, columnsWithZeroWidth);
        } else {
            updatePercentColumnsWidth(this, "");
        }

        if (this.bc.valuefield) {
            this.valueFields = this.bc.valuefield.split(",").map((key) => {
                const keys = key.split("=");
                const fieldKeyName = keys[1] || keys[0];
                const [valueField] = keys;

                return [fieldKeyName, valueField];
            });
        }
        this.afterSelected();
    }

    @observable public columnsWidth: ObservableMap<ICkId, number | string> = observable.map();

    @observable public height = 0;

    @observable public isAuditOpen = false;

    @observable public isEdit = false;

    @observable public isOpenSettings = false;

    @observable public minHeight: number = GRID_ROW_HEIGHT * GRID_ROWS_COUNT;

    @observable public scrollTop = 0;

    @observable public gridColumns: IBuilderConfig[] = observable.array([], {deep: false});

    @computed public get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    @computed public get gridHeight(): number {
        return (
            this.height ||
            this.initialHeight ||
            (this.recordsStore.pageSize ? this.recordsStore.pageSize * GRID_ROW_HEIGHT : this.gridRecordsHeight) ||
            GRID_ROW_HEIGHT
        );
    }

    @computed public get gridRecordsHeight() {
        const records =
            this.bc.type === "TREEGRID"
                ? this.recordsStore.records.filter((record) => record[VAR_RECORD_PARENT_ID] === null)
                : this.recordsStore.records;

        return records.length * GRID_ROW_HEIGHT;
    }

    @computed public get isInlineEditing(): boolean {
        return (
            this.bc.edittype === "inline" &&
            Boolean(
                this.pageStore.windows.find(
                    (windBc) => windBc[VAR_RECORD_PARENT_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                ),
            )
        );
    }

    @computed get isPageSelectedRecords() {
        if (this.bc.type === "TREEGRID") {
            return this.recordsStore.records.every(
                (record) =>
                    record[VAR_RECORD_LEAF] === "false" ||
                    Boolean(this.recordsStore.selectedRecords.get(record[this.recordsStore.recordId] as ICkId)),
            );
        }

        return this.recordsStore.records.every((record) =>
            Boolean(this.recordsStore.selectedRecords.get(record[this.recordsStore.recordId] as ICkId)),
        );
    }

    handleDoubleClick = () => {
        const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);
        const onDoubleClick: HandlerType | undefined = parentStore?.handlers?.onDoubleClick;

        if (onDoubleClick) {
            onDoubleClick("1", this.bc, {});
        }
    };

    @action
    defaultHandlerBtnAction = (mode: IBuilderMode, btnBc: IBuilderConfig) => {
        if (!this.isInlineEditing) {
            this.pageStore.createWindowAction(
                createWindowProps({
                    btnBc,
                    getDefaultWindowBc: () => {
                        if (btnBc.ckwindow === "btnexcel") {
                            return getExcelWindow({
                                ckPageObject: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                                overrideExcelButton: getOverrideExcelButton(this.bc),
                            });
                        }

                        return this.bc.edittype === "inline"
                            ? {
                                  ...getDefaultWindowBc(this.bc),
                                  columns: this.gridColumns,
                                  type: "INLINE_WINDOW",
                              }
                            : {
                                  ...getDefaultWindowBc(this.bc),
                                  bottombtn: getOverrideWindowBottomBtn(this.bc),
                              };
                    },
                    mode,
                    pageStore: this.pageStore,
                    parentStore: this,
                }),
            );
        }

        return Promise.resolve(true);
    };

    updateBtnAction = action(
        "updateBtnAction",
        async (mode: IBuilderMode, bc: IBuilderConfig, {files, form}: IHandlerOptions) => {
            const result = await this.recordsStore[mode === "7" ? "downloadAction" : "saveAction"](
                this.recordsStore.selectedRecord || {},
                (bc.modeaction as IBuilderMode) || mode,
                {
                    actionBc: bc,
                    files,
                    form,
                    query: bc.updatequery || "Modify",
                },
            );

            await this.scrollToRecordAction({});

            return Boolean(result);
        },
    );

    /**
     * Форма сохранения:
     * 1. values - все значения
     * 2. config - конфиг сохранения, берется из кнопки и передаваемых параметров
     */
    saveAction = action("saveAction", async (values: IRecord, mode: IBuilderMode, config: GridSaveConfigType) => {
        const {actionBc, files, form} = config;
        const winBc = this.pageStore.windows.find(
            (bc) => bc[VAR_RECORD_PARENT_ID] === this.bc[VAR_RECORD_PAGE_OBJECT_ID],
        );
        const isDownload = mode === "7" || actionBc.mode === "7";
        const gridValues = getGridValues({gridStore: this, mode, pageStore: this.pageStore, values, winBc});

        const result = await this.recordsStore[isDownload ? "downloadAction" : "saveAction"](gridValues, mode, {
            actionBc,
            files,
            form,
            query: actionBc.updatequery,
        });

        await this.scrollToRecordAction({});

        return result;
    });

    @action
    reloadStoreAction = (checkParent: boolean) => {
        if (checkParent && this.bc[VAR_RECORD_MASTER_ID] && this.bc.reloadmaster === "true") {
            const masterId = this.bc[VAR_RECORD_MASTER_ID];
            const masterStore = masterId === undefined ? undefined : this.pageStore.stores.get(masterId);

            if (masterStore && masterStore.reloadStoreAction) {
                return masterStore.reloadStoreAction(checkParent);
            }
        }

        this.recordsStore.selectedRecords.clear();

        if (this.recordsStore.isLoading) {
            return Promise.resolve(undefined);
        }

        return this.recordsStore.loadRecordsAction({});
    };

    @action
    clearStoreAction = () => {
        this.recordsStore.clearChildsStoresAction();
        this.recordsStore.selectedRecords.clear();
    };

    @action
    openCloseExpansionAction = (ckId: ICkId, isExpanded = !this.recordsStore.expansionRecords.get(ckId)) => {
        this.recordsStore.expansionRecords.set(ckId, isExpanded);
    };

    @action
    toggleSelectedRecordAction = (ckId: ICkId, record: IRecord, isSelectedDefault?: boolean) => {
        const parentId = record[VAR_RECORD_PARENT_ID];
        const isSelected =
            isSelectedDefault === undefined ? Boolean(this.recordsStore.selectedRecords.get(ckId)) : isSelectedDefault;

        if (isSelected) {
            this.recordsStore.selectedRecords.delete(ckId);
        } else {
            this.recordsStore.selectedRecords.set(ckId, record);
        }

        if (!isEmpty(record[VAR_RECORD_LEAF]) && (typeof parentId === "number" || typeof parentId === "string")) {
            setGridSelections(this, isSelected, ckId);
            setGridSelectionsTop(
                this,
                !this.recordsStore.records
                    .filter((rec) => rec[VAR_RECORD_PARENT_ID] === parentId)
                    .some((rec) => {
                        const recordId = rec[this.recordsStore.recordId];

                        if (typeof recordId == "string" || typeof recordId === "number") {
                            return this.recordsStore.selectedRecords.has(recordId);
                        }

                        return false;
                    }),
                parentId,
            );
        }

        this.afterSelected();
    };

    addRefAction = (ckId: ICkId, node: HTMLElement) => {
        this.refs.set(ckId, node);
    };

    removeRefAction = (ckId: ICkId) => {
        this.refs.delete(ckId);
    };

    @action
    expandSelectedAction = () => {
        const {selectedRecord} = this.recordsStore;
        let record = selectedRecord;

        if (selectedRecord && this.bc.type === "TREEGRID") {
            while (record) {
                const childRecord = record;

                record = this.recordsStore.records.find(
                    // eslint-disable-next-line eqeqeq
                    (rec) => rec[this.recordsStore.recordId] == childRecord[VAR_RECORD_PARENT_ID],
                );
                const recordId = record && record[this.recordsStore.recordId];

                if (typeof recordId === "string" || typeof recordId === "number") {
                    this.recordsStore.expansionRecords.set(recordId, true);
                }
            }
        }
    };

    @action
    handleNextStepAction = () => {
        if (!this.hidden && !this.disabled) {
            this.defaultHandlerBtnAction("1", this.bc);
        }
    };

    @action
    toggleAuditOpenAction = () => {
        this.isAuditOpen = !this.isAuditOpen;
    };

    loadRecordsAction = (props: ILoadRecordsProps) => this.recordsStore.loadRecordsAction(props);

    onPrintExcel = (values: IRecord, bcBtn: IBuilderConfig): Promise<boolean> => {
        if (isEmpty(this.bc[VAR_RECORD_QUERY_ID])) {
            logger(i18next.t("static:0d43efb6fc3546bbba80c8ac24ab3031"), this.bc);

            return Promise.resolve(true);
        }

        return printExcel({
            bcBtn,
            gridStore: this,
            recordsStore: this.recordsStore,
            values,
        });
    };

    @action
    removeSelectedRecordAction = async (_mode: IBuilderMode, bcBtn: IBuilderConfig) => {
        const record = this.recordsStore.selectedRecord;
        const res = await this.recordsStore.removeSelectedRecordAction({actionBc: bcBtn});
        const recordId = record && record[this.recordsStore.recordId];

        if (res && this.recordsStore.pageNumber > 0 && this.recordsStore.recordsCount === 0) {
            this.recordsStore.setPageNumberAction(0);
        }

        if (
            record &&
            (typeof recordId === "string" || typeof recordId === "number") &&
            Boolean(this.recordsStore.selectedRecords.get(recordId))
        ) {
            this.toggleSelectedRecordAction(recordId, record);
        }

        return res;
    };

    @action
    setAllSelectedRecords = (all: boolean) => {
        if (all) {
            this.recordsStore.records.forEach((record) => {
                this.recordsStore.selectedRecords.set(record[this.recordsStore.recordId] as ICkId, record);
            });
        } else {
            this.recordsStore.selectedRecords.clear();
        }
        this.afterSelected();
    };

    setColumnsWidth = (ckId: ICkId, width: number) => {
        let newWidth = width;

        if (ckId) {
            if (newWidth < TABLE_CELL_MIN_WIDTH) {
                newWidth = TABLE_CELL_MIN_WIDTH;
            }

            this.columnsWidth.set(ckId, newWidth);
            updatePercentColumnsWidth(this, ckId);
        }

        updateGridWidth(this);
    };

    scrollToRecordAction = (params: IRecord) => gridScrollToRecordAction(params, this);

    afterSelected = () => {
        if (this.bc.setglobal) {
            return gridSetGlobalValues(this);
        }

        this.setRecordToGlobal();

        return undefined;
    };

    winReloadStores = () => {
        if (this.bc.winreloadstores === "true") {
            this.reloadStoreAction(false);
        }

        return Promise.resolve(true);
    };

    setHeightAction = action("setHeightAction", (height: number) => {
        this.height = height;
    });

    setMinHeightAction = action("setMinHeightAction", (minHeight: number) => {
        this.minHeight = minHeight;
    });

    setGridColumns = action("setGridColumns", (gridColumns: IBuilderConfig[]) => {
        this.gridColumns = gridColumns;
    });

    setRecordToGlobal = () => {
        if (this.bc.setrecordtoglobal) {
            const selectedRecords = mapValueToArray(this.recordsStore.selectedRecords);
            const {selmode, collectionvalues} = this.bc;

            this.pageStore.updateGlobalValues({
                [this.bc.setrecordtoglobal]:
                    selmode === "MULTI" || selmode === "SIMPLE" || collectionvalues === "array"
                        ? selectedRecords
                        : this.recordsStore.selectedRecord || null,
            });
        }
    };

    @action
    setScrollTopAction = (scrollTop: number) => {
        this.scrollTop = scrollTop;
    };

    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
        onCloseSettings: () => {
            this.isOpenSettings = false;

            return Promise.resolve(true);
        },
        /**
         * Для вызова окна при создании
         */
        onCreateChildWindowMaster: (mode: IBuilderMode, bc: IBuilderConfig) => {
            return this.defaultHandlerBtnAction("1", getBtnBcWithCkWindow(this.bc, bc));
        },
        onOpenSettings: () => {
            this.isOpenSettings = true;

            return Promise.resolve(true);
        },
        onPrintExcel: (mode: IBuilderMode, btnBc: IBuilderConfig, {record}: IHandlerOptions) => {
            return this.onPrintExcel(record || {}, btnBc);
        },
        onRefresh: async () => {
            await this.loadRecordsAction({});

            return Promise.resolve(true);
        },
        onReloadStores: this.winReloadStores,
        /**
         * Для вызова окна при редактировании
         */
        onRowCreateChildWindowMaster: (mode: IBuilderMode, bc: IBuilderConfig) => {
            return this.defaultHandlerBtnAction("2", getBtnBcWithCkWindow(this.bc, bc));
        },
        onSimpleAddRow: (mode: IBuilderMode, bc: IBuilderConfig) => this.handlers.onCreateChildWindowMaster(mode, bc),
        onToggleAllSelectedRecords: () => {
            if (this.recordsStore.records.length !== 0) {
                this.setAllSelectedRecords(!this.isPageSelectedRecords);
            }

            return Promise.resolve(true);
        },
        onToggleExpansion: (mode: IBuilderMode, bc: IBuilderConfig, {record}: IHandlerOptions) => {
            if (record) {
                this.openCloseExpansionAction(record[this.recordsStore.recordId] as string | number);
            }

            return Promise.resolve(true);
        },
        onToggleSelectedRecord: (mode: IBuilderMode, bc: IBuilderConfig, {record}: IHandlerOptions) => {
            if (record) {
                this.toggleSelectedRecordAction(
                    record[this.recordsStore.recordId] as string | number,
                    record,
                    record.checked as boolean | undefined,
                );
            }

            return Promise.resolve(true);
        },
        onUpdate: this.updateBtnAction,
    };
}
