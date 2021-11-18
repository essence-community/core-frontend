import {IBuilderConfig, IClassProps, mapComponents, toColumnStyleWidth} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {Grid, Toolbar as MaterialToolbar} from "@material-ui/core";
import * as React from "react";
import {GRID_CONFIGS, GRID_ALIGN_CONFIGS} from "@essence-community/constructor-share/constants/ui";

const calcStyle = (bc: IBuilderConfig) => ({
    height: bc.height,
    maxHeight: bc.maxheight ?? "100%",
    minHeight: bc.minheight,
    overflow: bc.width ? "hidden" : "none",
    ...toColumnStyleWidth(bc.width),
});

export const ToolBar: React.FC<IClassProps> = (props) => {
    const {bc} = props;
    const {contentview, align} = bc;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
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
