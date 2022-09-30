import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        btnResizer: {
            marginTop: -10,
            position: "absolute",
            top: "50%",
        },
        resizerIcon: {
            position: "absolute",
        },
        resizerRootIcon: {
            height: 35,
            overflow: "hidden",
            pointerEvents: "none",
            position: "fixed",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.2s ease",
            width: 35,
            zIndex: 2100,
        },
        resizerRootIconDown: {
            transform: "translate(-50%, -50%) scaleX(0.5)",
        },
        sideResizer: {
            backgroundColor: theme.palette.common.white,
            cursor: "none",
            height: "100%",
            position: "relative",
            width: 10,
        },
        textResizer: {
            "&:after": {
                content: "'...'",
                display: "inline-block",
                fontSize: 20,
                fontWeight: 600,
                transform: "rotate(270deg)",
            },
            marginLeft: -8,
        },
    }),
    {
        name: "EssenceSideResizer",
    },
);
