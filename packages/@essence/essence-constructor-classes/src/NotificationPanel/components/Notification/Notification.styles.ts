import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    clearButton: {
        visibility: "hidden",
    },
    dot: {
        backgroundColor: theme.essence.palette.common.selectedMenu,
        borderRadius: "50%",
        height: 6,
        minWidth: 6,
        padding: 0,
        position: "absolute",
        top: 15,
    },
    notificationContent: {
        "&.block": {
            backgroundColor: theme.essence.palette.grey.light,
            color: theme.palette.text.primary,
        },
        "&.debug": {
            backgroundColor: theme.essence.palette.grey.light,
            color: theme.palette.text.primary,
        },
        "&.error": {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
        },
        "&.errorUpload": {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
        },
        "&.info": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        "&.notification": {
            backgroundColor: theme.essence.palette.grey.light,
            color: theme.palette.text.primary,
        },
        "&.progress": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
        },
        "&.unblock": {
            backgroundColor: theme.essence.palette.grey.light,
            color: theme.palette.text.primary,
        },
        "&.uploaded": {
            backgroundColor: theme.essence.palette.grey.light,
            color: theme.palette.text.primary,
        },
        "&.warning": {
            backgroundColor: theme.essence.palette.common.warning,
            color: theme.palette.text.primary,
        },
        borderRadius: 4,
        padding: 8,
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
}));
