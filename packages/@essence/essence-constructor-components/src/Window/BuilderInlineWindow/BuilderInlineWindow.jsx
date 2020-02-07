// @flow
import * as React from "react";
import {createPortal} from "react-dom";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import BuilderForm from "../../Form/BuilderForm";
import {type WindowModelType} from "../../stores/WindowModel";
import {type PageModelType} from "../../stores/PageModel";
import {GridModel} from "../../stores/GridModel";
import InlineButtons from "../InlineButtons/InlineButtons";
import InlineTable from "../InlineTable";

type PropsType = {
    store: WindowModelType,
    pageStore: PageModelType,
    gridStore: GridModel,
};

class BuilderInlineWindow extends React.Component<PropsType> {
    componentDidMount() {
        const {pageStore, store} = this.props;

        pageStore.addStore(store, store.windowBc[VAR_RECORD_PAGE_OBJECT_ID]);
    }

    componentWillUnmount() {
        const {pageStore, store} = this.props;

        pageStore.removeStore(store.windowBc[VAR_RECORD_PAGE_OBJECT_ID], store);
    }

    handleSubmit = () => {
        const gridInlineButtonContainer: ?HTMLDivElement = this.props.gridStore.refs.get("grid-inline-button");

        if (gridInlineButtonContainer) {
            const saveButton = gridInlineButtonContainer.querySelector("button");

            if (saveButton) {
                saveButton.click();
            }
        }
    };

    render() {
        const {store, pageStore, gridStore} = this.props;
        const gridInlineButtonContainer = gridStore.refs.get("grid-inline-button");
        const gridInlineContainer = gridStore.refs.get("grid-inline");

        return (
            <BuilderForm
                noForm
                onSubmit={this.handleSubmit}
                initialValues={store.initialValues}
                mode={store.config.mode}
                pageStore={pageStore}
            >
                {gridInlineButtonContainer
                    ? createPortal(
                          <InlineButtons store={store} gridStore={gridStore} pageStore={pageStore} />,
                          gridInlineButtonContainer,
                      )
                    : null}

                {gridInlineContainer
                    ? createPortal(
                          <InlineTable pageStore={pageStore} gridStore={gridStore} store={store} />,
                          gridInlineContainer,
                      )
                    : null}
            </BuilderForm>
        );
    }
}

export default compose(observer)(BuilderInlineWindow);
