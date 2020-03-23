import {StyleRules} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const lightStyles = (theme: IEssenceTheme): StyleRules<"root"> => ({
    root: {
        "& > $content": {
            borderTop: `1px solid ${theme.palette.secondary.main}`,
        },
        "&$center-hbox > $content": {
            borderTop: `2px solid ${theme.palette.secondary.main}`,
        },
        "&$center-vbox > $content": {
            borderTop: `2px solid ${theme.palette.secondary.main}`,
        },
        "&$left-hbox > $content": {
            borderLeft: `1px solid ${theme.palette.secondary.main}`,
        },
        "&$left-vbox > $content": {
            borderLeft: `1px solid ${theme.palette.secondary.main}`,
        },
        "&$right-hbox > $content": {
            borderRight: `1px solid ${theme.palette.secondary.main}`,
        },
        "&$right-vbox > $content": {
            borderRight: `1px solid ${theme.palette.secondary.main}`,
        },
    },
});
