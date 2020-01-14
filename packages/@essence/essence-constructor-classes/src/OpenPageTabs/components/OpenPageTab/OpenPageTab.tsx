import {Icon} from "@essence-community/constructor-share/Icon";
import {Tab, Typography} from "@material-ui/core";
import cn from "classnames";
import * as React from "react";
import {useStyles} from "./OpenPageTab.styles";
import {IOpenTabProps} from "./OpenPageTab.types";

export const OpenPageTab: React.FC<IOpenTabProps> = (props) => {
    const classes = useStyles(props);
    const {value, iconfont, orientation, selected, label, onClose, onContextMenuCustom, ...materialTabProps} = props;
    const handleClickContext = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onContextMenuCustom(event, props.value);
    };
    const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        if (onClose) {
            onClose(props.value);
        }
    };
    const iconNode = iconfont && (
        <Icon iconfont={iconfont} className={cn(classes.tabIcon, {[classes.activeTabIcon]: selected})} />
    );

    return (
        <Tab
            value={value}
            icon={iconNode}
            data-qtip={label}
            data-page-object={`tab-${value}`}
            tabIndex={-1}
            label={
                <React.Fragment>
                    <Typography variant="body2" noWrap color="inherit" className={classes.text}>
                        {label}
                    </Typography>
                    <div onClick={handleClose} className={selected ? classes.activeCloseIcon : classes.closeIcon}>
                        <Icon iconfont="times" />
                    </div>
                </React.Fragment>
            }
            disableRipple
            {...materialTabProps}
            classes={{
                root: cn([classes.tabRoot, classes[`${orientation}TabRoot`]]),
                selected: classes.activeTab,
                wrapper: selected ? classes.activeTabWrapper : classes.tabWrapper,
            }}
            onContextMenu={handleClickContext}
        />
    );
};
