import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {cloneDeep, merge} from "lodash";

export const makeTheme = (theme: IEssenceTheme): IEssenceTheme => ({
    ...theme,
    components: merge(cloneDeep(theme.components), {
        EssenceFilterButtons: {
            styleOverrides: {
                filterButtons:
                    theme.essence.layoutTheme === 2
                        ? {
                            // Dark
                            background: "none",
                            left: 0,
                            position: "absolute",
                        }
                        : {},
            }
        },
        EssenceFilterContainer: {
            styleOverrides: {
                baseFilter: {
                    minHeight: 0,
                },
                filterButtons:
                    theme.essence.layoutTheme === 2
                        ? {
                            // Dark
                            background: "none",
                            left: 0,
                            position: "absolute",
                        }
                        : {},
            }
        },
    }),
});
