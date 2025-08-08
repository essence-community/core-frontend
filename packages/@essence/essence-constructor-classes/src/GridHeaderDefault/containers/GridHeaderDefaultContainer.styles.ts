/* eslint-disable sort-keys */
import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "@essence-community/constructor-share/types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) => ({
        "align-center": {
            textAlign: "center",
        },
        "align-left": {},
        "align-right": {
            textAlign: "right",
        },
        filterIcon: {
            visibility: "hidden",
        },
        filterSelect: {
            "& $filterIcon": {
                visibility: "visible",
            },
        },
        tableCell:
            theme.essence.layoutTheme === 2
                ? {
                    "&:hover": {
                        "& $filterIcon": {
                            visibility: "visible",
                        },
                    },
                    "&:last-child": {
                        paddingRight: 0,
                    },
                    "&:not(:last-child)": {
                        borderRight: `1px solid ${theme.essence.palette.grey.arrow}`,
                    },
                    "&.MuiTableCell-root": {
                        fontSize: 16,
                    },
                    overflow: "hidden",
                    padding: 0,
                }
                : {
                    "&:hover": {
                        "& $filterIcon": {
                            visibility: "visible",
                        },
                        backgroundColor: theme.essence.palette.grey.light,
                    },
                    "&:last-child": {
                        paddingRight: 0,
                    },
                    "&.MuiTableCell-root": {
                        borderBottom: `1px solid ${theme.palette.primary.main}`,
                        borderTop: `1px solid ${theme.palette.primary.main}`,
                        fontSize: 16,
                    },
                    height: theme.essence.sizing.gridRowHeight,
                    padding: 0,
                },
        tableCellActive:
            theme.essence.layoutTheme === 2
                ? {}
                : {
                    backgroundColor: theme.essence.palette.grey.light,
                },
        tableCellContent: {
            display: "flex",
            height: "100%",
        },
        tableCellEllipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
        tableSortLabel:
            theme.essence.layoutTheme === 2
                ? {
                    "&.MuiButtonBase-root:focus": {
                        color: theme.palette.common.white,
                        fill: theme.palette.common.white,
                    },
                    "&.MuiButtonBase-root:hover": {
                        color: theme.palette.common.white,
                        fill: theme.palette.common.white,
                    },
                    "&.MuiButtonBase-root": {
                        color: theme.essence.palette.grey.light,
                        fill: theme.essence.palette.grey.light,
                    },
                    "&.MuiButtonBase-root.Mui-active": {
                        color: theme.essence.palette.grey.light,
                        fill: theme.essence.palette.grey.light,
                    },
                    "&.MuiButtonBase-root.Mui-active:hover": {
                        color: theme.palette.common.white,
                        fill: theme.palette.common.white,
                    },
                    "&.MuiButtonBase-root.Mui-active .MuiTableSortLabel-icon": {
                        color: theme.essence.palette.grey.light,
                        fill: theme.essence.palette.grey.light,
                    },
                    "&.MuiButtonBase-root.Mui-active:hover .MuiTableSortLabel-icon": {
                        color: theme.palette.common.white,
                        fill: theme.palette.common.white,
                    },
                    color: theme.essence.palette.grey.light,
                    flexGrow: 1,
                    overflow: "hidden",
                    paddingLeft: "12px !important",
                }
                : {
                    flexGrow: 1,
                    overflow: "hidden",
                    paddingLeft: "12px !important",
                },
    }),
    {name: "EssenceGridHeaderDefaultContainer"},
);
