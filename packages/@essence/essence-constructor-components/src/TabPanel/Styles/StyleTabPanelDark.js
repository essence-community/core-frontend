import {fade} from "@material-ui/core/styles";

export const StyleTabPanelDark = (theme) => ({
    activeTabRoot: {
        "& $tabWrapper": {
            color: theme.palette.text.light,
        },
        "&:hover, &:focus": {
            "&:before": {
                boxShadow: "none",
            },
            boxShadow: "none",
        },
    },
    disabled: {
        "& $tabWrapper": {
            color: theme.palette.common.disabled,
        },
        opacity: "1 !important",
    },
    popoverButton: {
        "&:before": {
            backgroundColor: theme.palette.secondary.main,
            borderLeft: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            bottom: 0,
            // eslint-disable-next-line quotes
            content: '""',
            left: -5,
            position: "absolute",
            right: -10,
            top: 0,
            transform: "skewX(-30deg)",
            zIndex: -1,
        },
        "&:hover": {
            "&:before": {
                // Reset on touch devices, it doesn't add specificity
                "@media (hover: none)": {
                    backgroundColor: "transparent",
                },
                backgroundColor: fade(theme.palette.action.active, theme.palette.action.hoverOpacity),
            },
            backgroundColor: "transparent",
        },
        fill: theme.palette.primary.main,
        height: 36,
        position: "relative",
        width: 26,
    },
    selectedTabRoot: {
        "&$tabRoot": {
            "&:before": {
                boxShadow: `-2px -0px 1px ${theme.palette.primary.main}`,
            },
            boxShadow: `1px -1px 1px ${theme.palette.primary.main}`,
        },
    },
    "tabItem-center-hbox": {
        width: "100%",
    },
    "tabItem-left-hbox": {
        borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
    "tabItem-left-vbox": {
        borderRight: `1px solid ${theme.palette.secondary.main}`,
    },
    "tabItem-right-hbox": {
        borderLeft: `1px solid ${theme.palette.secondary.main}`,
    },
    "tabItem-right-vbox": {
        borderLeft: `1px solid ${theme.palette.secondary.main}`,
    },
    tabRoot: {
        "&$activeTabRoot": {
            "&:before": {
                background: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                boxShadow: "none",
                zIndex: "10",
            },
            background: theme.palette.primary.main,
            boxShadow: "none",
            zIndex: 2,
        },
        "&:before": {
            background: "#cdcaca",
            bottom: 0,
            boxShadow: `-2px 0px 2px -2px ${theme.palette.primary.main}`,
            // eslint-disable-next-line quotes
            content: '""',
            left: -24,
            position: "absolute",
            top: 0,
            width: 49,
            zIndex: -16,
        },
        "&:hover": {
            "&:before": {
                boxShadow: `-2px -0px 1px ${theme.palette.primary.main}`,
            },
            boxShadow: `1px -1px 1px ${theme.palette.primary.main}`,
        },
        background: "#cdcaca",
        boxShadow: `2px 0px 3px -2px ${theme.palette.primary.main}`,
        flexShrink: 1,
        height: 36,
        minHeight: 36,
        minWidth: 65,
        opacity: 1,
        overflow: "visible",
        zIndex: 1,
    },
    tabWrapper: {
        color: theme.palette.text.dark,
        display: "block",
        fontSize: 15,
        marginRight: 10,
        overflow: "hidden",
        padding: 0,
        textOverflow: "ellipsis",
        textTransform: "none",
        whiteSpace: "nowrap",
        width: "100%",
        zIndex: 11,
    },
    "tabsFlexContainer-center-hbox": {
        "& $tabRoot": {
            "&:before": {
                transform: "skewX(-54deg)",
            },
            marginRight: 25,
            transform: "skewX(34deg)",
        },
        "& $tabWrapper": {
            transform: "skewX(-34deg)",
        },
        borderBottom: "none",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        paddingTop: 2,
    },

    "tabsFlexContainer-left-hbox": {
        "& $tabRoot": {
            "&:before": {
                content: "none",
            },
            borderBottom: `2px solid ${theme.palette.primary.light}`,
            marginLeft: 20,
            marginRight: -20,
            transform: "skewX(-34deg)",
        },
        "& $tabWrapper": {
            paddingRight: 8,
            textAlign: "end",
            transform: "skewX(34deg)",
        },
        flexDirection: "column-reverse",
        width: 264,
    },
    "tabsFlexContainer-left-vbox": {
        "& $tabRoot": {
            "&:before": {
                bottom: -24,
                left: 0,
                top: 24,
                transform: "skewY(54deg)",
                width: 36,
            },
            "&:hover:before": {
                boxShadow: `-1px 1px 1px ${theme.palette.primary.main}`,
            },
            height: "auto",
            marginBottom: 20,
            minWidth: 36,
            padding: "20px 0 0 0",
            transform: "skewY(-34deg)",
            width: 36,
        },
        "& $tabWrapper": {
            margin: "0 5px",
            textAlign: "start",
            transform: "skewY(34deg) rotate(180deg)",
            writingMode: "vertical-rl",
        },
        flexDirection: "column-reverse",
        marginBottom: 14,
        marginLeft: 1,
        paddingTop: 10,
        width: 36,
    },
    "tabsFlexContainer-right-hbox": {
        "& $tabRoot": {
            borderBottom: `2px solid ${theme.palette.primary.light}`,
            marginLeft: -12,
            transform: "skewX(34deg)",
        },
        "& $tabWrapper": {
            paddingLeft: 8,
            textAlign: "start",
            transform: "skewX(-34deg)",
        },
        flexDirection: "column-reverse",
        width: 264,
    },
    "tabsFlexContainer-right-vbox": {
        "& $tabRoot": {
            "&:before": {
                bottom: -24,
                left: 0,
                top: 24,
                transform: "skewY(-54deg)",
                width: 36,
            },
            "&:hover:before": {
                boxShadow: `0px 1px 1px ${theme.palette.primary.main}`,
            },
            height: "auto",
            marginBottom: 20,
            minWidth: 36,
            padding: "20px 0 0 0",
            transform: "skewY(34deg)",
            width: 36,
        },
        "& $tabWrapper": {
            margin: "0 5px",
            textAlign: "start",
            transform: "skewY(-34deg)",
            writingMode: "vertical-rl",
        },
        flexDirection: "column-reverse",
        marginBottom: 14,
        marginRight: 1,
        paddingTop: 10,
        width: 36,
    },
    tabsIndicator: {
        display: "none",
    },
    tabsRoot: {
        display: "block",
        marginBottom: -5,
        minHeight: 38,
    },
    "tabsScroller-center-hbox": {
        paddingLeft: 94,
    },
});
