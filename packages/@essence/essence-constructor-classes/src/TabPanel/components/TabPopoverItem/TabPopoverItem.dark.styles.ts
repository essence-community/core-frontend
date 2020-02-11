import {StyleRules} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export function darkStyles(theme: IEssenceTheme): StyleRules<"root" | "active"> {
    return {
        active: {},
        root: {
            "&$active": {
                "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                },
                color: theme.essence.palette.common.selectedMenu,
            },
            "&:hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.main,
            color: theme.essence.palette.text.light,
        },
    };
}
