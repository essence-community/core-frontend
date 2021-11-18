/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {action, computed} from "mobx";
import {VAR_RECORD_CL_IS_MASTER, VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
import {
    IRecordsModel,
    IStoreBaseModelProps,
    IStoreBaseModel,
    IRecord,
    FieldValue,
} from "@essence-community/constructor-share/types";
import {IParseReturnType, parseMemoize} from "@essence-community/constructor-share/utils/parser";
import {deepFind} from "@essence-community/constructor-share/utils";
import {toString} from "../utils";
import {ISuggestion} from "../FieldRadio.types";

export class FieldRadioModel extends StoreBaseModel implements IStoreBaseModel {
    recordsStore: IRecordsModel;

    valuefield: string;

    parserLabel?: IParseReturnType;

    constructor({bc, pageStore}: IStoreBaseModelProps) {
        super({bc, pageStore});

        if (this.bc.displayfield) {
            try {
                this.parserLabel = parseMemoize(this.bc.displayfield);
            } catch (e) {}
        }

        const noLoadChilds = Boolean(bc[VAR_RECORD_CL_IS_MASTER]);

        this.valuefield = this.bc.valuefield?.[0]?.in || bc.idproperty || VAR_RECORD_ID;

        this.recordsStore = new RecordsModel(bc, {
            applicationStore: pageStore.applicationStore,
            noLoadChilds,
            pageStore,
            valueField: this.valuefield,
        });
    }

    @computed get suggestions() {
        return this.recordsStore.records.map(this.getSuggestion);
    }

    @computed get selectedRecord() {
        return this.recordsStore.selectedRecord;
    }

    getSuggestion = (record: IRecord): ISuggestion => {
        const [isExistForm, resForm] = deepFind(record, this.valuefield);
        const [isExistDisplay, display] = deepFind(record, this.bc.displayfield);
        const label = isExistDisplay
            ? toString(display)
            : (this.parserLabel?.runer({
                  get: (name: string) => {
                      return toString(record[name] || "");
                  },
              }) as string) || toString(record[this.bc.displayfield]);

        return {
            label,
            value: isExistForm ? toString(resForm) : toString(record[this.valuefield]),
        };
    };

    @action
    reloadStoreAction = async () => {
        if (!this.recordsStore.isLoading) {
            await this.recordsStore.loadRecordsAction({});
        }

        return undefined;
    };

    @action
    setSelectRecord = (value: FieldValue) => {
        this.recordsStore.setSelectionAction(value, this.valuefield);
    };
}
