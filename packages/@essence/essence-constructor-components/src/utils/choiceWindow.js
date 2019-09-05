// @flow
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {type PageModelType} from "../stores/PageModel";
import {type RecordsModelType} from "../stores/RecordsModel";

/**
 * Поиск окна
 * @param {string} ckwindow формула
 * @param {Object} pageStore стор страницы
 * @param {Object} recordsStore стор Select Component
 * @returns {string} наименование окна
 */
export function choiceWindow(ckwindow: string, pageStore: PageModelType, recordsStore: RecordsModelType): string {
    const {globalValues} = pageStore;
    const record = recordsStore && recordsStore.selectedRecord;

    const getValue = (name: string) => (record && name.charAt(0) !== "g" ? record[name] : globalValues.get(name));

    return String(parseMemoize(ckwindow).runer({get: getValue}));
}
