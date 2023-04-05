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
import {useObserver} from "mobx-react";
import {FormContext} from "@essence-community/constructor-share/context";
import {reaction} from "mobx";
import {GridHeaderResizer} from "../components/GridHeaderResizer";
import {GridHeaderFilter} from "../components/GridHeaderFilter";
import {useStyles} from "./GridHeaderDefaultContainer.styles";

export const GridHeaderDefaultContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const [trans] = useTranslation("meta");
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const transCvDisplayed = displayed && trans(displayed);
    const classes = useStyles();
    const formContext = React.useContext(FormContext);
    const [isFilter, setFilter] = React.useState(false);
    const handleSort = async () => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
        const column = bc.order?.[0].property || bc.column;

        if (store && store.recordsStore && column) {
            const [{property}] = store.recordsStore.order;
            const isSortable = property === bc.order?.[0].property || property === bc.column;
            let order = [...store.recordsStore.order];

            if (!isSortable) {
                if (bc.order) {
                    order = [...bc.order];
                } else {
                    order = [
                        {
                            datatype: bc.datatype,
                            direction: "ASC",
                            format: bc.format,
                            property: column,
                        },
                    ];
                }
            } else {
                order = order.map((val) => {
                    if (val.property === column) {
                        return {
                            ...val,
                            direction: val.direction === "ASC" ? "DESC" : "ASC",
                        };
                    }

                    return val;
                });
            }

            if (store.handlers.onApplyFilters) {
                const isValid = await store.handlers.onApplyFilters("1", bc, {});

                if (isValid) {
                    store.recordsStore.setOrderAction(order);
                }
            } else {
                store.recordsStore.setOrderAction(order);
            }
        }
    };

    React.useEffect(() => {
        if (!formContext || !bc.column) {
            return;
        }

        return reaction(
            () =>
                Object.values(formContext?.values || {}).findIndex((val: any) =>
                    typeof val === "object" ? val?.property === bc.column : false,
                ) > -1,
            setFilter,
            {
                fireImmediately: true,
            },
        );
    }, [formContext, bc]);

    return useObserver(() => {
        const store = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);

        if (!store || !store.recordsStore) {
            return null;
        }

        const [{direction, property}] = store.recordsStore.order;
        const lowerDirection = direction === "ASC" ? "asc" : "desc";
        const isSortable = property === bc.order?.[0].property || property === bc.column;
        const isTreeGrid = store.bc.type === "TREEGRID";
        const isFilterAble =
            ((typeof store.bc.btnfilter === "undefined" && !isTreeGrid) || store.bc.btnfilter) &&
            (typeof bc.btnfilter === "undefined" || bc.btnfilter);

        return (
            <TableCell
                data-qtip={transCvDisplayed}
                sortDirection={isSortable ? lowerDirection : false}
                className={cn(classes.tableCell, {
                    [classes.tableCellActive]: isSortable,
                    [classes.filterSelect]: isFilter,
                })}
                padding="none"
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                <div className={classes.tableCellContent}>
                    <TableSortLabel
                        disabled={props.disabled || !(typeof bc.sortable === "undefined" || bc.sortable)}
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
                    {isFilterAble ? <GridHeaderFilter {...props} classNameIcon={classes.filterIcon} /> : null}
                    <GridHeaderResizer store={store} bc={bc} ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]} />
                </div>
            </TableCell>
        );
    });
};
