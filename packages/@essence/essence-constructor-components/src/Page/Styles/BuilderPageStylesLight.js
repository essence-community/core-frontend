// @flow
export const BuilderPageStylesLight = (theme: any) => ({
    backdrop: {
        backgroundColor: "rgba(0,0,0,0.7)",
        bottom: 0,
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: theme.zIndex.backdrop,
    },
    paperTopMargin: {
        marginTop: 20,
    },
    root: {
        height: "100%",
        position: "relative",
    },
    rootDialogContent: {},
    rootDialogWidthMd: {
        "& $rootDialogContent": {
            maxWidth: 900,
            minWidth: 150,
        },
        maxWidth: 1000,
        minWidth: 250,
    },
    rootPageContent: {
        minHeight: "100%",
        padding: theme.spacing.unit * 2,
        position: "relative",
    },
});
