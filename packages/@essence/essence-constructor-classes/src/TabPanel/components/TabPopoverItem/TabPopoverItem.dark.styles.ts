import {StyleRules} from "@mui/styles";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share";

export function darkStyles(theme: IEssenceTheme): StyleRules<IClassProps, "root" | "active"> {
    return {
        active: {},
        root: {
            "&$active": {
                "&:not($disabled):hover": {
                    backgroundColor: theme.palette.primary.main,
                },
                color: theme.essence.palette.common.selectedMenu,
            },
            "&:not($disabled):hover": {
                backgroundColor: theme.palette.primary.light,
            },
            backgroundColor: theme.palette.primary.main,
            color: theme.essence.palette.text.light,
        },
    };
}
