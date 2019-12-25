/* eslint max-lines: ["error", 400]*/
// @flow
import * as React from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import {observer} from "mobx-react";
import {compose} from "recompose";
import keycode from "keycode";
import {Grid, Tabs} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import commonDecorator from "../decorators/commonDecorator";
import withModelDecorator from "../decorators/withModelDecorator";
import {RoadMapModel, type RoadMapModelType} from "../stores/RoadMapModel";
import BuilderForm from "../Form/BuilderForm";
import Tab from "./Tab";
import {type BuilderRoadMapPanelPropsType, type BuilderRoadMapPanelType} from "./BuilderRoadMapPanelType";
import styles from "./Styles";

type ExtraRoadMapProps = {
    classes: {
        [$Keys<typeof styles>]: string,
    },
    store: RoadMapModelType,
};

type State = {
    selectedTab: null | string,
    tabsWidthMode: "standard" | "scrollable",
};

const RESIZE_DELAY = 100;
const DEFAULT_WIDTH_TAB = 228;

class BaseBuilderRoadMapPanel extends React.Component<BuilderRoadMapPanelPropsType & ExtraRoadMapProps & WithT, State> {
    tabsComponentRef = React.createRef();

    state = {
        selectedTab: null,
        tabsWidthMode: "standard",
    };

    componentDidMount() {
        const {bc, store} = this.props;

        if (bc.align === "center") {
            window.addEventListener("resize", this.handleGetTabsMode);
            this.handleGetTabsMode();
        }
        store.postMountAction();
    }

    componentDidUpdate(prevProps: BuilderRoadMapPanelPropsType & ExtraRoadMapProps) {
        if (this.props.bc.align === "center" && this.props.visible && prevProps.visible !== this.props.visible) {
            this.handleGetTabsMode();
        }
    }

    componentWillUnmount() {
        if (this.props.bc.align === "center") {
            window.removeEventListener("resize", this.handleGetTabsMode);
        }
    }

