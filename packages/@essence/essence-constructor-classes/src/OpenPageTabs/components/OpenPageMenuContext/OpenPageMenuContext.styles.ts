import {IEssenceTheme, makeStyles} from "@essence-community/constructor-share";
import openPageMenuContextDark from "./OpenPageMenuContextDark.styles";
import openPageMenuContextLight from "./OpenPageMenuContextLight.styles";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) =>
        theme.essence.layoutTheme === 1 ? openPageMenuContextDark(theme) : openPageMenuContextLight(theme),
    {
        name: "EssenceOpenPageMenuContext",
    },
);
