import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence/essence-constructor-share";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    content: {
        textAlign: "center",
    },
    rootActions: {
        backgroundColor: theme.essence.ui.modal.palette.background,
        padding: 6,
    },
    rootContent: {
        padding: 17,
    },
    rootDialog: {},
    rootDialogWidthMd: {
        "& $content": {
            maxWidth: 600,
            minWidth: 150,
        },
        maxWidth: 700,
        minWidth: 250,
    },
    rootDialogWidthSm: {
        "& $content": {
            maxWidth: 150,
            minWidth: 150,
        },
        maxWidth: 250,
        minWidth: 250,
    },
}));
