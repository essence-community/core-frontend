/* eslint-disable max-lines */
// @flow
import * as React from "react";
import cn from "classnames";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import {reaction} from "mobx";
import {observer, disposeOnUnmount} from "mobx-react";
import {compose} from "recompose";
import keycode from "keycode";
import {Tabs, Grid, List, ListItem, IconButton, Tab as MaterialTab} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {setComponent, mapComponents, Icon} from "@essence/essence-constructor-share";
import {Popover} from "@essence/essence-constructor-share/uicomponents";
import {getTextWidth} from "@essence/essence-constructor-share/utils";
import commonDecorator from "../decorators/commonDecorator";
import withModelDecorator from "../decorators/withModelDecorator";
import {TabModel, type TabModelType} from "../stores/TabModel";
import Tab from "./Tab";
import {type BuilderTabPanelPropsType, type BuilderTabPanelType} from "./BuilderTabPanelType";
import {TAB_PANEL_CONTAIENR_PROPS} from "./TabPanelConfig";
import styles from "./Styles";

const anchorOrigin = {
    horizontal: "right",
    vertical: "bottom",
};

const transformOrigin = {
    horizontal: "right",
    vertical: "top",
};
const TAB_PLUS_WIDTH = {
    dark: 58,
    light: 53,
};
const TAB_EMPTY_SPACE = {
    // Left panel (58) + left indent (25) + empty space (20) + menu (40)
    dark: 143,
    // Empty space (20) + menu (40)
    light: 60,
};

type EnchengeProps = {
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
    theme?: any,
    store: TabModelType,
};

type State = {
    hiddenTabs: number,
    selectedTab: null | string,
};

const RESIZE_DELAY = 100;

class BaseBuilderTabPanel extends React.Component<BuilderTabPanelPropsType & EnchengeProps, State> {
    tabsComponentRef = React.createRef();

    state = {
        hiddenTabs: 0,
        selectedTab: null,
    };

    componentDidMount() {
        const {bc, store} = this.props;

        window.addEventListener("resize", this.handleGetTabsMode);

        if (bc.ckMaster) {
            disposeOnUnmount(this, [reaction(this.handleCheckNewSelection, store.resetOpenedTabs, {equals: isEqual})]);
        }

        this.handleGetTabsMode();
    }

    componentDidUpdate(prevProps: BuilderTabPanelPropsType & EnchengeProps) {
        if (this.props.visible && prevProps.visible !== this.props.visible) {
            this.handleGetTabsMode();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleGetTabsMode);
    }

    // eslint-disable-next-line max-statements
    handleGetTabsMode = debounce(() => {
        const {
            store: {reverseTabs},
            theme,
            bc,
            classes,
        } = this.props;
        const {current} = this.tabsComponentRef;
        const themeType = theme ? theme.palette.type : "light";

        if (bc.align === "center" && current) {
            const additionWidth = TAB_PLUS_WIDTH[themeType];
            const firstTabWrapper = current.querySelector(`.${classes.tabWrapper}`);
            const {font} = firstTabWrapper ? window.getComputedStyle(firstTabWrapper) : {font: ""};
            // Empty space
            let currentWidth = TAB_EMPTY_SPACE[themeType];

            const currentInex = reverseTabs.reduceRight((lastIndex, tab) => {
                currentWidth += getTextWidth(tab.cvDisplayed, font) + additionWidth;

                return current.offsetWidth > currentWidth ? lastIndex + 1 : lastIndex;
            }, 0);
            const hiddenTabs = reverseTabs.length - currentInex;

            this.setState((prevState) => {
                if (prevState.hiddenTabs !== hiddenTabs) {
                    return {hiddenTabs};
                }

                return null;
            });
        }
    }, RESIZE_DELAY);

    handleCheckNewSelection = () => {
        const {bc, pageStore} = this.props;
        const masterStore = bc.ckMaster ? pageStore.stores.get(bc.ckMaster) : undefined;

        return masterStore ? masterStore.selectedRecord : undefined;
    };

    handleChangeTab = (event: SyntheticEvent<>, tabValue: string) => {
        const {store, pageStore} = this.props;

        pageStore.freezeScrollAction();
        store.changeTabAction(tabValue);
        this.setState({selectedTab: tabValue});
    };

    handleKeyDown = (event) => {
        const {disabled} = this.props;
        const code = keycode(event);

        if (!disabled) {
            if (code === "enter") {
                event.preventDefault();
                this.handleEnter();
            }

            if (code === "left" || code === "right") {
                this.handleMoveSelectedTab(code);
            }
        }
    };

    handleEnter = () => {
        const {selectedTab} = this.state;
        const {pageStore, store} = this.props;

        if (selectedTab) {
            pageStore.freezeScrollAction();
            store.changeTabAction(selectedTab);
        }
    };

    handleMoveSelectedTab = (code: "left" | "right") => {
        const {selectedTab} = this.state;
        const {store} = this.props;
        const tabs = store.getActiveTabs();

        const currentTabIndex = tabs.findIndex((tab) => tab.ckPageObject === selectedTab);
        const nextTabIndex = currentTabIndex + (code === "left" ? -1 : 1);
        const nextTab = tabs[nextTabIndex];

        if (nextTab) {
            this.setState({selectedTab: nextTab.ckPageObject});
        }
    };

    handleFocus = () => {
        this.setState({selectedTab: this.props.store.tabValue});
    };

    handleBlur = () => {
        this.setState({selectedTab: null});
    };

