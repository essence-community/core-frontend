import {
    VAR_RECORD_APP_URL,
    VAR_RECORD_ICON_FONT,
    VAR_SETTING_BASE_PATH,
} from "@essence-community/constructor-share/constants/variables";
import {Icon} from "@essence-community/constructor-share/Icon";
import {settingsStore} from "@essence-community/constructor-share/models";
import {Tab, Typography} from "@material-ui/core";
import cn from "classnames";
import * as React from "react";
import {useStyles} from "./OpenPageTab.styles";
import {IOpenTabProps} from "./OpenPageTab.types";

const INITIAL_DRAG_POS = {
    posX: 0,
    posY: 0,
};

export const OpenPageTab: React.FC<IOpenTabProps> = React.memo((props) => {
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
        tabDragClassName,
        titleRoutePath,
        route,
        ...materialTabProps
    } = props;
    const [isDrag, setIsDrag] = React.useState(false);
    const dragPosRef = React.useRef<typeof INITIAL_DRAG_POS>(INITIAL_DRAG_POS);
    const tabRef = React.useRef<HTMLDivElement | null>(null);
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
        <Icon
            iconfont={iconfont}
            iconfontname={route ? (String(route[VAR_RECORD_ICON_FONT]) as "fa" | "mdi") : "fa"}
            className={cn(classes.tabIcon, {[classes.activeTabIcon]: selected})}
        />
    );

    const handleMouseMove = React.useCallback((event: MouseEvent) => {
        const {posX, posY} = dragPosRef.current;
        const delta = Math.abs(posX - event.clientX) + Math.abs(posY - event.clientY);

        if (delta > 10) {
            dragPosRef.current = {
                posX: event.clientX,
                posY: event.clientY,
            };

            setIsDrag(true);
        }
    }, []);
    const handleMouseUp = React.useCallback(() => {
        setIsDrag(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    }, [handleMouseMove]);

    const handleMouseDown = (event: React.MouseEvent) => {
        dragPosRef.current = {
            posX: event.clientX,
            posY: event.clientY,
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseOver = () => {
        onDragEnterIndex(pageIndex);
    };

    React.useEffect(() => {
        if (isDrag) {
            onDragStartIndex(pageIndex, dragPosRef.current, tabRef.current);

            document.removeEventListener("mousemove", handleMouseMove);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleMouseMove, isDrag, onDragStartIndex]);

    React.useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);

    const handleUrl = (event) => {
        event.stopPropagation();
        event.preventDefault();
        materialTabProps.onChange(event, value);
    };

    return (
        <Tab
            value={value}
            icon={iconNode}
            data-qtip={titleRoutePath}
            data-page-object={`tab-${value}`}
            component="div"
            ref={tabRef}
            label={
                <React.Fragment>
                    <a
                        href={
                            route
                                ? // eslint-disable-next-line max-len
                                  `${settingsStore.settings[VAR_SETTING_BASE_PATH]}${route[VAR_RECORD_APP_URL]}/${value}`
                                : undefined
                        }
                        className={classes.tabLink}
                        onClick={handleUrl}
                    >
                        <Typography variant="body2" noWrap color="inherit" className={classes.text}>
                            {label}
                        </Typography>
                    </a>
                    <div onClick={handleClose} className={selected ? classes.activeCloseIcon : classes.closeIcon}>
                        <Icon iconfont="times" />
                    </div>
                </React.Fragment>
            }
            disableRipple
            {...materialTabProps}
            classes={{
                root: cn([classes.tabRoot, classes[`${orientation}TabRoot`], isDrag && tabDragClassName]),
                selected: classes.activeTab,
                wrapper: selected ? classes.activeTabWrapper : classes.tabWrapper,
            }}
            onContextMenu={handleClickContext}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
        />
    );
});
