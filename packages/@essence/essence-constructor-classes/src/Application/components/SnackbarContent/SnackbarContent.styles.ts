import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        closeIcon: {
            cursor: "pointer",
        },
        "content-block": {
            backgroundColor: theme.essence.palette.grey.main,
            padding: "10px 5px",
        },
        "content-error": {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            padding: "10px 5px",
        },
        "content-errorupload": {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            padding: "10px 5px",
        },
        "content-info": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            padding: "10px 5px",
        },
        "content-progress": {
            backgroundColor: theme.essence.palette.grey.main,
            color: theme.palette.common.white,
            padding: "10px 5px",
        },
        "content-unblock": {
            backgroundColor: theme.essence.palette.grey.main,
            padding: "10px 5px",
        },
        "content-uploaded": {
            backgroundColor: theme.essence.palette.grey.main,
            padding: "10px 5px",
        },
        "content-warning": {
            backgroundColor: theme.essence.palette.common.warning,
            padding: "10px 5px",
        },
        description: {
            wordBreak: "break-word",
        },
        header: {
            padding: 5,
        },
        headerIcon: {
            marginRight: 16,
        },
        paper: {
            margin: "10px 0",
        },
        title: {
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        "title-error": {
            color: theme.palette.error.main,
        },
        "title-errorupload": {
            color: theme.palette.error.main,
        },
        "title-iconUploaded": {
            color: theme.essence.palette.common.success,
        },
        "title-iconWarning": {
            color: theme.essence.palette.common.warning,
        },
    }),
    {name: "SnackbarContent"},
);
