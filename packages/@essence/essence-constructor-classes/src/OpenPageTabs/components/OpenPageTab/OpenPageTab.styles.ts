import {IEssenceTheme} from "@essence/essence-constructor-share";
import {makeStyles} from "@material-ui/core/styles";
import openPageTabDark from "./OpenPageTabDark.styles";
import openPageTabLight from "./OpenPageTabLight.styles";

export const useStyles = makeStyles(
    // @ts-ignore
    (theme: IEssenceTheme) => (theme.palette.type === "light" ? openPageTabLight(theme) : openPageTabDark(theme)),
    {name: "EssenceOpenPageTab"},
);
