import * as React from "react";
import {TableCell, TableSortLabel} from "@material-ui/core";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react-lite";
import {GridHeaderResizer} from "../components/GridHeaderResizer";
import {GridHeaderFilter} from "../components/GridHeaderFilter";
import {useStyles} from "./GridHeaderDefaultContainer.styles";

export const GridHeaderDefaultContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const [trans] = useTranslation("meta");
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const transCvDisplayed = displayed && trans(displayed);
    const classes = useStyles();
    const handleSort = () => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
        const column = bc.sortcolumn || bc.column;

        if (store && store.recordsStore && column) {
            store.recordsStore.setOrderAction(column);
        }
    };

    return useObserver(() => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

        if (!store || !store.recordsStore) {
            return null;
        }

        const {direction, property} = store.recordsStore.order;
        const lowerDirection = direction === "ASC" ? "asc" : "desc";
        const isSortable = property === bc.sortcolumn || property === bc.column;
        const isTreeGrid = store.bc.type === "TREEGRID";

        return (
            <TableCell
                data-qtip={transCvDisplayed}
                sortDirection={isSortable ? lowerDirection : false}
                className={cn(classes.tableCell, {
                    [classes.tableCellActive]: isSortable,
                })}
                padding="none"
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                <div className={classes.tableCellContent}>
                    <TableSortLabel
                        disabled={props.disabled}
                        active={isSortable}
                        direction={lowerDirection}
                        className={cn(classes.tableSortLabel, {
                            [classes[`align-${bc.align}` as keyof typeof classes]]: bc.align,
                        })}
                        tabIndex={-1}
                        onClick={handleSort}
                    >
                        <span className={classes.tableCellEllipsis}>{transCvDisplayed}</span>
                    </TableSortLabel>
                    {isTreeGrid || !bc.btnfilter ? null : (
                        <GridHeaderFilter {...props} classNameIcon={classes.filterIcon} />
                    )}
                    <GridHeaderResizer store={store} ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]} />
                </div>
            </TableCell>
        );
    });
};
