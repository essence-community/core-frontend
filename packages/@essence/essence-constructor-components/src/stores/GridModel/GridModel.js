/* eslint max-lines: ["error", 600]*/
// @flow
import {action, extendObservable, observable} from "mobx";
import get from "lodash/get";
import camelCase from "lodash/camelCase";
import findIndex from "lodash/findIndex";
import groupBy from "lodash/groupBy";
import {i18next} from "@essence/essence-constructor-share/utils";
import {isEmpty} from "../../utils/base";
import {gridScrollToRecordAction, gridSetGlobalValues, getGridHeight} from "../../utils/grid";
import {type BuilderModeType, type CkIdType, type BuilderBaseType, type FormOptionsType} from "../../BuilderType";
import {WIDTH_MAP} from "../../Grid/BaseGridTableHeader";
import {TABLE_CELL_MIN_WIDTH, loggerRoot, GRID_ROW_HEIGHT, GRID_ROWS_COUNT} from "../../constants";
import {type BuilderFilterType} from "../../Filter/BuilderFilterType";
import {addWinowToPage} from "../WindowModel/WindowModelActions";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {awaitFormFilter} from "../PageModel/PageModelRedirect";
import {StoreBaseModel, type StoreBaseModelPropsType} from "../StoreBaseModel";
import {
    type GridBuilderType,
    type GridModelInterface,
    type GridModelType,
    type GridBtnsConfigType,
    type GridSaveConfigType,
} from "./GridModelType";
import {updateGridWidth, updatePercentColumnsWidth, setWidthForZeroWidthCol} from "./gridModelResize";
import {getGridValues} from "./getGridValues";
import {printExcel} from "./printExcel";
import {getGridBtnsConfig} from "./gridBtnsConfig";

export type {GridBuilderType, GridModelType, GridModelInterface};

function getGridColumns({columns = [], detail}: GridBuilderType) {
    const gridColumns = columns
        .filter((column) => column.visible !== "false")
        .map((column) =>
            column.istree === "true"
                ? {
                      ...column,
                      columnCamelCase: camelCase(column.column),
                      datatype: "tree",
                      datatypeBase: column.datatype,
                      iconfontColumn: column.iconfont ? camelCase(column.iconfont) : column.iconfont,
                      iconfontNameColumn: column.iconfontname ? camelCase(column.iconfontname) : column.iconfontname,
                  }
                : {
                      ...column,
                      columnCamelCase: camelCase(column.column),
                      iconfontColumn: column.iconfont ? camelCase(column.iconfont) : column.iconfont,
                      iconfontNameColumn: column.iconfontname ? camelCase(column.iconfontname) : column.iconfontname,
                  },
        );

    if (detail && findIndex(gridColumns, ["datatype", "detail"]) === -1) {
        return [
            {
                ckPageObject: "detail",
                datatype: "detail",
            },
            ...gridColumns,
        ];
    }

    return gridColumns;
}

function setGridSelections(gridStore: GridModelType, isSelected: boolean, ckParent: CkIdType) {
    gridStore.recordsStore.records.forEach((record) => {
        if (record.ckParent === ckParent) {
            if (record.leaf === "false") {
                setGridSelections(gridStore, isSelected, record.ckId);
            }

            if (isSelected) {
                gridStore.selectedRecords.delete(record.ckId);
            } else {
                gridStore.selectedRecords.set(record.ckId, record);
            }
        }
    });
}

function setGridSelectionsTop(gridStore: GridModelType, isSelected: boolean, ckChild: CkIdType) {
    gridStore.recordsStore.records.forEach((record) => {
        if (record.ckId === ckChild) {
            if (!isEmpty(record.ckParent)) {
                setGridSelectionsTop(gridStore, isSelected, record.ckParent);
            }

            if (isSelected) {
                gridStore.selectedRecords.delete(record.ckId);
            } else {
                gridStore.selectedRecords.set(record.ckId, record);
            }
        }
    });
}
const logger = loggerRoot.extend("GridModel");

export class GridModel extends StoreBaseModel implements GridModelInterface {
    name = "grid";

    bc: GridBuilderType;

    recordsStore: RecordsModelType;

    editMode: string;

    expansionRecords: Map<CkIdType, boolean>;

    selectedRecords: Map<CkIdType, Object>;

