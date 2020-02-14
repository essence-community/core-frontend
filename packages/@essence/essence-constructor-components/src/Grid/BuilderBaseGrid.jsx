/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction, observe} from "mobx";
import {observer, disposeOnUnmount} from "mobx-react";
import noop from "lodash/noop";
import {withStyles} from "@material-ui/core/styles";
import cn from "classnames";
import {Grid, Table, TableBody} from "@material-ui/core";
import {parse} from "@essence-community/constructor-share/utils/parser";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import Scrollbars, {type ReactCustomScrollbarsType} from "../Components/Scrollbars/Scrollbars";
import {isEmpty} from "../utils/base";
import EmptyTitle from "../Components/EmptyTitle/EmptyTitle";
import VerticalResizer from "../Resizer/VerticalResizer";
import Pagination from "../Pagination/Pagination";
import BuilderFilter from "../Filter/BuilderFilter";
import {type GridModelType, updateGridWidth, handleFocusAfterKeyDown} from "../stores/GridModel";
import {type PageModelType} from "../stores/PageModel";
import {
    QUERY_GRID_ELEMENT,
    KEY_ARROW_DOWN,
    KEY_ARROW_LEFT,
    KEY_ARROW_RIGHT,
    KEY_ARROW_UP,
    SCROLL_WEIGHT,
} from "../constants";
import {type BuilderGridType} from "./BuilderGridType";
import styles from "./Styles/BuilderBaseGridStyles";
import GridBaseButtons from "./GridButtons/GridBaseButtons";
import BaseGridTableHeader from "./BaseGridTableHeader";
import GridColgroup from "./GridComponents/GridColgroup";

type PropsType = WithT & {|
    classes: Object,
    bc: BuilderGridType,
    children: React.Node,
    store: GridModelType,
    disabled?: boolean,
    readOnly?: boolean,
    height?: number,
    hideTitle?: boolean,
    hidden?: boolean,
    visible: boolean,
    pageStore: PageModelType,
    recordsCount: number,
    fireScrollEvent?: boolean,
    isAutoLoad?: boolean,
|};

const GRID_FOCUS_KEYS = [KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP];
const FITER_ONE_BUTTON = 42;
const FILTER_THREE_BUTTON = 128;

export class BuilderBaseGridBase extends React.Component<PropsType, {focused: boolean}> {
    static defaultProps = {
        classes: {},
        height: 0,
    };

    state = {
        focused: false,
    };

    headerElement: ?HTMLDivElement;

    autoSelectIdentity: ?string;

    scrollElem: any;

    constructor(props: PropsType) {
        super(props);

        const {autoselectidentity} = props.bc;

        this.autoSelectIdentity = isEmpty(autoselectidentity) ? null : autoselectidentity;
    }

    componentDidMount() {
        const {store, pageStore, isAutoLoad} = this.props;

        this.handleUpdateWidth();

        window.addEventListener("resize", this.handleUpdateWidth);

        disposeOnUnmount(this, [
            reaction(() => store.recordsStore.records, this.handleRecordsLoad, {
                name: "BuilderBaseGrid.records.update",
            }),
            reaction(() => pageStore.visible, this.handlePageVisible),
            observe(store.columnsWidth, this.handleScrollUpdate),
            observe(store.expansionRecords, this.handleScrollUpdate),
            reaction(() => store.gridColumns, this.handleUpdateGridWidth),
            reaction(this.handleChangeVisibleColumns, store.setGridColumns, {fireImmediately: true}),
        ]);

        if (isAutoLoad) {
            // Устанавливаем флаг зугрузки, что бы не сработал общий механизм в withModel
            store.recordsStore.setLoadingAction(true);
            // Дожидаемся рендеринга BuilderFilter
            this.setState({}, () => {
                requestAnimationFrame(() => {
                    store.applyFiltersAction().then((res) => {
                        if (res) {
                            store.loadRecordsAction();
                        } else {
                            store.recordsStore.setLoadingAction(false);
                        }
                    });
                });
            });
        }
    }

    componentWillUnmount() {
        this.headerElement = null;
        this.scrollElem = null;
        window.removeEventListener("resize", this.handleUpdateWidth);
    }

