import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: IEssenceTheme) => ({
    bottomBar: {
        borderTop: `1px solid ${theme.palette.grey.main}`,
        height: 48,
        overflow: "hidden",
    },
    btn: {
        padding: 12,
    },
    disabledBtn: {
        color: theme.palette.grey.main,
    },
    root: {
        backgroundColor: theme.palette.common.white,
        height: "calc(100% - 5px)",
    },
    tabsRoot: {
        backgroundColor: theme.palette.primary.main,
        minHeight: 24,
    },
}));
