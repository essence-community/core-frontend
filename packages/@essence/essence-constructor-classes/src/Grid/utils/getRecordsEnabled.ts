import {IBuilderConfig, IRecordsModel, IPageModel, IRecord} from "@essence-community/constructor-share/types";
import {parse} from "@essence-community/constructor-share/utils/parser";

export function getRecordsEnabled(bc: IBuilderConfig, recordsStore: IRecordsModel, pageStore: IPageModel): IRecord[] {
    if (bc.disabledrules) {
        const {runer} = parse(bc.disabledrules);

        return recordsStore.records.filter(
            (record) =>
                !runer({
                    get: (name: string) =>
                        record && name.charAt(0) !== "g" ? record[name] : pageStore.globalValues.get(name),
                }),
        );
    }

    return recordsStore.records;
}
