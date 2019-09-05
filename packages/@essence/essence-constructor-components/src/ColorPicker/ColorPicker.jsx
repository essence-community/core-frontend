// @flow

import * as React from "react";
import {SketchPicker, ColorResult} from "react-color";
import {withStyles} from "@material-ui/core/styles";
import keycode from "keycode";
import Popover from "../Popover/Popover";
import {styles} from "./ColorPickerStyles";

type ColorPickerPropsType = {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    colors: Array<{[$Keys<$Call<string>>]: string}>,
    disabled?: boolean,
    onChange: (event: Object, value: string) => void,
    name?: string,
    initialValue?: string,
    value: mixed,
};

type ColorPickerStateType = {
    displayColorPicker: boolean,
    color: string,
};

const popoverPosition = {
    anchorOrigin: {
        horizontal: "center",
        vertical: "bottom",
    },
    transformOrigin: {
        horizontal: "center",
        vertical: "top",
    },
};

class ColorPicker extends React.Component<ColorPickerPropsType, ColorPickerStateType> {
    state: ColorPickerStateType = {
        color: "#000000",
        displayColorPicker: false,
    };

    componentDidMount() {
        const {initialValue} = this.props;

        if (initialValue) {
            this.setState({
                color: initialValue,
            });
        }
    }

    handleOpen = () => {
        if (!this.props.disabled) {
            this.setState({displayColorPicker: true});
        }
    };

    handleClose = () => {
        this.setState({displayColorPicker: false});
    };

    handleChange = (color: ColorResult) => {
        this.setState({
            color: color.hex,
        });
    };

    handleChangeOpen = (open: boolean) => {
        const {value} = this.props;

        this.setState(({displayColorPicker, color}) => {
            if (displayColorPicker !== open) {
                return {displayColorPicker: open};
            }

            if (!open && value !== color && typeof value === "string" && value) {
                this.setState({color: value});
            }

            return null;
        });
    };

    renderColorElement = () => {
        const {classes} = this.props;
        const {color} = this.state;
        const style = {
            background: color,
            cursor: this.props.disabled ? "not-allowed" : "pointer",
        };

        return <div className={classes.color} style={style} />;
    };

    handleKeyDown = (event: SyntheticEvent<HTMLDivElement>) => {
        const code = keycode(event);

        if (code === "enter") {
            const {color} = this.state;

            this.props.onChange({}, color);
            this.handleClose();
        }
    };

    render() {
        const {classes, colors} = this.props;
        const {color} = this.state;

        const popoverContent = (
            <div onKeyDown={this.handleKeyDown} tabIndex="1">
                <SketchPicker presetColors={colors} onChange={this.handleChange} color={color} />
            </div>
        );

        return (
            <div className={classes.colorPicker} onClick={this.handleOpen}>
                <div className={classes.colorPickerContainer}>
                    <Popover
                        popoverContent={popoverContent}
                        open={this.state.displayColorPicker}
                        onChangeOpen={this.handleChangeOpen}
                        hideBackdrop
                        hideOnResize
                        hideOnScroll
                        width="auto"
                        {...popoverPosition}
                    >
                        {this.renderColorElement}
                    </Popover>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPicker);
