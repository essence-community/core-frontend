// @flow
import * as React from "react";
import debounce from "lodash/debounce";
import cn from "classnames";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
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
    initialX: number,
    initialWidthPx: number,
    initialWidthPercent: number,
};

const DEBOUNCE_DELAY = 0;
const FULL_WIDTH = 100;
const MIN_WIDTH = 10;

class HorizontalResizer extends React.Component<PropsType, StateType> {
    rootRef = React.createRef();

    state = {
        initialWidthPercent: 0,
        initialWidthPx: 0,
        initialX: 0,
    };

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleMouseUp);
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseDown = (event: SyntheticMouseEvent<HTMLDivElement>) => {
        const {currentTarget} = event;
        const {left} = getCoords(currentTarget);
        const {current} = this.rootRef;
        const clientWidth = current ? current.clientWidth : 0;

        event.preventDefault();
        event.stopPropagation();

        this.setState({
            initialWidthPercent: this.props.item.width,
            initialWidthPx: clientWidth,
            initialX: left,
        });

        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    };

    handleMouseMove = debounce((event: MouseEvent) => {
        const currentX = event.clientX;
        const {initialX, initialWidthPx, initialWidthPercent} = this.state;
        const {item, onChange, itemsNumber} = this.props;
        const offset = initialX - currentX;
        const newWidth = getWidth(initialWidthPx, initialWidthPercent, offset);
        const maxWidth = FULL_WIDTH - (itemsNumber - 1) * MIN_WIDTH;

        if (item.id && newWidth <= maxWidth && newWidth >= MIN_WIDTH) {
            onChange(item.id, newWidth);
        }
    }, DEBOUNCE_DELAY);

    handleMouseUp = () => {
        this.setState({
            initialWidthPercent: 0,
            initialWidthPx: 0,
            initialX: 0,
        });
        document.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
    };

    render() {
        const {classes, className, style, xs, isAddResizer} = this.props;

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
                        >
                            <span className={classes.btn}>...</span>
                        </div>
                    </div>
                </div>
            </Grid>
        ) : (
            <Grid item xs={xs} className={className} style={style}>
                {this.props.children}
            </Grid>
        );
    }
}

export default withStyles(HorizontalResizerStyles)(HorizontalResizer);
