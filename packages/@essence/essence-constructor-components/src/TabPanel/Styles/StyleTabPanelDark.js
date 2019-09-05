/* eslint-disable sort-keys */
export const StyleTabPanelDark = (theme) => ({
    fullWidth: {
        width: "100%",
    },
    tabsRoot: {
        minHeight: 26,
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
        boxShadow: "2px 0px 3px -2px #2c3345",
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
            boxShadow: "-2px 0px 2px -2px #2c3345",
            transform: "skewX(-54deg)",
        },
        "&:hover": {
            boxShadow: "1px -1px 1px #2c3345",
            "&:before": {
                boxShadow: "-2px -0px 1px #2c3345",
            },
        },
    },
    activeTabRoot: {
        zIndex: 2,
        background: "#2c3345",
        boxShadow: "none",
        "&:before": {
            zIndex: "10",
            background: "#2c3345",
            borderColor: "#2c3345",
            boxShadow: "none",
        },
        "&:hover, &:focus": {
            boxShadow: "none",
            "&:before": {
                boxShadow: "none",
            },
        },
    },
    disabled: {
        "& $tabLabel": {
            color: theme.palette.common.disabled,
        },

        "& $label": {
            color: theme.palette.common.disabled,
        },
        opacity: "1 !important",
    },
    label: {
        color: "#dbdfef",
        fontSize: 15,
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    },
    tabLabel: {
        fontSize: 15,
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
    },
    tabLabelContainer: {
        fontSize: 13,
        marginRight: 20,
        color: "#2c3345",
        left: "-18px",
        padding: 0,
        textTransform: "none",
        transform: "skewX(-34deg)",
        zIndex: 11,
        width: "100%",
    },
    tabWrapper: {
        height: 36,
        width: "100%",
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
            boxShadow: "1px -1px 1px #2c3345",
            "&:before": {
                boxShadow: "-2px -0px 1px #2c3345",
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
