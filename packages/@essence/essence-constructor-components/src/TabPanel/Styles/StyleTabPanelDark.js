import {fade} from "@material-ui/core/styles";

export const StyleTabPanelDark = (theme) => {
    const tabsFlexContainerCenter = {
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
    };

    return {
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
        "tabItem-center-vbox": {
            width: "100%",
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
        "tabsFlexContainer-center-hbox": tabsFlexContainerCenter,
        "tabsFlexContainer-center-vbox": tabsFlexContainerCenter,

        "tabsFlexContainer-left-hbox": {
            "& $tabRoot": {
                "&:before": {
                    content: "none",
                },
                "&:hover": {
                    boxShadow: `inset 1px 0.5px 0 0.5px ${theme.palette.primary.main}`,
                },
                borderBottom: `1px solid ${theme.palette.primary.light}`,
                boxShadow: `-0.5px -0.5px 2px 0 ${theme.palette.primary.main}`,
                marginLeft: 20,
                marginRight: -20,
                transform: "skewX(-34deg)",
            },
            "& $tabWrapper": {
                paddingRight: 2,
                textAlign: "end",
                transform: "skewX(34deg)",
            },
            flexDirection: "column-reverse",
            marginTop: 2,
            width: 264,
        },
        "tabsFlexContainer-left-vbox": {
            "& $tabRoot": {
                "&:before": {
                    bottom: -30,
                    boxShadow: `-1px 2px 2px -2px ${theme.palette.primary.main}`,
                    left: 0,
                    top: 29,
                    transform: "skewY(54deg)",
                    width: 42,
                },
                "&:hover": {
                    "&:before": {
                        boxShadow: `-1px 1.25px 0px 0px ${theme.palette.primary.main}`,
                    },
                    boxShadow: `0px 0px 0px 1px ${theme.palette.primary.main}`,
                },
                boxShadow: `0px 0px 2px 0px ${theme.palette.primary.main}`,
                height: "auto",
                marginBottom: 20,
                minWidth: 36,
                padding: "20px 0 0 0",
                transform: "skewY(-34deg)",
                width: 36,
            },
            "& $tabWrapper": {
                margin: "0 5px",
                maxHeight: 234,
                textAlign: "start",
                transform: "skewY(34deg) rotate(180deg)",
                writingMode: "vertical-rl",
            },
            flexDirection: "column-reverse",
            marginBottom: 24,
            marginLeft: 1,
            paddingTop: 15,
            width: 36,
        },
        "tabsFlexContainer-right-hbox": {
            "& $tabRoot": {
                "&:before": {
                    content: "none",
                },
                "&:hover": {
                    boxShadow: `inset -1px 0.5px 0 0.5px ${theme.palette.primary.main}`,
                },
                borderBottom: `1px solid ${theme.palette.primary.light}`,
                boxShadow: `0.5px -0.5px 2px 0 ${theme.palette.primary.main}`,
                marginLeft: -12,
                transform: "skewX(34deg)",
            },
            "& $tabWrapper": {
                paddingLeft: 2,
                textAlign: "start",
                transform: "skewX(-34deg)",
            },
            flexDirection: "column-reverse",
            marginRight: 2,
            marginTop: 2,
            width: 264,
        },
        "tabsFlexContainer-right-vbox": {
            "& $tabRoot": {
                "&:before": {
                    borderRadius: "0 3px 3px 0",
                    bottom: -26,
                    boxShadow: `1px 2px 2px -2px ${theme.palette.primary.main}`,
                    left: -4,
                    top: 27,
                    transform: "skewY(-54deg)",
                    width: 40,
                },
                "&:hover": {
                    "&:before": {
                        boxShadow: `0px 1px 0px 0.5px ${theme.palette.primary.main}`,
                    },
                    boxShadow: `1px -1px 1px 0 ${theme.palette.primary.main}`,
                },
                borderRadius: "0 3px 3px 0",
                boxShadow: `0px 0px 2px 0px ${theme.palette.primary.main}`,
                height: "auto",
                marginBottom: 20,
                minWidth: 36,
                padding: "20px 0 0 0",
                transform: "skewY(34deg)",
                width: 36,
            },
            "& $tabWrapper": {
                margin: "0 5px",
                maxHeight: 234,
                textAlign: "start",
                transform: "skewY(-34deg)",
                writingMode: "vertical-rl",
            },
            flexDirection: "column-reverse",
            marginBottom: 19,
            marginRight: 1,
            paddingTop: 15,
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
        "tabsScroller-center-vbox": {
            paddingLeft: 94,
        },
    };
};
