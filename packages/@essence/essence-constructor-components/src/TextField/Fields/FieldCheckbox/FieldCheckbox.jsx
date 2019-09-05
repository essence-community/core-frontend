// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import {Icon} from "@essence/essence-constructor-share/Icon";
import TextFieldLabel from "../../TextFieldComponents/TextFieldLabel/TextFieldLabel";
import FieldCheckboxStyles from "./FieldCheckboxStyles";
import {type FieldCheckboxPropsType} from "./FieldCheckboxType";

type StateType = {
    focused: boolean,
};

class FieldCheckbox extends React.Component<FieldCheckboxPropsType, StateType> {
    state = {
        focused: false,
    };

    handleFocus = () => {
        this.setState({focused: true});
    };

    handleBlur = () => {
        this.setState({focused: false});
    };

    render() {
        const {
            value,
            InputLabelProps,
            label,
            disabled,
            classes,
            error,
            noLabel,
            onChange,
            bc,
            tabIndex,
            field,
        } = this.props;
        const {focused} = this.state;
        const isInline = bc.edittype && bc.edittype === "inline";

        return (
            <label
                className={cn(classes.root, {
                    [classes.setInline]: isInline,
                    [classes.disabled]: disabled,
                    [classes.noLabelRender]: noLabel,
                    [classes.focused]: focused,
                })}
                data-qtip={value ? "Да" : "Нет"}
                data-page-object={bc.ckPageObject}
            >
                <FormLabel
                    {...InputLabelProps}
                    classes={{root: `${classes.formLabel} ${bc.info ? classes.defaultPointerEvents : ""}`}}
                    error={error}
                >
                    {noLabel ? (
                        ""
                    ) : (
                        <TextFieldLabel
                            bc={bc}
                            info={bc.info}
                            error={error}
                            isRequired={field.rules && field.rules.indexOf("required") >= 0}
                        />
                    )}
                </FormLabel>
                <Checkbox
                    checked={Boolean(value)}
                    onChange={onChange}
                    className={classes.checkboxRoot}
                    disabled={disabled}
                    color="default"
                    checkedIcon={<Icon iconfont="check-square" />}
                    icon={disabled ? <Icon iconfont="square" /> : <Icon iconfont="square-o" />}
                    disableRipple
                    tabIndex={tabIndex}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </label>
        );
    }
}

export default compose(
    withStyles(FieldCheckboxStyles, {name: "EssenceFieldCheckbox"}),
    observer,
)(FieldCheckbox);
