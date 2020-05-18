import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(
    // eslint-disable-next-line no-unused-vars
    (theme: IEssenceTheme) => ({
        contentRoot: {
            padding: "16px 16px 16px 16px",
        },
        panelItemFlexBasis: {
            flexBasis: "0%",
        },
        rootSpacing1: {
            "& $panelItemFlexBasis": {
                marginTop: -4,
                paddingTop: 8,
            },
        },
    }),
    {name: "EssencePanel"},
);
