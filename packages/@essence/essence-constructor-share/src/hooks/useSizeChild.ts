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
    isChildren?: boolean,
): [IBuilderConfig[], Record<string, React.CSSProperties>] {
    const [hidden, setHidden] = React.useState<Record<string, boolean>>({});
    const getValue = useGetValue({pageStore});

    React.useEffect(() => {
        if (isChildren) {
            return;
        }

        return reaction(
            () => childs.reduce((res, childBc, index) => {
                res[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] = isHidden(childBc, getValue) ||
                    (childBc.type === "IFIELD" && childBc.datatype === "hidden") ||
                    childBc.type === "COLUMN" ||
                    (childBc.type === "SERVICE_HIDDEN");

                return res;
            }, {} as Record<string, boolean>),
            setHidden,
            {
                fireImmediately: true,
            }
        );
    }, [childs, getValue, isChildren]);

    const style = React.useMemo(() => {
        const heightPreciseChilds = {} as Record<string, string>;
        const widthPreciseChilds = {} as Record<string, string>;
        const viewChilds = childs.filter((childBc) => !hidden[childBc[VAR_RECORD_PAGE_OBJECT_ID]]);
        const calcChilds = viewChilds
            .reduce((res, child) => {
                if (child.height && child.height.endsWith("%")) {
                    res.height += parseInt(child.height.replace("%", ""), 10);
                }
                if (child.width && child.width.endsWith("%")) {
                    res.width += parseInt(child.width.replace("%", ""), 10);
                }

                return res;
            }, {height: 0, width: 0} as {height: number, width: number});

        if (calcChilds.height > 0 && calcChilds.height < 100) {
            const notPreciseChilds = viewChilds.filter((child) => !child.height).length;
            const count = 100 - calcChilds.height;
            const height = count / notPreciseChilds;

            viewChilds.forEach((child) => {
                if (!child.height) {
                    heightPreciseChilds[child[VAR_RECORD_PAGE_OBJECT_ID]] = height + "%";
                }
            });
        }
        if (calcChilds.width > 0 && calcChilds.width < 100) {
            const notPreciseChilds = viewChilds.filter((child) => !child.width).length;
            const count = 100 - calcChilds.width;
            const width = count / notPreciseChilds;

            viewChilds.forEach((child) => {
                if (!child.width) {
                    widthPreciseChilds[child[VAR_RECORD_PAGE_OBJECT_ID]] = width + "%";
                }
            });
        }

        return childs.reduce((res, childBc, index) => {
            res[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] = {
                display: hidden[childBc[VAR_RECORD_PAGE_OBJECT_ID] || index] ? "none" : undefined,
                height: widthPreciseChilds[childBc[VAR_RECORD_PAGE_OBJECT_ID]] || childBc.height,
                maxHeight: childBc.maxheight ?? "100%",
                minHeight: childBc.minheight,
                ...toColumnStyleWidthBc({
                    ...childBc,
                    width: `calc(${widthPreciseChilds[childBc[VAR_RECORD_PAGE_OBJECT_ID]] || childBc.width} - 8px)`
                }),
            };

            return res;
        }, {} as Record<string, React.CSSProperties>);
    },
        [childs, hidden]
    );

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
