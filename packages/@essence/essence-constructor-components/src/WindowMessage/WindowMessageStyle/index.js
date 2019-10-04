import merge from "lodash/merge";
import {styleTheme} from "../../constants";
import {WindowMessageStyleLight} from "./WindowMessageStyleLight";
import {WindowMessageStyleDark} from "./WindowMessageStyleDark";

const styles = styleTheme === "light" ? WindowMessageStyleLight : WindowMessageStyleDark;

const WindowMessageStyle = (theme) =>
    merge(styles(theme), {
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
    });

export default WindowMessageStyle;
