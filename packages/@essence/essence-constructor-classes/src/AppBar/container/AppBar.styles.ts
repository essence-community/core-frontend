/* eslint-disable sort-keys */
import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@mui/styles";

/**
 * @module StylesEssenceAppBar
 * @description name: **EssenceAppBar**
 */
export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        /**
         * Общий root для MaterialAppBar
         * @memberof EssenceAppBar
         */
        root: {
            "& .MuiAppBar-root": {
                backgroundImage: "none !important",
                minHeight: "inherit",
            },
            "& .MuiDivider-root": {
                backgroundColor: theme.palette.common.white,
            },
            "& .MuiIconButton-colorPrimary": {
                color: theme.palette.common.white,
                fill: theme.palette.common.white,
            },
            "& .MuiIconButton-colorPrimary:hover": {
                color: theme.essence.palette.common.selectedMenu,
                fill: theme.essence.palette.common.selectedMenu,
            },
            "& .MuiToolbar-gutters": {
                paddingLeft: 0,
                paddingRight: 0,
            },
            "& .MuiGrid-spacing-xs-1": {
                margin: 0,
                width: "100%",
            },
            "& .MuiToolbar-regular": {
                minHeight: "100%",
            },
            minHeight: "inherit",
            ...(theme.essence.layoutTheme === 2 ? {
                backgroundColor: `${theme.palette.primary.main} !important`,
            } : {}),
        },
    }),
    {
        name: "EssenceAppBar",
    },
);
