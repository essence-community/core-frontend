import {
    VAR_RECORD_ICON_FONT,
    VAR_RECORD_ICON_NAME,
    VAR_RECORD_ROUTE_NAME,
} from "@essence-community/constructor-share/constants/variables";
import {Icon} from "@essence-community/constructor-share/Icon";
import {Tab, Typography} from "@material-ui/core";
import cn from "clsx";
import {useObserver} from "mobx-react";
import * as React from "react";
import {reaction} from "mobx";
import {parseMemoize, useTranslation} from "@essence-community/constructor-share/utils";
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
        orientation,
        selected,
        onClose,
        onContextMenuCustom,
        pageIndex,
        onDragStartIndex,
        onDragEnterIndex,
        tabDragClassName,
        titleRoutePath,
        route,
        pagesStore,
        ...materialTabProps
    } = props;
    const [isDrag, setIsDrag] = React.useState(false);
    const dragPosRef = React.useRef<typeof INITIAL_DRAG_POS>(INITIAL_DRAG_POS);
    const tabRef = React.useRef<HTMLDivElement | null>(null);
    const [label, setLabel] = React.useState("");
    const iconName: string = route ? String(route[VAR_RECORD_ICON_NAME]) : "";
    const [trans] = useTranslation("meta");
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

    React.useEffect(() => {
        if (route[VAR_RECORD_ROUTE_NAME]) {
            setLabel(trans(String(route[VAR_RECORD_ROUTE_NAME])));
        }
        if (route.titlerules) {
            return reaction(
                () =>
                    parseMemoize(route.titlerules as string).runer({
                        get: (name: string) => value.globalValues.get(name) as string,
                    }) as string,
                setLabel,
                {
                    fireImmediately: true,
                },
            );
        }
    }, [route, trans, value]);
    const iconNode = iconName && (
        <Icon
            iconfont={iconName}
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

    return useObserver(() => (
        <Tab
            value={value}
            icon={iconNode}
            data-qtip={titleRoutePath}
            data-page-object={`tab-${value}`}
            component="div"
            ref={tabRef}
            selected={value === pagesStore.activePage}
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
                root: cn([classes.tabRoot, classes[`${orientation}TabRoot`], isDrag && tabDragClassName]),
                selected: classes.activeTab,
                wrapper: selected ? classes.activeTabWrapper : classes.tabWrapper,
            }}
            onContextMenu={handleClickContext}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
        />
    ));
});
