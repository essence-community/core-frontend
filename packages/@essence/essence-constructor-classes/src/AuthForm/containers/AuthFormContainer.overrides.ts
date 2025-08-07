import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {cloneDeep, merge} from "lodash";

export const makeTheme = (theme: IEssenceTheme): IEssenceTheme => ({
    ...theme,
    components: merge(cloneDeep(theme.components), {
        MuiButton: {
            styleOverrides: {
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
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    height: 38,
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: theme.palette.common.white,
                    },
                    color: theme.palette.common.white,
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                formControl: {
                    border: "none",
                    borderBottom: "2px solid white",
                    borderRadius: 0,
                },
                input: {
                    "&:-webkit-autofill": {
                        ...theme.components.MuiInput.styleOverrides.input["&:-webkit-autofill"],
                        "-webkit-box-shadow": `0 0 0 30px ${theme.palette.primary.main} inset`,
                        "-webkit-text-fill-color": `${theme.palette.common.white}`,
                    },
                    color: theme.palette.common.white,
                    height: 20,
                    padding: "15px 0 0 0",
                },
                root: {
                    "& button:hover": {
                        color: theme.palette.common.white,
                        fill: theme.palette.common.white,
                    },
                    "&.Mui-focused": {
                        color: theme.palette.common.white,
                        fill: theme.palette.common.white,
                    },
                    backgroundColor: "inherit",
                    height: 38,
                },
            }
        },
    }),
});