    refs: Map<CkIdType, any> = new Map();

    isEdit: boolean;

    isFilterOpen: boolean;

    isAuditOpen: boolean;

    selectedRecord: Object | null;

    rootNode: boolean;

    isPageSelectedRecords: boolean;

    gridColumns: Array<Object>;

    gridColumnsInitial: Array<Object>;

    columnsWidth: Map<CkIdType, number | string>;

    valueFields: Array<any>;

    gridBtnsConfig: GridBtnsConfigType;

    recordsTree: {
        [$Key: null | number | string]: Array<Object>,
    };

    isInlineEditing: boolean;

    gridHeight: number;

    scrollTop: number;

    height: number;

    minHeight: number;

    // eslint-disable-next-line max-statements, max-lines-per-function
    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        super({bc, pageStore});

        const recordsStore = new RecordsModel(bc, pageStore, {parentStore: this});
        const gridHeight = getGridHeight(bc);

        this.bc = bc;
        this.pageStore = pageStore;
        this.recordsStore = recordsStore;
        this.valueFields = [["ckId", "ckId"]];

        this.gridColumnsInitial = getGridColumns(bc);
        this.gridBtnsConfig = getGridBtnsConfig(bc, this);

        extendObservable(this, {
            columnsWidth: observable.map(),
            expansionRecords: observable.map(),
            get gridHeight() {
                return (
                    this.height ||
                    gridHeight ||
                    (this.recordsStore.pageSize
                        ? this.recordsStore.pageSize * GRID_ROW_HEIGHT
                        : this.recordsStore.records.length * GRID_ROW_HEIGHT) ||
                    GRID_ROW_HEIGHT
                );
            },
            height: 0,
            isAuditOpen: false,
            isEdit: false,
            isFilterOpen: get(bc, "filters.0.collapsed", "false") !== "true",
            get isInlineEditing() {
                return (
                    bc.edittype === "inline" && Boolean(pageStore.windowsOne.find((store) => store.gridStore === this))
                );
            },
            get isPageSelectedRecords() {
                if (bc.type === "TREEGRID") {
                    return this.recordsStore.records.every(
                        (record) => record.leaf === "false" || Boolean(this.selectedRecords.get(record.ckId)),
                    );
                }

                return this.recordsStore.records.every((record) => Boolean(this.selectedRecords.get(record.ckId)));
            },
            minHeight: GRID_ROW_HEIGHT * GRID_ROWS_COUNT,
            rootNode: true,
            scrollTop: 0,
            get selectedRecord() {
                return recordsStore.selectedRecord;
            },
            selectedRecords: observable.map(),
        });

        extendObservable(
            this,
            {
                gridColumns: this.gridColumnsInitial,
                get recordsTree() {
                    return groupBy(this.recordsStore.records, "ckParent");
                },
            },
            undefined,
            {deep: false},
        );

        const columnsWithZeroWidth = [];

