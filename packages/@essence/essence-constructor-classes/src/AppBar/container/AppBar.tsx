import {IBuilderConfig, IClassProps, mapComponents, toColumnStyleWidth} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
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

const calcStyleHeight = (bc: IBuilderConfig) => ({
    height: bc.height,
    maxHeight: bc.maxheight ?? "100%",
    minHeight: bc.minheight,
});

const calcStyle = (bc: IBuilderConfig) => ({
    overflow: bc.width ? "hidden" : "none",
    ...toColumnStyleWidth(bc.width),
});

export const AppBar: React.FC<IClassProps> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
            padding: bc.contentview && bc.contentview.startsWith("hbox") ? "0 5px" : undefined,
            ...toColumnStyleWidth(bc.width),
        }),
        [bc.height, bc.maxheight, bc.minheight, bc.contentview, bc.width],
    );
    const contentGridHeightStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
        }),
        [bc.height, bc.maxheight, bc.minheight],
    );
    const position: any = React.useMemo(() => bc.position || "relative", [bc.position]);
    const uitype = React.useMemo(() => bc.uitype || "1", [bc.uitype]);
    const contentview = React.useMemo(() => bc.contentview || "hbox", [bc.contentview]);

    return (
        <MaterialAppBar classes={classes} color={(colors as any)[uitype]} position={position} style={contentStyle}>
            <div style={contentGridHeightStyle}>
                <Grid
                    container
                    justify="flex-start"
                    alignContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    {...(GRID_CONFIGS as any)[contentview]}
                >
                    {mapComponents(
                        bc.childs || [],
                        (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                            <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} style={calcStyle(childBc)}>
                                <div style={calcStyleHeight(childBc)}>
                                    <Child {...props} bc={childBc} />
                                </div>
                            </Grid>
                        ),
                    )}
                </Grid>
            </div>
        </MaterialAppBar>
    );
};
