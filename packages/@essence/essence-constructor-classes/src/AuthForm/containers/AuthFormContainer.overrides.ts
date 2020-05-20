import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {mergeOverridesDeep} from "@essence-community/constructor-share/utils";

export const makeTheme = (theme: IEssenceTheme): IEssenceTheme => ({
    ...theme,
    overrides: mergeOverridesDeep(theme.overrides, {
        MuiButton: {
            containedSecondary: {
                "&:hover": {
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    color: theme.essence.palette.common.selectedMenu,
                },
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                color: theme.palette.common.white,
            },
        },
        MuiFormControl: {
            root: {
                height: 38,
            },
        },
        MuiFormLabel: {
            root: {
                "&$focused": {
                    color: theme.palette.common.white,
                },
                color: theme.palette.common.white,
            },
        },
        MuiInput: {
            formControl: {
                border: "none",
                borderBottom: "2px solid white",
                borderRadius: 0,
            },
            input: {
                "&:-webkit-autofill": {
                    // @ts-ignore
                    ...theme.overrides.MuiInput.input["&:-webkit-autofill"],
                    "-webkit-box-shadow": `0 0 0 30px ${theme.palette.primary.main} inset`,
                    "-webkit-text-fill-color": `${theme.palette.common.white}`,
                },
                color: theme.palette.common.white,
                height: 20,
                padding: "15px 0 0 0",
            },
            root: {
                backgroundColor: "inherit",
                height: 38,
            },
        },
    }),
});