        this.gridColumns.forEach(({ckPageObject, datatype, width}) => {
            const colWidth = WIDTH_MAP[datatype] || width;

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

        if (bc.valuefield) {
            this.valueFields = bc.valuefield.split(",").map((key) => {
                const keys = key.split("=");
                const fieldKeyName = camelCase(keys[1] || keys[0]);
                const valueField = camelCase(keys[0]);

                return [fieldKeyName, valueField];
            });
        }
        this.afterSelected();
    }

    openRoot = action("openRoot", () => {
        this.rootNode = !this.rootNode;
    });

    // eslint-disable-next-line max-statements
    defaultHandlerBtnAction = action(
        "defaultHandlerBtnAction",
        // eslint-disable-next-line max-statements, default-param-last
        (mode: BuilderModeType = "1", bc: Object, {ckwindow} = {}) => {
            if (this.isInlineEditing) {
                return null;
            }

            return addWinowToPage({
                btnBc: bc,
                ckWindowDefault: ckwindow,
                gridStore: this,
                mode,
                pageStore: this.pageStore,
            });
        },
    );

    updateBtnAction = action("updateBtnAction", (mode: BuilderModeType, bc: BuilderBaseType, {files}) =>
        this.recordsStore[mode === "7" ? "downloadAction" : "saveAction"](
            this.recordsStore.selectedRecord || {},
            bc.modeaction || mode,
            {
                actionBc: bc,
                files,
                query: bc.updatequery || "Modify",
            },
        ),
    );

    /**
     * Форма сохранения:
     * 1. values - все значения
     * 2. config - конфиг сохранения, берется из кнопки и передаваемых параметров
     */
    saveAction = action("saveAction", (values: Object, config: GridSaveConfigType) => {
        const {actionBc, files, mode, windowStore} = config;
        const isDownload = mode === "7" || actionBc.mode === "7";
        const gridValues = getGridValues({gridStore: this, mode, pageStore: this.pageStore, values, windowStore});

        return this.recordsStore[isDownload ? "downloadAction" : "saveAction"](gridValues, mode, {
            actionBc,
            files,
            query: actionBc.updatequery,
        });
    });

    reloadStoreAction = action("reloadStoreAction", (checkParent) => {
        if (checkParent && this.bc.ckMaster && this.bc.reloadmaster === "true") {
            const masterStore = this.pageStore.stores.get(this.bc.ckMaster);

            if (masterStore && masterStore.reloadStoreAction) {
                return masterStore.reloadStoreAction(checkParent);
            }
        }

        this.selectedRecords.clear();

        if (this.recordsStore.isLoading) {
            return Promise.resolve();
        }

        return this.applyFiltersAction().then((success) => (success ? this.recordsStore.loadRecordsAction() : null));
    });

    clearStoreAction = action("clearStoreAction", () => {
        this.recordsStore.clearChildsStoresAction();
        this.selectedRecords.clear();
    });

    openCloseExpansionAction = action(
        "openCloseExpansionAction",
        (ckId: CkIdType, isExpanded = !this.expansionRecords.get(ckId)) => {
            this.expansionRecords.set(ckId, isExpanded);
        },
    );

    toggleSelectedRecordAction = action(
        "toggleSelectedRecordAction",
        (ckId: CkIdType, record: Object, isSelected: boolean = Boolean(this.selectedRecords.get(ckId))) => {
            if (isSelected) {
                this.selectedRecords.delete(ckId);
            } else {
                this.selectedRecords.set(ckId, record);
            }

            if (!isEmpty(record.leaf)) {
                setGridSelections(this, isSelected, ckId);
                setGridSelectionsTop(
                    this,
                    !this.recordsStore.records
                        .filter((rec) => rec.ckParent === record.ckParent)
                        .some((rec) => this.selectedRecords.has(rec.ckId)),
                    record.ckParent,
                );
            }

            this.afterSelected();
        },
    );

    addRefAction = (ckId: CkIdType, node: any) => {
        this.refs.set(ckId, node);
    };

    removeRefAction = action("removeRefAction", (ckId: CkIdType) => {
        this.refs.delete(ckId);
    });

    expandSelectedAction = action("expandSelectedAction", () => {
        const {selectedRecord} = this.recordsStore;
        let record = selectedRecord;

        if (selectedRecord && this.bc.type === "TREEGRID") {
            while (record) {
                const childRecord = record;

                // eslint-disable-next-line eqeqeq
                record = this.recordsStore.records.find((rec) => rec.ckId == childRecord.ckParent);

                if (record) {
                    this.expansionRecords.set(record.ckId, true);
                }
            }
        }
    });

    handleNextStepAction = action("handleNextStepAction", () => {
        if (!this.hidden && !this.disabled) {
            this.defaultHandlerBtnAction("1", this.bc);
        }
    });

    applyFiltersAction = action("applyFiltersAction", () =>
        Promise.all(
            // eslint-disable-next-line max-statements
            (this.bc.filters || []).map(async (filter: BuilderFilterType) => {
                const filterStore = this.pageStore.stores.get(filter.ckPageObject);

                if (filterStore && filterStore.form) {
                    await awaitFormFilter(filterStore.form, false);
                    await filterStore.form.validate({showErrors: true});
                    const isFilterValid = filterStore.form.isValid;

                    const values = filterStore.form.values();

                    if (isFilterValid) {
                        this.searchAction(values, {noLoad: true});
                        filterStore.handleGlobals(values);
                        filterStore.setSearchedAction(true, this.bc);
                        filterStore.setValues(values);
                    }

                    return isFilterValid;
                }

                return true;
            }),
        ).then((results) => results.every((result) => result === true)),
    );

    toggleIsFilterOpen = action("toggleIsFilterOpen", () => {
        this.isFilterOpen = !this.isFilterOpen;
    });

    /**
     * Для вызова окна при создании
     * @param {BuilderModeType} mode Мод
     * @param {Object} bc Конфиг кнопки
     *
     * @returns {undefined}
     */
    // eslint-disable-next-line no-unused-vars, default-param-last
    onCreateChildWindowMaster = (mode: BuilderModeType = "1", bc: BuilderBaseType) => {
        const ckwindow =
            bc.ckwindow || get(this.bc, "childwindow.0.ckwindow") || get(this.bc, "childwindow.0.ckPageObject");

        return this.defaultHandlerBtnAction("1", bc, {ckwindow});
    };

    /**
     * Для вызова окна при редактировании
     * @param {BuilderModeType} mode Мод
     * @param {Object} bc Конфиг кнопки
     *
     * @returns {undefined}
     */
    // eslint-disable-next-line no-unused-vars, default-param-last
    onRowCreateChildWindowMaster = (mode: BuilderModeType = "2", bc: BuilderBaseType) => {
        const ckwindow =
            bc.ckwindow || get(this.bc, "childwindow.0.ckwindow") || get(this.bc, "childwindow.0.ckPageObject");

        return this.defaultHandlerBtnAction("2", bc, {ckwindow});
    };

    onSimpleAddRow = this.onCreateChildWindowMaster;

    toggleAuditOpenAction = action("toggleAuditOpenAction", () => {
        this.isAuditOpen = !this.isAuditOpen;
    });

    // $FlowFixMe
    loadRecordsAction = (...args) => this.recordsStore.loadRecordsAction(...args);

    onPrintExcel = (values: Object, bcBtn: BuilderBaseType): Promise<boolean> => {
        if (isEmpty(this.bc.ckQuery)) {
            logger(i18next.t("0d43efb6fc3546bbba80c8ac24ab3031"), this.bc);

            return Promise.resolve(true);
        }

        return printExcel({
            bcBtn,
            gridStore: this,
            recordsStore: this.recordsStore,
            values,
        });
    };

    removeSelectedRecordAction = action(
        "removeSelectedRecordAction",
        async (mode: BuilderModeType, bcBtn: BuilderBaseType) => {
            const record = this.recordsStore.selectedRecord;
            const res = await this.recordsStore.removeSelectedRecordAction({actionBc: bcBtn});

            if (res && this.recordsStore.pageNumber > 0 && this.recordsStore.recordsCount === 0) {
                this.recordsStore.setPageNumberAction(0);
            }

            if (record && Boolean(this.selectedRecords.get(record.ckId))) {
                this.toggleSelectedRecordAction(record.ckId, record);
            }

            return res;
        },
    );

    setAllSelectedRecords = action("setAllSelectedRecords", (all: boolean) => {
        if (all) {
            this.recordsStore.records.forEach((record) => {
                this.selectedRecords.set(record.ckId, record);
            });
        } else {
            this.selectedRecords.clear();
        }
        this.afterSelected();
    });

    setColumnsWidth = (ckId: CkIdType, width: number) => {
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

    scrollToRecordAction = (params: Object) => gridScrollToRecordAction(params, this);

    afterSelected = () => {
        if (this.bc.setglobal) {
            return gridSetGlobalValues(this);
        }

        return undefined;
    };

    winReloadStores = () => {
        if (this.bc.winreloadstores === "true") {
            this.reloadStoreAction();
        }
    };

    searchAction = action("searchAction", (values: Object, options?: FormOptionsType) => {
        if (this.bc.clearonsearch !== "false") {
            this.selectedRecords.clear();
        }

        return this.recordsStore.searchAction(values, options);
    });

    setHeightAction = action("setHeightAction", (height: number) => {
        this.height = height;
    });

    setMinHeightAction = action("setMinHeightAction", (minHeight: number) => {
        this.minHeight = minHeight;
    });

    setGridColumns = action("setGridColumns", (gridColumns: Array<Object>) => {
        this.gridColumns = gridColumns;
    });

    handlers = {
        onPrintExcel: (mode: BuilderModeType, btnBc: BuilderBaseType, {values}: any) => {
            return this.onPrintExcel(values, btnBc);
        },
        onUpdate: this.updateBtnAction,
    };
}
