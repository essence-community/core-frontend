// @flow
import * as React from "react";
import {observer} from "mobx-react";
import keycode from "keycode";
import {type BuilderBaseType} from "../BuilderType";
import {type PageModelType} from "../stores/PageModel";
import WindowMessage from "./WindowMessage";

type PropsType = {
    store: {
        +cancel: boolean,
        +closeAction: () => void,
        +resetCancelAction: () => void,
        +setCancelAction: () => void,
    },
    bc: BuilderBaseType,
    pageStore: PageModelType,
    disableEscapeKeyDown: boolean,
    onAccept?: () => void,
};

class WindowMessageCancel extends React.Component<PropsType> {
    static defaultProps = {
        disableEscapeKeyDown: false,
    };

    componentDidMount() {
        if (!this.props.disableEscapeKeyDown) {
            document.addEventListener("keydown", this.handleKeyDown);
        }
    }

    componentWillUnmount() {
        if (!this.props.disableEscapeKeyDown) {
            document.removeEventListener("keydown", this.handleKeyDown);
        }
    }

    handleKeyDown = (event: KeyboardEvent) => {
        const {store, pageStore} = this.props;

        if (keycode(event) === "esc" && !store.cancel && !pageStore.hiddenPage) {
            store.setCancelAction();
        }
    };

    render() {
        const {store, bc, pageStore, onAccept} = this.props;

        return (
            <WindowMessage
                open={store.cancel}
                onAccept={onAccept || store.closeAction}
                onDecline={store.resetCancelAction}
                ckPageObject={bc.ckPageObject}
                pageStore={pageStore}
                hideBackdrop={false}
            />
        );
    }
}

export default observer(WindowMessageCancel);
