import {IEssenceTheme} from "@essence-community/constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import openPageTabDark from "./OpenPageTabDark.styles";
import openPageTabLight from "./OpenPageTabLight.styles";

export const useStyles = makeStyles(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (theme: IEssenceTheme) => ({
        ...(theme.essence.layoutTheme === 1 ? openPageTabLight(theme) : openPageTabDark(theme)),
        tabDrag: {
            opacity: 0,
        },
    }),
    {name: "EssenceOpenPageTab"},
);
