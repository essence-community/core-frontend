/* eslint-disable no-magic-numbers, sort-keys */
// @flow
import {fade} from "@material-ui/core/styles/colorManipulator";

const SliderStyles = (theme: Object) => {
    const commonTransitionsOptions = {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeOut,
    };

    const commonTransitions = theme.transitions.create(
        ["width", "height", "left", "top", "box-shadow"],
        commonTransitionsOptions,
    );
    // No transition on the position
    const thumbActivatedTransitions = theme.transitions.create(
        ["width", "height", "box-shadow"],
        commonTransitionsOptions,
    );

    const colors = {
        disabled: theme.palette.grey[400],
        primary: theme.palette.primary.main,
    };

    return {
        /* Styles applied to the container element. */
        container: {
            "&$vertical": {
                height: "100%",
            },
            position: "relative",
        },
        /* Styles applied to the root element. */
        root: {
            "&$disabled": {
                cursor: "no-drop",
            },
            "&$reverse": {
                transform: "scaleX(-1)",
            },
            "&$vertical": {
                height: "100%",
                padding: "8px 16px",
            },
            "&$vertical$reverse": {
                transform: "scaleY(-1)",
            },
            WebkitTapHighlightColor: "transparent",
            cursor: "pointer",
            padding: "16px 8px",
            position: "relative",
            width: "100%",
        },
        /* Styles applied to the thumb element. */
        thumb: {
            "&$activated": {
                height: 17,
                transition: thumbActivatedTransitions,
                width: 17,
            },
            "&$disabled": {
                backgroundColor: colors.disabled,
                cursor: "no-drop",
                height: 9,
                width: 9,
            },
            "&$focused": {
                boxShadow: `0px 0px 0px 9px ${fade(colors.primary, 0.16)}`,
            },
            "&$jumped": {
                height: 17,
                width: 17,
            },
            backgroundColor: colors.primary,
            borderRadius: "50%",
            height: 12,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            transition: commonTransitions,
            width: 12,
            zIndex: 2,
        },
        /* Styles applied to the track elements. */
        track: {
            "&$activated": {
                transition: "none",
            },
            "&$disabled": {
                backgroundColor: colors.disabled,
            },
            "&$vertical": {
                left: "50%",
                top: "initial",
                transform: "translate(-50%, 0)",
                width: 2,
            },
            backgroundColor: colors.primary,
            height: 2,
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
        },
        /* Styles applied to the track element after the thumb. */
        trackAfter: {
            "&$vertical": {
                bottom: 0,
            },
            opacity: 0.24,
            right: 0,
            transition: commonTransitions,
        },
        /* Styles applied to the track element before the thumb. */
        trackBefore: {
            left: 0,
            transition: commonTransitions,
            zIndex: 1,
        },
        /* Class applied to the thumb element if custom thumb icon provided. */
        thumbIconWrapper: {
            backgroundColor: "transparent",
        },
        thumbIcon: {
            height: "inherit",
            width: "inherit",
        },
        /* Class applied to the root element to trigger JSS nested styles if `reverse={true}`. */
        reverse: {},
        /* Class applied to the track and thumb elements to trigger JSS nested styles if `disabled`. */
        disabled: {},
        /* Class applied to the track and thumb elements to trigger JSS nested styles if `jumped`. */
        jumped: {},
        /* Class applied to the track and thumb elements to trigger JSS nested styles if `focused`. */
        focused: {},
        /* Class applied to the track and thumb elements to trigger JSS nested styles if `activated`. */
        activated: {},
        /* Class applied to the root, track and container to trigger JSS nested styles if `vertical`. */
        vertical: {},
    };
};

export default SliderStyles;
