// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import SideResizerStyle from "./SideResizerStyle";

type PropsType = {
    anchor: "left" | "right",
    classes: {
        [$Keys<$Call<typeof SideResizerStyle>>]: string,
    },
    minDrawerWidth: number,
    maxDrawerWidth: number,
    drawerWidth: number,
    onChangeWidth: Function,
};

class SideResizer extends React.Component<PropsType> {
    startOffset: number = 0;

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    onMouseDown = (event: MouseEvent) => {
        if (this.props.anchor === "right") {
            this.startOffset = event.pageX + this.props.drawerWidth;
        } else {
            this.startOffset = event.pageX - this.props.drawerWidth;
        }
        event.preventDefault();
        event.stopPropagation();
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    };

    handleMouseMove = (event: MouseEvent) => {
        const {anchor, minDrawerWidth, maxDrawerWidth} = this.props;
        let newWidth = anchor === "right" ? this.startOffset - event.pageX : this.startOffset + event.pageX;

        if (newWidth <= minDrawerWidth) {
            newWidth = minDrawerWidth;
        }
        if (newWidth >= maxDrawerWidth) {
            newWidth = maxDrawerWidth;
        }
        this.props.onChangeWidth(newWidth);
    };

    handleMouseUp = () => {
        this.startOffset = 0;
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.sideResizer} onMouseDown={this.onMouseDown}>
                <div className={classes.btnResizer}>
                    <span className={classes.textResizer} />
                </div>
            </div>
        );
    }
}

export default withStyles(SideResizerStyle)(SideResizer);
