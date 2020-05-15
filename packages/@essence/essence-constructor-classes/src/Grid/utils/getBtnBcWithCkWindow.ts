import {IBuilderConfig} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

export function getBtnBcWithCkWindow(gridbc: IBuilderConfig, btnBc: IBuilderConfig): IBuilderConfig {
    if (btnBc.ckwindow) {
        return btnBc;
    }
    const ckWindow = gridbc.childwindow?.[0]?.ckwindow;
    const ckWindowObject = gridbc.childwindow?.[0]?.[VAR_RECORD_PAGE_OBJECT_ID];

    return {
        ...btnBc,
        ckwindow: ckWindow || ckWindowObject,
    };
}
