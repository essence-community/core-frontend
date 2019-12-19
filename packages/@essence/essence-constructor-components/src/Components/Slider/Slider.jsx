/* eslint max-lines: ["error", 400] */
/* eslint-disable no-magic-numbers, id-length, react/no-find-dom-node */
// @flow
import * as React from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {ButtonBase} from "@material-ui/core";
import omit from "lodash/omit";
import styles from "./SliderStyles";

type PropsType = {
    classes: Object,
    className?: string,
    component?: string | React.ComponentType<*>,
    disabled?: boolean,
    max: number,
    min: number,
    onChange?: (event: SyntheticEvent<*>, value: number) => void,
    onDragEnd: Function,
    onDragStart: Function,
    reverse?: boolean,
    step: number,
    theme: Object,
    // $FlowFixMe
    thumb?: React.Element,
    value: number,
    vertical: boolean,
};

function clamp(value, min = 0, max = 100) {
    return Math.min(Math.max(value, min), max);
}

function percentToValue(percent, min: number, max: number) {
    return ((max - min) * percent) / 100 + min;
}

function roundToStep(number, step) {
    return Math.round(number / step) * step;
}

function getOffset(node) {
    const {pageYOffset, pageXOffset} = global;
    const {left, top} = node.getBoundingClientRect();

    return {
        left: left + pageXOffset,
        top: top + pageYOffset,
    };
}

function getMousePosition(event) {
    if (event.changedTouches && event.changedTouches[0]) {
        return {
            x: event.changedTouches[0].pageX,
            y: event.changedTouches[0].pageY,
        };
    }

    return {
        x: event.pageX,
        y: event.pageY,
    };
}

// eslint-disable-next-line max-params
function calculatePercent(node, event, isVertical, isReverted) {
    const {width, height} = node.getBoundingClientRect();
    const {top, left} = getOffset(node);
    const {x, y} = getMousePosition(event);

    const value = isVertical ? y - top : x - left;
    const onePercent = (isVertical ? height : width) / 100;

    return isReverted ? 100 - clamp(value / onePercent) : clamp(value / onePercent);
}

function preventPageScrolling(event) {
    event.preventDefault();
}

/* istanbul ignore if */
if (process.env.NODE_ENV !== "production" && !React.createContext) {
    throw new Error("Material-UI: react@16.3.0 or greater is required.");
}

class Slider extends React.Component<PropsType, {currentState: string}> {
    static defaultProps = {
        component: "div",
        max: 100,
        min: 0,
        step: 1,
    };

    containerRef: HTMLDivElement;

    state = {currentState: "initial"};

    // $FlowFixMe
    jumpAnimationTimeoutId: TimeoutID = -1;

    componentDidMount() {
        if (this.containerRef) {
            // $FlowFixMe
            this.containerRef.addEventListener("touchstart", preventPageScrolling, {passive: false});
        }
    }

    componentWillUnmount() {
        // $FlowFixMe
        this.containerRef.removeEventListener("touchstart", preventPageScrolling, {passive: false});
        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
        clearTimeout(this.jumpAnimationTimeoutId);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.disabled) {
            return {currentState: "disabled"};
        }

        if (!nextProps.disabled && prevState.currentState === "disabled") {
            return {currentState: "normal"};
        }

