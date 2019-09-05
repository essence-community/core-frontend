const HomePageStyles = (theme) => ({
    homeLogo: {
        maxHeight: "100vh",
        maxWidth: "100vw",
    },
    root: {
        boxSizing: "content-box",
        minHeight: `calc(100vh - ${theme.sizing.appbarHeight}px)`,
        paddingTop: theme.sizing.appbarHeight,
    },
});

export default HomePageStyles;
