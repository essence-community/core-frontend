// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import cn from "classnames";
import get from "lodash/get";
import {withStyles} from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import ColorPicker from "../../../ColorPicker/ColorPicker";
import TextFieldLabel from "../../TextFieldComponents/TextFieldLabel/TextFieldLabel";
import FieldColorPickerStyles from "./FieldColorPickerStyles";
import {type FieldColorPickerPropsType, type FieldColorPickerStateType} from "./FieldColorPickerType";

class FieldColorPicker extends React.Component<FieldColorPickerPropsType, FieldColorPickerStateType> {
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
            disabled,
            classes,
            error,
            noLabel,
            onChange,
            bc,
            tabIndex,
            field,
            pageStore,
        } = this.props;
        const {focused} = this.state;
        const isInline = bc.edittype && bc.edittype === "inline";
        const colors = get(pageStore, "applicationStore.configs.colors");

        return (
            <label
                className={cn(classes.root, {
                    [classes.setInline]: isInline,
                    [classes.disabled]: disabled,
                    [classes.noLabelRender]: noLabel,
                    [classes.focused]: focused,
                })}
                data-qtip={bc.cvDisplayed}
                data-page-object={bc.ckPageObject}
            >
                {bc.cvDisplayed ? (
                    <FormLabel {...InputLabelProps} classes={{root: classes.formLabel}} error={error}>
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
                ) : null}

                <ColorPicker
                    onChange={onChange}
                    tabIndex={tabIndex}
                    initialValue={typeof value === "string" ? value : ""}
                    colors={colors}
                    value={value}
                />
            </label>
        );
    }
}

export default compose(
    withStyles(FieldColorPickerStyles, {name: "EssenceFieldColorPicker"}),
    observer,
)(FieldColorPicker);
