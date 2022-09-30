import {IEssenceTheme} from "@essence-community/constructor-share/types";
import {mergeOverridesDeep} from "@essence-community/constructor-share/utils";
import {IOverrides} from "@essence-community/constructor-share/utils/functions/mergeOverridesDeep";

export const makeTheme = (theme: IEssenceTheme): IEssenceTheme => ({
    ...theme,
    overrides: mergeOverridesDeep(theme.overrides as IOverrides, {
        EssenceFilterButtons: {
            filterButtons:
                theme.essence.layoutTheme === 2
                    ? {
                          // Dark
                          background: "none",
                          left: 0,
                          position: "absolute",
                      }
                    : {},
        },
        EssenceFilterContainer: {
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
        },
    }),
});
