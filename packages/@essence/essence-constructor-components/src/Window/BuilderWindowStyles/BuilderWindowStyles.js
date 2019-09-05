const BuilderWindowStyles = (theme) => ({
    content: {
        padding: theme.spacing.unit * 2,
    },
    contentScrollableParent: {
        display: "flex",
    },
    "winsize-base": {
        maxWidth: 800,
    },
    "winsize-default": {
        maxWidth: 800,
    },
    "winsize-narrow": {
        maxWidth: 500,
    },
    "winsize-wide": {
        maxWidth: 1000,
    },
    "winsize-xlwide": {
        maxWidth: 1600,
    },
    "winsize-xwide": {
        maxWidth: 1200,
    },
});

export default BuilderWindowStyles;
