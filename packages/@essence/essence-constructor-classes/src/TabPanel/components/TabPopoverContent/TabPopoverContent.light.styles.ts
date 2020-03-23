import {StyleRules} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const lightStyles = (theme: IEssenceTheme): StyleRules<"root"> => ({
    root: {
        "&:before": {
            backgroundColor: theme.palette.secondary.main,
            // eslint-disable-next-line quotes
            content: '""',
            height: 1,
            left: 2,
            position: "absolute",
            right: 50,
            top: 0,
        },
        border: `1px solid ${theme.palette.secondary.main}`,
        borderRadius: "3px 0 3px 3px",
        borderTop: "none",
    },
});
