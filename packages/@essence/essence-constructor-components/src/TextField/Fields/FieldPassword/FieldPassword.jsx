// @flow
import * as React from "react";
import {IconButton} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {isEmpty} from "../../../utils/base";
import TextField from "../../TextField";
import type {TextFieldChildProps} from "../../BuilderFieldType";

type StateType = {
    showPassword: boolean,
};

type PropsType = TextFieldChildProps & {
    bfClasses: {
        [$Keys: string]: string,
    },
};

class FieldPassword extends React.Component<PropsType, StateType> {
    state = {
        showPassword: false,
    };

    handleToggleShowPassword = () => {
        this.setState((prevState: StateType) => ({showPassword: !prevState.showPassword}));
    };

    render() {
        const {
            bfClasses,
            value,
            tips,
            bc: {ckPageObject},
        } = this.props;
        const {showPassword} = this.state;

        const endAdornment = isEmpty(value) ? null : (
            <React.Fragment>
                {tips}
                <IconButton
                    color="secondary"
                    className={bfClasses.eyeButton}
                    onClick={this.handleToggleShowPassword}
                    data-page-object={`${ckPageObject}-eye`}
                    tabIndex={-1}
                    disableRipple
                >
                    <Icon iconfont={showPassword ? "eye-slash" : "eye"} size="xs" />
                </IconButton>
            </React.Fragment>
        );

        return (
            <TextField
                {...this.props}
                InputProps={{
                    ...this.props.InputProps,
                    endAdornment,
                }}
                // eslint-disable-next-line
                inputProps={{
                    ...this.props.inputProps,
                    type: showPassword ? "text" : "password",
                }}
            />
        );
    }
}

export default FieldPassword;
