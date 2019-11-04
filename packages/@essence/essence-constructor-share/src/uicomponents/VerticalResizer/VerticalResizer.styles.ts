import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        line: {
            borderTop: `2px dashed ${theme.essence.palette.grey.main}`,
            pointerEvents: "none",
            position: "fixed",
            zIndex: 2000,
        },
        resizer: {
            backgroundColor: theme.palette.common.white,
            borderBottom: `1px solid ${theme.essence.palette.grey.main}`,
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            cursor: "none",
            height: 10,
            position: "relative",
            textAlign: "center",
            width: "100%",
        },
        resizerIcon: {
            pointerEvents: "none",
            position: "fixed",
            transform: "translate(-50%, -50%)",
            transition: "transform 0.2s ease",
            zIndex: 2100,
        },
        resizerIconDown: {
            transform: "translate(-50%, -50%) scaleY(0.5)",
        },
    }),
    {name: "EssenceVerticalResizer"},
);
