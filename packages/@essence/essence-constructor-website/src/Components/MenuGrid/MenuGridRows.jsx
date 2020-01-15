// @flow

import * as React from "react";
import {observer} from "mobx-react";
import {Collapse} from "@material-ui/core";
import {VAR_RECORD_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import MenuGridRow from "./MenuGridRow";

type PropsType = {|
    routesStore: {
        expansionRecords: Map<null | string | number, boolean>,
        recordsStore: {
            records: Array<Object>,
        },
    },
    pagesStore: Object,
    parentId: null | string | number,
    level: number,
    className?: string,
|};

const BaseMenuGridRows = ({routesStore, parentId, level, pagesStore, className}: PropsType) => {
    const isClose = parentId !== null && !routesStore.expansionRecords.get(parentId);

    const records = routesStore.recordsStore.records.filter((record) => record[VAR_RECORD_PARENT_ID] === parentId);

    return (
        <Collapse in={!isClose} className={className} mountOnEnter unmountOnExit>
            <React.Fragment>
                {records.map((record) => (
                    <React.Fragment key={record[VAR_RECORD_ID]}>
                        <MenuGridRow
                            route={record}
                            routesStore={routesStore}
                            level={level}
                            isOpen={Boolean(routesStore.expansionRecords.get(record[VAR_RECORD_ID]))}
                            pagesStore={pagesStore}
                        />
                        <MenuGridRows
                            level={level + 1}
                            parentId={record[VAR_RECORD_ID]}
                            routesStore={routesStore}
                            pagesStore={pagesStore}
                        />
                    </React.Fragment>
                ))}
            </React.Fragment>
        </Collapse>
    );
};

const MenuGridRows = observer(BaseMenuGridRows);

export default MenuGridRows;
