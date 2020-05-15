import {IPageModel, IRecordsModel} from "../../types";
import {parseMemoize} from "../parser";

/**
 * Find window
 */
export function choiceWindow(ckwindow: string, pageStore: IPageModel, recordsStore?: IRecordsModel): string {
    const {globalValues} = pageStore;
    const record = recordsStore && recordsStore.selectedRecord;

    const getValue = (name: string) => (record && name.charAt(0) !== "g" ? record[name] : globalValues.get(name));

    return String(parseMemoize(ckwindow).runer({get: getValue}));
}
