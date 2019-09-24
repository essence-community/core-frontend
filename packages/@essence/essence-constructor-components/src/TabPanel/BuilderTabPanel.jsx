// @flow
import * as React from "react";
import cn from "classnames";
import isEqual from "lodash/isEqual";
import debounce from "lodash/debounce";
import {reaction} from "mobx";
import {observer, disposeOnUnmount} from "mobx-react";
import {compose} from "recompose";
import keycode from "keycode";
import {Tabs, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
import commonDecorator from "../decorators/commonDecorator";
import withModelDecorator from "../decorators/withModelDecorator";
import {TabModel, type TabModelType} from "../stores/TabModel";
import {styleTheme} from "../constants";
import Tab from "./Tab";
import {type BuilderTabPanelPropsType, type BuilderTabPanelType} from "./BuilderTabPanelType";
import {StyleTabPanelLight} from "./Styles/StyleTabPanelLight";
import {StyleTabPanelDark} from "./Styles/StyleTabPanelDark";

const styles = styleTheme === "light" ? StyleTabPanelLight : StyleTabPanelDark;

type EnchengeProps = {
    classes: {
        [$Keys<typeof styles>]: string,
    },
    store: TabModelType,
};

type State = {
    selectedTab: null | string,
    tabsWidthMode: "auto" | "slim",
};

const RESIZE_DELAY = 100;
const MIN_TAB_WIDTH = 90;
const DARK_THEME_TABS_PADDING = 94;

class BaseBuilderTabPanel extends React.Component<BuilderTabPanelPropsType & EnchengeProps, State> {
    tabsComponentRef = React.createRef();

    state = {
        selectedTab: null,
        tabsWidthMode: "auto",
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

    handleGetTabsMode = debounce(() => {
        const {reverseTabs} = this.props.store;
        const {current} = this.tabsComponentRef;

        this.setState(({tabsWidthMode}) => {
            if (current) {
                const contentWidth = current.offsetWidth;
                const maxAutoModeWidth =
                    styleTheme === "light"
                        ? reverseTabs.length * MIN_TAB_WIDTH
                        : reverseTabs.length * MIN_TAB_WIDTH + DARK_THEME_TABS_PADDING;
                const newTabsWidthMode = contentWidth > maxAutoModeWidth ? "auto" : "slim";

                return newTabsWidthMode === tabsWidthMode ? null : {tabsWidthMode: newTabsWidthMode};
            }

            return null;
        });
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

    renderTabComponent = (Cmp, child) => {
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
            <Grid xs={12} item key={child.ckPageObject} style={{display: isVisible ? "block" : "none"}}>
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

    render() {
        const {selectedTab, tabsWidthMode} = this.state;
        const {bc, store, classes, disabled, pageStore, visible} = this.props;
        const {tabValue, reverseTabs} = store;

        return (
            <Grid container spacing={0} direction="column" data-page-object={bc.ckPageObject}>
                <Grid item className={classes.fullWidth}>
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
                            value={tabValue}
                            onChange={this.handleChangeTab}
                            data-page-object={`${bc.ckPageObject}-tabs`}
                            classes={{
                                flexContainer: cn(classes.tabsFlexContainer, {
                                    [classes.slimTabs]: tabsWidthMode === "slim",
                                }),
                                indicator: classes.tabsIndicator,
                                root: classes.tabsRoot,
                                scroller: classes.tabsScroller,
                            }}
                            scrollButtons="desktop"
                        >
                            {reverseTabs.map((child) => (
                                <Tab
                                    value={child.ckPageObject}
                                    key={child.ckPageObject}
                                    label={child.cvDisplayed}
                                    className={cn({
                                        [classes.activeTabRoot]: tabValue === child.ckPageObject,
                                        [classes.selectedTabRoot]: selectedTab === child.ckPageObject,
                                    })}
                                    classes={{
                                        disabled: classes.disabled,
                                        /*
                                         * Label:
                                         *     classes.label && tabValue === child.ckPageObject
                                         *         ? classes.label
                                         *         : classes.tabLabel,
                                         */
                                        // LabelContainer: classes.tabLabelContainer,
                                        root: cn(classes.tabRoot, {
                                            [classes.slimTab]: tabsWidthMode === "slim",
                                        }),
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
                {mapComponents(bc.childs, this.renderTabComponent)}
            </Grid>
        );
    }
}

const BuilderTabPanel = compose(
    withModelDecorator(
        (bc: BuilderTabPanelType, props): TabModelType => new TabModel({bc, pageStore: props.pageStore}),
    ),
    commonDecorator,
    withStyles(styles),
    observer,
)(BaseBuilderTabPanel);

setComponent("TABPANEL", BuilderTabPanel);

export default BuilderTabPanel;
