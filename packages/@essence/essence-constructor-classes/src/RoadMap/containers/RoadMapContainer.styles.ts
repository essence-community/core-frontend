import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types/Theme";

export const useStyles = makeStyles(

    (_theme: IEssenceTheme) => ({
        bottomBar: {
            "& .MuiButtonBase-root": {
                boxShadow: "none",
            },
            height: 48,
            overflow: "hidden",
            zIndex: 3,
        },
        horizontal: {
            paddingTop: 10,
        },
    }),
    {name: "EssenceRoadMapContainer"},
);
