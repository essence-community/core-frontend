/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {action, computed, makeObservable} from "mobx";
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
import {deepChange, deepFind} from "@essence-community/constructor-share/utils";
import {IField} from "@essence-community/constructor-share/Form";
import {toString} from "../utils";
import {ISuggestion} from "../FieldRadio.types";

interface IFieldRadioModelProps extends IStoreBaseModelProps {
    field: IField;
}

export class FieldRadioModel extends StoreBaseModel implements IStoreBaseModel {
    recordsStore: IRecordsModel;

    valuefield: string;

    parserLabel?: IParseReturnType;

    field: IField;

    constructor({bc, pageStore, field}: IFieldRadioModelProps) {
        super({bc, pageStore});
        this.field = field;

        if (this.bc.displayfield) {
            try {
                this.parserLabel = parseMemoize(this.bc.displayfield);
            } catch (e) {}
        }

        const noLoadChilds = Boolean(bc[VAR_RECORD_CL_IS_MASTER]);

        this.valuefield =
            this.bc.valuefield?.reduce(
                (res, val) => (res ? res : !val.out || val.out === this.bc.column ? val.in : res),
                "",
            ) ||
            this.bc.valuefield?.[0]?.in ||
            bc.idproperty ||
            VAR_RECORD_ID;

        this.recordsStore = new RecordsModel(bc, {
            applicationStore: pageStore.applicationStore,
            noLoadChilds,
            pageStore,
            valueField: this.valuefield,
        });
        makeObservable(this);
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
            await this.recordsStore.loadRecordsAction();
        }

        return undefined;
    };

    @action
    public clearStoreAction = () => this.recordsStore.clearChildsStoresAction();

    @action
    setSelectRecord = async (value: FieldValue) => {
        await this.recordsStore.setSelectionAction(value, this.valuefield);
        if (this.bc.valuefield && this.bc.valuefield.length > 1) {
            const patchValues: IRecord = {};
            let parentKey = "";

            if (this.field.key.indexOf(".") > -1) {
                const arrKey = this.field.key.split(".");

                parentKey = arrKey.slice(0, arrKey.length - 1).join(".");
            }

            this.bc.valuefield.forEach(({in: fieldName, out}) => {
                const valueField = out || this.bc.column;

                deepChange(
                    patchValues,
                    `${parentKey ? `${parentKey}.` : ""}${valueField}`,
                    deepFind(this.recordsStore.selectedRecord, fieldName)[1],
                );
            });

            this.field.form.patch(patchValues, true);
        }
    };
}
