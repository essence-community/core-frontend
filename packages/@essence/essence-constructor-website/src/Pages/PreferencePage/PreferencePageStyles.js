// @flow
const PreferencePageStyles = (theme: Object) => ({
    root: theme.mixins.gutters({
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.sizing.appbarHeight + theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
    }),
});

export default PreferencePageStyles;
