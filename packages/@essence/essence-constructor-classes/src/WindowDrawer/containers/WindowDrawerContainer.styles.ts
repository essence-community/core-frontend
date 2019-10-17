import {makeStyles} from "@material-ui/core";
import {IEssenceTheme, IClassProps} from "@essence/essence-constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        container: {
            height: "100%",
        },
        content: {
            "&:empty": {
                display: "flex",
            },
        },
        drawerPaper: {
            alignItems: "center",
            backgroundColor: theme.palette.primary.main,
            boxShadow: "none",
            top: (props: IClassProps) => parseInt(props.bc.top, 10),
        },
    }),
    {
        name: "EssenceWindowDrawerContainer",
    },
);
