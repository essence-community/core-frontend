/* eslint-disable sort-keys */
export const StyleTabPanelDark = (theme) => ({
    fullWidth: {
        width: "100%",
    },
    tabsRoot: {
        display: "block",
        minHeight: 38,
        marginBottom: -5,
    },
    tabRoot: {
        flexShrink: 1,
        height: 36,
        minHeight: 36,
        marginRight: 25,
        minWidth: 65,
        overflow: "visible",
        opacity: 1,
        zIndex: 1,
        boxShadow: `2px 0px 3px -2px ${theme.palette.primary.main}`,
        transform: "skewX(34deg)",
        background: "#cdcaca",
        "&:before": {
            // eslint-disable-next-line quotes
            content: '""',
            position: "absolute",
            width: 49,
            bottom: 0,
            top: 0,
            left: -24,
            zIndex: -16,
            background: "#cdcaca",
            boxShadow: `-2px 0px 2px -2px ${theme.palette.primary.main}`,
            transform: "skewX(-54deg)",
        },
        "&:hover": {
            boxShadow: `1px -1px 1px ${theme.palette.primary.main}`,
            "&:before": {
                boxShadow: `-2px -0px 1px ${theme.palette.primary.main}`,
            },
        },
    },
    activeTabRoot: {
        zIndex: 2,
        background: theme.palette.primary.main,
        boxShadow: "none",
        "&:before": {
            zIndex: "10",
            background: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            boxShadow: "none",
        },
        "&:hover, &:focus": {
            boxShadow: "none",
            "&:before": {
                boxShadow: "none",
            },
        },

        "& $tabWrapper": {
            color: theme.palette.text.light,
        },
    },
    disabled: {
        "& $tabWrapper": {
            color: theme.palette.common.disabled,
        },
        opacity: "1 !important",
    },
    tabWrapper: {
        width: "100%",

        fontSize: 15,
        marginRight: 10,
        color: theme.palette.text.dark,
        padding: 0,
        textTransform: "none",
        transform: "skewX(-34deg)",
        zIndex: 11,

        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    },
    tabsFlexContainer: {
        paddingTop: 2,
        borderBottom: "none",
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
    },
    tabsIndicator: {
        height: 0,
    },
    tabsScroller: {
        paddingLeft: 94,
    },
    selectedTabRoot: {
        "&$tabRoot": {
            boxShadow: `1px -1px 1px ${theme.palette.primary.main}`,
            "&:before": {
                boxShadow: `-2px -0px 1px ${theme.palette.primary.main}`,
            },
        },
    },
    tabsContainer: {
        outline: "none",
    },
    slimTabs: {
        flexWrap: "wrap-reverse",
    },
    slimTab: {
        maxWidth: 65,
    },
});
/* eslint-enable sort-keys */