        return null;
    }

    handleFocus = () => {
        this.setState({currentState: "focused"});
    };

    handleBlur = () => {
        this.setState({currentState: "normal"});
    };

    handleClick = (event) => {
        const {min, max, vertical, reverse} = this.props;
        const percent = calculatePercent(this.containerRef, event, vertical, reverse);
        const value = percentToValue(percent, min, max);

        this.emitChange(event, value, () => {
            this.playJumpAnimation();
        });
    };

    handleTouchStart = (event) => {
        event.preventDefault();
        this.setState({currentState: "activated"});

        window.addEventListener("touchend", this.handleMouseUp);

        if (typeof this.props.onDragStart === "function") {
            this.props.onDragStart(event);
        }
    };

    handleMouseDown = (event) => {
        event.preventDefault();
        this.setState({currentState: "activated"});

        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);

        if (typeof this.props.onDragStart === "function") {
            this.props.onDragStart(event);
        }
    };

    handleMouseUp = (event) => {
        this.setState({currentState: "normal"});

        window.removeEventListener("mousemove", this.handleMouseMove);
        window.removeEventListener("mouseup", this.handleMouseUp);
        window.removeEventListener("touchend", this.handleMouseUp);

        if (typeof this.props.onDragEnd === "function") {
            this.props.onDragEnd(event);
        }
    };

    handleMouseMove = (event) => {
        const {min, max, vertical, reverse} = this.props;
        const percent = calculatePercent(this.containerRef, event, vertical, reverse);
        const value = percentToValue(percent, min, max);

        this.emitChange(event, value);
    };

    // eslint-disable-next-line max-statements
    emitChange(event, rawValue, callback) {
        const {step, value: previousValue, onChange, disabled} = this.props;
        let value = rawValue;

        if (disabled) {
            return;
        }

        if (step) {
            value = roundToStep(rawValue, step);
        } else {
            value = Number(rawValue.toFixed(3));
        }

        if (typeof onChange === "function" && value !== previousValue) {
            onChange(event, value);

            if (typeof callback === "function") {
                // eslint-disable-next-line callback-return
                callback();
            }
        }
    }

    calculateTrackAfterStyles(percent) {
        const {currentState} = this.state;

        switch (currentState) {
            case "activated":
                return `calc(100% - ${percent === 0 ? 7 : 5}px)`;
            case "disabled":
                return `calc(${100 - percent}% - 6px)`;
            default:
                return "calc(100% - 5px)";
        }
    }

    calculateTrackBeforeStyles(percent) {
        const {currentState} = this.state;

        switch (currentState) {
            case "disabled":
                return `calc(${percent}% - 6px)`;
            default:
                return `${percent}%`;
        }
    }

    playJumpAnimation() {
        this.setState({currentState: "jumped"}, () => {
            clearTimeout(this.jumpAnimationTimeoutId);
            this.jumpAnimationTimeoutId = setTimeout(() => {
                this.setState({currentState: "normal"});
            }, this.props.theme.transitions.duration.complex);
        });
    }

    // eslint-disable-next-line max-statements, max-lines-per-function
    render() {
        const {currentState} = this.state;
        const {
            className: classNameProp,
            classes,
            component: Component,
            thumb: thumbIcon,
            disabled,
            max,
            min,
            reverse,
            value,
            vertical,
            ...other
        } = this.props;

        const percent = clamp(((value - min) * 100) / (max - min));

        const commonClasses = {
            [classes.disabled]: disabled,
            [classes.jumped]: !disabled && currentState === "jumped",
            [classes.focused]: !disabled && currentState === "focused",
            [classes.activated]: !disabled && currentState === "activated",
        };

        const className = classNames(
            classes.root,
            {
                [classes.vertical]: vertical,
                [classes.reverse]: reverse,
                [classes.disabled]: disabled,
            },
            classNameProp,
        );

        const containerClasses = classNames(classes.container, {
            [classes.vertical]: vertical,
        });

        const trackBeforeClasses = classNames(classes.track, classes.trackBefore, commonClasses, {
            [classes.vertical]: vertical,
        });

        const trackAfterClasses = classNames(classes.track, classes.trackAfter, commonClasses, {
            [classes.vertical]: vertical,
        });

        const trackProperty = vertical ? "height" : "width";
        const thumbProperty = vertical ? "top" : "left";
        const inlineTrackBeforeStyles = {[trackProperty]: this.calculateTrackBeforeStyles(percent)};
        const inlineTrackAfterStyles = {[trackProperty]: this.calculateTrackAfterStyles(percent)};
        const inlineThumbStyles = {[thumbProperty]: `${percent}%`};

        /** Start Thumb Icon Logic Here */
        const ThumbIcon = thumbIcon
            ? React.cloneElement(thumbIcon, {
                  ...thumbIcon.props,
                  className: classNames(thumbIcon.props.className, classes.thumbIcon),
              })
            : null;
        /** End Thumb Icon Logic Here */

        const thumbClasses = classNames(
            classes.thumb,
            {
                [classes.thumbIconWrapper]: thumbIcon,
            },
            commonClasses,
        );

        return (
            // $FlowFixMe
            <Component
                role="slider"
                className={className}
                aria-valuenow={value}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-orientation={vertical ? "vertical" : "horizontal"}
                onClick={this.handleClick}
                onMouseDown={this.handleMouseDown}
                onTouchStartCapture={this.handleTouchStart}
                onTouchMove={this.handleMouseMove}
                ref={(ref) => {
                    // $FlowFixMe
                    this.containerRef = ReactDOM.findDOMNode(ref);
                }}
                {...omit(other, ["onChange", "onDragEnd", "onDragStart", "step", "theme"])}
            >
                <div className={containerClasses}>
                    <div className={trackBeforeClasses} style={inlineTrackBeforeStyles} />
                    <ButtonBase
                        className={thumbClasses}
                        disableRipple
                        style={inlineThumbStyles}
                        onBlur={this.handleBlur}
                        onTouchStartCapture={this.handleTouchStart}
                        onTouchMove={this.handleMouseMove}
                        onFocusVisible={this.handleFocus}
                    >
                        {ThumbIcon}
                    </ButtonBase>
                    <div className={trackAfterClasses} style={inlineTrackAfterStyles} />
                </div>
            </Component>
        );
    }
}

export default withStyles(styles, {name: "MuiSlider", withTheme: true})(Slider);
