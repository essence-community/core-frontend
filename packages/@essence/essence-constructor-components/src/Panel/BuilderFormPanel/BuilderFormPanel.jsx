// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import noop from "lodash/noop";
import {Paper, Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import cn from "classnames";
import {buttonDirection} from "../../constants";
import commonDecorator from "../../decorators/commonDecorator";
import {PanelFormModel, type PanelFormModelType} from "../../stores/PanelFormModel";
import BuilderForm from "../../Form/BuilderForm";
import withModelDecorator from "../../decorators/withModelDecorator";
import BuilderFilter from "../../Filter/BuilderFilter";
import EmptyTitle from "../../Components/EmptyTitle/EmptyTitle";
import Content from "../../Components/Content/Content";
import {type BuilderPanelPropsType} from "../BuilderPanelType";
import BuilderPanelEditingButtons from "../BuilderPanelEditingButtons/BuilderPanelEditingButtons";
import Panel from "../Panel/Panel";
import styes from "./BuilderFormPanelStyles";

const EMPTY_RECORD = {};
const FITER_ONE_BUTTON = 42;
const FILTER_THREE_BUTTON = 128;

type OwnPropsType = {
    store: PanelFormModelType,
};

type PropsType = BuilderPanelPropsType & OwnPropsType & WithT;

export class BuilderFormPanelBase extends React.Component<PropsType> {
    disposers: Array<Function> = [];

    setRefContent = (node: ?React.ElementRef<*>) => {
        this.props.store.addRefAction("grid-content", node);
    };

    // eslint-disable-next-line max-lines-per-function, max-statements
    render() {
        // eslint-disable-next-line id-length
        const {store, bc, readOnly, hideTitle, pageStore, visible, elevation, t, disabled, classes} = this.props;
        const {filters = [], hideactions} = bc;
        const isHideActions = hideactions === "true";
        const isEditing = readOnly ? false : store.editing;
        const isFilterActionsPresent = filters.length > 0 && filters[0].dynamicfilter !== "true";
        const transCvDisplayed = t(bc[VAR_RECORD_DISPLAYED]);
        const classNameRoot = cn(classes.root, isHideActions ? classes.rootActionsHide : classes.rootActions, {
            [classes.panelEditing]: isEditing,
        });
        // eslint-disable-next-line init-declarations
        let marginTop;

        if (isFilterActionsPresent && pageStore.styleTheme === "dark") {
            if (filters[0].topbtn?.length > 0) {
                marginTop = filters[0].topbtn.length * FITER_ONE_BUTTON;
            } else {
                marginTop = store.isFilterOpen ? FILTER_THREE_BUTTON : FITER_ONE_BUTTON;
            }
        }

        const filterComponent = (
            <Grid item xs>
                {filters.map((filter: Object) => (
                    <BuilderFilter
                        key={filter[VAR_RECORD_PAGE_OBJECT_ID]}
                        open={store.isFilterOpen}
                        disabled={false}
                        bc={filter}
                        parentBc={bc}
                        onSearch={store.searchAction}
                        pageStore={pageStore}
                        handleGlobals={noop}
                        visible={visible}
                        title={hideTitle ? undefined : transCvDisplayed}
                        isHideActions={isHideActions}
                        addRefAction={store.addRefAction}
                        onExited={this.handleUpdateTop}
                        onEntered={this.handleUpdateTop}
                        absolute={true}
                    />
                ))}
            </Grid>
        );

        const actionsComponent = (
            <Grid item style={{marginTop}} className={classes.formActions}>
                {isEditing ? (
                    <BuilderPanelEditingButtons store={store} bc={bc} pageStore={pageStore} visible={visible} />
                ) : (
                    <Grid container alignItems="center" direction={buttonDirection} spacing={1}>
                        {mapComponents(store.panelBc.topbtn, (ChildComp, childBc) => {
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
                )}
            </Grid>
        );

        const formComponent = (
            <Grid item className={classes.formRoot} xs zeroMinWidth>
                <Content verticalSize="16" horizontalSize="16" className={classes.content}>
                    <Panel
                        bc={bc}
                        disabled={disabled}
                        hidden={this.props.hidden}
                        visible={this.props.visible}
                        editing={isEditing}
                        readOnly={readOnly}
                        pageStore={pageStore}
                        tabIndex={this.props.tabIndex}
                        record={this.props.record}
                    />
                </Content>
            </Grid>
        );

        const themeContent = (
            <BuilderForm
                initialValues={store.recordsStore.records[0] || EMPTY_RECORD}
                pageStore={pageStore}
                isEditing={isEditing}
                mode={store.mode}
            >
                {pageStore.styleTheme === "dark" ? (
                    <Grid container direction="row" className={classNameRoot}>
                        {isHideActions ? null : actionsComponent}
                        <Grid item container direction="column" className={classes.contentRoot}>
                            <Grid item xs>
                                {hideTitle ? null : (
                                    <EmptyTitle hideactions title={transCvDisplayed} filters={filters} />
                                )}
                            </Grid>
                            {filterComponent}
                            {formComponent}
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container direction="column" className={classNameRoot} wrap="nowrap">
                        {filterComponent}
                        {isHideActions ? null : actionsComponent}
                        {formComponent}
                    </Grid>
                )}
            </BuilderForm>
        );

        if (elevation) {
            return <Paper elevation={elevation}>{themeContent}</Paper>;
        }

        return themeContent;
    }
}

export default compose(
    commonDecorator,
    withStyles(styes, {withTheme: true}),
    withTranslation("meta"),
    withModelDecorator(
        (bc: $PropertyType<BuilderPanelPropsType, "bc">, {pageStore}: BuilderPanelPropsType): PanelFormModelType =>
            new PanelFormModel({bc, pageStore}),
    ),
    observer,
)(BuilderFormPanelBase);
