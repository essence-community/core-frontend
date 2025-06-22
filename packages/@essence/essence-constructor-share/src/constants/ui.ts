/* eslint-disable sort-keys */
import {GridProps} from "@mui/material";

export const GRID_CONFIGS: Record<"hbox" | "hbox-wrap" | "vbox" | "vbox-wrap", GridProps> = {
    hbox: {
        direction: "row",
        wrap: "nowrap",
    },
    "hbox-wrap": {
        direction: "row",
        wrap: "wrap",
    },
    vbox: {
        direction: "column",
        wrap: "nowrap",
    },
    "vbox-wrap": {
        direction: "column",
        wrap: "wrap",
    },
};
export const GRID_ALIGN_CONFIGS: Record<string, GridProps> = {
    "center-center-hbox": {
        justifyContent: "center",
        alignItems: "center",
    },
    "center-center-vbox": {
        justifyContent: "center",
        alignItems: "center",
    },
    "center-center-hbox-wrap": {
        justifyContent: "center",
        alignItems: "center",
    },
    "center-center-vbox-wrap": {
        justifyContent: "center",
        alignItems: "center",
    },
    "center-hbox": {
        justifyContent: "center",
    },
    "center-hbox-wrap": {
        justifyContent: "center",
    },
    "center-vbox": {
        alignItems: "center",
    },
    "center-vbox-wrap": {
        alignItems: "center",
    },
    "left-hbox": {
        justifyContent: "flex-start",
    },
    "left-stretch-hbox": {
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    "left-stretch-hbox-wrap": {
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    "left-hbox-wrap": {
        justifyContent: "flex-start",
    },
    "left-vbox": {
        alignItems: "flex-start",
    },
    "left-vbox-wrap": {
        alignItems: "flex-start",
    },
    "left-stretch-vbox": {
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    "left-stretch-vbox-wrap": {
        justifyContent: "flex-start",
        alignItems: "stretch",
    },
    "stretch-vbox": {
        alignItems: "stretch",
    },
    "stretch-vbox-wrap": {
        alignItems: "stretch",
    },
    "right-hbox": {
        justifyContent: "flex-end",
    },
    "right-stretch-hbox": {
        justifyContent: "flex-end",
        alignItems: "stretch",
    },
    "right-hbox-wrap": {
        justifyContent: "flex-end",
    },
    "right-stretch-hbox-wrap": {
        justifyContent: "flex-end",
        alignItems: "stretch",
    },
    "right-vbox": {
        alignItems: "flex-end",
    },
    "right-vbox-wrap": {
        alignItems: "flex-end",
    },
    "right-stretch-vbox": {
        justifyContent: "flex-end",
        alignItems: "stretch",
    },
    "right-stretch-vbox-wrap": {
        justifyContent: "flex-end",
        alignItems: "stretch",
    },
    "stretch-hbox": {
        alignItems: "stretch",
    },
    "stretch-hbox-wrap": {
        alignItems: "stretch",
    },
};
