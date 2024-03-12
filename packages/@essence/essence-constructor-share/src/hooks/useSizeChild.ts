import * as React from "react";
import {IBuilderConfig} from "../types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {toColumnStyleWidthBc} from "../utils/transform";

export function useSizeChild(childs: IBuilderConfig[] = []): [IBuilderConfig[], Record<string, any>] {
    return React.useMemo(
        () => [
            childs.map((childBc, index) => ({
                ...childBc,
                [VAR_RECORD_PAGE_OBJECT_ID]: childBc[VAR_RECORD_PAGE_OBJECT_ID] || `${index}`,
                height: childBc.height && childBc.height.endsWith("px") ? childBc.height : undefined,
                maxheight: childBc.maxheight && childBc.maxheight.endsWith("px") ? childBc.maxheight : undefined,
                maxwidth: childBc.maxwidth && childBc.maxwidth.endsWith("px") ? childBc.maxwidth : undefined,
                minheight: childBc.minheight && childBc.minheight.endsWith("px") ? childBc.minheight : undefined,
                minwidth: childBc.minwidth && childBc.minwidth.endsWith("px") ? childBc.minwidth : undefined,
                width: childBc.width && childBc.width.endsWith("px") ? childBc.width : undefined,
            })),
            childs.reduce((res, childBc, index) => {
                res[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] = {
                    height: childBc.height,
                    maxHeight: childBc.maxheight ?? "100%",
                    minHeight: childBc.minheight,
                    ...toColumnStyleWidthBc(childBc),
                };

                return res;
            }, {} as Record<string, any>),
        ],
        [childs],
    );
}
