import {makeStyles} from "@mui/styles";
import {IEssenceTheme} from "../../types";

export const useStyles = makeStyles(
    (theme: IEssenceTheme) =>
        theme.essence.layoutTheme === 2
            ? {
                titleButtons: {
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    borderTopLeftRadius: 4,
                    color: theme.palette.common.white,
                    display: "flex",
                    fill: theme.palette.common.white,
                    flexDirection: "column",
                    width: theme.essence.sizing.controlPanelWidth,
                },
                titleButtonsSlim: {
                    width: 3,
                },
                titleContainer: {},
                titleTypography: {
                    fontSize: `${30}px !important`,
                    paddingLeft: `${theme.spacing(1)} !important`,
                },
            }
            : {
                titleButtons: {},
                titleButtonsSlim: {},
                titleContainer: {
                    "&:after": {
                        backgroundColor: theme.palette.primary.main,
                        bottom: 0,
                        // eslint-disable-next-line quotes
                        content: '""',
                        height: 2,
                        left: 0,
                        position: "absolute",
                        width: "100%",
                    },
                    "&:before": {
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        borderTop: `2px solid ${theme.palette.primary.main}`,
                        borderTopRightRadius: 6,
                        bottom: 2,
                        // eslint-disable-next-line quotes
                        content: '""',
                        height: 40,
                        left: 10,
                        position: "absolute",
                        transform: "skewX(30deg)",
                        width: 12,
                    },
                    height: 42,
                    position: "relative",
                },
                titleTypography: {
                    fontSize: `${22}px !important`,
                    lineHeight: "42px !important",
                    marginLeft: "35px !important",
                },
            },
    {name: "EssenceEmptyTitle"},
);
