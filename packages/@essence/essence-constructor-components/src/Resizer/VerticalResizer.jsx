// @flow
import * as React from "react";
import {createPortal} from "react-dom";
import {withStyles} from "@material-ui/core/styles";
import {getCoords} from "../utils/html";
import VerticalResizerStyles from "./VerticalResizerStyles";

type PropsType = {
    classes: {
        [$Keys<$Call<typeof VerticalResizerStyles>>]: string,
    },
    minHeight: number,
    maxHeight: number,
    height: number,
    onChangeHeight: (height: number) => void,
};

type StateType = {
    lineY: number,
    lineYLeft: number,
    lineWidth: number,
    startOffset: number,
};

const LINE_HEIGHT = 10;

class VerticalResizer extends React.Component<PropsType, StateType> {
    static defaultProps = {
        maxHeight: 1280,
        minHeight: 50,
    };

    state = {
        lineWidth: 0,
        lineY: 0,
        lineYLeft: 0,
        startOffset: 0,
    };

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseDown = (event: SyntheticMouseEvent<HTMLDivElement>) => {
        const {currentTarget} = event;
        const {top, left} = getCoords(currentTarget);

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            lineWidth: currentTarget.offsetWidth,
            lineY: event.pageY,
            lineYLeft: left,
            startOffset: top + currentTarget.offsetHeight,
        });

        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    };

    handleMouseMove = (event: MouseEvent) => {
        const {minHeight, maxHeight, height} = this.props;
        const newHeight = event.pageY - this.state.startOffset + height;

        if (newHeight < minHeight - LINE_HEIGHT) {
            this.setState({lineY: event.pageY + minHeight - newHeight - LINE_HEIGHT});
        } else if (newHeight > maxHeight) {
            this.setState({lineY: event.pageY - newHeight + maxHeight});
        } else {
            this.setState({lineY: event.pageY});
        }
    };

    handleChangeHeight = (event: MouseEvent) => {
        const {minHeight, maxHeight, height} = this.props;
        let newHeight = event.pageY - this.state.startOffset + height;

        if (newHeight < minHeight + LINE_HEIGHT) {
            newHeight = minHeight;
        }

        if (newHeight > maxHeight + LINE_HEIGHT) {
            newHeight = maxHeight;
        }

        this.props.onChangeHeight(newHeight);
    };

    handleMouseUp = (event: MouseEvent) => {
        this.handleChangeHeight(event);
        this.setState({lineY: 0, startOffset: 0});
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    };

    render() {
        const {lineY, lineYLeft, lineWidth} = this.state;
        const {classes} = this.props;

        return (
            <React.Fragment>
                <div className={classes.resizer} onMouseDown={this.handleMouseDown}>
                    <span className={classes.btn}>...</span>
                </div>
                {document.body && lineY
                    ? createPortal(
                          <div
                              className={classes.line}
                              style={{
                                  left: lineYLeft,
                                  top: lineY,
                                  width: lineWidth,
                              }}
                          />,
                          document.body,
                      )
                    : null}
            </React.Fragment>
        );
    }
}

export default withStyles(VerticalResizerStyles)(VerticalResizer);
