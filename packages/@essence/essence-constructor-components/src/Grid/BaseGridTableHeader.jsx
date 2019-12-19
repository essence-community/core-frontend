/* eslint-disable max-lines-per-function */
// @flow
import * as React from "react";
import cn from "classnames";
import {reaction} from "mobx";
import {observer} from "mobx-react";
import values from "lodash/values";
import {compose} from "recompose";
import {TableHead, TableRow, TableCell, TableSortLabel} from "@material-ui/core";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence/essence-constructor-share/constants";
import {type GridModelType} from "../stores/GridModel";
import {type PageModelType} from "../stores/PageModel";
import BuilderForm from "../Form/BuilderForm";
import {isEmpty} from "../utils/base";
import {type BuilderGridType} from "./BuilderGridType";
import {columnsHeaderMap} from "./GridColumnHeader";
import GridColgroup from "./GridComponents/GridColgroup";
import GridHeaderResizer from "./GridComponents/GridHeaderResizer";
import GridColumnFilter from "./GridComponents/GridColumnFilter/GridColumnFilter";

export const WIDTH_MAP = {
    action: 30,
    checkbox: 30,
    detail: 30,
    icon: 30,
};

export const PADDING_MAP = {
    action: "none",
    checkbox: "none",
    detail: "none",
    icon: "none",
};

type PropsType = WithT & {
    classes: Object,
    store: GridModelType,
    property?: string,
    lowerDirection: "asc" | "desc",
    disabled?: boolean,
    readOnly?: boolean,
    bc: BuilderGridType,
    pageStore: PageModelType,
    visible: boolean,
};

type StateType = {
    initialValues: Object,
    filterResetCount: number,
};

class BaseGridTableHeader extends React.Component<PropsType, StateType> {
    state = {
        filterResetCount: 0,
        initialValues: {},
    };

    disposers: Array<Function> = [];

    componentDidMount() {
        this.disposers.push(reaction(() => this.props.store.recordsStore.filter, this.handleChangeFilter));
    }

    componentWillUnmount() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    }

    handleSubmit = async (data: Object) => {
        const {store} = this.props;
        const {recordsStore} = store;
        const storeFilters = recordsStore.filter || [];
        const filter = values(data).filter((value) => Boolean(value));

        if ((filter.length !== 0 || storeFilters.length !== 0) && (await store.applyFiltersAction())) {
            recordsStore.searchAction(recordsStore.searchValues, {filter});
        }
    };

    handleSort = (column: string) => async () => {
        const {store} = this.props;
        const {recordsStore} = store;

        if (await store.applyFiltersAction()) {
            recordsStore.setOrderAction(column);
        }
    };

    handleChangeFilter = (filter?: Array<Object>) => {
        if (isEmpty(filter)) {
            this.setState((prevState) => ({
                filterResetCount: prevState.filterResetCount + 1,
                initialValues: {},
            }));
        }
    };

    render() {
        // eslint-disable-next-line id-length
        const {classes, property, lowerDirection, disabled, store, bc, readOnly, pageStore, visible, t} = this.props;
        const isTreeGrid = bc.type === "TREEGRID";

        const tableHead = (
            <TableHead className={classes.tableHead}>
                <TableRow className={cn(classes.tableRow)}>
                    {store.gridColumns.map((bcColumn) => {
                        const {
                            [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                            [VAR_RECORD_DISPLAYED]: displayed,
                            column,
                            type,
                            datatype,
                            width,
                            sortcolumn,
                            align,
                        } = bcColumn;

                        const transCvDisplayed = t(displayed);

                        if (datatype === "detail") {
                            return <TableCell key={ckPageObject} padding="none" className={classes.tableHeadButton} />;
                        }

                        return columnsHeaderMap[datatype] ? (
                            <TableCell
                                className={classes.tableHeadButton}
                                key={ckPageObject}
                                padding="none"
                                data-page-object={ckPageObject}
                            >
                                {React.createElement(columnsHeaderMap[datatype], {
                                    bc: {
                                        [VAR_RECORD_DISPLAYED]: transCvDisplayed,
                                        [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                                        column,
                                        datatype,
                                        type,
                                        width,
                                    },
                                    classes,
                                    disabled,
                                    readOnly,
                                    store,
                                })}
                            </TableCell>
                        ) : (
                            <TableCell
                                data-qtip={transCvDisplayed}
                                sortDirection={property === sortcolumn || property === column ? lowerDirection : false}
                                key={ckPageObject}
                                className={cn(classes.tableCell, {
                                    [classes.tableCellActive]: property === sortcolumn || property === column,
                                })}
                                padding="none"
                                data-page-object={ckPageObject}
                            >
                                <div className={classes.tableCellContent}>
                                    <TableSortLabel
                                        disabled={disabled}
                                        active={property === sortcolumn || property === column}
                                        direction={lowerDirection}
                                        className={cn(classes.tableSortLabel, {
                                            [classes[`align-${align}`]]: align,
                                        })}
                                        tabIndex="-1"
                                        onClick={this.handleSort(sortcolumn || column)}
                                    >
                                        <span className={classes.tableCellEllipsis}>{transCvDisplayed}</span>
                                    </TableSortLabel>
                                    {isTreeGrid ? null : (
                                        <GridColumnFilter
                                            store={store}
                                            bc={bcColumn}
                                            disabled={disabled}
                                            className={classes.gridColumnFilter}
                                            filterResetCount={this.state.filterResetCount}
                                            pageStore={pageStore}
                                            visible={visible}
                                        />
                                    )}
                                    <GridHeaderResizer store={store} ckPageObject={ckPageObject} classes={classes} />
                                </div>
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );

        if (isTreeGrid) {
            return (
                <React.Fragment>
                    <GridColgroup store={store} />
                    {tableHead}
                </React.Fragment>
            );
        }

        return (
            <BuilderForm
                noForm
                submitOnChange
                onSubmit={this.handleSubmit}
                initialValues={this.state.initialValues}
                pageStore={pageStore}
            >
                <GridColgroup store={store} />
                {tableHead}
            </BuilderForm>
        );
    }
}

export default compose(withTranslation("meta"), observer)(BaseGridTableHeader);