    handleChangeVisibleColumns = () =>
        this.props.store.gridColumnsInitial.filter(
            (column) => !(column.hiddenrules && parse(column.hiddenrules).runer(this.props.pageStore.globalValues)),
        );

    handlePageVisible = (pageVisible: boolean) => {
        if (pageVisible && this.props.visible === undefined) {
            this.handleUpdateGridWidth();
        }
    };

    handleUpdateGridWidth = () => {
        // UBCOM-7903 При переходе между страницамии не сразу отображается
        requestAnimationFrame(() => {
            updateGridWidth(this.props.store);
        });
    };

    handleRecordsLoad = () => {
        const {store} = this.props;

        store.recordsStore.records.forEach((rec) => {
            if (rec.expanded === "true" && !store.expansionRecords.has(rec[store.recordsStore.recordId])) {
                store.openCloseExpansionAction(rec[store.recordsStore.recordId], true);
            }
        });

        if (
            this.autoSelectIdentity &&
            !isEmpty(store.recordsStore.searchValues[this.autoSelectIdentity]) &&
            store.recordsStore.records.length > 0
        ) {
            store.recordsStore.setSelectionAction(store.recordsStore.records[0][store.recordsStore.recordId]);
        }
    };

    handleScrollUpdate = () => {
        this.scrollElem.update();
    };

    setScrollElement = (scollbars: ReactCustomScrollbarsType) => {
        this.scrollElem = scollbars;
    };

    setHeaderElement = (element: ?HTMLDivElement) => {
        this.headerElement = element;
    };

    handleScrollFrameBody = (values: Object) => {
        this.props.store.scrollTop = values.scrollTop;

        if (this.headerElement) {
            this.headerElement.scrollLeft = values.scrollLeft;
        }
    };

    handleChangeCollapse = () => {
        const {store} = this.props;

        store.toggleIsFilterOpen();
    };

    handleSelectRow = (
        selectedRow: HTMLTableRowElement,
        row: HTMLTableRowElement,
        firstActiveElement: ?HTMLElement,
    ) => {
        if (firstActiveElement) {
            firstActiveElement.focus();
        } else {
            row.focus();
        }

        if (!selectedRow) {
            row.click();
        }
    };

    handleTableFocus = (event: SyntheticFocusEvent<HTMLDivElement>) => {
        const {currentTarget} = event;

        if (currentTarget === document.activeElement) {
            const selectedRow = currentTarget.querySelector(".selected-row");
            const row = selectedRow ? selectedRow : currentTarget.querySelector("tr");

            if (row) {
                // $FlowFixMe
                this.handleSelectRow(selectedRow, row, row.querySelector(QUERY_GRID_ELEMENT));
            }

            this.setState({focused: true});
        }
    };

    handleTableBlur = () => {
        const node: ?HTMLElement = this.props.store.refs.get("table-content");

        requestAnimationFrame(() => {
            if (!node || !node.contains(document.activeElement)) {
                this.setState({focused: false});
            }
        });
    };

    handleKeyDown = (event: SyntheticKeyboardEvent<*>) => {
        const {isEdit} = this.props.store;

        if (!isEdit && GRID_FOCUS_KEYS.indexOf(event.keyCode) !== -1) {
            // $FlowFixMe
            const tr: ?HTMLTableRowElement = document.activeElement.closest("tr");
            const {store, pageStore} = this.props;

            event.preventDefault();

            if (tr && !store.recordsStore.isLoading && !pageStore.isLoading) {
                handleFocusAfterKeyDown(tr, event.keyCode);
            }
        }
    };

    handleGridBodyMouseDown = (event: SyntheticMouseEvent<HTMLTableElement>) => {
        if (event.shiftKey || event.ctrlKey || event.metaKey) {
            // UBCOM-7450: prevent border in FF
            event.preventDefault();
        }
    };

    handleUpdateWidth = () => {
        if (this.isVisible()) {
            this.handleUpdateGridWidth();
        }
    };

    setRefBody = (node: ?React.ElementRef<*>) => this.props.store.addRefAction("body", node);

