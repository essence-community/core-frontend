import {
    IBuilderConfig,
    IClassProps,
    mapComponents,
    toColumnStyleWidth,
    toSize,
} from "@essence/essence-constructor-share";
import {Grid, Toolbar as MaterialToolbar} from "@material-ui/core";
import * as React from "react";

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
const calcStyle = (bc: IBuilderConfig) => ({
    height: bc.height ? toSize(bc.height, "") : undefined,
    maxHeight: bc.maxheight ? toSize(bc.maxheight, "100%") : undefined,
    minHeight: bc.minheight ? toSize(bc.minheight, "") : undefined,
    ...toColumnStyleWidth(bc.width),
});

export const ToolBar: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height ? toSize(bc.height, "") : undefined,
            maxHeight: bc.maxheight ? toSize(bc.maxheight, "100%") : undefined,
            minHeight: bc.minheight ? toSize(bc.minheight, "") : undefined,
            ...toColumnStyleWidth(bc.width),
        }),
        [bc.height, bc.maxheight, bc.minheight, bc.width],
    );

    return (
        <MaterialToolbar>
            <Grid
                container
                spacing={1}
                style={contentStyle}
                justify="flex-start"
                alignItems="center"
                {...(GRID_CONFIGS[bc.contentview] || GRID_CONFIGS.hbox)}
            >
                {mapComponents(bc.childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                    <Grid item style={calcStyle(childBc)} key={childBc.ckPageObject}>
                        <Child {...props} bc={childBc} />
                    </Grid>
                ))}
            </Grid>
        </MaterialToolbar>
    );
};
