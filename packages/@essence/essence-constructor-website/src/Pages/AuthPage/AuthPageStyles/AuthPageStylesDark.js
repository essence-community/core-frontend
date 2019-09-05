// @flow
const AuthPageStylesDark = (theme: any) => ({
    button: {
        "&$disabled": {
            color: theme.palette.primary.light,
        },
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.grey.light,
        },
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.grey.light,
        float: "right",
        height: 36,
        width: 94,
    },
    disabled: {
        backgroundColor: theme.palette.grey.authDisableBtn,
    },
    underline: {
        "&:after": {
            backgroundColor: theme.palette.primary.field,
            display: "block",
            height: 2,
        },
        "&:before": {
            backgroundColor: theme.palette.primary.light,
            display: "block",
            height: 2,
        },
        "&:hover": {
            "&:before": {backgroundColor: `${theme.palette.grey.main} !important`},
        },
    },
});

export default AuthPageStylesDark;