    setRefTableContent = (node: ?React.ElementRef<*>) => this.props.store.addRefAction("table-content", node);

    setRefTableHeader = (node: ?React.ElementRef<*>) => this.props.store.addRefAction("table-header", node);

    setRefGridContent = (node: ?React.ElementRef<*>) => this.props.store.addRefAction("grid-content", node);

    setRefGridInline = (node: ?React.ElementRef<*>) => this.props.store.addRefAction("grid-inline", node);

    setRefGridInlineButton = (node: ?React.ElementRef<*>) => this.props.store.addRefAction("grid-inline-button", node);

    isVisible = () => {
        const {visible, pageStore} = this.props;

        return visible !== false && pageStore.visible;
    };

    // eslint-disable-next-line max-lines-per-function
    renderTable(isInlineEditing: boolean, height: number) {
        const {classes, store, children, bc, disabled, readOnly, pageStore, visible, fireScrollEvent} = this.props;
        const {recordsStore} = store;
        // eslint-disable-next-line no-unused-vars
        const {pageSize, records} = recordsStore;
        const {direction, property} = recordsStore.order;

        return (
            <Grid container spacing={0} direction="column" justify="space-between" className={classes.fullHeight}>
                <Grid item xs zeroMinWidth className={classes.headerItem}>
                    <div className={classes.headerScroll} ref={this.setHeaderElement}>
                        <Table
                            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-table-header`}
                            ref={this.setRefTableHeader}
                            className={classes.tableHeader}
                        >
                            <BaseGridTableHeader
                                classes={classes}
                                bc={bc}
                                property={property}
                                lowerDirection={direction === "ASC" ? "asc" : "desc"}
                                disabled={disabled || store.isInlineEditing}
                                readOnly={readOnly}
                                store={store}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Table>
                    </div>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Scrollbars
                        autoHeight={true}
                        autoHeightMin={height}
                        autoHeightMax={height}
                        onScrollFrame={this.handleScrollFrameBody}
                        scrollbarsRef={this.setScrollElement}
                        hideTracksWhenNotNeeded
                        preventAltScroll
                        pageStore={pageStore}
                        fireScrollEvent={fireScrollEvent}
                    >
                        <div
                            className={store.isInlineEditing ? classes.tableInlineEditing : undefined}
                            ref={this.setRefTableContent}
                            onFocus={this.handleTableFocus}
                            onBlur={this.handleTableBlur}
                            onKeyDown={this.handleKeyDown}
                            tabIndex={
                                this.state.focused ||
                                !visible ||
                                recordsStore.records.length === 0 ||
                                store.isInlineEditing
                                    ? "-1"
                                    : "0"
                            }
                        >
                            {bc.edittype === "inline" ? <div ref={this.setRefGridInline} /> : null}
                            <Table
                                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-table-body`}
                                className={classes.tableBodyRoot}
                            >
                                <GridColgroup store={store} />
                                <TableBody ref={this.setRefBody} onMouseDown={this.handleGridBodyMouseDown}>
                                    {children}
                                </TableBody>
                            </Table>
                        </div>
                    </Scrollbars>
                </Grid>
                <Grid item>
                    {pageSize && pageStore.styleTheme === "dark" ? (
                        <Pagination
                            disabled={store.isInlineEditing || disabled}
                            component="div"
                            classes={{root: classes.pagination}}
                            count={recordsStore.recordsCount}
                            rowsPerPage={pageSize}
                            rowsPerPageOptions={[pageSize]}
                            page={recordsStore.pageNumber}
                            onChangePage={recordsStore.setPageNumberAction}
                            onChangeRowsPerPage={noop}
                            gridBc={bc}
                        />
                    ) : null}
                </Grid>
                {bc.splitter === "true" ? (
                    <Grid item>
                        <VerticalResizer
                            height={store.gridHeight}
                            minHeight={store.minHeight}
                            onChangeHeight={store.setHeightAction}
                        />
                    </Grid>
                ) : null}
            </Grid>
        );
    }

    renderWarning = () => (
        <div className={this.props.classes.warning}>{this.props.t("static:40dd53ff1c214bfab79ecd40612de8f5")}</div>
    );

    // eslint-disable-next-line max-lines-per-function,  max-statements
    render() {
        // eslint-disable-next-line id-length
        const {bc, store, classes, disabled, hideTitle, readOnly, pageStore, visible, t} = this.props;
        const {filters = [], childwindow = [], orderproperty} = bc;
        const isHideActions = bc.hideactions === "true";
        const isInlineEditing = store.isEdit && bc.edittype === "inline" && childwindow.length === 0;
        const transCvDisplayed = t(bc[VAR_RECORD_DISPLAYED]);
        const isFilterActionsPresent = filters.length > 0 && filters[0].dynamicfilter !== "true";
        const classNameRoot = cn(classes.root, isHideActions ? classes.rootActionsHide : classes.rootActions);
        // eslint-disable-next-line init-declarations
        let paddingTop;

        if (isFilterActionsPresent && pageStore.styleTheme === "dark") {
            paddingTop = store.isFilterOpen ? FILTER_THREE_BUTTON : FITER_ONE_BUTTON;
        }

        const actionsComponent = isHideActions ? null : (
            <Grid
                style={{paddingTop}}
                item
                className={store.isInlineEditing ? classes.editActionsGrid : classes.tableActions}
            >
                <GridBaseButtons
                    classes={classes}
                    disabled={disabled}
                    bc={bc}
                    readOnly={readOnly}
                    store={store}
                    pageStore={pageStore}
                    visible={visible}
                    isInlineEditing={store.isInlineEditing}
                />
                <div ref={this.setRefGridInlineButton} />
            </Grid>
        );
        const filterComponent = (
            <Grid item xs>
                {filters.map((filter) => (
                    <BuilderFilter
                        disabled={disabled}
                        key={filter[VAR_RECORD_PAGE_OBJECT_ID]}
                        onSearch={store.searchAction}
                        bc={filter}
                        parentBc={bc}
                        iconColor="inherit"
                        title={hideTitle ? undefined : transCvDisplayed}
                        open={store.isFilterOpen}
                        onChangeCollapse={this.handleChangeCollapse}
                        pageStore={pageStore}
                        handleGlobals={noop}
                        visible={visible}
                        addRefAction={store.addRefAction}
                        isHideActions={isHideActions}
                        absolute={true}
                    />
                ))}
            </Grid>
        );
        const tableComponent = (
            <Grid item xs className={store.isInlineEditing ? "panel-editing-focus" : undefined}>
                <Grid
                    container
                    spacing={0}
                    direction={pageStore.styleTheme === "light" ? "column" : "row"}
                    wrap="nowrap"
                    className={classes.fullHeight}
                >
                    {pageStore.styleTheme === "light" ? actionsComponent : null}
                    <Grid
                        item
                        xs
                        className={`${classes.tableBodyItem} ${store.isInlineEditing ? classes.editableTable : ""}`}
                        zeroMinWidth
                        ref={this.setRefGridContent}
                    >
                        {isEmpty(orderproperty)
                            ? this.renderWarning()
                            : this.renderTable(isInlineEditing, store.gridHeight + SCROLL_WEIGHT)}
                    </Grid>
                </Grid>
            </Grid>
        );

        if (pageStore.styleTheme === "dark") {
            return (
                <Grid container direction="row" className={classNameRoot} wrap="nowrap">
                    {actionsComponent}
                    <Grid item container direction="column" className={classes.contentRoot}>
                        <Grid item xs>
                            {hideTitle ? null : <EmptyTitle title={transCvDisplayed} filters={filters} hideactions />}
                        </Grid>
                        {filterComponent}
                        {tableComponent}
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container direction="column" className={classNameRoot} wrap="nowrap">
                {filterComponent}
                <Grid item xs>
                    {hideTitle ? null : <EmptyTitle title={transCvDisplayed} filters={filters} />}
                </Grid>
                {tableComponent}
            </Grid>
        );
    }
}

export default compose(withStyles(styles), withTranslation("meta"), observer)(BuilderBaseGridBase);
