import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        disabled: {},
        formLabel: {
            paddingBottom: 0,
            paddingLeft: 5,
        },
        noLabelRender: {
            justifyContent: "center",
        },
        root: {
            "&$disabled": {
                backgroundColor: theme.essence.palette.grey.checkbox,
                border: "none",
                borderRadius: 4,
                color: theme.palette.text.disabled,
                cursor: "default",
            },
            // Remove grey highlight
            WebkitTapHighlightColor: "transparent",
            alignItems: "center",
            backgroundColor: theme.essence.palette.grey.backgroundInput,
            border: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: 4,
            cursor: "pointer",
            display: "inline-flex",
            height: theme.essence.sizing.gridRowHeight,
            justifyContent: "space-between",
            position: "relative",
            // For correct alignment with the text.
            verticalAlign: "middle",
            width: "100%",
        },
        setInline: {
            justifyContent: "center",
            paddingRight: 10,
        },
    }),
    {name: "EssenceFieldColorContainer"},
);
