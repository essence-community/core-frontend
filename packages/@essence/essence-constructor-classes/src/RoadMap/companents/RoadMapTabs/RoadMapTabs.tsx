/* eslint-disable max-lines-per-function */
import * as React from "react";
import {IBuilderConfig, IPageModel} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {debounce, toTranslateText, useTranslation} from "@essence-community/constructor-share/utils";
import keycode from "keycode";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants/variables";
import {Grid, Tabs} from "@material-ui/core";
import cn from "clsx";
import {TabsStatusType} from "../../store/RoadMapModel.types";
import {RoadMapModel} from "../../store/RoadMapModel";
import {RoadMapTab} from "../RoadMapTab/RoadMapTab";
import {useStyles} from "./RoadMapTabs.styles";

export interface IRoadMapTabs {
    orientation: "vertical" | "horizontal";
    store: RoadMapModel;
    bc: IBuilderConfig;
    disabled?: boolean;
    pageStore: IPageModel;
    visible: boolean;
}

const RESIZE_DELAY = 100;
const DEFAULT_WIDTH_TAB = 228;

export const RoadMapTabs: React.FC<IRoadMapTabs> = (props) => {
    const {orientation, store, visible, bc, disabled, pageStore} = props;
    const {tabwidth} = bc;
    const classes = useStyles();
    const [trans] = useTranslation("meta");
    const [tabsWidthMode, setTabsWidthMode] = React.useState<"standard" | "scrollable">("standard");
    const [selectedTab, setSelectedTab] = React.useState<string | null>(null);
    const tabsComponentRef = React.useRef<HTMLButtonElement | null>(null);
    const handleGetTabsMode = React.useCallback(
        debounce(() => {
            const {tabs} = store;

            if (tabsComponentRef && tabsComponentRef.current) {
                // eslint-disable-next-line prefer-named-capture-group, require-unicode-regexp
                const tabWidth =
                    // eslint-disable-next-line prefer-named-capture-group
                    tabwidth && /^\d+(px)?$/gu.test(tabwidth) ? parseInt(tabwidth, 10) : DEFAULT_WIDTH_TAB;
                const contentWidth = tabsComponentRef.current.offsetWidth;
                const maxAutoModeWidth = tabs.length * tabWidth;
                const newTabsWidthMode = contentWidth > maxAutoModeWidth ? "standard" : "scrollable";

                if (newTabsWidthMode !== tabsWidthMode) {
                    setTabsWidthMode(newTabsWidthMode);
                }
            }
        }, RESIZE_DELAY),
        [tabwidth, tabsWidthMode],
    );

    React.useEffect(() => {
        if (orientation === "horizontal") {
            window.addEventListener("resize", handleGetTabsMode);
            handleGetTabsMode();

            return () => {
                window.removeEventListener("resize", handleGetTabsMode);
            };
        }

        return undefined;
    }, [orientation, handleGetTabsMode]);

    const handleChangeTab = React.useCallback(
        (event: React.ChangeEvent, tabValue: string) => {
            pageStore.freezeScrollAction();
            store.changeTabAction(tabValue);
            setSelectedTab(tabValue);
        },
        [pageStore, store],
    );
    const handleMoveSelectedTab = React.useCallback(
        (code: "left" | "right" | "up" | "down") => {
            const tabs = store.getActiveTabs();

            const currentTabIndex = tabs.findIndex((tab) => tab[VAR_RECORD_PAGE_OBJECT_ID] === selectedTab);
            const nextTabIndex = currentTabIndex + (code === "left" || code === "up" ? -1 : 1);
            const nextTab = tabs[nextTabIndex];

            if (nextTab) {
                setSelectedTab(nextTab[VAR_RECORD_PAGE_OBJECT_ID]);
            }
        },
        [selectedTab, store],
    );

    const handleEnter = React.useCallback(() => {
        if (selectedTab) {
            pageStore.freezeScrollAction();
            store.changeTabAction(selectedTab);
        }
    }, [pageStore, selectedTab, store]);
    const handleKeyDown = React.useCallback(
        (event) => {
            const code = keycode(event);

            if (!disabled) {
                if (code === "enter") {
                    event.preventDefault();
                    handleEnter();
                }

                if (
                    (orientation === "horizontal" && (code === "left" || code === "right")) ||
                    (orientation === "vertical" && (code === "up" || code === "down"))
                ) {
                    handleMoveSelectedTab(code);
                }
            }
        },
        [orientation, disabled, handleEnter, handleMoveSelectedTab],
    );

    const handleFocus = React.useCallback(() => {
        setSelectedTab(store.tabValue);
    }, [store.tabValue]);

    const handleBlur = () => {
        setSelectedTab(null);
    };
    const renderLabel = React.useMemo(() => {
        if (orientation === "vertical") {
            return (tabStatus: TabsStatusType, child: IBuilderConfig) => (
                <div className={cn([classes.label, classes.verticalLabel, classes.themeLabel])}>
                    <span className={classes.cycleNum}>{tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])?.num}</span>
                    <span className={classes.verticalLabelText}>
                        {toTranslateText(trans, child[VAR_RECORD_DISPLAYED])}
                    </span>
                </div>
            );
        }

        return (tabStatus: TabsStatusType, child: IBuilderConfig) => (
            <div className={cn([classes.label, classes.horizontalLabel, classes.themeLabel])}>
                <span className={classes.textNum}>{tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])?.num}</span>
                <span className={classes.horizontalLabelText}>
                    {toTranslateText(trans, child[VAR_RECORD_DISPLAYED])}
                </span>
            </div>
        );
    }, [orientation, classes, trans]);

    return useObserver(() => (
        <Grid item className={classes.fullWidth}>
            <div
                tabIndex={disabled ? undefined : 0}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={classes.tabsContainer}
            >
                <Tabs
                    centered={orientation === "horizontal" && tabsWidthMode === "standard"}
                    orientation={orientation}
                    value={store.tabValue}
                    onChange={handleChangeTab}
                    data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-tabs`}
                    classes={{
                        indicator: classes.tabsIndicator,
                        root: cn({
                            [classes.horizontalTabsRoot]: orientation === "horizontal",
                        }),
                    }}
                    variant={tabsWidthMode}
                    scrollButtons="desktop"
                    ref={tabsComponentRef}
                >
                    {store.tabs.map((child) => (
                        <RoadMapTab
                            value={child[VAR_RECORD_PAGE_OBJECT_ID]}
                            key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                            label={renderLabel(store.tabStatus, child)}
                            classes={{
                                containerTab: cn({
                                    [classes.horizontalContainerTab]: orientation === "horizontal",
                                    [classes.activeTabRoot]: store.tabValue === child[VAR_RECORD_PAGE_OBJECT_ID],
                                    [classes.selectedTab]: selectedTab === child[VAR_RECORD_PAGE_OBJECT_ID],
                                    [classes.disabled]:
                                        disabled || store.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])?.disabled,
                                }),
                                leftSideTab: cn([classes.leftSideTab, classes.leftSideTabTheme]),
                                rightSideTab: cn([classes.rightSideTab, classes.rightSideTabTheme]),
                                root: cn({
                                    [classes.horizontalTabRoot]: orientation === "horizontal",
                                    [classes.verticalTabRootTheme]: orientation === "vertical",
                                    [classes.horizontalTabRootTheme]: orientation === "horizontal",
                                }),
                                textColorInherit: classes.textColorInherit,
                                wrapper: classes.tabWrapper,
                            }}
                            disabled={disabled || store.tabStatus.get(child[VAR_RECORD_PAGE_OBJECT_ID])!.disabled}
                            disableRipple
                            data-page-object={`${child[VAR_RECORD_PAGE_OBJECT_ID]}_tab`}
                            data-qtip={trans(child[VAR_RECORD_DISPLAYED] || "", child[VAR_RECORD_DISPLAYED])}
                            orientation={orientation}
                            pageStore={pageStore}
                            bc={child}
                            store={store}
                            visible={visible}
                            tabIndex={-1}
                        />
                    ))}
                </Tabs>
            </div>
        </Grid>
    ));
};