    handleGetTabsMode = debounce(() => {
        const {tabwidth} = this.props.bc;
        const {tabs} = this.props.store;
        const {current} = this.tabsComponentRef;

        this.setState(({tabsWidthMode}) => {
            if (current) {
                // eslint-disable-next-line prefer-named-capture-group, require-unicode-regexp
                const tabWidth = tabwidth && /^\d+(px)?$/.test(tabwidth) ? parseInt(tabwidth, 10) : DEFAULT_WIDTH_TAB;
                const contentWidth = current.offsetWidth;
                const maxAutoModeWidth = tabs.length * tabWidth;
                const newTabsWidthMode = contentWidth > maxAutoModeWidth ? "standard" : "scrollable";

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
        const {
            bc: {align},
            disabled,
        } = this.props;
        const code = keycode(event);

        if (!disabled) {
            if (code === "enter") {
                event.preventDefault();
                this.handleEnter();
            }

            if (
                (align === "center" && (code === "left" || code === "right")) ||
                (align !== "center" && (code === "up" || code === "down"))
            ) {
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

    handleMoveSelectedTab = (code: "left" | "right" | "up" | "down") => {
        const {selectedTab} = this.state;
        const {store} = this.props;
        const tabs = store.getActiveTabs();

        const currentTabIndex = tabs.findIndex((tab) => tab.ckPageObject === selectedTab);
        const nextTabIndex = currentTabIndex + (code === "left" || code === "up" ? -1 : 1);
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
            store: {tabValue, setTabStatus, tabStatus},
            disabled,
            readOnly,
            elevation,
            hidden,
            pageStore,
            visible,
        } = this.props;
        const isVisible = child.ckPageObject === tabValue;

        return (
            <Grid xs={12} item key={child.ckPageObject} style={{display: isVisible ? "block" : "none"}}>
                <BuilderForm
                    onSetForm={(form) => setTabStatus(child.ckPageObject, {form})}
                    injectType="filter"
                    dataPageObject={`${child.ckPageObject}-form`}
                    mode="1"
                    pageStore={pageStore}
                    initialValues={tabStatus.get(child.ckPageObject).recordStore.selectedRecrodValues}
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
                        editing
                        pageStore={pageStore}
                    />
                </BuilderForm>
            </Grid>
        );
    };

    renderLabel(child, orientation: "horizontal" | "vertical") {
        // eslint-disable-next-line id-length
        const {store, classes, t} = this.props;
        const {tabStatus} = store;

        if (orientation === "vertical") {
            return (
                <div className={cn([classes.label, classes.verticalLabel, classes.themeLabel])}>
                    <span className={classes.cycleNum}>{tabStatus.get(child.ckPageObject).num}</span>
                    <span className={classes.verticalLabelText}>{t(child.cvDisplayed)}</span>
                </div>
            );
        }

        return (
            <div className={cn([classes.label, classes.horizontalLabel, classes.themeLabel])}>
                <span className={classes.textNum}>{tabStatus.get(child.ckPageObject).num}</span>
                <span className={classes.horizontalLabelText}>{t(child.cvDisplayed)}</span>
            </div>
        );
    }

    render() {
        const {bc, hidden} = this.props;
        const {childs} = bc;

        if (hidden || !childs || !childs.length) {
            return null;
        }

        return (
            <div>
                {bc.align === "right" ? this.renderSide("row-reverse") : null}
                {bc.align === "left" ? this.renderSide("row") : null}
                {bc.align === "center" ? this.renderTop() : null}
            </div>
        );
    }

    // eslint-disable-next-line max-lines-per-function
    renderTabs(orientation: "horizontal" | "vertical") {
        const {selectedTab, tabsWidthMode} = this.state;
        // eslint-disable-next-line id-length
        const {bc, store, classes, disabled, pageStore, visible, t} = this.props;
        const {tabs, tabValue, tabStatus} = store;

        return (
            <Grid item className={classes.fullWidth}>
                <div
                    tabIndex={disabled ? undefined : 0}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    className={classes.tabsContainer}
                >
                    <Tabs
                        centered={orientation === "horizontal"}
                        orientation={orientation}
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        data-page-object={`${bc.ckPageObject}-tabs`}
                        classes={{
                            indicator: classes.tabsIndicator,
                            root: classes[`${orientation}TabsRoot`],
                            scroller: classes.tabsScroller,
                        }}
                        variant={tabsWidthMode}
                        scrollButtons="desktop"
                        ref={this.tabsComponentRef}
                    >
                        {tabs.map((child) => (
                            <Tab
                                value={child.ckPageObject}
                                key={child.ckPageObject}
                                label={this.renderLabel(child, orientation)}
                                classes={{
                                    containerTab: cn({
                                        [classes.horizontalContainerTab]: orientation === "horizontal",
                                        [classes.activeTabRoot]: tabValue === child.ckPageObject,
                                        [classes.selectedTab]: selectedTab === child.ckPageObject,
                                        [classes.disabled]: disabled || tabStatus.get(child.ckPageObject).disabled,
                                    }),
                                    leftSideTab: cn([classes.leftSideTab, classes.leftSideTabTheme]),
                                    rightSideTab: cn([classes.rightSideTab, classes.rightSideTabTheme]),
                                    root: cn([classes[`${orientation}TabRoot`], classes[`${orientation}TabRootTheme`]]),
                                    textColorInherit: classes.textColorInherit,
                                    wrapper: classes.tabWrapper,
                                }}
                                disabled={disabled || tabStatus.get(child.ckPageObject).disabled}
                                disableRipple
                                data-page-object={`${child.ckPageObject}_tab`}
                                data-qtip={t(child.cvDisplayed)}
                                orientation={orientation}
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
        );
    }

    renderSide(direction: "row" | "row-reverse") {
        const {bc, classes, store, pageStore, visible, disabled} = this.props;
        const {childs, tabValue, tabStatus} = store;

        return (
            <Grid container spacing={1} direction={direction}>
                <Grid item xs={2}>
                    {this.renderTabs("vertical")}
                </Grid>
                <Grid item xs={10}>
                    <Grid container spacing={0} direction="column" data-page-object={bc.ckPageObject}>
                        {mapComponents(childs, this.renderTabComponent)}
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    spacing={1}
                    justify={"flex-end"}
                    className={classes.bottomBar}
                    direction="row"
                >
                    {mapComponents(tabStatus.get(tabValue).btns, (BtnComponent, btn) => (
                        <Grid item>
                            <BtnComponent
                                key={btn.ckPageObject}
                                bc={btn}
                                disabled={disabled}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    }

    renderTop() {
        const {bc, classes, store, pageStore, visible, disabled} = this.props;
        const {childs, tabValue, tabStatus} = store;

        return (
            <Grid container spacing={1} direction="column" data-page-object={bc.ckPageObject}>
                {this.renderTabs("horizontal")}
                {mapComponents(childs, this.renderTabComponent)}
                <Grid item container spacing={1} justify={"flex-end"} className={classes.bottomBar} direction="row">
                    {mapComponents(tabStatus.get(tabValue).btns, (BtnComponent, btn) => (
                        <Grid item>
                            <BtnComponent
                                key={btn.ckPageObject}
                                bc={btn}
                                disabled={disabled}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        );
    }
}

const BuilderRoadMapPanel = compose(
    withModelDecorator(
        (bc: BuilderRoadMapPanelType, props): RoadMapModelType => new RoadMapModel({bc, pageStore: props.pageStore}),
    ),
    withTranslation("meta"),
    commonDecorator,
    withStyles(styles),
    observer,
)(BaseBuilderRoadMapPanel);

setComponent("ROADMAPPANEL", BuilderRoadMapPanel);

export default BuilderRoadMapPanel;
