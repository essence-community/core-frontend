import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        child: {
            minWidth: 0,
        },
        filterRoot: {},
        label: {
            color: theme.palette.text.secondary,
            fontSize: 12,
            left: -1,
            position: "absolute",
            top: -7,
            width: "calc(100% + 2px)",
        },
        labelDisplay: {
            "&:empty": {
                display: "block",
                visibility: "hidden",
            },
            maxWidth: "80%",
            overflow: "hidden",
            paddingLeft: 4,
            paddingRight: 4,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        labelTextEndAngle: {
            borderRadius: "0 3px 0 0",
            borderRight: `1px solid ${theme.essence.palette.grey.main}`,
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            height: 6,
            marginTop: 6,
            minWidth: 16,
        },
        labelTextLine: {
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            height: 6,
            marginTop: 6,
            minWidth: 8,
        },
        labelTextStartAngle: {
            borderLeft: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: "3px 0 0 0",
            borderTop: `1px solid ${theme.essence.palette.grey.main}`,
            height: 6,
            marginTop: 6,
            width: 7,
        },
        panelRoot: {},
        root: {
            border: `1px solid ${theme.essence.palette.grey.main}`,
            borderRadius: 3,
            borderTopColor: "transparent",
            display: "flex",
            marginLeft: -4,
            marginRight: -4,
            padding: "4px 0 0",
            position: "relative",
        },
        rootError: {
            "& $label": {
                color: theme.palette.error.main,
            },
            "& $labelTextEndAngle": {
                borderColor: theme.palette.error.main,
            },
            "& $labelTextLine": {
                borderColor: theme.palette.error.main,
            },
            "& $labelTextStartAngle": {
                borderColor: theme.palette.error.main,
            },
            borderColor: theme.palette.error.main,
            borderTopColor: "transparent",
        },
    }),
    {
        name: "EssenceGroup",
    },
);
