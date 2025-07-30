import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles(
    () => ({
        contentForm: {
            padding: "16px 16px 16px 16px",
        },
        contentRoot: {},
        panelItemFlexBasis: {
            flexBasis: "0%",
        },
        rootSpacing1: {
            "& $panelItemFlexBasis": {
                marginTop: -4,
                paddingTop: 8,
            },
        },
    }),
    {name: "EssencePanel"},
);
