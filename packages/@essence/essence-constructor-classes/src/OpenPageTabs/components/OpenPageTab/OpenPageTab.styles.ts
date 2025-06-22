import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@mui/styles";
import openPageTabDark from "./OpenPageTabDark.styles";
import openPageTabLight from "./OpenPageTabLight.styles";

export const useStyles = makeStyles(

    // @ts-ignore
    (theme: IEssenceTheme) => ({
        ...(theme.essence.layoutTheme === 1 ? openPageTabLight(theme) : openPageTabDark(theme)),
        tabDrag: {
            opacity: 0,
        },
    }),
    {name: "EssenceOpenPageTab"},
);
