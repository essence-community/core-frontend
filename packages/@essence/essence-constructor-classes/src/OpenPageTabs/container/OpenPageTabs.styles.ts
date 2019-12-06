import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        scroller: {
            height: "100%",
            overflow: "hidden",
        },
        tabsFlexContainer: {
            height: "100%",
            width: "100%",
        },
        tabsRoot: {
            backgroundColor: theme.essence.palette.grey.light,
            minHeight: "inherit",
        },
    }),
    {name: "EssenceOpenPageTabs"},
);
