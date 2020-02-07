// eslint-disable-next-line max-lines-per-function
export const SnackbarContentDarkStyle = (theme) => ({
    closeIcon: {
        cursor: "pointer",
    },
    contentBlock: {
        backgroundColor: theme.palette.grey.main,
        padding: "10px 5px",
    },
    contentError: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        padding: "10px 5px",
    },
    contentErrorupload: {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
        padding: "10px 5px",
    },
    contentInfo: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: "10px 5px",
    },
    contentProgress: {
        backgroundColor: theme.palette.grey.main,
        color: theme.palette.common.white,
        padding: "10px 5px",
    },
    contentUnblock: {
        backgroundColor: theme.palette.grey.main,
        padding: "10px 5px",
    },
    contentUploaded: {
        backgroundColor: theme.palette.grey.main,
        padding: "10px 5px",
    },
    contentWarning: {
        backgroundColor: theme.palette.common.warning,
        padding: "10px 5px",
    },
    header: {
        padding: 5,
    },
    headerIcon: {
        marginRight: 16,
    },
    paper: {
        margin: "10px 0",
    },
    title: {
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    titleError: {
        color: theme.palette.error.main,
    },
    titleErrorupload: {
        color: theme.palette.error.main,
    },
    titleIconUploaded: {
        color: theme.palette.common.success,
    },
    titleIconWarning: {
        color: theme.palette.common.warning,
    },
});
