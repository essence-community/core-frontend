// @flow
import * as React from "react";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_LEAF} from "@essence/essence-constructor-share/constants";
import GridColumnDetailSchevron from "./GridColumnDetailSchevron/GridColumnDetailSchevron";
import GridColumnTreeIcons from "./GridColumnTreeIcons";
import {type GridColumnPropsType} from "./GridColumnTypes";
import {columnsMap, BaseGridColumn} from "./index";

const NESTING_SPACING = 16;
const LEAF_ICON_WIDTH = 30;

// eslint-disable-next-line max-lines-per-function
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
    trans,
    // eslint-disable-next-line id-length
    t,
}: GridColumnPropsType & WithT) => {
    const CellComponent = columnsMap[bc.datatypeBase] || BaseGridColumn;
    const isLeaf = record[VAR_RECORD_LEAF] === "true";
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
                t("e3e33760864d44f88a9ecfe8f5da7a0b")
            ) : (
                <CellComponent
                    bc={{
                        ...bc,
                        datatype: bc.datatypeBase,
                    }}
                    value={trans ? trans(value) : value}
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

export default withTranslation("meta")(GridColumnTree);
