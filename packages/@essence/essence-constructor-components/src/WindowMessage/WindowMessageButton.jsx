// @flow
import * as React from "react";
import keycode from "keycode";
import Button from "@material-ui/core/Button";
import {type PageModelType} from "../stores/PageModel";
import WindowMessage from "./WindowMessage";

type PropsType = {
    buttonText?: string,
    buttonColor: "secondary",
    onClickAccept: (event: SyntheticEvent<HTMLButtonElement>) => void,
    children?: React.Node,
    textWindow?: string | React.Node,
    textAccept?: string,
    textDecline?: string,
    popover?: boolean,
    popoverProps?: Object,
    hideBackdrop?: boolean,
    pageStore: PageModelType,
    ckPageObject: string,
    disableRestoreFocus?: boolean,
    isEscOpen?: boolean,
};

type StateType = {
    open: boolean,
    isEscOpen: boolean,
};

class WindowMessageButton extends React.Component<PropsType, StateType> {
    static defaultProps = {
        buttonColor: "secondary",
    };

    state = {
        isEscOpen: false,
        open: false,
    };

    componentDidMount() {
        if (this.props.isEscOpen) {
            document.addEventListener("keydown", this.handleKeyDown);
        }
    }

    componentWillUnmount() {
        if (this.props.isEscOpen) {
            document.removeEventListener("keydown", this.handleKeyDown);
        }
    }

    handleAccept = (event: SyntheticEvent<HTMLButtonElement>) => {
        this.setState({open: false});

        return this.props.onClickAccept(event);
    };

    handleDecline = () => {
        this.setState({isEscOpen: false, open: false});
    };

    handleClickCloseBtn = () => {
        this.setState({open: true});
    };

    handleKeyDown = (event: KeyboardEvent) => {
        const {pageStore} = this.props;

        if (keycode(event) === "esc" && !pageStore.hiddenPage) {
            this.setState((prevState) => {
                if (prevState.open) {
                    return null;
                }

                return {
                    isEscOpen: true,
                    open: true,
                };
            });
        }
    };

    render() {
        const {open, isEscOpen} = this.state;
        const {buttonText, buttonColor, children, popover, pageStore, ckPageObject} = this.props;
        const childContent = children ? (
            React.Children.map(children, (child) => React.cloneElement(child, {onClick: this.handleClickCloseBtn}))
        ) : (
            <Button
                color={buttonColor}
                disableRipple
                disableFocusRipple
                variant="contained"
                onClick={this.handleClickCloseBtn}
            >
                {buttonText}
            </Button>
        );
        const isPopover = isEscOpen ? false : popover;

        return (
            <React.Fragment>
                <WindowMessage
                    open={open}
                    onAccept={this.handleAccept}
                    onDecline={this.handleDecline}
                    textAccept={this.props.textAccept}
                    textDecline={this.props.textDecline}
                    popover={isPopover}
                    popoverNode={childContent}
                    popoverProps={this.props.popoverProps}
                    hideBackdrop={this.props.hideBackdrop}
                    pageStore={pageStore}
                    ckPageObject={ckPageObject}
                    disableRestoreFocus={this.props.disableRestoreFocus}
                >
                    {this.props.textWindow}
                </WindowMessage>
                {isPopover ? null : childContent}
            </React.Fragment>
        );
    }
}

export default WindowMessageButton;
