import * as React from "react";
import {IRecord, IClassProps, FieldValue} from "@essence-community/constructor-share/types";
import {TableHead, TableRow} from "@material-ui/core";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {getComponent} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share";
import {useObserver} from "mobx-react";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {GridColgroup} from "../GridColgroup";
import {useStyles} from "./GridTableHeader.styles";

interface IGridTableHeaderProps extends IClassProps {
    store: IGridModel;
}

export const GridTableHeader: React.FC<IGridTableHeaderProps> = (props) => {
    const {store, ...classProps} = props;
    const isTreeGrid = classProps.bc.type === "TREEGRID";
    const classes = useStyles();

    const handleSubmit = async (data: IRecord) => {
        const filter = Object.values(data).filter((value) => Boolean(value)) as Record<string, FieldValue>[];
        const isValid = await store.applyFiltersAction();

        await store.recordsStore.searchAction(store.recordsStore.searchValues, {filter, noLoad: !isValid});
    };

    return useObserver(() => {
        const tableHead = (
            <TableHead className={classes.tableHead}>
                <TableRow className={classes.tableRow}>
                    {store.gridColumns.map((bcColumn) => {
                        const Component =
                            getComponent(`GRID_HEADER.${bcColumn.datatype?.toUpperCase()}`) ||
                            getComponent("GRID_HEADER.DEFAULT");

                        if (Component) {
                            return (
                                <Component key={bcColumn[VAR_RECORD_PAGE_OBJECT_ID]} {...classProps} bc={bcColumn} />
                            );
                        }

                        return null;
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
            <UIForm noForm submitOnChange onSubmit={handleSubmit} pageStore={props.pageStore} bc={classProps.bc}>
                <GridColgroup store={store} />
                {tableHead}
            </UIForm>
        );
    });
};
