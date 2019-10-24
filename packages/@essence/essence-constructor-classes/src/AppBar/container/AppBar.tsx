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

const calcStyle = (bc: IBuilderConfig) => ({
    height: bc.height ? toSize(bc.height, "") : undefined,
    maxHeight: bc.maxheight ? toSize(bc.maxheight, "100%") : undefined,
    minHeight: bc.minheight ? toSize(bc.minheight, "") : undefined,
    overflow: bc.width ? "hidden" : "none",
    ...toColumnStyleWidth(bc.width),
});

export const AppBar: React.FC<IClassProps> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height ? toSize(bc.height, "") : undefined,
            maxHeight: bc.maxheight ? toSize(bc.maxheight, "100%") : undefined,
            minHeight: bc.minheight ? toSize(bc.minheight, "") : undefined,
            padding: bc.contentview && bc.contentview.startsWith("hbox") ? "0 5px" : undefined,
            ...toColumnStyleWidth(bc.width),
        }),
        [bc.height, bc.maxheight, bc.minheight, bc.contentview, bc.width],
    );
    const position: any = React.useMemo(() => bc.position || "relative", [bc.position]);

    return (
        <MaterialAppBar
            classes={classes}
            color={colors[bc.uitype] || "static"}
            position={position}
            style={contentStyle}
        >
            <Grid
                container
                justify="flex-start"
                alignContent="center"
                direction="column"
                alignItems="center"
                spacing={1}
                {...(GRID_CONFIGS[bc.contentview] || GRID_CONFIGS.hbox)}
            >
                {mapComponents(bc.childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                    <Grid item style={calcStyle(childBc)} key={childBc.ckPageObject}>
                        <Child {...props} bc={childBc} />
                    </Grid>
                ))}
            </Grid>
        </MaterialAppBar>
    );
};
