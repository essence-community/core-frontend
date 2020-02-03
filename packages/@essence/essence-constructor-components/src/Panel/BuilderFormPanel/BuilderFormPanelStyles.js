// @flow
import {getThemeStyles} from "../../Theme/utils";
import {BuilderFormPanelStylesDark} from "./BuilderFormPanelStylesDark";
import {BuilderFormPanelStylesLight} from "./BuilderFormPanelStylesLight";

export default getThemeStyles(
    {
        dark: BuilderFormPanelStylesDark,
        light: BuilderFormPanelStylesLight,
    },
    (theme) => ({
        content: {
            width: "100%",
        },
        formActions: {
            position: "relative",
            zIndex: 3,
        },
        formRoot: {
            backgroundColor: theme.palette.background.paper,
            position: "relative",
            zIndex: 3,
        },
        panelEditing: {},
        root: {
            position: "relative",
        },
    }),
);
