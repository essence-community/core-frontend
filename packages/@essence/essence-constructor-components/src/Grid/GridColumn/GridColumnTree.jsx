// @flow
import * as React from "react";
import GridColumnDetailSchevron from "./GridColumnDetailSchevron/GridColumnDetailSchevron";
import GridColumnTreeIcons from "./GridColumnTreeIcons";
import {type GridColumnPropsType} from "./GridColumnTypes";
import {columnsMap, BaseGridColumn} from "./index";

const NESTING_SPACING = 16;
const LEAF_ICON_WIDTH = 30;

const GridColumnTree = ({
    record = {},
    store,
    pageStore,
    bc,
    visible,
    value,
    disabled,
    readOnly,
    qtip,
    className,
}: GridColumnPropsType) => {
    const CellComponent = columnsMap[bc.datatypeBase] || BaseGridColumn;
    const isLeaf = record.leaf === "true";
    const addPadding = isLeaf ? LEAF_ICON_WIDTH : 0;

    return (
        <span
            style={{
                paddingLeft: record.nesting ? record.nesting * NESTING_SPACING + addPadding : addPadding,
            }}
        >
            {isLeaf ? null : (
                <GridColumnDetailSchevron
                    bc={bc}
                    record={record}
                    store={store}
                    pageStore={pageStore}
                    gridBc={bc}
                    visible={visible}
                    className={className}
                />
            )}

            <GridColumnTreeIcons record={record} store={store} />

            {record && record.type === "root" ? (
                "Корневой каталог"
            ) : (
                <CellComponent
                    bc={{
                        ...bc,
                        datatype: bc.datatypeBase,
                    }}
                    value={value}
                    record={record}
                    gridBc={bc}
                    store={store}
                    pageStore={pageStore}
                    disabled={disabled}
                    readOnly={readOnly}
                    qtip={qtip}
                    visible={visible}
                    className={className}
                />
            )}
        </span>
    );
};

export default GridColumnTree;
