// @flow
import reduce from "lodash/reduce";
import forEach from "lodash/forEach";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {type ItemType, type ChildsType} from "./PanelModel";

const FULL_WIDTH = 100;
const MIN_WIDTH = 10;

export const getInitChilds = (childs: Array<Object>) => {
    const defaultWidth = FULL_WIDTH / childs.length;
    let lastChildId = "";
    const initChilds: ChildsType = {};

    childs.forEach((item: Object, index: number) => {
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

    const sumWidth = reduce(initChilds, (acc, child) => acc + child.width, 0);

    if (Math.ceil(sumWidth * FULL_WIDTH) / FULL_WIDTH > FULL_WIDTH) {
        forEach(initChilds, (child: ItemType, key: string) => {
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
