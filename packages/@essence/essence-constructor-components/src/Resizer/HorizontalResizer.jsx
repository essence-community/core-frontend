// @flow
import * as React from "react";
import {createPortal} from "react-dom";
import debounce from "lodash/debounce";
import cn from "classnames";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {HorizontalSizerIcon} from "@essence/essence-constructor-share/icons";
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
    nextItem?: ItemType,
    onChange: (id: string, newWidth: number, side?: "right" | "left") => void,
};

type StateType = {
    down: boolean,
    initialX: number,
    initialWidthPx: number,
    initialWidthPercent: number,
    over: boolean,
};

const DEBOUNCE_DELAY = 0;
const MIN_WIDTH = 10;

class HorizontalResizer extends React.Component<PropsType, StateType> {
    rootRef = React.createRef();

    resizerRef = React.createRef();

    lineRef = React.createRef();

    newWidth: number | typeof undefined = undefined;

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
            this.resizerRef.current.style.top = `${clientY}px`;
            this.resizerRef.current.style.left = `${clientX}px`;
        }
    };

    setLinePosition = (clientX: number) => {
        if (this.lineRef.current) {
            this.lineRef.current.style.left = `${clientX}px`;
        }
    };

    // eslint-disable-next-line max-statements
    handleMouseDown = (event: SyntheticMouseEvent<HTMLDivElement>) => {
        const {currentTarget, clientX} = event;
        const {left} = getCoords(currentTarget);
        const {current} = this.rootRef;
        const clientWidth = current ? current.clientWidth : 0;

        event.preventDefault();
        event.stopPropagation();

        this.setState(
            {
                down: true,
                initialWidthPercent: this.props.item.width,
                initialWidthPx: clientWidth,
                initialX: left,
            },
            () => {
                this.setLinePosition(clientX);
            },
        );

        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);

        if (document.body) {
            document.body.classList.add("cursor-hidden");
        }
    };

    // eslint-disable-next-line max-statements
    handleMouseMove = debounce((event: MouseEvent) => {
        const {clientX, clientY} = event;
        const {initialX, initialWidthPx, initialWidthPercent, down} = this.state;

        if (down) {
            const {item, nextItem} = this.props;
            const offset = initialX - clientX;
            const newWidth = getWidth(initialWidthPx, initialWidthPercent, offset);
            const maxWidth = nextItem ? (nextItem.width || 0) + (item.width || 0) : item.width || 0;

            if (item.id && newWidth <= maxWidth && newWidth > 0) {
                this.newWidth = newWidth;
                this.setLinePosition(clientX);
            }
        }

        this.setCursorPosition(clientX, clientY);
    }, DEBOUNCE_DELAY);

    handleMouseUp = () => {
        const {item, onChange} = this.props;

        this.setState({
            down: false,
            initialWidthPercent: 0,
            initialWidthPx: 0,
            initialX: 0,
        });
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);

        if (item.id && this.newWidth !== undefined) {
            onChange(item.id, this.newWidth);
        }

        this.newWidth = undefined;

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
        const {item, nextItem, onChange} = this.props;

        if (item.collapsed) {
            onChange(item.id, MIN_WIDTH + 1, "right");
        } else if (nextItem && nextItem.collapsed) {
            onChange(nextItem.id, MIN_WIDTH + 1, "left");
        }
    };

    renderResizer() {
        const {classes, className, style, xs, item, nextItem} = this.props;
        const {over, down} = this.state;
        const isShowResizer = document.body && (over || down);
        const isExpanded = item.collapsed || (nextItem && nextItem.collapsed);
        const nextCollapsed = nextItem && nextItem.collapsed;

        return (
            <Grid item xs={xs} className={className} style={style}>
                <div className={cn(classes.resizeContainer)} ref={this.rootRef}>
                    <div className={cn(classes.childrenContainer, {[classes.containerHide]: item.collapsed})}>
                        {this.props.children}
                    </div>
                    <div className={classes.resizerWrapper}>
                        <div
                            className={cn(classes.resizer, {
                                [classes.show]: this.state.initialX && !down,
                            })}
                            onClick={isExpanded ? this.handleExpand : undefined}
                            onMouseDown={item.collapsed || nextCollapsed ? undefined : this.handleMouseDown}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                        />
                    </div>
                </div>
                {down && <div ref={this.lineRef} className={classes.dottedLine} />}
                {isShowResizer
                    ? createPortal(
                          <div
                              ref={this.resizerRef}
                              className={cn(
                                  classes.resizerRootIcon,
                                  nextCollapsed ? classes.resizerRootRight : classes.resizerRootLeft,
                                  {
                                      [classes.resizerRootIconDown]: down,
                                      [classes.resizerRootCollapsed]: item.collapsed || nextCollapsed,
                                  },
                              )}
                          >
                              <HorizontalSizerIcon className={classes.resizerIcon} fontSize="large" />
                          </div>,
                          // $FlowFixMe
                          document.body,
                      )
                    : null}
            </Grid>
        );
    }

    render() {
        const {className, style, xs, isAddResizer, item, classes} = this.props;

        return isAddResizer ? (
            this.renderResizer()
        ) : (
            <Grid
                item
                xs={xs}
                className={item.collapsed ? cn(className, classes.containerHide) : className}
                style={style}
            >
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(HorizontalResizerStyles)(HorizontalResizer);
