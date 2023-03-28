/* eslint-disable sort-keys */
import {GridProps} from "@material-ui/core";

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
        justify: "center",
        alignItems: "center",
    },
    "center-center-vbox": {
        justify: "center",
        alignItems: "center",
    },
    "center-center-hbox-wrap": {
        justify: "center",
        alignItems: "center",
    },
    "center-center-vbox-wrap": {
        justify: "center",
        alignItems: "center",
    },
    "center-hbox": {
        justify: "center",
    },
    "center-hbox-wrap": {
        justify: "center",
    },
    "center-vbox": {
        alignItems: "center",
    },
    "center-vbox-wrap": {
        alignItems: "center",
    },
    "left-hbox": {
        justify: "flex-start",
    },
    "left-stretch-hbox": {
        justify: "flex-start",
        alignItems: "stretch",
    },
    "left-stretch-hbox-wrap": {
        justify: "flex-start",
        alignItems: "stretch",
    },
    "left-hbox-wrap": {
        justify: "flex-start",
    },
    "left-vbox": {
        alignItems: "flex-start",
    },
    "left-vbox-wrap": {
        alignItems: "flex-start",
    },
    "left-stretch-vbox": {
        justify: "flex-start",
        alignItems: "stretch",
    },
    "left-stretch-vbox-wrap": {
        justify: "flex-start",
        alignItems: "stretch",
    },
    "stretch-vbox": {
        alignItems: "stretch",
    },
    "stretch-vbox-wrap": {
        alignItems: "stretch",
    },
    "right-hbox": {
        justify: "flex-end",
    },
    "right-stretch-hbox": {
        justify: "flex-end",
        alignItems: "stretch",
    },
    "right-hbox-wrap": {
        justify: "flex-end",
    },
    "right-stretch-hbox-wrap": {
        justify: "flex-end",
        alignItems: "stretch",
    },
    "right-vbox": {
        alignItems: "flex-end",
    },
    "right-vbox-wrap": {
        alignItems: "flex-end",
    },
    "right-stretch-vbox": {
        justify: "flex-end",
        alignItems: "stretch",
    },
    "right-stretch-vbox-wrap": {
        justify: "flex-end",
        alignItems: "stretch",
    },
    "stretch-hbox": {
        alignItems: "stretch",
    },
    "stretch-hbox-wrap": {
        alignItems: "stretch",
    },
};
