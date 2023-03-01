import {Collapse} from "@material-ui/core";
import {useObserver} from "mobx-react";
import * as React from "react";
import {VAR_RECORD_ID, VAR_RECORD_ROUTE_VISIBLE_MENU} from "@essence-community/constructor-share/constants/variables";
import {TreeRow} from "../TreeRow/TreeRow";
import {IRoute} from "../TreeRow/TreeRow.types";
import {useStyles} from "./TreeRows.styles";
import {ITreeRowsProps} from "./TreeRows.types";

export const TreeRows: React.FC<ITreeRowsProps> = (props) => {
    const {parent, pageStore, routesStore, pagesStore, level, treeModel} = props;
    const classes = useStyles(props);

    return useObserver(() => {
        const isClose = parent !== null && !treeModel.expansionRecords.get(parent);

        const records = routesStore.recordsStore.records.filter(
            (record) =>
                !treeModel.hiddenRecords.get(record[VAR_RECORD_ID] as any) &&
                record[routesStore.recordsStore.recordParentId] === parent &&
                record[VAR_RECORD_ROUTE_VISIBLE_MENU],
        );

        if (!records.length) {
            return null;
        }

        return (
            <Collapse
                in={!isClose}
                className={classes.menuGridRows}
                mountOnEnter
                unmountOnExit
                classes={{wrapper: classes.menuGridRowsWrapper}}
            >
                {records.map((record: IRoute) => {
                    const id = record[VAR_RECORD_ID];

                    return (
                        <React.Fragment key={id}>
                            <TreeRow
                                route={record}
                                pageStore={pageStore}
                                routesStore={routesStore}
                                treeModel={treeModel}
                                level={level}
                                isOpen={Boolean(treeModel.expansionRecords.get(id))}
                                pagesStore={pagesStore}
                            />
                            <TreeRows
                                level={level + 1}
                                parent={id}
                                pageStore={pageStore}
                                routesStore={routesStore}
                                pagesStore={pagesStore}
                                treeModel={treeModel}
                            />
                        </React.Fragment>
                    );
                })}
            </Collapse>
        );
    });
};
