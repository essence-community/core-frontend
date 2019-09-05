// @flow
const PreferencePageStyles = (theme: Object) => ({
    root: theme.mixins.gutters({
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        marginTop: theme.sizing.appbarHeight + theme.spacing.unit * 3,
        paddingBottom: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 2,
    }),
});

export default PreferencePageStyles;
