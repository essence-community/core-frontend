import * as React from "react";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {PanelWidthContext} from "@essence-community/constructor-share/context";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import keycode from "keycode";
// eslint-disable-next-line import/no-extraneous-dependencies
import isEqual from "lodash/isEqual";
import cn from "clsx";
import {useTranslation, debounce, getTextWidth} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_MASTER_ID,
} from "@essence-community/constructor-share/constants";
import {useTheme, IconButton} from "@material-ui/core";
import {reaction} from "mobx";
import {useObserver} from "mobx-react";
import {Icon} from "@essence-community/constructor-share/Icon";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {TabPanelModel} from "../../store/TabPanelModel";
import {Tab} from "../Tab";
import {TabPopoverContent} from "../TabPopoverContent";
import {TabPanelPosition} from "../../TabPanel.types";
import {useStyles} from "./Tabs.styles";

const anchorOrigin: IPopoverAnchorOrigin = {
    horizontal: "right",
    vertical: "bottom",
};
const transformOrigins: Record<number, IPopoverTransfromOrigin> = {
    1: {
        horizontal: "right",
        vertical: 1,
    },
    2: {
        horizontal: "right",
        vertical: "top",
    },
};
const TAB_PLUS_WIDTH = {
    1: 35,
    // Label padding + tab margin
    2: 28,
};
const TAB_EMPTY_SPACE = {
    // Empty space (20) + menu (40)
    1: 60,
    // Left panel (58) + left indent (4) + empty space (20) + menu (32)
    2: 94,
};
const MIN_WIIDTH = 90;
const RESIZE_DELAY = 100;

interface ITabsProps extends IClassProps {
    store: TabPanelModel;
}

// eslint-disable-next-line max-lines-per-function, max-statements
export const Tabs: React.FC<ITabsProps> = React.memo((props) => {
    const {bc, disabled, store, pageStore, visible} = props;
    const {align = "center", contentview = "hbox"} = bc;
    const [selectedTab, setSelectedTab] = React.useState<null | string>(null);
    const tabsComponentRef = React.useRef<null | HTMLDivElement>(null);
    const panelWidth = React.useContext(PanelWidthContext);
    const [trans] = useTranslation();
    const theme = useTheme<IEssenceTheme>();
    const classes = useStyles();
    const positonName = `${align}-${contentview}` as TabPanelPosition;
    const positionClassName = classes[positonName];

    const handleEnter = () => {
        if (selectedTab) {
            pageStore.freezeScrollAction();
            store.changeTabAction(selectedTab);
        }
    };

    const handleMoveSelectedTab = (code: "left" | "right") => {
        const currentTabIndex = store.activeTabs.findIndex((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID] === selectedTab);
        const nextTabIndex = currentTabIndex + (code === "left" ? -1 : 1);
        const nextTab = store.activeTabs[nextTabIndex];

        if (nextTab) {
            setSelectedTab(nextTab[VAR_RECORD_PAGE_OBJECT_ID]);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const code = keycode(event.keyCode);

        if (!disabled) {
            if (code === "enter") {
                event.preventDefault();
                handleEnter();
            }

            if (code === "left" || code === "right") {
                event.preventDefault();
                handleMoveSelectedTab(code);
            }
        }
    };
    const handleFocus = () => {
        setSelectedTab(store.tabValue);
    };
    const handleBlur = () => {
        setSelectedTab(null);
    };

    const handleGetTabsMode = React.useMemo(
        () =>
            debounce(() => {
                const {current} = tabsComponentRef;
                const layoutTheme = theme ? theme.essence.layoutTheme : 1;
                const font = `700 13px / 18.59px ${theme.typography.fontFamily}`;

                if (bc.align === "center" && current) {
                    const additionWidth = TAB_PLUS_WIDTH[layoutTheme];
                    // Empty space
                    let currentWidth = TAB_EMPTY_SPACE[layoutTheme];

                    const currentIndex = store.activeTabs.reduce((lastIndex, tab) => {
                        const labelKey = tab[VAR_RECORD_DISPLAYED];
                        const labelWidth = labelKey ? getTextWidth(trans(labelKey), font) : MIN_WIIDTH;

                        currentWidth += labelWidth + additionWidth;

                        return current.offsetWidth > currentWidth ? lastIndex + 1 : lastIndex;
                    }, 0);
                    const hiddenTabsIndex = store.activeTabs.length - currentIndex;

                    store.setHiddenTabsIndex(hiddenTabsIndex);
                }
            }, RESIZE_DELAY),
        [bc.align, store, theme, trans],
    );

    const handleCheckNewSelection = React.useCallback(() => {
        const masterId = bc[VAR_RECORD_MASTER_ID];

        return masterId ? pageStore.stores.get(masterId)?.selectedRecord : undefined;
    }, [bc, pageStore.stores]);

    React.useEffect(() => {
        if (bc[VAR_RECORD_MASTER_ID]) {
            return reaction(handleCheckNewSelection, store.resetOpenedTabs, {equals: isEqual});
        }

        return undefined;
    }, [bc, handleCheckNewSelection, store.resetOpenedTabs]);

    React.useEffect(() => {
        window.addEventListener("resize", handleGetTabsMode);
        handleGetTabsMode();

        return () => {
            window.removeEventListener("resize", handleGetTabsMode);
        };
    }, [handleGetTabsMode]);

    React.useEffect(() => {
        if (visible) {
            handleGetTabsMode();
        }
    }, [handleGetTabsMode, visible, panelWidth]);

    return useObserver(() => (
        <div
            tabIndex={disabled ? undefined : 0}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={tabsComponentRef}
            className={cn(classes.rootDefault, classes.root, positionClassName)}
        >
            {(store.hiddenTabsIndex ? store.tabs.slice(0, -store.hiddenTabsIndex) : store.tabs).map((tabBc) => {
                const labelKey = tabBc[VAR_RECORD_DISPLAYED];

                return (
                    <Tab
                        key={tabBc[VAR_RECORD_PAGE_OBJECT_ID]}
                        {...props}
                        bc={tabBc}
                        store={store}
                        label={labelKey ? trans(labelKey) : ""}
                        isActive={store.tabValue === tabBc[VAR_RECORD_PAGE_OBJECT_ID]}
                        value={tabBc[VAR_RECORD_PAGE_OBJECT_ID]}
                        positonName={positonName}
                    />
                );
            })}
            <div className={classes.grow} />
            {Boolean(store.hiddenTabsIndex) && (
                <Popover
                    pageStore={pageStore}
                    container={pageStore.pageEl}
                    width="auto"
                    anchorOrigin={anchorOrigin}
                    transformOrigin={transformOrigins[theme.essence.layoutTheme]}
                    hideOnResize
                    hideOnScroll
                    popoverContent={({onClose}) => <TabPopoverContent {...props} onClose={onClose} store={store} />}
                >
                    {({onOpen, open, onClose}) => (
                        <IconButton
                            onClick={open ? onClose : onOpen}
                            disableRipple
                            className={cn(classes.popoverButton, {
                                [classes.popoverButtonOpen]: open,
                                [classes.popoverButtonActive]: store.tabsInHidden,
                            })}
                        >
                            <Icon
                                iconfont="bars"
                                iconfontname="fa"
                                size="xs"
                                color="inherit"
                                className={classes.popoverButtonIcon}
                            />
                        </IconButton>
                    )}
                </Popover>
            )}
        </div>
    ));
});
