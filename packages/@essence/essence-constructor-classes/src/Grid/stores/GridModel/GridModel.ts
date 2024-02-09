/* eslint-disable max-lines */
import {action, observable, ObservableMap, computed} from "mobx";
import {
    i18next,
    isEmpty,
    mapValueToArray,
    createWindowProps,
    getDefaultWindowBc,
    getExcelWindow,
    parseMemoize,
    getFromStore,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_LEAF,
    VAR_RECORD_PAGE_OBJECT_DRAG,
    VAR_RECORD_PAGE_OBJECT_DROP,
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
import {awaitFormFilter} from "@essence-community/constructor-share/models/PageModel/PageModelRedirect";
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
    getRecordsEnabled,
    checkIsPageSelectedRecords,
} from "../../utils";
import {GRID_ROW_HEIGHT, GRID_ROWS_COUNT, TABLE_CELL_MIN_WIDTH} from "../../constants";
import {
    getOverrideExcelButton,
    getOverrideWindowBottomBtn,
    getOverrideDragDropButton,
} from "../../utils/getGridBtnsConfig";
import {IHanderOptions} from "../../../Button/handlers/hander.types";
import {resetGridWidth} from "../../utils/resetGridWidth";
import {updatePercentColumnsWidth} from "./actions";
import {IGridModel, IGridSaveConfigType} from "./GridModel.types";

const logger = loggerRoot.extend("GridModel");

export class GridModel extends StoreBaseModel implements IStoreBaseModel {
    refs: Map<ICkId, HTMLElement> = new Map();

    rootNode: boolean;

    gridColumnsInitial: IBuilderConfig[];

    valueFields: [string, string][];

    recordsStore: IRecordsModel;

    initialHeight: number | undefined;

    @observable
    visibleAndHidden: IGridModel["visibleAndHidden"] = observable.map();

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
        this.gridColumnsInitial = observable.array(getGridColumns(this.bc));
        const visibility = getFromStore<Record<string, boolean>>(
            `${this.bc[VAR_RECORD_PAGE_OBJECT_ID]}_visibility`,
            {},
        );

        this.gridColumnsInitial.forEach((val) => {
            this.visibleAndHidden.set(val[VAR_RECORD_PAGE_OBJECT_ID], {
                hidden: val.hidden,
                visible: val.visible,
                visibleStore: visibility[val[VAR_RECORD_PAGE_OBJECT_ID]],
            });
        });

        resetGridWidth(this);

        if (this.bc.valuefield && this.bc.valuefield.length) {
            this.valueFields = this.bc.valuefield.map(({in: keyIn, out}) => {
                const fieldKeyName = out || keyIn;

                return [fieldKeyName, keyIn];
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

    @computed
    public get gridColumns(): IBuilderConfig[] {
        return this.gridColumnsInitial.filter((col) => {
            const obj = this.visibleAndHidden.get(col[VAR_RECORD_PAGE_OBJECT_ID]);

            return !obj.hidden && (typeof obj.visibleStore === "boolean" ? obj.visibleStore : obj.visible);
        });
    }

    @computed
    public get selectedRecord(): IRecord {
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
                ? this.recordsStore.records.filter((record) => record[this.recordsStore.recordParentId] === null)
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

    handleDoubleClick = (options: IHandlerOptions) => {
        const parentStore = this.pageStore.stores.get(this.bc[VAR_RECORD_PARENT_ID]);
        const onDoubleClick: HandlerType | undefined = parentStore?.handlers?.onDoubleClick;

        if (onDoubleClick) {
            onDoubleClick("1", this.bc, options);
        }
    };

    @action
    defaultHandlerBtnAction = (mode: IBuilderMode, btnBc: IBuilderConfig, {record}: IHandlerOptions) => {
        if (record) {
            if (
                this.recordsStore.records.find(
                    (rec) => rec[this.recordsStore.recordId] === record[this.recordsStore.recordId],
                )
            ) {
                this.recordsStore.setSelectionAction(record[this.recordsStore.recordId]);
            }
        }
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
                    initValues:
                        this.bc.type === "TREEGRID"
                            ? {
                                  [this.recordsStore.recordParentId]: this.recordsStore.selectedRecord
                                      ? this.recordsStore.selectedRecordId
                                      : undefined,
                              }
                            : {},
                    mode,
                    pageStore: this.pageStore,
                    parentStore: this,
                }),
            );
        }

        return Promise.resolve(true);
    };

