// @flow
import * as React from "react";
import {createPortal} from "react-dom";
import debounce from "lodash/debounce";
import cn from "classnames";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {HorizontalSizerIcon} from "@essence/essence-constructor-share/icons";
import {Icon} from "@essence/essence-constructor-share";
import {getCoords} from "../utils/html";
import type {ItemType} from "../stores/PanelModel";
import {getWidth} from "./HorizontalResizerUtils/getWidth";
import HorizontalResizerStyles from "./HorizontalResizerStyles";

type PropsType = {
    classes: {
        [$Keys<$Call<typeof HorizontalResizerStyles>>]: string,
    },
    style: Object,
    className?: string,
    children: React.Node,
    xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | boolean,
    isAddResizer: boolean,
    item: ItemType,
    itemsNumber: number,
    onChange: (id: string, newWidth: number) => void,
};

type StateType = {
    down: boolean,
    initialX: number,
    initialWidthPx: number,
    initialWidthPercent: number,
    over: boolean,
};

const DEBOUNCE_DELAY = 0;
const FULL_WIDTH = 100;
const MIN_WIDTH = 10;

class HorizontalResizer extends React.Component<PropsType, StateType> {
    rootRef = React.createRef();

    resizerRef = React.createRef();

    state = {
        down: false,
        initialWidthPercent: 0,
        initialWidthPx: 0,
        initialX: 0,
        over: false,
    };

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

    // eslint-disable-next-line max-statements
    handleMouseDown = (event: SyntheticMouseEvent<HTMLDivElement>) => {
        const {currentTarget} = event;
        const {left} = getCoords(currentTarget);
        const {current} = this.rootRef;
        const clientWidth = current ? current.clientWidth : 0;

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            down: true,
            initialWidthPercent: this.props.item.width,
            initialWidthPx: clientWidth,
            initialX: left,
        });

        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);

        if (document.body) {
            document.body.classList.add("cursor-hidden");
        }
    };

    // eslint-disable-next-line max-statements
    handleMouseMove = debounce((event: MouseEvent) => {
        const {clientX, clientY} = event;
        const {initialX, initialWidthPx, initialWidthPercent} = this.state;
        const {item, onChange, itemsNumber} = this.props;
        const offset = initialX - clientX;
        const newWidth = getWidth(initialWidthPx, initialWidthPercent, offset);
        const maxWidth = FULL_WIDTH - (itemsNumber - 1) * 2;

        if (item.id && newWidth <= maxWidth) {
            onChange(item.id, newWidth);

            if (newWidth <= MIN_WIDTH) {
                this.handleMouseUp();
                this.setState({over: false});
            }
        }

        this.setCursorPosition(clientX, clientY);
    }, DEBOUNCE_DELAY);

    handleMouseUp = () => {
        this.setState({
            down: false,
            initialWidthPercent: 0,
            initialWidthPx: 0,
            initialX: 0,
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

    handleExpand = () => {
        this.props.onChange(this.props.item.id, MIN_WIDTH + 1);
    };

    render() {
        const {classes, className, style, xs, isAddResizer, item, itemsNumber} = this.props;
        const {over, down} = this.state;

        if (item.collapsed) {
            return (
                <Grid
                    item
                    xs={xs}
                    className={cn(className, classes.collapsedRoot)}
                    style={style}
                    onClick={this.handleExpand}
                >
                    <Icon iconfont={itemsNumber - 1 === item.index ? "arrow-left" : "arrow-right"} />
                </Grid>
            );
        }

        return isAddResizer ? (
            <Grid item xs={xs} className={className} style={style}>
                <div className={classes.resizeContainer} ref={this.rootRef}>
                    <div className={classes.childrenContainer}>{this.props.children}</div>
                    <div className={classes.resizerWrapper}>
                        <div
                            className={cn(classes.resizer, {
                                [classes.show]: this.state.initialX,
                            })}
                            onMouseDown={this.handleMouseDown}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        />
                    </div>
                </div>
                {document.body && (over || down)
                    ? createPortal(
                          <HorizontalSizerIcon
                              ref={this.resizerRef}
                              fontSize="large"
                              className={cn(classes.resizerIcon, {[classes.resizerIconDown]: down})}
                          />,
                          // $FlowFixMe
                          document.body,
                      )
                    : null}
            </Grid>
        ) : (
            <Grid item xs={xs} className={className} style={style}>
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(HorizontalResizerStyles)(HorizontalResizer);
