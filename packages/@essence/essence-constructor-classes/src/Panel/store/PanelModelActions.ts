import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {IChildsType} from "./PanelModel";

const FULL_WIDTH = 100;
const MIN_WIDTH = 10;

export const getInitChilds = (childs: IBuilderConfig[]) => {
    const defaultWidth = FULL_WIDTH / childs.length;
    let lastChildId = "";
    const initChilds: IChildsType = {};

    childs.forEach((item: IBuilderConfig, index: number) => {
        const width = item.width ? Number(item.width.replace(/%|px/u, "")) : defaultWidth;

        if (index === childs.length - 1) {
            lastChildId = item[VAR_RECORD_PAGE_OBJECT_ID];
        }

        initChilds[item[VAR_RECORD_PAGE_OBJECT_ID]] = {
            collapsed: width < MIN_WIDTH,
            id: item[VAR_RECORD_PAGE_OBJECT_ID],
            index,
            width: width < MIN_WIDTH ? 2 : width,
        };
    });

    const sumWidth = Object.entries(initChilds).reduce((sum, [, value]) => sum + value.width, 0);

    if (Math.ceil(sumWidth * FULL_WIDTH) / FULL_WIDTH > FULL_WIDTH) {
        Object.entries(initChilds).forEach(([key, child]) => {
            initChilds[key] = {
                ...child,
                width: defaultWidth,
            };
        });
    } else if (sumWidth < FULL_WIDTH) {
        initChilds[lastChildId].width += FULL_WIDTH - sumWidth;
    }

    return initChilds;
};