    @action
    updateBtnAction = async (mode: IBuilderMode, bc: IBuilderConfig, {files, form, record}: IHandlerOptions) => {
        if (record) {
            if (
                this.recordsStore.records.find(
                    (rec) => rec[this.recordsStore.recordId] === record[this.recordsStore.recordId],
                )
            ) {
                this.recordsStore.setSelectionAction(record[this.recordsStore.recordId]);
            }
        }
        const result = await this.recordsStore[mode === "7" ? "downloadAction" : "saveAction"](
            this.recordsStore.selectedRecord || record || {},
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
    };

    /**
     * Форма сохранения:
     * 1. values - все значения
     * 2. config - конфиг сохранения, берется из кнопки и передаваемых параметров
     */
    @action
    saveAction = async (values: IRecord, mode: IBuilderMode, config: IGridSaveConfigType) => {
        const {actionBc, files, form} = config;
        const isDownload = mode === "7" || actionBc.mode === "7";
        const gridValues = getGridValues({gridStore: this, mode, values});

        const result = await this.recordsStore[isDownload ? "downloadAction" : "saveAction"](gridValues, mode, {
            actionBc,
            files,
            form,
            query: actionBc.updatequery,
        });

        await this.scrollToRecordAction({});

        return result;
    };

    @action
    reloadStoreAction = (checkParent: boolean) => {
        if (checkParent && this.bc[VAR_RECORD_MASTER_ID] && this.bc.reloadmaster) {
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
    toggleSelectedRecordAction = (record: IRecord, bcBtn?: IBuilderConfig) => {
        const ckId = record[this.recordsStore.recordId] as string | number;
        const parentId = record[this.recordsStore.recordParentId] as string | number;
        const maxSize =
            bcBtn?.maxselected && (parseMemoize(bcBtn.maxselected).runer(this.pageStore.globalValues) as number);
        const isSelected = this.recordsStore.selectedRecords.has(ckId);

        if (isSelected) {
            this.recordsStore.setSelectionsAction([record], this.recordsStore.recordId, "delete");
        } else if (!maxSize || maxSize > this.recordsStore.selectedRecords.size) {
            this.recordsStore.setSelectionsAction([record], this.recordsStore.recordId, "append");
        }

        if (!isEmpty(record[VAR_RECORD_LEAF]) && (isEmpty(bcBtn.selecttree) || bcBtn.selecttree)) {
            setGridSelections({gridStore: this, isSelected, maxSize, parentId: ckId});
            setGridSelectionsTop({
                ckChild: parentId,
                gridStore: this,
                isSelected:
                    isSelected &&
                    !this.recordsStore.records
                        .filter((rec) => rec[this.recordsStore.recordParentId] === parentId)
                        .some((rec) => {
                            const recordId = rec[this.recordsStore.recordId];

                            return this.recordsStore.selectedRecords.has(recordId as string | number);
                        }),
                maxSize,
            });
        }
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
                    (rec) => rec[this.recordsStore.recordId] == childRecord[this.recordsStore.recordParentId],
                );
                const recordId = record && (record[this.recordsStore.recordId] as string | number);

                if (recordId !== undefined) {
                    this.recordsStore.expansionRecords.set(recordId, true);
                }
            }
        }
    };

