// @flow
import reduce from "lodash/reduce";
import forEach from "lodash/forEach";
import {type ItemType, type ChildsType} from "./PanelModel";

const FULL_WIDTH = 100;

export const getInitChilds = (childs: Array<Object>) => {
    const defaultWidth = FULL_WIDTH / childs.length;
    let lastChildId = "";
    const initChilds: ChildsType = {};

    childs.forEach((item: Object, index: number) => {
        if (index === childs.length - 1) {
            lastChildId = item.ckPageObject;
        }
        initChilds[item.ckPageObject] = {
            id: item.ckPageObject,
            index,
            width: item.width ? Number(item.width.replace(/%|px/, "")) : defaultWidth,
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
