// @flow
import * as React from "react";
import {IconButton} from "@material-ui/core";
import {isBool} from "@essence-community/constructor-share/utils";
import {Icon} from "@essence-community/constructor-share/Icon";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import GridColumnLink from "./GridColumnLink/GridColumnLink";
import {type GridColumnPropsType} from "./GridColumnTypes";

const getIconComponent = ({bc, record}) => {
    if (isBool(bc.dynamicicon)) {
        return <Icon iconfont={record[bc.iconfontColumn]} iconfontname={record[bc.iconfontNameColumn]} size="xs" />;
    }

    return <Icon iconfont={bc.iconfont} iconfontname={bc.iconfontname} size="xs" />;
};

// eslint-disable-next-line max-lines-per-function
export const GridColumnIcon = ({
    bc,
    className,
    record = {},
    gridBc,
    readOnly,
    disabled,
    pageStore,
    visible,
}: GridColumnPropsType) => {
    const iconBc = React.useMemo(
        () => ({
            ...bc,
            iconsize: "xs",
            onlyicon: "true",
            type: "BTN",
            uitype: "7",
        }),
        [bc],
    );

    if (bc.handler === "showMenu") {
        return (
            <GridColumnLink
                bc={bc}
                record={record}
                iconComponent={getIconComponent({bc, record})}
                gridBc={gridBc}
                pageStore={pageStore}
                visible={visible}
                disabled={disabled}
            />
        );
    }

    if (isBool(bc.dynamicicon)) {
        return (
            <IconButton color="primary" disableRipple data-tabindex-grid="0" tabIndex="-1" className={className}>
                {getIconComponent({bc, record})}
            </IconButton>
        );
    }

    return mapComponentOne(iconBc, (ChildCmp, childBc) => (
        <ChildCmp bc={childBc} disabled={readOnly || disabled} pageStore={pageStore} visible={visible} />
    ));
};

export default GridColumnIcon;
