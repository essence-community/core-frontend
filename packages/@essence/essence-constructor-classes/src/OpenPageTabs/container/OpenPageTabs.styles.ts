import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        dragElement: {
            opacity: 0.7,
            pointerEvents: "none",
            position: "fixed",
            zIndex: theme.zIndex.drawer + 100,
        },
        emtySpace: {
            flex: 1,
        },
        scroller: {
            height: "100%",
            overflow: "hidden",
        },
        tabDrag: {},
        tabsFlexContainer: {
            height: "100%",
            width: "100%",
        },
        tabsRoot: {
            "&  $tabDrag": {
                opacity: 0,
            },
            backgroundColor: theme.essence.palette.grey.light,
            minHeight: "inherit",
        },
    }),
    {name: "EssenceOpenPageTabs"},
);
