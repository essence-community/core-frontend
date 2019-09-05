/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction, observe} from "mobx";
import {observer, disposeOnUnmount} from "mobx-react";
import noop from "lodash/noop";
import camelCase from "lodash/camelCase";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import {parse} from "@essence/essence-constructor-share/utils/parser";
import Scrollbars, {type ReactCustomScrollbarsType} from "../Components/Scrollbars/Scrollbars";
import {isEmpty} from "../utils/base";
import EmptyTitle from "../Components/EmptyTitle/EmptyTitle";
import VerticalResizer from "../Resizer/VerticalResizer";
import Pagination from "../Pagination/Pagination";
import BuilderFilter from "../Filter/BuilderFilter";
import {
    type GridModelType,
    updateGridWidth,
    updateTopGrid,
    updateMarginTopGrid,
    handleFocusAfterKeyDown,
} from "../stores/GridModel";
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

type PropsType = {|
    classes: Object,
    bc: BuilderGridType,
    children: React.Node,
    store: GridModelType,
    disabled?: boolean,
    readOnly?: boolean,
    height?: number,
    hideTitle?: boolean,
    autoHeightGrid?: boolean,
    hidden?: boolean,
    visible: boolean,
    pageStore: PageModelType,
    recordsCount: number,
    fireScrollEvent?: boolean,
    isAutoLoad?: boolean,
|};

const GRID_FOCUS_KEYS = [KEY_ARROW_DOWN, KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_ARROW_UP];

export class BuilderBaseGridBase extends React.Component<PropsType, {focused: boolean}> {
    static defaultProps = {
        autoHeightGrid: true,
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

        this.autoSelectIdentity = isEmpty(autoselectidentity) ? null : camelCase(autoselectidentity);
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
                window.requestAnimationFrame(() => {
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

    componentDidUpdate(prevProps: PropsType) {
        const {store, visible, pageStore} = this.props;

        if (!prevProps.visible && visible && pageStore.styleTheme === "dark") {
            const marginTop = updateTopGrid(store.refs, store.isFilterOpen);

            updateMarginTopGrid(store, marginTop);
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
            if (rec.expanded === "true" && !store.expansionRecords.has(rec.ckId)) {
                store.openCloseExpansionAction(rec.ckId, true);
            }
        });

        if (
            this.autoSelectIdentity &&
            !isEmpty(store.recordsStore.searchValues[this.autoSelectIdentity]) &&
            store.recordsStore.records.length > 0
        ) {
            store.recordsStore.setSelectionAction(store.recordsStore.records[0].ckId);
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
        const {store, pageStore} = this.props;

        store.toggleIsFilterOpen();

        if (pageStore.styleTheme === "dark" && this.isVisible()) {
            updateTopGrid(store.refs, store.isFilterOpen);
        }
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

    renderTable(isInlineEditing: boolean, height: number) {
        const {
            classes,
            store,
            children,
            bc,
            disabled,
            autoHeightGrid,
            readOnly,
            pageStore,
            visible,
            fireScrollEvent,
        } = this.props;
        const {recordsStore} = store;
        // eslint-disable-next-line no-unused-vars
        const {pageSize, records} = recordsStore;
        const {direction, property} = recordsStore.order;

        return (
            <Grid container spacing={0} direction="column" justify="space-between" className={classes.fullHeight}>
                <Grid item xs zeroMinWidth className={classes.headerItem}>
                    <div className={classes.headerScroll} ref={this.setHeaderElement}>
                        <Table
                            data-page-object={`${bc.ckPageObject}-table-header`}
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
                        autoHeight={autoHeightGrid}
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
                            <Table data-page-object={`${bc.ckPageObject}-table-body`} className={classes.tableBodyRoot}>
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
                {bc.spliter === "true" ? (
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
        <div className={this.props.classes.warning}>
            Необходимо заполнить orderproperty для дальнейшей работы таблицы
        </div>
    );

    render() {
        const {bc, store, classes, disabled, hideTitle, readOnly, pageStore, visible} = this.props;
        const {filters = [], childwindow = [], orderproperty} = bc;
        const hideactionsDark = bc.hideactions === "true" && pageStore.styleTheme === "dark";
        const isInlineEditing = store.isEdit && bc.edittype === "inline" && childwindow.length === 0;

        return (
            <React.Fragment>
                <Grid container direction="column" className={classes.fullHeight} wrap="nowrap">
                    <Grid item>
                        {filters.map((filter) => (
                            <BuilderFilter
                                disabled={disabled}
                                key={filter.ckPageObject}
                                onSearch={store.searchAction}
                                bc={filter}
                                parentBc={bc}
                                iconColor="inherit"
                                title={hideTitle ? undefined : bc.cvDisplayed}
                                open={store.isFilterOpen}
                                onChangeCollapse={this.handleChangeCollapse}
                                pageStore={pageStore}
                                handleGlobals={noop}
                                visible={visible}
                                addRefAction={store.addRefAction}
                            />
                        ))}
                    </Grid>
                    <Grid item>
                        {hideTitle ? null : (
                            <EmptyTitle title={bc.cvDisplayed} filters={filters} hideactions={hideactionsDark} />
                        )}
                    </Grid>
                    <Grid item xs className={store.isInlineEditing ? "panel-editing-focus" : undefined}>
                        <Grid
                            container
                            spacing={0}
                            direction={pageStore.styleTheme === "light" ? "column" : "row"}
                            wrap="nowrap"
                            className={classes.fullHeight}
                        >
                            {bc.hideactions === "true" ? null : (
                                <Grid
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
                            )}
                            <Grid
                                item
                                xs
                                className={`${classes.tableBodyItem} ${
                                    store.isInlineEditing ? classes.editableTable : ""
                                }`}
                                zeroMinWidth
                                ref={this.setRefGridContent}
                            >
                                {isEmpty(orderproperty)
                                    ? this.renderWarning()
                                    : this.renderTable(isInlineEditing, store.gridHeight + SCROLL_WEIGHT)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default compose(
    withStyles(styles),
    observer,
)(BuilderBaseGridBase);
