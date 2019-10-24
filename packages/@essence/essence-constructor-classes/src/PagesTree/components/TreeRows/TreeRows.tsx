import {Collapse} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {TreeRow} from "../TreeRow/TreeRow";
import {IRoute} from "../TreeRow/TreeRow.types";
import {useStyles} from "./TreeRows.styles";
import {ITreeRowsProps} from "./TreeRows.types";

export const TreeRows: React.FC<ITreeRowsProps> = (props) => {
    const {ckParent, routesStore, pagesStore, level, treeModel} = props;
    const classes = useStyles(props);

    return useObserver(() => {
        const isClose = ckParent !== null && !treeModel.expansionRecords.get(ckParent);

        const records = routesStore.recordsStore.records.filter((record) => record.ckParent === ckParent);

        return (
            <Collapse in={!isClose} className={classes.menuGridRows} mountOnEnter unmountOnExit>
                {records.map((record: IRoute) => (
                    <React.Fragment key={record.ckId}>
                        <TreeRow
                            route={record}
                            routesStore={routesStore}
                            treeModel={treeModel}
                            level={level}
                            isOpen={Boolean(treeModel.expansionRecords.get(record.ckId))}
                            pagesStore={pagesStore}
                        />
                        <TreeRows
                            level={level + 1}
                            ckParent={record.ckId}
                            routesStore={routesStore}
                            pagesStore={pagesStore}
                            treeModel={treeModel}
                        />
                    </React.Fragment>
                ))}
            </Collapse>
        );
    });
};
