import * as React from "react";
import {Grid, Table, useTheme, TableBody} from "@material-ui/core";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {VerticalResizer, Pagination, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {useObserver} from "mobx-react-lite";
import {ScrollbalrsValuesType} from "@essence-community/constructor-share/uicomponents/Scrollbars";
import {observe} from "mobx";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {GridTableHeader} from "../GridTableHeader";
import {GridColgroup} from "../GridColgroup";
import {handleSelectRow, focusAfterKeyDown} from "../../utils";
import {QUERY_GRID_ELEMENT, GRID_FOCUS_KEYS, SCROLL_WEIGHT} from "../../constants";
import {useStyles} from "./GridTable.styles";

interface IGridTableProps extends IClassProps {
    store: IGridModel;
}

// eslint-disable-next-line max-lines-per-function
export const GridTable: React.FC<IGridTableProps> = ({store, children, ...classProps}) => {
    const {bc, pageStore} = classProps;
    const classes = useStyles();
    const [focused, setFocused] = React.useState();
    const headerRef = React.useRef<HTMLDivElement>(null);
    const scrollElem = React.useRef<any | undefined>(undefined);
    const theme = useTheme();

    const handleScrollUpdate = React.useCallback(() => {
        scrollElem.current.update();
    }, []);

    const setRefTableHeader = (node: HTMLElement | null) => store.addRefAction("table-header", node);
    const setRefTableContent = (node: HTMLElement | null) => store.addRefAction("table-content", node);
    const setRefGridInline = (node: HTMLElement | null) => store.addRefAction("grid-inline", node);
    const setRefBody = (node: HTMLElement | null) => store.addRefAction("body", node);

    const handleScrollFrameBody = (values: ScrollbalrsValuesType) => {
        store.setScrollTopAction(values.scrollTop);

        if (headerRef.current) {
            headerRef.current.scrollLeft = values.scrollLeft;
        }
    };

    const handleTableFocus = (event: React.FocusEvent<HTMLDivElement>) => {
        const {currentTarget} = event;

        if (currentTarget === document.activeElement) {
            const selectedRow = currentTarget.querySelector(".selected-row");
            const row = selectedRow ? selectedRow : currentTarget.querySelector("tr");

            if (row instanceof HTMLTableRowElement && selectedRow instanceof HTMLTableRowElement) {
                handleSelectRow(selectedRow, row, row.querySelector(QUERY_GRID_ELEMENT));
            }

            setFocused(true);
        }
    };

    const handleTableBlur = () => {
        const node: HTMLElement | undefined = store.refs.get("table-content");

        requestAnimationFrame(() => {
            if (!node || !node.contains(document.activeElement)) {
                setFocused(false);
            }
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (!store.isEdit && GRID_FOCUS_KEYS.indexOf(event.keyCode) !== -1) {
            const tr = document.activeElement?.closest("tr");

            event.preventDefault();

            if (tr instanceof HTMLTableRowElement && !store.recordsStore.isLoading && !pageStore.isLoading) {
                focusAfterKeyDown(tr, event.keyCode);
            }
        }
    };

    const handleGridBodyMouseDown = (event: React.MouseEvent) => {
        if (event.shiftKey || event.ctrlKey || event.metaKey) {
            // UBCOM-7450: prevent border in FF
            event.preventDefault();
        }
    };

    React.useEffect(() => {
        const disposers = [
            observe(store.columnsWidth, handleScrollUpdate),
            observe(store.recordsStore.expansionRecords, handleScrollUpdate),
        ];

        return () => {
            disposers.forEach((disposer) => disposer());
        };
    }, [handleScrollUpdate, store]);

    return useObserver(() => {
        const {pageSize, recordsCount, pageNumber} = store.recordsStore;
        const height = store.gridHeight + SCROLL_WEIGHT;

        return (
            <Grid container spacing={0} direction="column" justify="space-between">
                <Grid item xs zeroMinWidth className={classes.headerItem}>
                    <div className={classes.headerScroll} ref={headerRef}>
                        <Table
                            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-table-header`}
                            ref={setRefTableHeader}
                            className={classes.tableHeader}
                        >
                            <GridTableHeader {...classProps} store={store} />
                        </Table>
                    </div>
                </Grid>
                <Grid item xs zeroMinWidth>
                    <Scrollbars
                        autoHeight={true}
                        autoHeightMin={height}
                        autoHeightMax={height}
                        onScrollFrame={handleScrollFrameBody}
                        // @ts-ignore
                        scrollbarsRef={scrollElem}
                        hideTracksWhenNotNeeded
                        preventAltScroll
                        pageStore={pageStore}
                    >
                        <div
                            ref={setRefTableContent}
                            onFocus={handleTableFocus}
                            onBlur={handleTableBlur}
                            onKeyDown={handleKeyDown}
                            tabIndex={
                                focused ||
                                !classProps.visible ||
                                store.recordsStore.records.length === 0 ||
                                store.isInlineEditing
                                    ? -1
                                    : 0
                            }
                        >
                            {bc.edittype === "inline" ? <div ref={setRefGridInline} /> : null}
                            <Table
                                data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-table-body`}
                                className={classes.tableBodyRoot}
                            >
                                <GridColgroup store={store} />
                                <TableBody ref={setRefBody} onMouseDown={handleGridBodyMouseDown}>
                                    {children}
                                </TableBody>
                            </Table>
                        </div>
                    </Scrollbars>
                </Grid>
                <Grid item>
                    {pageSize && theme.palette.type === "dark" ? (
                        <Pagination
                            disabled={store.isInlineEditing || classProps.disabled}
                            ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                            count={recordsCount}
                            rowsPerPage={pageSize}
                            page={pageNumber}
                            onChangePage={store.recordsStore.setPageNumberAction}
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
    });
};
