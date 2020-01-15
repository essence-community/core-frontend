// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {Paper} from "@material-ui/core";
import {setComponent} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {HistoryModel, type HistoryModelType} from "../stores/HistoryModel";
import {type PageModelType} from "../stores/PageModel";
import withModelDecorator from "../decorators/withModelDecorator";
import BuilderForm from "../Form/BuilderForm";
import BuilderPanelEditingButtons from "../Panel/BuilderPanelEditingButtons/BuilderPanelEditingButtons";
import BuilderBasePanel from "../Panel/BuilderBasePanel";
import {type BuilderHistoryPanelType} from "./BuilderHistoryPanelType";
import BuilderHistoryPanelButtons from "./BuilderHistoryPanelButtons";

type PropsType = CommonDecoratorInjectType & {
    bc: BuilderHistoryPanelType,
    disabled?: boolean,
    readOnly?: boolean,
    hidden?: boolean,
    elevation?: number,
    hideTitle?: boolean,
    pageStore: PageModelType,
};

type PropsStoreType = {
    store: HistoryModelType,
};

export class BaseBuilderHistoryPanel extends React.Component<PropsType & PropsStoreType> {
    renderEditingPanel = (actions) => {
        const {bc, store, hideTitle, readOnly, pageStore, visible} = this.props;

        return (
            <BuilderBasePanel
                actions={actions}
                editing={store.editing}
                readOnly={readOnly}
                bc={bc}
                hideTitle={hideTitle}
                pageStore={pageStore}
                visible={visible}
                classNameRoot={store.editing ? "panel-editing-focus" : undefined}
            />
        );
    };

    renderBody() {
        const {store, bc, disabled, readOnly, pageStore, visible} = this.props;
        const {selectedRecordValues} = store.recordsStore;

        const actions = (
            <React.Fragment>
                {store.editing ? <BuilderPanelEditingButtons store={store} bc={bc} pageStore={pageStore} /> : null}
                <BuilderHistoryPanelButtons
                    store={store}
                    bc={bc}
                    disabled={disabled}
                    readOnly={readOnly}
                    pageStore={pageStore}
                    editing={store.editing}
                    visible={visible}
                />
            </React.Fragment>
        );

        return (
            <BuilderForm
                initialValues={selectedRecordValues}
                dataPageObject={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-form`}
                isEditing={store.editing}
                mode={store.mode}
                pageStore={pageStore}
            >
                {this.renderEditingPanel(actions)}
            </BuilderForm>
        );
    }

    render() {
        const {elevation} = this.props;

        if (elevation) {
            return (
                <Paper elevation={elevation} className="paper-overflow-hidden">
                    {this.renderBody()}
                </Paper>
            );
        }

        return this.renderBody();
    }
}

const BuilderHistoryPanel = compose(
    withModelDecorator((bc: BuilderHistoryPanelType, {pageStore}: PropsType) => new HistoryModel({bc, pageStore})),
    commonDecorator,
    observer,
)(BaseBuilderHistoryPanel);

setComponent("HISTORYPANEL", BuilderHistoryPanel);

export default BuilderHistoryPanel;
