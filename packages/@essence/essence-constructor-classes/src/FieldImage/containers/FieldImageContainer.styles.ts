import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        container: {
            "&:hover": {
                "& $downloadBtn": {
                    visibility: "visible",
                },
            },
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            width: "100%",
        },
        downloadBtn: {
            alignItems: "center",
            background: theme.palette.common.white,
            bottom: 0,
            cursor: "pointer",
            display: "flex",
            height: 30,
            justifyContent: "center",
            opacity: 0.7,
            position: "absolute",
            visibility: "hidden",
            width: "100%",
        },
        downloadBtnText: {
            paddingLeft: 5,
        },
        img: {
            maxHeight: "100%",
            maxWidth: "100%",
        },
        zoomImg: {
            height: "100%",
            margin: "auto",
            maxWidth: 10000,
            position: "absolute",
        },
    }),
    {name: "EssenceFieldImageContainer"},
);
