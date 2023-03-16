import {IClassProps, ApplicationContext, IRouteRecord, IPageModel} from "@essence-community/constructor-share";
import {
    VAR_RECORD_ID,
    VAR_RECORD_ROUTE_NAME,
    VAR_RECORD_ICON_NAME,
} from "@essence-community/constructor-share/constants/variables";
import {Tabs, Tab} from "@material-ui/core";
import {useObserver} from "mobx-react";
import * as React from "react";
import {noop, useTranslation} from "@essence-community/constructor-share/utils";
import ReactDOM from "react-dom";
import cn from "clsx";
import {OpenPageMenuContext} from "../components/OpenPageMenuContext/OpenPageMenuContext";
import {OpenPageTab} from "../components/OpenPageTab/OpenPageTab";
import {ScrollButton} from "../components/ScrollButton/ScrollButton";
import {IDragPos} from "../components/OpenPageTab/OpenPageTab.types";
import {useStyles} from "./OpenPageTabs.styles";

export interface IRoute extends IRouteRecord {
    [VAR_RECORD_ID]: string;
    [VAR_RECORD_ROUTE_NAME]: string;
    [VAR_RECORD_ICON_NAME]: string | undefined;
}

const INITIAL_DRAG = {
    deltaX: 0,
    deltaY: 0,
    height: 0,
    isDrag: false,
    posX: 0,
    posY: 0,
    width: 0,
};

// eslint-disable-next-line max-statements, max-lines-per-function
export const OpenPageTabs: React.FC<IClassProps> = React.memo(function OpenPageTabs(props) {
    const classes = useStyles(props);
    const applicationStore = React.useContext(ApplicationContext);

    if (!applicationStore) {
        throw new Error("Not found applicationStore");
    }
    const {bc} = props;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height ?? "42px",
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
        }),
        [bc.height, bc.maxheight, bc.minheight],
    );
    const dragElRef = React.useRef<HTMLDivElement | null>(null);
    const orientation = bc.contentview === "vbox" ? "vertical" : "horizontal";
    const {pagesStore} = applicationStore;
    const [isOpenMenu, setIsOpenMenu] = React.useState(false);
    const [dragHtml, setDragHtml] = React.useState("");
    const [menuPageValue, setMenuPageValue] = React.useState(null);
    const [menuPosition, setMenuPosition] = React.useState({
        left: 0,
        top: 0,
    });
    const dragIndexRef = React.useRef<undefined | number>();
    const hoverIndexRef = React.useRef<undefined | number>();
    const dragEventRef = React.useRef<typeof INITIAL_DRAG>(INITIAL_DRAG);
    const handleChangePage = (event: React.ChangeEvent, value: IPageModel) => {
        pagesStore.setPageAction(value, false);
    };
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: IPageModel) => {
        event.preventDefault();
        setIsOpenMenu(true);
        setMenuPageValue(value);
        setMenuPosition({
            left: event.pageX,
            top: event.pageY,
        });
    };

    const handleCloseMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setIsOpenMenu(false);
    };
    const handleMouseMove = React.useCallback((event: MouseEvent) => {
        const dragEl = dragElRef.current;

        if (dragEl) {
            dragEl.style.left = `${event.clientX - dragEventRef.current.deltaX}px`;
            dragEl.style.top = `${event.clientY - dragEventRef.current.deltaY}px`;
        }
    }, []);
    const handleMouseUp = React.useCallback(() => {
        dragEventRef.current = INITIAL_DRAG;
        dragIndexRef.current = undefined;
        hoverIndexRef.current = undefined;
        setDragHtml("");
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);
    const handeDragStartIndex = React.useCallback(
        (dragStartIndex: number, dragPos: IDragPos, element: HTMLDivElement | null) => {
            dragIndexRef.current = dragStartIndex;

            if (element) {
                const rect = element.getBoundingClientRect();

                dragEventRef.current = {
                    ...dragPos,
                    deltaX: dragPos.posX - rect.left,
                    deltaY: dragPos.posY - rect.top,
                    height: rect.height,
                    isDrag: true,
                    width: rect.width,
                };
                setDragHtml(element.outerHTML);
                document.addEventListener("mouseup", handleMouseUp);
                document.addEventListener("mousemove", handleMouseMove);
            }
        },
        [handleMouseMove, handleMouseUp],
    );
    const handleDragEnterIndex = React.useCallback(
        (hoverIndex: number) => {
            if (
                dragHtml &&
                dragIndexRef.current !== undefined &&
                dragIndexRef.current !== hoverIndex &&
                hoverIndexRef.current !== hoverIndex
            ) {
                pagesStore.movePages(dragIndexRef.current, hoverIndex);
                hoverIndexRef.current = hoverIndex;
                dragIndexRef.current = hoverIndex;
            }
        },
        [dragHtml, pagesStore],
    );
    const handleTabsDragEnter = React.useCallback(() => {
        if (dragHtml) {
            handleDragEnterIndex(pagesStore.visiblePages.length - 1);
        }
    }, [dragHtml, handleDragEnterIndex, pagesStore.visiblePages.length]);
    const [trans] = useTranslation("meta");

    React.useEffect(() => {
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove, handleMouseUp]);

    return useObserver(() => (
        <React.Fragment>
            <Tabs
                value={pagesStore.activePage}
                classes={{
                    flexContainer: classes.tabsFlexContainer,
                    root: classes.tabsRoot,
                    scroller: classes.scroller,
                }}
                variant="scrollable"
                orientation={orientation}
                scrollButtons="on"
                ScrollButtonComponent={ScrollButton}
                style={contentStyle}
                onChange={handleChangePage}
            >
                {pagesStore.visiblePages.map((page, index) => {
                    const {route, pageId, titleRoutePath} = page;

                    let id = route?.[VAR_RECORD_ID] || pageId;

                    if (page.isMulti) {
                        id = `${id}_${index}`;
                    }

                    return (
                        <OpenPageTab
                            key={`${id}`}
                            pageIndex={index}
                            route={route}
                            pagesStore={applicationStore.pagesStore}
                            value={page}
                            titleRoutePath={trans<string>(titleRoutePath)}
                            onClose={pagesStore.removePageAction}
                            onContextMenuCustom={handleContextMenu}
                            orientation={orientation}
                            style={contentStyle}
                            onDragStartIndex={handeDragStartIndex}
                            onDragEnterIndex={handleDragEnterIndex}
                            tabDragClassName={classes.tabDrag}
                        />
                    );
                })}
                <Tab
                    value={null}
                    fullWidth
                    component="div"
                    classes={{root: cn(classes.emptySpace, classes[`emptySpace${orientation}`])}}
                    onChange={noop}
                    disableFocusRipple
                    disableTouchRipple
                    disabled
                    disableRipple
                    onMouseOver={handleTabsDragEnter}
                />
            </Tabs>
            <OpenPageMenuContext
                open={isOpenMenu}
                value={menuPageValue}
                onClose={pagesStore.removePageAction}
                onCloseMenu={handleCloseMenu}
                position={menuPosition}
                pagesStore={pagesStore}
            />
            {dragHtml
                ? ReactDOM.createPortal(
                      <div
                          ref={dragElRef}
                          className={classes.dragElement}
                          style={{
                              height: dragEventRef.current.height,
                              left: dragEventRef.current.posX,
                              top: dragEventRef.current.posY,
                              width: dragEventRef.current.width,
                          }}
                          dangerouslySetInnerHTML={{__html: dragHtml}}
                      />,
                      document.body,
                  )
                : null}
        </React.Fragment>
    ));
});
