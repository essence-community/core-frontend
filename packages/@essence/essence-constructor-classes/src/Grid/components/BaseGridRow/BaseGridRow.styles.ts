import {makeStyles} from "@material-ui/core";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        autoStripe: {
            "&:nth-of-type(even)": {
                backgroundColor: theme.essence.palette.common.stripeRecord,
            },
        },
        root: {
            "&$selected":
                theme.palette.type === "dark"
                    ? {
                          backgroundColor: theme.essence.palette.common.selectedRecord,
                          boxShadow: `inset 0px 0px 0px 2px ${theme.essence.palette.common.selectedRecordBorder}`,
                      }
                    : {
                          backgroundColor: theme.essence.palette.common.selectedRecord,
                      },
            "&$selectedDetail": {
                backgroundColor: theme.essence.palette.common.selectedRecord,
                // eslint-disable-next-line max-len
                boxShadow: `inset -1px -1px 0px 1px ${theme.essence.palette.common.selectedRecordBorder}, inset 1px -1px 0px 1px ${theme.essence.palette.common.selectedRecordBorder}`,
            },
            "&$selectedDetailExpanded":
                theme.palette.type === "dark"
                    ? {
                          backgroundColor: theme.essence.palette.common.selectedRecord,
                          // eslint-disable-next-line max-len
                          boxShadow: `inset -1px 1px 0px 1px ${theme.essence.palette.common.selectedRecordBorder}, inset 1px 1px 0px 1px ${theme.essence.palette.common.selectedRecordBorder}`,
                      }
                    : {
                          backgroundColor: theme.essence.palette.common.selectedRecord,
                      },
            color: "inherit",
            display: "table-row",
            height: theme.essence.sizing.gridRowHeight,
            // We disable the focus ring for mouse, touch and keyboard users.
            outline: "none",
            verticalAlign: "middle",
        },
        selected: {},
        selectedDetail: {},
        selectedDetailExpanded: {},
    }),
    {name: "EssenceBaseGridRow"},
);
