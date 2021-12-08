import {IBuilderConfig, IPageModel, IStoreBaseModel} from "../../types";
import {VAR_RECORD_PAGE_OBJECT_ID} from "../../constants";
import {choiceWindow} from "./choiceWindow";

export function getWindowBc(
    btnBc: IBuilderConfig,
    pageStore: IPageModel,
    parentStore?: IStoreBaseModel,
): IBuilderConfig | undefined {
    const {bc} = parentStore || {};
    let windowBc = undefined;
    let {ckwindow} = btnBc;

    if (ckwindow && ckwindow.indexOf("\x22") > -1) {
        ckwindow = choiceWindow(ckwindow, pageStore, parentStore?.recordsStore);
    }

    if (btnBc.childwindow) {
        windowBc = btnBc.childwindow.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    if (bc && bc.childwindow) {
        windowBc = bc.childwindow.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    return windowBc;
}
