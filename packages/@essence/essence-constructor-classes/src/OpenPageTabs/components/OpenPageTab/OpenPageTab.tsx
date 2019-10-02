import {Icon} from "@essence/essence-constructor-share/Icon";
import {Tab, Typography} from "@material-ui/core";
import cn from "classnames";
import omit from "lodash/omit";
import * as React from "react";
import { IOpenTabProps } from "./OpenPageTab.types";

export const OpenPageTab = (props: IOpenTabProps) => {
    const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.onClose) {
            props.onClose(props.value);
        }
    };

    const handleClickContext = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.onContextMenu(event, props.value);
    };
    const { classes, value, iconfont, orientation, selected, label, ...materialTabProps } = props;
    const iconNode = iconfont && (
        <Icon iconfont={iconfont} className={cn(classes.tabIcon, {[classes.activeTabIcon]: selected})} />
    );

    return (
        <Tab
            value={value}
            icon={iconNode}
            data-qtip={label}
            data-page-object={`tab-${value}`}
            component={"div"}
            tabIndex="-1"
            label={
                <React.Fragment>
                    <Typography variant="body2" noWrap color="inherit" className={classes.text}>
                        {label}
                    </Typography>
                    <div onClick={handleClose} className={selected ? classes.activeCloseIcon : classes.closeIcon}>
                        <Icon
                            iconfont="times"
                        />
                    </div>                   
                </React.Fragment>
            }
            classes={{
                root: cn([classes.tabRoot, classes[`${orientation}TabRoot`]]),
                selected: classes.activeTab,
                wrapper: selected ? classes.activeTabWrapper : classes.tabWrapper,
            }}
            disableRipple
            {...omit(materialTabProps, ["onClose", "classes"])}
            onContextMenu={handleClickContext}
        />
    );
};