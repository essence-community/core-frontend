import * as React from "react";
import {IClassProps, ICkId, IEssenceTheme} from "@essence-community/constructor-share/types";
import {isEmpty, useTranslation, toTranslateText} from "@essence-community/constructor-share/utils";
import {reaction} from "mobx";
import cn from "clsx";
import {Grid, useTheme, ThemeProvider} from "@material-ui/core";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {EmptyTitle} from "@essence-community/constructor-share/uicomponents";
import {useObserver} from "mobx-react";
import {updateGridWidth} from "../../utils";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {GridTable} from "../GridTable";
import {GridWarning} from "../GridWarning";
import {GridButtons} from "../GridButtons";
import {ColumnCheckHidden} from "../ColumnCheckHidden";
import {resetGridWidth} from "../../utils/resetGridWidth";
import {useStyles} from "./BaseGrid.styles";
import {makeTheme} from "./BaseGrid.overrides";

const FITER_ONE_BUTTON = 42;
const FILTER_THREE_BUTTON = 128;

interface IBaseGridProps extends IClassProps {
    store: IGridModel;
}

// eslint-disable-next-line max-statements, max-lines-per-function
export const BaseGrid: React.FC<IBaseGridProps> = ({store, children, ...classProps}) => {
    const {pageStore, visible, bc} = classProps;
    const classes = useStyles();
    const isHideActions = bc.hideactions === true;
    const [trans] = useTranslation("meta");
    const theme = useTheme<IEssenceTheme>();
    const isDarkTheme = theme.essence.layoutTheme === 2;
    const firstFilter = bc.filters?.[0];
    const transCvDisplayed = toTranslateText(trans, bc[VAR_RECORD_DISPLAYED]);
    const isFilterActionsPresent = firstFilter && !firstFilter.dynamicfilter;
    const classNameRoot = cn(classes.root, isHideActions ? undefined : classes.rootActions);
    const themeFilterNew = React.useMemo(() => makeTheme(theme), [theme]);
    let marginTop = 0;

    const handleResetGridWidth = React.useCallback(() => {
        resetGridWidth(store);
    }, [store]);

    const handleUpdateGridWidth = React.useCallback(() => {
        // UBCOM-7903 При переходе между страницамии не сразу отображается
        requestAnimationFrame(() => {
            updateGridWidth(store);
        });
    }, [store]);

    const isVisible = React.useMemo(() => {
        return visible !== false && pageStore.visible;
    }, [pageStore.visible, visible]);

    const handleUpdateWidth = React.useCallback(() => {
        if (isVisible) {
            handleUpdateGridWidth();
        }
    }, [handleUpdateGridWidth, isVisible]);

    const handlePageVisible = React.useCallback(
        (pageVisible: boolean) => {
            if (pageVisible && visible === undefined) {
                handleUpdateGridWidth();
            }
        },
        [handleUpdateGridWidth, visible],
    );

    const handleRecordsLoad = React.useCallback(() => {
        store.recordsStore.records.forEach((rec) => {
            if (
                (rec.expanded === "true" || rec.expanded === true) &&
                !store.recordsStore.expansionRecords.has(rec[store.recordsStore.recordId] as ICkId)
            ) {
                store.openCloseExpansionAction(rec[store.recordsStore.recordId] as ICkId, true);
            }
        });

        if (
            bc.autoselectidentity &&
            !isEmpty(store.recordsStore.searchValues[bc.autoselectidentity]) &&
            store.recordsStore.records.length > 0
        ) {
            store.recordsStore.setSelectionAction(store.recordsStore.records[0][store.recordsStore.recordId]);
        }
    }, [bc.autoselectidentity, store]);

    React.useEffect(() => {
        handleUpdateWidth();

        window.addEventListener("resize", handleUpdateWidth);

        const disposers = [
            reaction(() => store.recordsStore.records, handleRecordsLoad, {
                name: "BuilderBaseGrid.records.update",
            }),
            reaction(() => pageStore.visible, handlePageVisible),
            reaction(
                () => store.gridColumns,
                () => {
                    handleResetGridWidth();
                    handleUpdateGridWidth();
                },
                {
                    fireImmediately: true,
                },
            ),
        ];

        return () => {
            window.removeEventListener("resize", handleUpdateWidth);

            disposers.forEach((disposer) => disposer());
        };
    }, [handlePageVisible, handleRecordsLoad, handleUpdateGridWidth, handleUpdateWidth, pageStore.visible, store]);

    const setRefGridContent = (node: HTMLElement | null) => store.addRefAction("grid-content", node);
    const setRefGridInlineButton = (node: HTMLElement | null) => store.addRefAction("grid-inline-button", node);

    return useObserver(() => {
        const filterStore = firstFilter && pageStore.stores.get(firstFilter[VAR_RECORD_PAGE_OBJECT_ID]);

        if (isFilterActionsPresent && isDarkTheme) {
            if (firstFilter && firstFilter.topbtn && firstFilter.topbtn.length > 0) {
                marginTop = firstFilter.topbtn.length * FITER_ONE_BUTTON;
            } else {
                marginTop = filterStore && (filterStore as any).isOpen ? FILTER_THREE_BUTTON : FITER_ONE_BUTTON;
            }
        }

        const actionsComponent =
            isHideActions || bc.hiddenheader ? (
                <Grid style={{marginTop}} item className={theme.essence.layoutTheme === 2 && classes.tableActions}>
                    <div ref={setRefGridInlineButton} />
                </Grid>
            ) : (
                <Grid
                    style={{marginTop}}
                    item
                    className={store.isInlineEditing ? classes.editActionsGrid : classes.tableActions}
                >
                    <GridButtons isInlineEditing={store.isInlineEditing} {...classProps} store={store} />
                    <div ref={setRefGridInlineButton} />
                </Grid>
            );
        const filterComponent = (
            <ThemeProvider theme={themeFilterNew}>
                <Grid item xs={!isDarkTheme}>
                    {mapComponents(bc.filters, (ChildCmp, childBc) => (
                        <ChildCmp
                            key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                            {...classProps}
                            disabled={store.isInlineEditing || classProps.disabled}
                            bc={childBc}
                        />
                    ))}
                </Grid>
            </ThemeProvider>
        );
        const tableComponent = (
            <Grid item xs className={store.isInlineEditing ? "panel-editing-focus" : undefined}>
                <Grid
                    container
                    spacing={0}
                    direction={theme.essence.layoutTheme === 1 ? "column" : "row"}
                    wrap="nowrap"
                >
                    {theme.essence.layoutTheme === 1 ? actionsComponent : null}
                    <Grid
                        item
                        xs
                        className={`${classes.tableBodyItem} ${store.isInlineEditing ? classes.editableTable : ""}`}
                        zeroMinWidth
                        ref={setRefGridContent}
                    >
                        {bc.order === undefined || bc.order.length === 0 ? (
                            <GridWarning />
                        ) : (
                            <GridTable {...classProps} store={store}>
                                {children}
                            </GridTable>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        );

        if (isDarkTheme) {
            return (
                <Grid container direction="row" className={classNameRoot} wrap="nowrap">
                    {actionsComponent}
                    <Grid item container direction="column" className={classes.contentRoot}>
                        {bc.hiddenheader ? null : (
                            <Grid item className={classes.maxWidth}>
                                <EmptyTitle title={transCvDisplayed} filters={bc.filters} hideactions />
                            </Grid>
                        )}
                        {filterComponent}
                        {tableComponent}
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container direction="column" className={classNameRoot} wrap="nowrap">
                {filterComponent}
                {bc.hiddenheader ? null : (
                    <Grid item className={classes.maxWidth}>
                        <EmptyTitle title={transCvDisplayed} filters={bc.filters} />
                    </Grid>
                )}
                {store.gridColumnsInitial.map((col) => (
                    <ColumnCheckHidden key={col[VAR_RECORD_PAGE_OBJECT_ID]} bc={col} store={store} />
                ))}
                {tableComponent}
            </Grid>
        );
    });
};
