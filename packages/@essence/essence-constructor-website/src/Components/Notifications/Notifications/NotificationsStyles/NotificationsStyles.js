// @flow
// eslint-disable-next-line max-lines-per-function
export const NotificationsStyles = (theme: Object) => ({
    badge: {
        borderColor: theme.palette.common.white,
    },
    badgeDisabled: {
        backgroundColor: theme.palette.grey.main,
    },
    bottomBar: {
        borderTop: `1px solid ${theme.palette.grey.main}`,
        height: 48,
        overflow: "hidden",
    },
    btn: {
        padding: 12,
    },
    clearButton: {
        visibility: "hidden",
    },
    disabledBtn: {
        color: theme.palette.grey.main,
    },
    dot: {
        backgroundColor: theme.palette.common.selectedMenu,
        borderRadius: "50%",
        height: 6,
        minWidth: 6,
        padding: 0,
        position: "absolute",
        top: 15,
    },
    notificationContent: {
        borderRadius: 4,
        padding: 8,
        wordBreak: "break-word",
    },
    "notificationContent-block": {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.text.primary,
    },
    "notificationContent-debug": {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.text.primary,
    },
    "notificationContent-error": {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
    },
    "notificationContent-errorUpload": {
        backgroundColor: theme.palette.error.main,
        color: theme.palette.common.white,
    },
    "notificationContent-info": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    "notificationContent-notification": {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.text.primary,
    },
    "notificationContent-progress": {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    "notificationContent-unblock": {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.text.primary,
    },
    "notificationContent-uploaded": {
        backgroundColor: theme.palette.grey.light,
        color: theme.palette.text.primary,
    },
    "notificationContent-warning": {
        backgroundColor: theme.palette.common.warning,
        color: theme.palette.text.primary,
    },
    notificationHeader: {
        color: "#939393",
        fontSize: 14,
        padding: "0 8px",
    },
    notificationRoot: {
        "&:hover $clearButton": {
            visibility: "visible",
        },
        padding: 8,
        position: "relative",
    },
    pageName: {
        maxWidth: 320,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    },
    root: {
        backgroundColor: theme.palette.common.white,
        height: "calc(100% - 5px)",
    },
});
