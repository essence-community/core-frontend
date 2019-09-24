export const FieldComboDownshiftStylesDark = (theme) => ({
    "@global": {
        ".rc-field-combo-downshift": {
            left: -9999,
            position: "absolute",
            top: -9999,
            zIndex: theme.zIndex.combo,
        },
        ".rc-field-combo-downshift-mask": {
            bottom: 0,
            left: 0,
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: theme.zIndex.combo - 1,
        },
        ".rc-field-combo-downshift-mask-hidden": {
            display: "none",
        },
    },
    clearSelection: {
        visibility: "hidden",
    },
    container: {
        flexGrow: 1,
        position: "relative",
    },
    contentRoot: {
        height: theme.sizing.gridRowHeight,
    },
    downshiftContent: {
        "&:hover": {
            "& $clearSelection": {
                visibility: "visible",
            },
        },
        position: "relative",
    },
    iconRoot: {
        height: theme.sizing.gridRowHeight,
        width: theme.sizing.gridRowHeight,
    },
    loader: {
        left: "calc(50% - 20px)",
        position: "absolute",
        top: "calc(50% - 20px)",
    },
    menuItem: {
        borderBottom: `1px solid ${theme.palette.grey.main}`,
        height: 34,
        minHeight: 34,
        paddingBottom: 0,
        paddingTop: 0,
    },
    menuItemLabel: {
        display: "inline-block",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
    },
    menuItemSelectedCheck: {
        display: "inline-block",
    },
    menuItemSelectedLabel: {
        fontWeight: 600,
    },
    paginationMenuItem: {
        "&:hover": {
            backgroundColor: "inherit",
        },
        alignItems: "center",
        display: "flex",
        height: 10,
        justifyContent: "center",
    },
    paper: {
        borderBottom: `1px solid ${theme.palette.grey.main}`,
        borderLeft: `1px solid ${theme.palette.grey.main}`,
        borderRight: `1px solid ${theme.palette.grey.main}`,
    },
    secondaryActionFrame: {
        alignItems: "center",
        backgroundColor: theme.palette.grey.backgroundInput,
        bottom: 1,
        display: "flex",
        overflow: "visible",
        position: "absolute",
        right: 2,
        top: 1,
        zIndex: 2,
    },
});
