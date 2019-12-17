// @flow
import * as React from "react";
import noop from "lodash/noop";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {Field} from "mobx-react-form";
import {IconButton} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {isEmpty} from "../../../../utils/base";
import TextField from "../../../TextField";
import styles from "./SearchTextFieldStyles";

type PropsType = {
    classes?: Object,
    errorText?: string,
    store: {
        +displayText?: string,
    },
    InputLabelProps?: Object,
    fullWidth?: boolean,
    disabled?: boolean,
    error?: boolean,
    helperText?: string,
    bc: Object,
    field: Field,
    tabIndex?: string,
    style?: Object,
    onClick: (event?: SyntheticEvent<>) => Promise<void> | void,
    handleClear?: (event: SyntheticEvent<>) => void,
    dataPageObject: string,
};

const ARROW_DOWN_KEY = 40;

class SearchTextField extends React.Component<PropsType> {
    inputRef: ?HTMLInputElement;

    static defaultProps = {
        onClick: noop,
    };

    componentWillUnmount() {
        this.inputRef = null;
    }

    handleKeyDown = (event: KeyboardEvent) => {
        if (event.keyCode === ARROW_DOWN_KEY) {
            event.preventDefault();
            this.props.onClick();
        }
    };

    handleFocusButton = () => {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    };

    setInputRef = (node: HTMLInputElement) => {
        this.inputRef = node;
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {
            classes = {},
            store,
            InputLabelProps,
            handleClear,
            fullWidth,
            disabled,
            error,
            helperText,
            onClick,
            dataPageObject,
            bc,
            field,
            tabIndex,
            style,
        } = this.props;

        const tips = [
            store.displayText ? (
                <IconButton
                    key="clear"
                    disabled={disabled}
                    color="secondary"
                    disableRipple
                    className={classes.clear}
                    onClick={handleClear}
                    data-page-object={`${dataPageObject}-clear`}
                    tabIndex={-1}
                    onFocus={this.handleFocusButton}
                >
                    <Icon iconfont="times" size="xs" />
                </IconButton>
            ) : null,
            <IconButton
                key="search"
                disabled={disabled}
                color="secondary"
                disableRipple
                className={classes.search}
                data-page-object={`${dataPageObject}-search`}
                tabIndex={-1}
                onFocus={this.handleFocusButton}
            >
                <Icon iconfont="search" size="xs" />
            </IconButton>,
        ];

        return (
            <TextField
                bc={bc}
                field={field}
                className={classes.textFieldRoot}
                InputLabelProps={{
                    ...InputLabelProps,
                    className: classes.labelRoot,
                    shrink: !isEmpty(store.displayText),
                }}
                tips={tips}
                InputProps={{classes: {focused: classes.inputFocused}, endAdornment: tips, readOnly: true}}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{onKeyDown: this.handleKeyDown, tabIndex}}
                value={store.displayText}
                fullWidth={fullWidth}
                disabled={disabled}
                error={error}
                helperText={helperText}
                onClick={disabled ? undefined : onClick}
                data-page-object={dataPageObject}
                inputRef={this.setInputRef}
                style={style}
            />
        );
    }
}

export default compose(withStyles(styles), observer)(SearchTextField);
