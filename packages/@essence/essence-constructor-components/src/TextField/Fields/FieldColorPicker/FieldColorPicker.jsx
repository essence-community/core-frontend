// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import cn from "classnames";
import get from "lodash/get";
import {withStyles} from "@material-ui/core/styles";
import {FormLabel} from "@material-ui/core";
import {withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents/TextFieldLabel";
import ColorPicker from "../../../ColorPicker/ColorPicker";
import FieldColorPickerStyles from "./FieldColorPickerStyles";
import {type FieldColorPickerPropsType, type FieldColorPickerStateType} from "./FieldColorPickerType";

class FieldColorPicker extends React.Component<FieldColorPickerPropsType & WithT, FieldColorPickerStateType> {
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
            disabled,
            classes,
            error,
            noLabel,
            onChange,
            bc,
            tabIndex,
            field,
            pageStore,
            // eslint-disable-next-line id-length
            t,
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
                data-qtip={t(bc[VAR_RECORD_DISPLAYED])}
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
            >
                {bc[VAR_RECORD_DISPLAYED] ? (
                    <FormLabel {...InputLabelProps} classes={{root: classes.formLabel}} error={error}>
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
    withTranslation("meta"),
    withStyles(FieldColorPickerStyles, {name: "EssenceFieldColorPicker"}),
    observer,
)(FieldColorPicker);
