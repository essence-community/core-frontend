import {makeStyles} from "@mui/styles";
import {IEssenceTheme, IClassProps} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        container: {
            height: "100%",
            overflow: "hidden",
        },
        content: {
            "&:empty": {
                display: "flex",
            },
            display: "flex",
            flexDirection: "column",
        },
        drawerPaper: {
            alignItems: "center",
            backgroundColor: `${theme.palette.primary.main} !important`,
            top: (props: IClassProps) => `${props.bc.top}px !important`,
        },
    }),
    {
        name: "EssenceWindowDrawerContainer",
    },
);
