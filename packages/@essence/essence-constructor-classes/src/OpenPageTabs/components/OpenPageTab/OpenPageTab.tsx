import {Icon} from "@essence-community/constructor-share/Icon";
import {Tab, Typography} from "@material-ui/core";
import cn from "classnames";
import * as React from "react";
import {useStyles} from "./OpenPageTab.styles";
import {IOpenTabProps} from "./OpenPageTab.types";

const handlePreventDefault = (event: DragEvent) => {
    event.preventDefault();
};

export const OpenPageTab: React.FC<IOpenTabProps> = (props) => {
    const classes = useStyles(props);
    const {
        value,
        iconfont,
        orientation,
        selected,
        label,
        onClose,
        onContextMenuCustom,
        pageIndex,
        onDragStartIndex,
        onDragEnterIndex,
        ...materialTabProps
    } = props;
    const [isDrag, setIsDrag] = React.useState<boolean>(false);
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
    const handleDragStart = () => {
        onDragStartIndex(pageIndex);
        requestAnimationFrame(() => {
            setIsDrag(true);
        });

        // Prevent animation on drag end
        document.addEventListener("dragover", handlePreventDefault);
        document.addEventListener("drop", handlePreventDefault);
    };
    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        onDragEnterIndex(pageIndex);
    };
    const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDrag(false);

        // Prevent animation on drag end
        document.removeEventListener("dragover", handlePreventDefault);
        document.removeEventListener("drop", handlePreventDefault);
    };

    return (
        <Tab
            value={value}
            icon={iconNode}
            data-qtip={label}
            data-page-object={`tab-${value}`}
            component="div"
            draggable
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
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
                root: cn([classes.tabRoot, classes[`${orientation}TabRoot`], isDrag && classes.tabDrag]),
                selected: classes.activeTab,
                wrapper: selected ? classes.activeTabWrapper : classes.tabWrapper,
            }}
            onContextMenu={handleClickContext}
        />
    );
};
