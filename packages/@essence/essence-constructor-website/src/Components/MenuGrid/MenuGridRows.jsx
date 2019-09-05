// @flow

import * as React from "react";
import {observer} from "mobx-react";
import Collapse from "@material-ui/core/Collapse";
import MenuGridRow from "./MenuGridRow";

type PropsType = {|
    routesStore: {
        expansionRecords: Map<null | string | number, boolean>,
        recordsStore: {
            records: Array<Object>,
        },
    },
    pagesStore: Object,
    ckParent: null | string | number,
    level: number,
    className?: string,
|};

const BaseMenuGridRows = ({routesStore, ckParent, level, pagesStore, className}: PropsType) => {
    const isClose = ckParent !== null && !routesStore.expansionRecords.get(ckParent);

    const records = routesStore.recordsStore.records.filter((record) => record.ckParent === ckParent);

    return (
        <Collapse in={!isClose} className={className} mountOnEnter unmountOnExit>
            <React.Fragment>
                {records.map((record) => (
                    <React.Fragment key={record.ckId}>
                        <MenuGridRow
                            route={record}
                            routesStore={routesStore}
                            level={level}
                            isOpen={Boolean(routesStore.expansionRecords.get(record.ckId))}
                            pagesStore={pagesStore}
                        />
                        <MenuGridRows
                            level={level + 1}
                            ckParent={record.ckId}
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
