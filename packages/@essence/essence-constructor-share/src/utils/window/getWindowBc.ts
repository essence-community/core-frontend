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

    if (ckwindow) {
        ckwindow = choiceWindow(ckwindow, pageStore, btnBc, parentStore, parentStore?.recordsStore);
    }

    if (btnBc.childwindow) {
        windowBc = btnBc.childwindow.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    if (!windowBc && bc && bc.childwindow) {
        windowBc = bc.childwindow.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    if (!windowBc && pageStore?.pageBc) {
        windowBc = pageStore.pageBc.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    if (!windowBc && pageStore?.applicationStore?.bc?.childs) {
        windowBc = pageStore.applicationStore.bc.childs.find(
            (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === ckwindow,
        );
    }

    return windowBc;
}
