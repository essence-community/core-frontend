import * as React from "react";
import {reaction} from "mobx";
import {IBuilderConfig, IPageModel} from "../types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {toColumnStyleWidthBc} from "../utils/transform";
import {useGetValue} from "./useCommon/useGetValue";
import {isHidden} from "./useCommon/isHidden";


export function useSizeChild(
    childs: IBuilderConfig[] = [],
    pageStore: IPageModel,
): [IBuilderConfig[], Record<string, React.CSSProperties>] {
    const [style, setStyle] = React.useState({});
    const getValue = useGetValue({pageStore});

    React.useEffect(() => {
        return reaction(
            () => childs.reduce((res, childBc, index) => {
                res[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] = {
                    display: isHidden(childBc, getValue) ? "none" : undefined,
                    height: childBc.height,
                    maxHeight: childBc.maxheight ?? "100%",
                    minHeight: childBc.minheight,
                    ...toColumnStyleWidthBc(childBc),
                };

                return res;
            }, {} as Record<string, React.CSSProperties>),
            setStyle,
            {
                fireImmediately: true,
            }
        );
    }, [childs, getValue]);

    const memoizedChilds = React.useMemo(
        () =>
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
        [childs],
    );

    return [memoizedChilds, style];
}
