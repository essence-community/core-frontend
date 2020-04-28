// @flow
import * as React from "react";
import {Paper, Grid} from "@material-ui/core";
import {setComponent, mapComponents} from "@essence-community/constructor-share";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {compose} from "recompose";
import {buttonDirection} from "../constants";
import Content from "../Components/Content/Content";
import EmptyTitle from "../Components/EmptyTitle/EmptyTitle";
import ThemePanelWrapper from "../Components/ThemePanelWrapper/ThemePanelWrapper";
import commonDecorator from "../decorators/commonDecorator";
import {type BuilderPanelPropsType, type PanelAdditionalPropsType} from "./BuilderPanelType";
import BasePanelCollapsible from "./BasePanelCollapsible";
import BuilderFormPanel from "./BuilderFormPanel";
import Panel from "./Panel/Panel";

class BaseBuilderBasePanel extends React.PureComponent<BuilderPanelPropsType & WithT, {isMounted: boolean}> {
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
                <Grid container alignItems="center" direction={buttonDirection} spacing={1}>
                    {mapComponents(topbtn, (ChildComp, childBc) => {
                        const isAddButton = childBc.mode === "1";
                        const newChildBc = isAddButton
                            ? {...childBc, uitype: "4"}
                            : {...childBc, uitype: childBc.uitype === "1" ? "11" : childBc.uitype};

                        return (
                            <Grid item key={newChildBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                <ChildComp
                                    bc={newChildBc}
                                    disabled={disabled}
                                    pageStore={pageStore}
                                    readOnly={readOnly}
                                    visible={visible}
                                />
                            </Grid>
                        );
                    })}
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
        // eslint-disable-next-line id-length
        const {bc, editing, readOnly, elevation, t} = this.props;

        if (bc.collapsible === "true") {
            return (
                <BasePanelCollapsible
                    title={t(bc[VAR_RECORD_DISPLAYED])}
                    editing={readOnly ? false : editing}
                    bc={bc}
                    renderBasePanel={this.renderBasePanel}
                />
            );
        }

        return this.renderBasePanel({elevation: isThemePanelWrapper ? undefined : elevation});
    }

    // eslint-disable-next-line max-statements, max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {bc, editing, hidden, visible, hideTitle, elevation, classNameRoot, topPanel, t} = this.props;
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
            if (bc[VAR_RECORD_DISPLAYED] && !hideTitle && bc.type !== "BOX") {
                content = (
                    <Grid container spacing={0} direction="column">
                        <Grid item xs>
                            <EmptyTitle title={t(bc[VAR_RECORD_DISPLAYED])} filters={bc.filters} slim={false} />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <ThemePanelWrapper
                                actionsBar={actions}
                                editing={editing}
                                topPanel={topPanel}
                                classNameRoot={classNameRoot}
                                childRef={this.props.childRef}
                            >
                                <Content verticalSize="16" horizontalSize="16" fullHeight>
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
                        <Content verticalSize="16" horizontalSize="16" fullHeight>
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

const BuilderBasePanel = compose(withTranslation("meta"), commonDecorator)(BaseBuilderBasePanel);

setComponent("PANEL", BuilderBasePanel);
setComponent("BOX", BuilderBasePanel);
setComponent("BASEPANEL", BuilderBasePanel);

export default BuilderBasePanel;
