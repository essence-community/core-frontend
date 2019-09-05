/* eslint-disable jsx-a11y/href-no-hash */
// @flow
const AuthPageStylesLight = (theme: any) => ({
    button: {
        "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.white,
        },
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        float: "right",
        height: 36,
        width: 94,
    },
    disabled: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.light,
    },
    underline: {
        "&:after": {
            backgroundColor: theme.palette.primary.dark,
            display: "block",
            height: 2,
        },
        "&:before": {
            backgroundColor: theme.palette.grey.light,
            display: "block",
            height: 2,
        },
        "&:hover": {
            "&:before": {backgroundColor: `${theme.palette.grey.main} !important`},
        },
    },
});

export default AuthPageStylesLight;