    @action
    handleNextStepAction = () => {
        if (!this.hidden && !this.disabled) {
            this.defaultHandlerBtnAction("1", this.bc, {});
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
        const recordId = record && (record[this.recordsStore.recordId] as string | number);

        if (res && this.recordsStore.pageNumber > 0 && this.recordsStore.recordsCount === 0) {
            this.recordsStore.setPageNumberAction(0);
        }

        if (record && recordId !== undefined && Boolean(this.recordsStore.selectedRecords.get(recordId))) {
            this.toggleSelectedRecordAction(record);
        }

        return res;
    };

    @action
    setAllSelectedRecords = (all: boolean, bcBtn: IBuilderConfig, records: IRecord[]) => {
        const maxSize =
            bcBtn.maxselected && (parseMemoize(bcBtn.maxselected).runer(this.pageStore.globalValues) as number);
        let selRecords = [];

        if (all) {
            if (this.bc.pagesize) {
                selRecords = [...mapValueToArray(this.recordsStore.selectedRecords)];
            }
            records.forEach((record) => {
                if (!maxSize || maxSize > this.recordsStore.selectedRecords.size) {
                    selRecords.push(record);
                }
            });
        }
        this.recordsStore.setSelectionsAction(selRecords, this.recordsStore.recordId);
    };

    setColumnsWidth = (ckId: ICkId, width: number) => {
        let newWidth = width;
        const column = this.gridColumns.find((column) => column[VAR_RECORD_PAGE_OBJECT_ID] === ckId);
        const minSize =
            column.minwidth && column.minwidth.indexOf("px") > -1
                ? parseInt(column.minwidth, 10)
                : TABLE_CELL_MIN_WIDTH;
        const maxSize = column.maxsize && column.maxsize.indexOf("px") > -1 ? parseInt(column.maxsize, 10) : undefined;

        if (ckId) {
            if (newWidth < minSize) {
                newWidth = minSize;
            }

            if (maxSize && newWidth > maxSize) {
                newWidth = maxSize;
            }
            this.columnsWidth.set(ckId, newWidth);
            updatePercentColumnsWidth(this, ckId);
        }

        updateGridWidth(this);
    };

    scrollToRecordAction = (params: IRecord) => gridScrollToRecordAction(params, this);

    afterSelected = () => {
        if (this.bc.setglobal?.length) {
            return gridSetGlobalValues(this);
        }

        this.setRecordToGlobal();

        this.scrollToRecordAction({});

        return undefined;
    };

    winReloadStores = () => {
        if (this.bc.winreloadstores) {
            this.reloadStoreAction(false);
        }

        return Promise.resolve(true);
    };

    @action
    setHeightAction = (height: number) => {
        this.height = height;
    };

    @action
    setMinHeightAction = (minHeight: number) => {
        this.minHeight = minHeight;
    };

    @action
    setHiddenColumn = (ckId: string, val: boolean) => {
        const old = {
            ...this.visibleAndHidden.get(ckId),
            hidden: val,
        };

        this.visibleAndHidden.set(ckId, old);
    };

    @action
    setVisibleColumn = (ckId: string, val: boolean) => {
        const old = {
            ...this.visibleAndHidden.get(ckId),
            visible: val,
        };

        this.visibleAndHidden.set(ckId, old);
    };

    @action
    setVisibleStoreColumn = (ckId: string, val?: boolean) => {
        const old = {
            ...this.visibleAndHidden.get(ckId),
            visibleStore: val,
        };

        this.visibleAndHidden.set(ckId, old);
    };

    setRecordToGlobal = () => {
        if (this.bc.setrecordtoglobal) {
            const selectedRecords = mapValueToArray(this.recordsStore.selectedRecords);
            const {selmode, collectionvalues} = this.bc;

            this.pageStore.updateGlobalValues({
                [this.bc.setrecordtoglobal]:
                    selmode === "MULTI" || collectionvalues === "array"
                        ? selectedRecords
                        : this.recordsStore.selectedRecord || null,
            });
        }
    };

    @action
    applyFiltersAction = () =>
        Promise.all(
            (this.bc.filters || []).map(async (filter: IBuilderConfig) => {
                const filterStore = this.pageStore.stores.get(filter[VAR_RECORD_PAGE_OBJECT_ID]);
                const filterForm = this.pageStore.forms.get(filter[VAR_RECORD_PAGE_OBJECT_ID]);

                if (filterStore && filterForm) {
                    await awaitFormFilter(this.pageStore, filterForm, false);
                    await filterForm.validate();
                    const isFilterValid = filterForm.isValid;
                    const {values} = filterForm;

                    if (isFilterValid) {
                        this.recordsStore.searchAction(values, {
                            formData: filterForm.isExistFile ? filterForm.valuesFile : undefined,
                            noLoad: true,
                        });

                        filterStore.invokeHandler("onChangeValues", ["1", this.bc, {record: values}]);
                    }

                    return isFilterValid;
                }

                return true;
            }),
        ).then((results) => results.every((result) => result === true));

    @action
    setScrollTopAction = (scrollTop: number) => {
        this.scrollTop = scrollTop;
    };

    @action
    dragDropAction = async (pageObjectId: string, dragId: string | string[], drop?: IRecord) => {
        const recordStore = this.pageStore.stores.get(pageObjectId)?.recordsStore;
        const drag = Array.isArray(dragId)
            ? recordStore?.records.filter((rec) => dragId.indexOf(String(rec[recordStore?.recordId])) > -1)
            : recordStore?.records.find((rec) => String(rec[recordStore?.recordId]) === dragId);
        const btn = getOverrideDragDropButton(this.bc);
        const res = await this.saveAction(
            {
                [recordStore?.recordId]: Array.isArray(dragId) ? undefined : drag?.[recordStore?.recordId],
                [VAR_RECORD_PAGE_OBJECT_DRAG]: pageObjectId,
                [VAR_RECORD_PAGE_OBJECT_DROP]: this.bc[VAR_RECORD_PAGE_OBJECT_ID],
                drag,
                drop,
            },
            (btn.modeaction as IBuilderMode) || "2",
            {
                actionBc: btn,
            },
        );

        return Boolean(res);
    };

    handlers = {
        defaultHandlerBtnAction: this.defaultHandlerBtnAction,
        onApplyFilters: () => {
            return this.applyFiltersAction();
        },
        onCloseSettings: () => {
            this.isOpenSettings = false;

            return Promise.resolve(true);
        },
        /**
         * Для вызова окна при создании
         */
        onCreateChildWindowMaster: (mode: IBuilderMode, bc: IBuilderConfig, options) => {
            return this.defaultHandlerBtnAction("1", getBtnBcWithCkWindow(this.bc, bc), options);
        },
        onOpenSettings: () => {
            this.isOpenSettings = true;

            return Promise.resolve(true);
        },
        onPrintExcel: (mode: IBuilderMode, btnBc: IBuilderConfig, {record}: IHandlerOptions) => {
            return this.onPrintExcel(record || {}, btnBc);
        },
        onRefresh: async () => {
            const isFilterValid = await this.applyFiltersAction();

            if (isFilterValid) {
                await this.loadRecordsAction({});
            }

            return Promise.resolve(true);
        },
        onReloadStores: this.winReloadStores,
        /**
         * Для вызова окна при редактировании
         */
        onRowCreateChildWindowMaster: (mode: IBuilderMode, bc: IBuilderConfig, options) => {
            return this.defaultHandlerBtnAction("2", getBtnBcWithCkWindow(this.bc, bc), options);
        },
        onSaveWindow: async (mode: IBuilderMode, btnBc: IBuilderConfig, options: IHanderOptions) => {
            if (!options.form) {
                return Promise.resolve(false);
            }

            const res = await this.saveAction(options.form.values, mode, {
                actionBc: btnBc,
                // TODO: check new api of records store
                files: options.files,
                form: options.form,
            });

            return Boolean(res);
        },
        onScrollToRecordAction: (mode: IBuilderMode, bc: IBuilderConfig, {record = {}}: IHandlerOptions) => {
            this.scrollToRecordAction(record);

            return Promise.resolve(true);
        },
        onSimpleAddRow: (mode: IBuilderMode, bc: IBuilderConfig, options) =>
            this.handlers.onCreateChildWindowMaster(mode, bc, options),
        onToggleAllSelectedRecords: (mode: IBuilderMode, bc: IBuilderConfig) => {
            const records = getRecordsEnabled(bc, this.recordsStore, this.pageStore);

            if (records.length !== 0) {
                const isPageSelectedRecords = checkIsPageSelectedRecords(bc, records, this.recordsStore);

                this.setAllSelectedRecords(!isPageSelectedRecords, bc, records);
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
                this.toggleSelectedRecordAction(record, bc);
            }

            return Promise.resolve(true);
        },
        onUpdate: this.updateBtnAction,
    };
}
