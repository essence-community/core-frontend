// @flow
import * as React from "react";
import {compose} from "recompose";
import {reaction} from "mobx";
import {observer} from "mobx-react";
import noop from "lodash/noop";
import {Paper, Grid} from "@material-ui/core";
import commonDecorator from "../decorators/commonDecorator";
import {PanelFormModel, type PanelFormModelType} from "../stores/PanelFormModel";
import {updateTopGrid} from "../stores/GridModel";
import BuilderForm from "../Form/BuilderForm";
import withModelDecorator from "../decorators/withModelDecorator";
import BuilderFilter from "../Filter/BuilderFilter";
import EmptyTitle from "../Components/EmptyTitle/EmptyTitle";
import BuilderBasePanel from "./BuilderBasePanel";
import {type BuilderPanelPropsType} from "./BuilderPanelType";
import BuilderPanelEditingButtons from "./BuilderPanelEditingButtons/BuilderPanelEditingButtons";

const EMPTY_RECORD = {};

type OwnPropsType = {
    store: PanelFormModelType,
};

type PropsType = BuilderPanelPropsType & OwnPropsType;

export class BuilderFormPanelBase extends React.Component<PropsType> {
    disposers: Array<Function> = [];

    componentDidMount() {
        const {visible, pageStore} = this.props;

        if (this.props.pageStore.styleTheme === "dark") {
            if (visible || (visible === undefined && pageStore.visible)) {
                // В BuilderForm происходит задержка контента
                requestAnimationFrame(() => {
                    updateTopGrid(this.props.store.refs, this.props.store.isFilterOpen);
                });
            }

            this.disposers.push(reaction(() => pageStore.visible, this.handlePageVisible));
        }

        window.addEventListener("resize", this.handleResizeWindow);
    }

    componentDidUpdate(prevProps: PropsType) {
        if (
            this.props.pageStore.styleTheme === "dark" &&
            prevProps.visible !== this.props.visible &&
            this.props.visible
        ) {
            updateTopGrid(this.props.store.refs, this.props.store.isFilterOpen);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResizeWindow);
    }

    setRefContent = (node: ?React.ElementRef<*>) => {
        this.props.store.addRefAction("grid-content", node);
    };

    handlePageVisible = (pageVisible: any) => {
        if (pageVisible && this.props.visible === undefined) {
            updateTopGrid(this.props.store.refs, this.props.store.isFilterOpen);
        }
    };

    handleResizeWindow = () => {
        if (this.props.pageStore.styleTheme === "dark" && this.props.visible) {
            updateTopGrid(this.props.store.refs, this.props.store.isFilterOpen);
        }
    };

    handleUpdateTop = () => {
        if (this.props.pageStore.styleTheme === "dark" && this.props.visible) {
            updateTopGrid(this.props.store.refs, this.props.store.isFilterOpen);
        }
    };

    handleChangeCollapse = () => {
        const {store, pageStore} = this.props;

        store.toggleIsFilterOpen();

        if (this.props.visible && pageStore.styleTheme === "dark") {
            updateTopGrid(store.refs, store.isFilterOpen);
        }
    };

    render() {
        const {store, bc, readOnly, hideTitle, pageStore, visible, elevation} = this.props;
        const {filters = [], cvDisplayed, hideactions} = bc;
        const isEditing = readOnly ? false : store.editing;

        const content = (
            <Grid container spacing={0} direction="column">
                {filters.map((filter: Object) => (
                    <Grid item key={filter.ckPageObject}>
                        <BuilderFilter
                            onChangeCollapse={this.handleChangeCollapse}
                            open={store.isFilterOpen}
                            disabled={false}
                            bc={filter}
                            parentBc={bc}
                            onSearch={store.searchAction}
                            pageStore={pageStore}
                            handleGlobals={noop}
                            visible={visible}
                            addRefAction={store.addRefAction}
                            onExited={this.handleUpdateTop}
                            onEntered={this.handleUpdateTop}
                        />
                    </Grid>
                ))}
                {hideTitle || hideactions === "true" ? null : <EmptyTitle title={cvDisplayed} filters={filters} />}
                <Grid item>
                    <BuilderForm
                        initialValues={store.recordsStore.records[0] || EMPTY_RECORD}
                        pageStore={pageStore}
                        isEditing={isEditing}
                    >
                        <BuilderBasePanel
                            {...this.props}
                            pageStore={pageStore}
                            bc={store.panelBc}
                            elevation={undefined}
                            editing={isEditing}
                            readOnly={readOnly}
                            hideTitle
                            visible={visible}
                            topPanel={true}
                            actions={
                                isEditing ? (
                                    <BuilderPanelEditingButtons
                                        store={store}
                                        bc={bc}
                                        pageStore={pageStore}
                                        visible={visible}
                                    />
                                ) : null
                            }
                            childRef={this.setRefContent}
                        />
                    </BuilderForm>
                </Grid>
            </Grid>
        );

        if (elevation) {
            return <Paper elevation={elevation}>{content}</Paper>;
        }

        return content;
    }
}

export default compose(
    commonDecorator,
    withModelDecorator(
        (bc: $PropertyType<BuilderPanelPropsType, "bc">, {pageStore}: BuilderPanelPropsType): PanelFormModelType =>
            new PanelFormModel({bc, pageStore}),
    ),
    observer,
)(BuilderFormPanelBase);
