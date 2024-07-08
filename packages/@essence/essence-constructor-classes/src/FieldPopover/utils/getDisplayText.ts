import {deepFind, parseMemoize, TFunction} from "@essence-community/constructor-share/utils";
import {IFieldPopoverModel} from "../stores/FieldPopoverModel/FieldPopoverModel.types";

export function getDisplayText(store: IFieldPopoverModel, trans: TFunction): string {
    if (store.selectedRecord && store.bc.displayfield) {
        const [isExistDisplay, display] = deepFind(store.selectedRecord, store.bc.displayfield);
        const label = isExistDisplay
            ? display
            : parseMemoize(store.bc.displayfield).runer({
                  get: (name: string) => {
                      return store.bc.localization
                          ? trans(
                                `${store.bc.localization}:${trans(
                                    store.selectedRecord[name],
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
