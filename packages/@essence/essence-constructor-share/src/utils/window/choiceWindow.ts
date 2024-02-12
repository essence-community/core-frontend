import {VAR_RECORD_PAGE_OBJECT_ID} from "../../constants";
import {IBuilderConfig, IPageModel, IRecordsModel, IStoreBaseModel} from "../../types";
import {parseMemoize} from "../parser";

/**
 * Find window
 */
export function choiceWindow(
    ckwindow: string,
    pageStore: IPageModel,
    btnBc: IBuilderConfig,
    parentStore?: IStoreBaseModel,
    recordsStore?: IRecordsModel,
): string {
    const {globalValues} = pageStore;
    const {bc} = parentStore || {};
    const record = recordsStore && recordsStore.selectedRecord;

    const getValue = (name: string) => {
        let windowBc = undefined;

        if (btnBc.childwindow) {
            windowBc = btnBc.childwindow.find(
                (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === name,
            );
        }

        if (!windowBc && bc && bc.childwindow) {
            windowBc = bc.childwindow.find(
                (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === name,
            );
        }

        if (!windowBc && pageStore?.pageBc) {
            windowBc = pageStore.pageBc.find(
                (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === name,
            );
        }

        if (!windowBc && pageStore?.applicationStore?.bc?.childs) {
            windowBc = pageStore.applicationStore.bc.childs.find(
                (childwindow) => (childwindow.ckwindow || childwindow[VAR_RECORD_PAGE_OBJECT_ID]) === name,
            );
        }

        if (windowBc) {
            return name;
        }

        return typeof name === "string" && name.charAt(0) === "g"
            ? globalValues.get(name)
            : (typeof record === "object" ? record : {})[name];
    };

    return String(parseMemoize(ckwindow).runer({get: getValue}));
}
