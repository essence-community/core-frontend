// @flow
export const NotificationsTabsStyles = (theme: Object) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        height: 24,
        marginBottom: 3,
        padding: "4px 4px 0 4px",
    },
    selectedTab: {
        "&:after": {
            backgroundColor: theme.palette.common.selectedMenu,
            bottom: -3,
            // eslint-disable-next-line quotes
            content: '""',
            height: 3,
            left: 0,
            position: "absolute",
            right: 0,
        },
    },
    tabRoot: {
        "&$selectedTab": {
            borderBottomColor: theme.palette.common.selectedMenu,
            color: theme.palette.common.selectedMenu,
        },
        cursor: "pointer",
        margin: "0 4px",
        position: "relative",
    },
});
