import {declension, deepFind, parseMemoize, TFunction} from "@essence-community/constructor-share/utils";
import {IFieldTableModel} from "../stores/FieldTableModel/FieldTableModel.types";

export function getDisplayText(store: IFieldTableModel, trans: TFunction): string {
    if (store.bc.collectionvalues === "array") {
        const selCount = store.selectedEntries?.length ?? 0;

        return selCount
            ? `${declension(selCount, [
                  trans("static:e28e56d7b12e4ea2b7663b3e66473b9e"),
                  trans("static:783922ac8cf84a5eac8d1b17c77de544"),
                  trans("static:783922ac8cf84a5eac8d1b17c77de544"),
              ])}  ${selCount} ${declension(selCount, [
                  trans("static:0cd9a67ed46d4d70959182cc6260b221"),
                  trans("static:87acd17f8ae243798e97549a5761cfaf"),
                  trans("static:2485088fda3d4d9cb5de9c25534cdf23"),
              ])}`
            : "";
    }

    if (store.selectedRecord && store.bc.displayfield) {
        const [isExistDisplay, display] = deepFind(store.selectedRecord, store.bc.displayfield);
        const label = isExistDisplay
            ? display
            : parseMemoize(store.bc.displayfield).runer({
                  get: (name: string) => {
                      return store.bc.localization
                          ? trans(
                                `${store.bc.localization}:${trans(
                                    store.selectedRecord[name] as string,
                                    store.selectedRecord[name] as string,
                                )}`,
                                store.selectedRecord[name] as string,
                            ) || ""
                          : store.selectedRecord[name] || "";
                  },
              });

        if (store.bc.localization && label) {
            return trans(`${store.bc.localization}:${label}`, label as string);
        }

        return label ? String(label) : "";
    }

    return "";
}
