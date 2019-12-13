import {
    IBuilderConfig,
    IClassProps,
    mapComponents,
    toColumnStyleWidth,
    toSize,
} from "@essence/essence-constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants/variables";
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
const GRID_ALIGN_CONFIGS = {
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
    "left-hbox-wrap": {
        justify: "flex-start",
    },
    "left-vbox": {
        alignItems: "flex-start",
    },
    "right-hbox": {
        justify: "flex-end",
    },
    "right-hbox-wrap": {
        justify: "flex-end",
    },
    "right-vbox": {
        alignItems: "flex-end",
    },
};
const calcStyle = (bc: IBuilderConfig) => ({
    height: bc.height ? toSize(bc.height, "") : undefined,
    maxHeight: bc.maxheight ? toSize(bc.maxheight, "100%") : undefined,
    minHeight: bc.minheight ? toSize(bc.minheight, "") : undefined,
    overflow: bc.width ? "hidden" : "none",
    ...toColumnStyleWidth(bc.width),
});

export const ToolBar: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const {contentview, align} = bc;
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
                {...((contentview && (GRID_CONFIGS as any)[contentview]) || GRID_CONFIGS.hbox)}
                {...((contentview && align && (GRID_ALIGN_CONFIGS as any)[`${align}-${contentview}`]) ||
                    GRID_ALIGN_CONFIGS["left-hbox"])}
            >
                {mapComponents(bc.childs, (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                    <Grid item style={calcStyle(childBc)} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                        <Child {...props} bc={childBc} />
                    </Grid>
                ))}
            </Grid>
        </MaterialToolbar>
    );
};
