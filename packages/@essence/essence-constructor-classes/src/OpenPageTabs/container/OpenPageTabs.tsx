import { DragComponent } from "@essence/essence-constructor-components";
import {
    IClassProps, toColumnStyleWidth, toSize,
} from "@essence/essence-constructor-share";
import {Tabs} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import { OpenPageMenuContext } from "../components/OpenPageMenuContext/OpenPageMenuContext";
import { OpenPageTab } from "../components/OpenPageTab/OpenPageTab";
import { ScrollButton } from "../components/ScrollButton/ScrollButton";
import useStyles from "./OpenPageTabs.style";

const PAGE_WIDTH = 160;

export const OpenPageTabs: React.FC<IClassProps> = (props) => {
    const classes: Record<string, string> = useStyles(props);
    const { bc } = props;
    const height = toSize(bc.height, "42");
    const contentStyle = {
        height,
        maxHeight: toSize(bc.maxheight, "100%"),
        minHeight: toSize(bc.minheight, ""),
        ...toColumnStyleWidth(bc.width),
    }
    const orientation = bc.contentview === "vbox" ? "vertical" : "horizontal";
    const tabStyleFn = orientation === "horizontal" ? (index) => ({
        transform: `translateX(${index * PAGE_WIDTH}px)`,
    }) : (index) => ({
        transform: `translateY(${index * 42}px)`,
    });
    const { pagesStore } = props.pageStore.applicationStore;
    const [isOpenMenu, setIsOpenMenu] = React.useState(true);
    const [menuPageValue, setMenuPageValue] = React.useState("");
    const [menuPosition, setMenuPosition] = React.useState({
        left: 0,
        top: 0,
    });
    const handleChangePage = (event: React.ChangeEvent, value: string) => {
        pagesStore.setPageAction(value);
    };
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => {
        event.preventDefault();
        setIsOpenMenu(true);
        setMenuPageValue(value);
        setMenuPosition({
            left: event.pageX,
            top: event.pageY,
        });
    };
    const handleCloseMenu = (event: MouseEvent) => {
        event.stopPropagation();
        setIsOpenMenu(false);
    };
    const handleMovePage = (dragIndex: number, hoverIndex: number) => {
        pagesStore.movePages(dragIndex, hoverIndex);
    };
    const renderTabComponent = (propsTab) => <DragComponent {...propsTab} type="page" moveCard={handleMovePage} />;

    return useObserver(() => (
        <React.Fragment>
            <Tabs
                value={pagesStore.activePage ? pagesStore.activePage.ckPage : false}
                classes={{
                    flexContainer: classes.tabsFlexContainer,
                    indicator: classes.indicator,
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
                {pagesStore.pages.map(({route, ckPage}, index) => {
                    const iconName = route.cvIconName;

                    return (
                        <OpenPageTab
                            key={ckPage}
                            classes={classes}
                            component={renderTabComponent}
                            label={route.cvName}
                            iconfont={iconName}
                            value={ckPage}
                            onClose={pagesStore.removePageAction}
                            onContextMenu={handleContextMenu}
                            orientation={orientation}
                            className={classes.tabRoot}
                            style={tabStyleFn(index)}
                        />
                    );
                })}
            </Tabs>
            <OpenPageMenuContext
                open={isOpenMenu}
                value={menuPageValue}
                onClose={pagesStore.removePageAction}
                onCloseMenu={handleCloseMenu}
                position={menuPosition}
                pagesStore={pagesStore}
            />
        </React.Fragment>
        ));

};