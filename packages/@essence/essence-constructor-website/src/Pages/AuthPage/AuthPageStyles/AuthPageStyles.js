const AuthPageStyles = (theme) => ({
    buttonAdorment: {
        "&:focus": {
            color: theme.palette.icon.secondary,
        },
        "&:hover": {
            color: theme.palette.primary.light,
        },
        background: "none",
        opacity: 0,
    },
    buttonAdormentHidden: {
        background: "none",
        opacity: 0,
    },
    formControl: {
        border: "none",
        height: 42,
    },
    inputAdornment: {
        backgroundColor: "transparent",
        borderRadius: 0,
        height: 40,
        maxHeight: 40,
    },
    inputRoot: {
        "&:-webkit-autofill": {
            "-webkit-box-shadow": `0 0 0 30px ${theme.palette.primary.main} inset`,
            "-webkit-text-fill-color": `${theme.palette.common.white} !important`,
        },
        color: theme.palette.common.white,
        height: "auto",
        margin: 0,
        padding: "16px 0 4px 0",
    },
    paper: {
        alignItems: "center",
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        height: 308,
        justifyContent: "space-between",
        paddingBottom: 30,
        paddingTop: 15,
        width: 429,
    },
    placeholder: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    textField: {
        "&:hover $buttonAdorment": {
            opacity: 1,
        },
        backgroundColor: theme.palette.transparent.main,
        height: 42,
        width: 328,
    },
    typography: {
        color: theme.palette.common.white,
        display: "flex",
        fontSize: 30,
    },
});

export default AuthPageStyles;
