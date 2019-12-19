// @flow
import * as React from "react";
import {compose} from "recompose";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {observer} from "mobx-react";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {Checkbox, FormLabel} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import TextFieldLabel from "../../TextFieldComponents/TextFieldLabel/TextFieldLabel";
import FieldCheckboxStyles from "./FieldCheckboxStyles";
import {type FieldCheckboxPropsType} from "./FieldCheckboxType";

type StateType = {
    focused: boolean,
};

class FieldCheckbox extends React.Component<FieldCheckboxPropsType & WithT, StateType> {
    state = {
        focused: false,
    };

    handleFocus = () => {
        this.setState({focused: true});
    };

    handleBlur = () => {
        this.setState({focused: false});
    };

    // eslint-disable-next-line max-lines-per-function
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
            // eslint-disable-next-line id-length
            t,
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
                data-qtip={value ? t("dacf7ab025c344cb81b700cfcc50e403") : t("f0e9877df106481eb257c2c04f8eb039")}
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
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
                            info={t(bc.info)}
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
    withTranslation("meta"),
    observer,
)(FieldCheckbox);
