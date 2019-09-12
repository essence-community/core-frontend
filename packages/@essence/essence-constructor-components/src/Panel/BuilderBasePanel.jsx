// @flow
import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
import Paper from "@material-ui/core/Paper";
import {buttonDirection} from "../constants";
import Content from "../Components/Content/Content";
import EmptyTitle from "../Components/EmptyTitle/EmptyTitle";
import ThemePanelWrapper from "../Components/ThemePanelWrapper/ThemePanelWrapper";
import commonDecorator from "../decorators/commonDecorator";
import {type BuilderPanelPropsType, type PanelAdditionalPropsType} from "./BuilderPanelType";
import BasePanelCollapsible from "./BasePanelCollapsible";
import BuilderFormPanel from "./BuilderFormPanel";
import Panel from "./Panel/Panel";

class BaseBuilderBasePanel extends React.PureComponent<BuilderPanelPropsType, {isMounted: boolean}> {
    static defaultProps = {
        direction: "column",
        topPanel: false,
    };

    state = {
        isMounted: false,
    };

    componentDidMount() {
        this.setState({isMounted: true});
    }

    getActions = (isForm: boolean): React.Node | null => {
        const {actions, disabled, pageStore, readOnly, visible, bc} = this.props;
        const {topbtn = []} = bc;

        if (actions) {
            return actions;
        }

        if (topbtn.length > 0 || (isForm && pageStore.styleTheme === "dark")) {
            return (
                <Grid container alignItems="center" direction={buttonDirection} spacing={8}>
                    {mapComponents(topbtn, (ChildComp, child) => (
                        <Grid item key={child.ckPageObject}>
                            <ChildComp
                                bc={child}
                                disabled={disabled}
                                onlyicon={pageStore.styleTheme === "dark" ? true : undefined}
                                color="inherit"
                                pageStore={pageStore}
                                readOnly={readOnly}
                                visible={visible}
                            />
                        </Grid>
                    ))}
                </Grid>
            );
        }

        return null;
    };

    renderBasePanel = (additionalProps: PanelAdditionalPropsType) => {
        const {
            bc,
            editing,
            disabled,
            readOnly,
            elevation,
            hidden,
            pageStore,
            visible,
            onExpand,
            tabIndex,
            record,
        } = this.props;

        return (
            <Panel
                bc={bc}
                disabled={disabled}
                hidden={hidden}
                visible={visible}
                editing={editing}
                readOnly={readOnly}
                elevation={elevation}
                pageStore={pageStore}
                onExpand={onExpand}
                tabIndex={tabIndex}
                record={record}
                {...additionalProps}
            />
        );
    };

    renderPanel(isThemePanelWrapper: boolean) {
        const {bc, editing, readOnly, elevation} = this.props;
        const {collapsible, cvDisplayed} = bc;

        if (collapsible === "true") {
            return (
                <BasePanelCollapsible
                    title={cvDisplayed}
                    editing={readOnly ? false : editing}
                    bc={bc}
                    renderBasePanel={this.renderBasePanel}
                />
            );
        }

        return this.renderBasePanel({elevation: isThemePanelWrapper ? undefined : elevation});
    }

    // eslint-disable-next-line max-statements
    render() {
        const {bc, editing, hidden, visible, hideTitle, elevation, classNameRoot, topPanel} = this.props;
        const {editmodepanel, hideactions} = bc;
        const isForm = editmodepanel === "true" && typeof editing === "undefined";

        if (hidden || !this.state.isMounted) {
            return null;
        }

        if (isForm) {
            return <BuilderFormPanel {...this.props} visible={visible} />;
        }

        const actions = this.getActions(isForm || Boolean(this.props.childRef));
        const isThemePanelWrapper = Boolean(actions || isForm || Boolean(this.props.childRef));
        let content = this.renderPanel(isThemePanelWrapper);

        if (isThemePanelWrapper && hideactions !== "true") {
            if (bc.cvDisplayed && !hideTitle && bc.type !== "BOX") {
                content = (
                    <Grid container spacing={0} direction="column">
                        <Grid item>
                            <EmptyTitle title={bc.cvDisplayed} filters={bc.filters} slim={false} />
                        </Grid>
                        <Grid item>
                            <ThemePanelWrapper
                                actionsBar={actions}
                                editing={editing}
                                topPanel={topPanel}
                                classNameRoot={classNameRoot}
                                childRef={this.props.childRef}
                            >
                                <Content verticalSize="16" horizontalSize="16">
                                    {content}
                                </Content>
                            </ThemePanelWrapper>
                        </Grid>
                    </Grid>
                );
            } else {
                content = (
                    <ThemePanelWrapper
                        actionsBar={actions}
                        editing={editing}
                        topPanel={topPanel}
                        childRef={this.props.childRef}
                    >
                        <Content verticalSize="16" horizontalSize="16">
                            {content}
                        </Content>
                    </ThemePanelWrapper>
                );
            }

            if (elevation) {
                content = (
                    <Paper className="paper-overflow-hidden" elevation={this.props.elevation}>
                        {content}
                    </Paper>
                );
            }
        }

        return content;
    }
}

const BuilderBasePanel = commonDecorator(BaseBuilderBasePanel);

setComponent("PANEL", BuilderBasePanel);
setComponent("BOX", BuilderBasePanel);
setComponent("BASEPANEL", BuilderBasePanel);

export default BuilderBasePanel;
