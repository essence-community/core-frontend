// eslint-disable-next-line max-lines-per-function
const FieldMultiStyles = (theme) => ({
    clear: {
        backgroundColor: theme.palette.grey.backgroundInput,
        bottom: 0,
        color: theme.palette.primary.main,
        position: "absolute",
        right: 50,
        top: 0,
        width: 40,
    },
    inputRoot: {
        pointerEvents: "none",
    },
    labelRoot: {
        cursor: "pointer",
    },
    paper: {
        backgroundColor: theme.palette.primary.main,
        overflow: "visible",
        padding: theme.spacing(1),
        width: 600,
    },
    paperHidden: {
        opacity: 0,
    },
    progressWrapper: {
        alignItems: "center",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
    },
    search: {
        backgroundColor: theme.palette.grey.light,
        border: "1px solid transparent",
        borderRadius: "0 4px 4px 0",
        bottom: 0,
        height: "100%",
        position: "absolute",
        right: 0,
        top: 0,
        width: 50,
    },
    textFieldRoot: {
        "&:hover": {
            "& $search": {
                backgroundColor: theme.palette.grey.light,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
            },
        },
        cursor: "pointer",
    },
    wrapper: {
        position: "relative",
    },
});

export default FieldMultiStyles;
