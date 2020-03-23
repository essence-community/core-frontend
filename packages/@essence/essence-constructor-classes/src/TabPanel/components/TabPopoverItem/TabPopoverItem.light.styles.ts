import {StyleRules} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export function lightStyles(theme: IEssenceTheme): StyleRules<"root" | "active"> {
    return {
        active: {
            backgroundColor: theme.palette.action.selected,
        },
        root: {
            "&:hover": {
                backgroundColor: theme.palette.action.selected,
            },
            color: theme.palette.text.primary,
        },
    };
}
