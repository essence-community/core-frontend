// @flow
import * as React from "react";
import {createPortal} from "react-dom";
import {withStyles} from "@material-ui/core/styles";
import cn from "classnames";
import {VerticalSizerIcon} from "@essence/essence-constructor-share/icons";
import {getCoords} from "../utils/html";
import VerticalResizerStyles from "./VerticalResizerStyles";

type PropsType = {
    classes: {
        [$Keys<$Call<typeof VerticalResizerStyles>>]: string,
    },
    minHeight: number,
    maxHeight: number,
    height: number,
    className?: string,
    style?: {},
    onChangeHeight: (height: number) => void,
    getInitialHeight?: () => number,
};

type StateType = {
    down: boolean,
    initialHeight: number,
    lineY: number,
    lineYLeft: number,
    lineWidth: number,
    over: boolean,
    startOffset: number,
};

const LINE_HEIGHT = 10;

class VerticalResizer extends React.Component<PropsType, StateType> {
    static defaultProps = {
        maxHeight: 1280,
        minHeight: 50,
    };

    state: StateType = {
        down: false,
        initialHeight: 0,
        lineWidth: 0,
        lineY: 0,
        lineYLeft: 0,
        over: false,
        startOffset: 0,
    };

    resizerRef = React.createRef();

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    setCursorPosition = (clientX: number, clientY: number) => {
        if (this.resizerRef.current) {
            this.resizerRef.current.style.top = clientY;
            this.resizerRef.current.style.left = clientX;
        }
    };

    handleMouseDown = (event: SyntheticMouseEvent<HTMLDivElement>) => {
        const {currentTarget} = event;
        const {height, getInitialHeight} = this.props;
        const {top, left} = getCoords(currentTarget);

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            down: true,
            initialHeight: !height && getInitialHeight ? getInitialHeight() : height,
            lineWidth: currentTarget.offsetWidth,
            lineY: event.pageY,
            lineYLeft: left,
            startOffset: top + currentTarget.offsetHeight,
        });
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);

        if (document.body) {
            document.body.classList.add("cursor-hidden");
        }
    };

    handleMouseMove = (event: MouseEvent) => {
        const {down, initialHeight} = this.state;
        const {minHeight, maxHeight} = this.props;
        const newHeight = event.pageY - this.state.startOffset + initialHeight;

        if (down) {
            if (newHeight < minHeight - LINE_HEIGHT) {
                this.setState({lineY: event.pageY + minHeight - newHeight - LINE_HEIGHT});
            } else if (newHeight > maxHeight) {
                this.setState({lineY: event.pageY - newHeight + maxHeight});
            } else {
                this.setState({lineY: event.pageY});
            }
        }

        this.setCursorPosition(event.clientX, event.clientY);
    };

    handleChangeHeight = (event: MouseEvent) => {
        const {initialHeight, startOffset} = this.state;
        const {minHeight, maxHeight} = this.props;
        let newHeight = event.pageY - startOffset + initialHeight;

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
        this.setState({
            down: false,
            lineY: 0,
            startOffset: 0,
        });
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);

        if (document.body) {
            document.body.classList.remove("cursor-hidden");
        }
    };

    // $FlowFixMe
    handleMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const {clientX, clientY} = event;

        this.setState({over: true}, () => {
            this.setCursorPosition(clientX, clientY);
        });
        document.addEventListener("mousemove", this.handleMouseMove);
    };

    handleMouseLeave = () => {
        this.setState({over: false});

        if (!this.state.down) {
            document.removeEventListener("mousemove", this.handleMouseMove);
        }
    };

    render() {
        const {lineY, lineYLeft, lineWidth, over, down} = this.state;
        const {classes, className} = this.props;

        return (
            <React.Fragment>
                <div
                    className={cn(classes.resizer, className)}
                    onMouseDown={this.handleMouseDown}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={this.props.style}
                />
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
                {document.body && (over || down)
                    ? createPortal(
                          <VerticalSizerIcon
                              ref={this.resizerRef}
                              fontSize="large"
                              className={cn(classes.resizerIcon, {[classes.resizerIconDown]: down})}
                          />,
                          // $FlowFixMe
                          document.body,
                      )
                    : null}
            </React.Fragment>
        );
    }
}

export default withStyles(VerticalResizerStyles)(VerticalResizer);
