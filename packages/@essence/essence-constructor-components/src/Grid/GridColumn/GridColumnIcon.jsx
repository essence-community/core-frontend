// @flow
import * as React from "react";
import {IconButton} from "@material-ui/core";
import {isBool} from "@essence/essence-constructor-share/utils";
import {Icon} from "@essence/essence-constructor-share/Icon";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import GridColumnLink from "./GridColumnLink/GridColumnLink";
import {type GridColumnPropsType} from "./GridColumnTypes";

const BUTTON_COMPONENT_PROPS = {
    "data-tabindex-grid": "0",
};

const getIconComponent = ({bc, record}) => {
    if (isBool(bc.dynamicicon)) {
        return <Icon iconfont={record[bc.iconfontColumn]} iconfontname={record[bc.iconfontNameColumn]} size="xs" />;
    }

    return <Icon iconfont={bc.iconfont} iconfontname={bc.iconfontname} size="xs" />;
};

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
            <IconButton color="primary" className={className} disableRipple data-tabindex-grid="0" tabIndex="-1">
                {getIconComponent({bc, record})}
            </IconButton>
        );
    }

    // $FlowFixMe
    const iconBc = React.useMemo(
        () => ({
            ...bc,
            iconsize: "xs",
        }),
        [bc],
    );

    return (
        <BuilderMobxButton
            className={className}
            bc={iconBc}
            record={record}
            disabled={readOnly || disabled}
            pageStore={pageStore}
            visible={visible}
            tabIndex="-1"
            onlyicon
            componentProps={BUTTON_COMPONENT_PROPS}
            preventFocus={false}
        />
    );
};

export default GridColumnIcon;
