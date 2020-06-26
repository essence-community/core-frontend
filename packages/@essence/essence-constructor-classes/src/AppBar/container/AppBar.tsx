import * as React from "react";
import {
    IClassProps,
    mapComponents,
    toColumnStyleWidth,
    IBuilderConfig,
    GRID_CONFIGS,
} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {AppBar as MaterialAppBar, Grid, AppBarProps as MUIAppBarProps} from "@material-ui/core";
import {IBuilderClassConfig} from "../types";
import {useStyles} from "./AppBar.styles";

const colors: Record<IBuilderClassConfig["uitype"], MUIAppBarProps["color"]> = {
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

/**
 * Отображения навигационной панели
 * @see {@link https://material-ui.com/components/app-bar/#app-bar|AppBar}
 * @since 2.5
 */
export const AppBar: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            padding: bc.contentview && bc.contentview.startsWith("hbox") ? "0 5px" : undefined,
            ...toColumnStyleWidth(bc.width),
        }),
        [bc.height, bc.contentview, bc.width],
    );

    return (
        <MaterialAppBar classes={classes} color={colors[bc.uitype]} position={bc.position} style={contentStyle}>
            <div style={{height: bc.height}}>
                <Grid
                    container
                    justify="flex-start"
                    alignContent="center"
                    direction="column"
                    alignItems="center"
                    spacing={1}
                    {...GRID_CONFIGS[bc.contentview]}
                >
                    {mapComponents(bc.childs, (Child, childBc) => (
                        <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} style={calcStyle(childBc)}>
                            <div style={calcStyleHeight(childBc)}>
                                <Child {...props} bc={childBc} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </MaterialAppBar>
    );
};
