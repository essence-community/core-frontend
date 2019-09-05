// @flow

import * as React from "react";
import debounce from "lodash/debounce";
import {withStyles} from "@material-ui/core/styles";
import {preference, CARRY_LINES_REGEXP} from "../constants";
import styles from "./TooltipStyles";

type PropsType = {
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
};

type StateType = {
    inTooltip: boolean,
    position: {
        left: number,
        top: number,
    },
    show: boolean,
    showBackdrop: boolean,
    tip: ?string,
    title: ?Array<string>,
};

const TIMEOUT_SHOW_TIME = preference.delayTooltipShow;
const OFFSET_CURSOR = preference.offsetTooltip;
const DEBOUNCE_TIME = preference.debounceTooltipTime;

export const prepareTip = (tip: string): Array<string> => tip.split(CARRY_LINES_REGEXP);

class Tooltip extends React.Component<PropsType, StateType> {
    state = {
        inTooltip: false,
        position: {
            left: 0,
            top: 0,
        },
        show: false,
        showBackdrop: false,
        tip: null,
        title: null,
    };

    timerShow: TimeoutID;

    element: ?HTMLElement;

    currentElement: ?Element;

    rootRef = React.createRef();

    contentRef = React.createRef();

    componentDidMount() {
        document.addEventListener("mouseover", this.handleMouseOver);
        document.addEventListener("mousemove", this.updateTooltip);
    }

    componentDidUpdate() {
        this.setOffsetTooltip();
    }

    componentWillUnmount() {
        document.removeEventListener("mouseover", this.handleMouseOver);
        document.removeEventListener("mousemove", this.updateTooltip);
    }

    setOffsetTooltip = () => {
        const {inTooltip} = this.state;
        const {current} = this.contentRef;

        if (current && !inTooltip) {
            const {left, top} = this.state.position;
            const isRightOut = left + current.offsetWidth > window.innerWidth;
            const isBottomOut = top + current.offsetHeight > window.innerHeight;

            current.style.right = isRightOut ? "10px" : "auto";
            current.style.left = isRightOut ? "auto" : `${left + OFFSET_CURSOR}px`;
            current.style.top = isBottomOut ? "auto" : `${top + OFFSET_CURSOR}px`;
            current.style.bottom = isBottomOut ? "10px" : "auto";
        }
    };

    getTipTitle = () => {
        let target = this.element;

        while (target) {
            const tip = target.getAttribute("data-qtip");

            if (tip) {
                this.currentElement = target;

                return tip;
            }

            target = target.parentElement;
        }

        return "";
    };

    showTooltip = (event: MouseEvent) => {
        if (event.target instanceof HTMLElement) {
            this.element = event.target;

            const tip = this.getTipTitle();

            if (tip) {
                requestAnimationFrame(() => {
                    this.setState((prevState) => {
                        if (prevState.tip !== tip) {
                            clearTimeout(this.timerShow);
                            this.timerShow = setTimeout(this.setShowTooltip, TIMEOUT_SHOW_TIME);

                            return {
                                ...this.makeHideTooltip(prevState.inTooltip),
                                position: {left: event.clientX, top: event.clientY},
                                tip,
                                title: prepareTip(tip),
                            };
                        }

                        return null;
                    });
                });
            } else {
                clearTimeout(this.timerShow);
                requestAnimationFrame(() => {
                    this.setState((prevState) => this.makeHideTooltip(prevState.inTooltip));
                });
            }
        }
    };

    setShowTooltip = () => {
        this.setState({show: true});
    };

    updateTooltip = (event: MouseEvent) => {
        this.updateTooltipDebounce(event.clientX, event.clientY);
    };

    updateTooltipDebounce = debounce((left: number, top: number) => {
        this.setState({
            position: {left, top},
        });
    }, DEBOUNCE_TIME);

    makeHideTooltip = (inTooltip: boolean) => {
        if (inTooltip) {
            return {};
        }

        this.element = null;

        return {
            inTooltip: false,
            show: false,
            showBackdrop: false,
            tip: null,
            title: null,
        };
    };

    handleMouseOver = (event: MouseEvent) => {
        const {target} = event;
        const {current} = this.rootRef;

        this.setState((prevState) => {
            // $FlowFixMe
            if (target && target.nodeName === "svg" && prevState.show) {
                return {show: false};
            }

            if (prevState.inTooltip && (!current || !current.contains(target))) {
                return {inTooltip: false};
            }

            return null;
        });

        this.showTooltip(event);
    };

    handleSetTitle = () => {
        this.setState((prevState) => {
            const tip = this.getTipTitle();

            if (prevState.tip !== tip && !prevState.inTooltip) {
                return {
                    tip,
                    title: prepareTip(tip),
                };
            }

            return null;
        });
    };

    handleTooltipMouseOver = () => {
        this.setState({inTooltip: true});
    };

    handleMouseDown = () => {
        this.setState({showBackdrop: true});
    };

    handleMouseUp = (event: SyntheticMouseEvent<HTMLDivElement>) => {
        const {classes} = this.props;
        const {target} = event;

        this.setState({showBackdrop: false});

        if (target instanceof HTMLDivElement && target.className.indexOf(classes.tooltipBackdrop) !== -1) {
            this.setState({inTooltip: false, ...this.makeHideTooltip(false)});
        }
    };

    render() {
        const {classes} = this.props;
        const {title, show, showBackdrop} = this.state;
        const isValidTitle = title && title.length > 0;

        if (show && this.currentElement && isValidTitle) {
            return (
                <React.Fragment>
                    <div
                        className={classes.tooltipRoot}
                        ref={this.rootRef}
                        onMouseOver={this.handleTooltipMouseOver}
                        onMouseDown={this.handleMouseDown}
                        onMouseUp={this.handleMouseUp}
                    >
                        <div className={classes.tooltipContent} ref={this.contentRef}>
                            {title && title.map((text, index) => <div key={index}>{text}</div>)}
                        </div>
                        {showBackdrop ? <div className={classes.tooltipBackdrop} /> : null}
                    </div>
                </React.Fragment>
            );
        }

        return null;
    }
}

export default withStyles(styles)(Tooltip);
