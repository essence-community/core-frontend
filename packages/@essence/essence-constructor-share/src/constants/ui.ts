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
    "center-hbox": {
        justify: "center",
    },
    "center-hbox-wrap": {
        justify: "center",
    },
    "center-vbox": {
        alignItems: "center",
    },
    "left-hbox": {
        justify: "flex-start",
    },
    "left-stretch-hbox": {
        justify: "flex-start",
        alignItems: "stretch",
    },
    "left-hbox-wrap": {
        justify: "flex-start",
    },
    "left-vbox": {
        alignItems: "flex-start",
    },
    "stretch-vbox": {
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
    "right-vbox": {
        alignItems: "flex-end",
    },
    "stretch-hbox": {
        alignItems: "stretch",
    },
};
