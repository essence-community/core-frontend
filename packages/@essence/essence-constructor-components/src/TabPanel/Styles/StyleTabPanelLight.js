export const StyleTabPanelLight = (theme) => {
    const tabsFlexContainerCenter = {
        "& $tabRoot": {
            marginRight: 15,
            transform: "skewX(30deg)",
        },
        "& $tabWrapper": {
            transform: "skewX(-30deg)",
        },
        borderBottom: `1px solid ${theme.palette.secondary.main}`,
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        marginTop: 4,
    };

    return {
        activeTabRoot: {},
        "content-left-hbox": {
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            overflow: "hidden",
        },
        "content-left-vbox": {
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            overflow: "hidden",
        },
        "content-right-hbox": {
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            overflow: "hidden",
        },
        "content-right-vbox": {
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            overflow: "hidden",
        },
        popoverButton: {
            "&$popoverButtonActive": {
                "&:before": {
                    backgroundColor: "#fff0e1",
                },
            },
            "&$popoverButtonOpen": {
                "&:hover": {
                    borderBottomColor: "transparent",
                    borderRadius: "3px 3px 0 0",
                },
            },
            "&:before": {
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                borderTop: `1px solid ${theme.palette.secondary.main}`,
                borderTopLeftRadius: 6,
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
                    backgroundColor: "#e9ecf4",
                },
                backgroundColor: "transparent",
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            color: theme.palette.primary.main,
            height: 36,
            position: "relative",
            width: 36,
        },
        popoverButtonActive: {},
        popoverButtonOpen: {},
        popoverButtonPaper: {
            "&:before": {
                backgroundColor: theme.palette.secondary.main,
                // eslint-disable-next-line quotes
                content: '""',
                height: 1,
                left: 2,
                position: "absolute",
                right: 50,
                top: 0,
            },
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "3px 0 3px 3px",
            borderTop: "none",
        },
        selectedTabRoot: {
            "&$tabRoot": {
                background: "#e9ecf4",
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
                backgroundColor: "#fff0e1",
                borderRight: `2px solid ${theme.palette.secondary.main}`,
                borderTop: `2px solid ${theme.palette.secondary.main}`,
            },
            "&:hover": {
                background: "#e9ecf4",
            },
            borderRight: `1px solid ${theme.palette.secondary.main}`,
            borderTop: `1px solid ${theme.palette.secondary.main}`,
            borderTopRightRadius: 6,
            flexShrink: 1,
            height: 36,
            minHeight: 36,
            minWidth: 70,
            transformOrigin: "top",
        },
        tabWrapper: {
            display: "block",
            fontSize: 13,
            fontWeight: "bold",
            overflow: "hidden",
            padding: "0 4px",
            textOverflow: "ellipsis",
            textTransform: "none",
            whiteSpace: "nowrap",
            width: "100%",
        },
        "tabsFlexContainer-center-hbox": tabsFlexContainerCenter,
        "tabsFlexContainer-center-vbox": tabsFlexContainerCenter,
        "tabsFlexContainer-left-hbox": {
            "& $tabRoot": {
                "&$activeTabRoot": {
                    borderLeft: `2px solid ${theme.palette.secondary.main}`,
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
                "&:last-child": {
                    "&$activeTabRoot": {
                        borderTop: `2px solid ${theme.palette.secondary.main}`,
                    },
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                borderRight: "none",
                borderTop: "none",
                borderTopLeftRadius: 6,
                borderTopRightRadius: 0,
                marginLeft: 20,
                marginRight: -20,
                transform: "skewX(-30deg)",
            },
            "& $tabWrapper": {
                textAlign: "end",
                transform: "skewX(30deg)",
            },
            flexDirection: "column-reverse",
            width: 264,
        },
        "tabsFlexContainer-left-vbox": {
            "& $tabRoot": {
                "&$activeTabRoot": {
                    borderLeft: `2px solid ${theme.palette.secondary.main}`,
                    borderTop: `2px solid ${theme.palette.secondary.main}`,
                },
                borderLeft: `1px solid ${theme.palette.secondary.main}`,
                borderRight: 0,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 0,
                height: "auto",
                marginBottom: 15,
                minWidth: 36,
                padding: "10px 0",
                transform: "skewY(-30deg)",
                width: 36,
            },
            "& $tabWrapper": {
                maxHeight: 234,
                textAlign: "start",
                transform: "skewY(30deg) rotate(180deg)",
                writingMode: "vertical-rl",
            },
            flexDirection: "column-reverse",
            paddingTop: 10,
            width: 36,
        },
        "tabsFlexContainer-right-hbox": {
            "& $tabRoot": {
                "&$activeTabRoot": {
                    borderRight: `2px solid ${theme.palette.secondary.main}`,
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
                "&:last-child": {
                    "&$activeTabRoot": {
                        borderTop: `2px solid ${theme.palette.secondary.main}`,
                    },
                    borderTop: `1px solid ${theme.palette.secondary.main}`,
                },
                borderBottom: `1px solid ${theme.palette.secondary.main}`,
                borderTop: "none",
                marginLeft: -20,
                transform: "skewX(30deg)",
            },
            "& $tabWrapper": {
                textAlign: "start",
                transform: "skewX(-30deg)",
            },
            flexDirection: "column-reverse",
            width: 264,
        },
        "tabsFlexContainer-right-vbox": {
            "& $tabRoot": {
                "&$activeTabRoot": {
                    borderRight: `2px solid ${theme.palette.secondary.main}`,
                    borderTop: `2px solid ${theme.palette.secondary.main}`,
                },
                height: "auto",
                marginBottom: 15,
                minWidth: 36,
                padding: "10px 0",
                transform: "skewY(30deg)",
                width: 36,
            },
            "& $tabWrapper": {
                maxHeight: 234,
                textAlign: "start",
                transform: "skewY(-30deg)",
                writingMode: "vertical-rl",
            },
            flexDirection: "column-reverse",
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
    };
};
