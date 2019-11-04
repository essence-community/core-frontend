// @flow
import * as React from "react";
// $FlowFixMe
import {TextareaAutosize} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {type BuilderBaseType} from "../../../BuilderType";
import Scrollbars from "../../../Components/Scrollbars/Scrollbars";
import VerticalResizer from "../../../Resizer/VerticalResizer";
import {FieldTextareaInputStyles} from "./FieldTextareaInput.styles";

type FieldTextareaInputProps = {
    classes: {
        [$Keys<$Call<typeof FieldTextareaInputStyles>>]: string,
    },
    height: number,
    onChangeHeight: (height: number) => void,
    bc: BuilderBaseType,
    editing?: Boolean,
};

const MIN_INPUT_HEIGHT = 17;

class FieldTextareaInput extends React.Component<FieldTextareaInputProps> {
    inputRef = React.createRef();

    maxHeight: number | typeof undefined;

    minHeight: number;

    constructor(props: FieldTextareaInputProps) {
        super(props);

        const {bc} = this.props;

        this.minHeight = bc.minheight ? parseInt(bc.minheight, 10) : MIN_INPUT_HEIGHT;
        this.maxHeight = bc.maxheight ? parseInt(bc.maxheight, 10) : undefined;
    }

    handleFocus = () => {
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    };

    handleInitialHeight = () => {
        if (this.inputRef.current) {
            return this.inputRef.current.offsetHeight;
        }

        return 0;
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const {height, onChangeHeight, bc, editing, classes, ...otherProps} = this.props;

        return (
            <React.Fragment>
                <Scrollbars
                    autoHeight
                    autoHeightMax={this.maxHeight && !height ? this.maxHeight : height}
                    autoHeightMin={this.minHeight && !height ? this.minHeight : height}
                    style={{marginTop: 11}}
                    onFocus={this.handleFocus}
                >
                    <TextareaAutosize ref={this.inputRef} {...otherProps} />
                </Scrollbars>
                {editing ? (
                    <VerticalResizer
                        height={height}
                        minHeight={this.minHeight}
                        maxHeight={this.maxHeight}
                        onChangeHeight={onChangeHeight}
                        className={classes.resizer}
                        getInitialHeight={this.handleInitialHeight}
                    />
                ) : null}
            </React.Fragment>
        );
    }
}

export default withStyles(FieldTextareaInputStyles, {name: "FieldTextareaInput"})(FieldTextareaInput);
