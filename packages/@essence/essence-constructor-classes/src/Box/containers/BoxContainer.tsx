import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {toColumnStyleWidthBc} from "@essence-community/constructor-share/utils/transform";
import {IClassProps} from "@essence-community/constructor-share/types";
import {GRID_CONFIGS, GRID_ALIGN_CONFIGS} from "@essence-community/constructor-share/constants/ui";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

const DEFAULT_SPACING = 1;
const MAX_PANEL_WIDTH = 12;

export const BoxContainer: React.FC<IClassProps> = (props) => {
    const {children, bc} = props;
    const {contentview, align} = bc;
    const gridSpacing = DEFAULT_SPACING;
    const isRow = contentview === "hbox" || contentview === "hbox-wrap";
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
            ...toColumnStyleWidthBc(bc),
        }),
        [bc],
    );
    const [childs, sizeChild] = React.useMemo(
        () => [
            (bc.childs || []).map((childBc, index) => ({
                ...childBc,
                [VAR_RECORD_PAGE_OBJECT_ID]: childBc[VAR_RECORD_PAGE_OBJECT_ID] || `${index}`,
                height: childBc.height ? "100%" : undefined,
                maxheight: childBc.maxheight ? "100%" : undefined,
                maxwidth: childBc.maxwidth ? "100%" : undefined,
                minheight: childBc.minheight ? "100%" : undefined,
                minwidth: childBc.minwidth ? "100%" : undefined,
                width: childBc.width ? "100%" : undefined,
            })),
            (bc.childs || []).reduce((res, childBc, index) => {
                res[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] = {
                    height: childBc.height,
                    maxHeight: childBc.maxheight ?? "100%",
                    minHeight: childBc.minheight,
                    ...toColumnStyleWidthBc(childBc),
                };

                return res;
            }, {}),
        ],
        [bc],
    );

    return (
        <Grid
            container
            spacing={gridSpacing}
            style={contentStyle}
            {...((contentview && GRID_CONFIGS[contentview]) || GRID_CONFIGS.vbox)}
            {...((contentview && align && GRID_ALIGN_CONFIGS[`${align}-${contentview}`]) ||
                GRID_ALIGN_CONFIGS["left-stretch-vbox"])}
        >
            {children
                ? children
                : mapComponents(childs, (Child, childBc) => (
                      <Grid
                          item
                          key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                          xs={isRow ? true : MAX_PANEL_WIDTH}
                          zeroMinWidth
                          style={sizeChild[childBc[VAR_RECORD_PAGE_OBJECT_ID]]}
                      >
                          <Child {...props} bc={childBc} />
                      </Grid>
                  ))}
        </Grid>
    );
};