    renderTabComponent = (Cmp, child, className) => {
        const {
            store: {tabValue, openedTabs},
            disabled,
            readOnly,
            elevation,
            hidden,
            pageStore,
            visible,
        } = this.props;
        const isVisible = child.ckPageObject === tabValue;

        if (!isVisible && !openedTabs.get(child.ckPageObject)) {
            return null;
        }

        return (
            <Grid
                xs={12}
                className={className}
                item
                key={child.ckPageObject}
                style={{display: isVisible ? "block" : "none"}}
            >
                <Cmp
                    type={child.type}
                    bc={child}
                    disabled={disabled}
                    hidden={hidden}
                    visible={isVisible ? visible : false}
                    readOnly={readOnly}
                    elevation={elevation}
                    hideTitle
                    pageStore={pageStore}
                />
            </Grid>
        );
    };

    renderBaseTabsComponent = (props) => {
        const {children, ...otherProps} = props;

        return (
            <div {...otherProps}>
                <div ref={this.tabsComponentRef}>{children}</div>
            </div>
        );
    };

    renderPopoverContnet = ({onClose}) => {
        const {store, pageStore, visible, classes} = this.props;
        const {hiddenTabs} = this.state;

        return (
            <List button className={classes.listTabs}>
                {(hiddenTabs ? store.reverseTabs.slice(0, hiddenTabs) : store.reverseTabs).map((tab) => (
                    <Tab
                        key={tab.ckPageObject}
                        button
                        selected={store.tabValue === tab.ckPageObject}
                        onClick={(event) => {
                            this.handleChangeTab(event, tab.ckPageObject);
                            onClose();
                        }}
                        disableRipple
                        pageStore={pageStore}
                        bc={tab}
                        store={store}
                        visible={visible}
                        Component={ListItem}
                        isActive={store.tabValue === tab.ckPageObject}
                    >
                        {tab.cvDisplayed}
                    </Tab>
                ))}
            </List>
        );
    };

    render() {
        const {selectedTab, hiddenTabs} = this.state;
        const {bc, store, classes, disabled, pageStore, visible} = this.props;
        const {tabValue, reverseTabs} = store;
        const {align = "center", contentview = "hbox"} = bc;

        return (
            <Grid
                container
                spacing={0}
                className={classes[`container-${align}`]}
                data-page-object={bc.ckPageObject}
                {...TAB_PANEL_CONTAIENR_PROPS[align]}
            >
                <Grid item className={classes[`tabItem-${align}-${contentview}`]}>
                    <div
                        tabIndex={disabled ? undefined : "0"}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        className={classes.tabsContainer}
                        ref={this.tabsComponentRef}
                    >
                        <Tabs
                            component={this.renderBaseTabsComponent}
                            orientation={align === "center" ? "horizontal" : "vertical"}
                            value={tabValue}
                            onChange={this.handleChangeTab}
                            data-page-object={`${bc.ckPageObject}-tabs`}
                            classes={{
                                flexContainer: classes[`tabsFlexContainer-${align}-${contentview}`],
                                indicator: classes.tabsIndicator,
                                root: classes.tabsRoot,
                                scroller: classes[`tabsScroller-${align}-${contentview}`],
                            }}
                            scrollButtons="desktop"
                        >
                            {Boolean(hiddenTabs) && (
                                <React.Fragment>
                                    <Popover
                                        container={pageStore.pageEl}
                                        popoverContent={this.renderPopoverContnet}
                                        width="auto"
                                        anchorOrigin={anchorOrigin}
                                        transformOrigin={transformOrigin}
                                    >
                                        {({onOpen, open, onClose}) => (
                                            <IconButton
                                                onClick={open ? onClose : onOpen}
                                                disableRipple
                                                className={classes.popoverButton}
                                            >
                                                <Icon iconfont="dots-horizontal" iconfontname="mdi" color="inherit" />
                                            </IconButton>
                                        )}
                                    </Popover>
                                    <div className={classes.flexGrow} />
                                </React.Fragment>
                            )}
                            {(hiddenTabs ? reverseTabs.slice(hiddenTabs) : reverseTabs).map((child) => (
                                <Tab
                                    Component={MaterialTab}
                                    value={child.ckPageObject}
                                    key={child.ckPageObject}
                                    label={child.cvDisplayed}
                                    className={cn({
                                        [classes.activeTabRoot]: tabValue === child.ckPageObject,
                                        [classes.selectedTabRoot]: selectedTab === child.ckPageObject,
                                    })}
                                    classes={{
                                        disabled: classes.disabled,
                                        root: classes.tabRoot,
                                        wrapper: classes.tabWrapper,
                                    }}
                                    disabled={disabled}
                                    disableRipple
                                    data-page-object={`${child.ckPageObject}_tab`}
                                    data-qtip={child.cvDisplayed}
                                    pageStore={pageStore}
                                    bc={child}
                                    isActive={tabValue === child.ckPageObject}
                                    store={store}
                                    visible={visible}
                                    tabIndex="-1"
                                />
                            ))}
                        </Tabs>
                    </div>
                </Grid>
                {mapComponents(bc.childs, (Child, childBc) =>
                    this.renderTabComponent(Child, childBc, classes[`content-${align}-${contentview}`]),
                )}
            </Grid>
        );
    }
}

const BuilderTabPanel = compose(
    withModelDecorator(
        (bc: BuilderTabPanelType, props): TabModelType => new TabModel({bc, pageStore: props.pageStore}),
    ),
    commonDecorator,
    withStyles(styles, {withTheme: true}),
    observer,
)(BaseBuilderTabPanel);

setComponent("TABPANEL", BuilderTabPanel);

export default BuilderTabPanel;
