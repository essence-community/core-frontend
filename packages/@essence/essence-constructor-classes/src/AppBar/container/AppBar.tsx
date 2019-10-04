import {
    IBuilderConfig,
    IClassProps,
    mapComponents,
    toColumnStyleWidth,
    toSize,
} from "@essence/essence-constructor-share";
import {AppBar as MaterialAppBar, Grid} from "@material-ui/core";
import * as React from "react";
import {useStyles} from "./AppBar.styles";

const GRID_CONFIGS = {
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

const colors = {
    1: "primary",
    2: "secondary",
    3: "default",
    4: "inherit",
};

export const AppBar: React.FC<IClassProps> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const contentStyle = {
        height: bc.height ? toSize(bc.height, "") : undefined,
        maxHeight: bc.maxheight ? toSize(bc.maxheight, "100%") : undefined,
        minHeight: bc.minheight ? toSize(bc.minheight, "") : undefined,
        ...toColumnStyleWidth(bc.width),
    };

    return (
        <MaterialAppBar
            classes={classes}
            color={colors[bc.uitype] || "static"}
            position={bc.position || "relative"}
            style={contentStyle}
        >
            <Grid
                container
                justify="flex-start"
                alignItems="center"
                alignContent="center"
                spacing={0}
                {...GRID_CONFIGS[bc.contentview] || GRID_CONFIGS.hbox}
            >
                {mapComponents(bc.childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                    <Child {...props} bc={childBc} />
                ))}
            </Grid>
        </MaterialAppBar>
    );
};
