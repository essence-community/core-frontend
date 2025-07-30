import {StyleRules} from "@mui/styles";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share";

export function lightStyles(theme: IEssenceTheme): StyleRules<IClassProps, "root" | "active"> {
    return {
        active: {
            backgroundColor: theme.palette.action.selected,
        },
        root: {
            "&:not($disabled):hover": {
                backgroundColor: theme.palette.action.selected,
            },
            color: theme.palette.text.primary,
        },
    };
}
