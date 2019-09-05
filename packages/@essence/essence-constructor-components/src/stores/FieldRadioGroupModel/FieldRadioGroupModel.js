// @flow
import {extendObservable, action} from "mobx";
import camelCase from "lodash/camelCase";
import toString from "lodash/toString";
import {RecordsModel, type RecordsModelType} from "../RecordsModel";
import {StoreBaseModel} from "../StoreBaseModel/StoreBaseModel";
import {
    type RadioConstructorType,
    type RadioSuggestionsType,
    type RadioSuggestionType,
    type FieldRadioGroupModelInterface,
} from "./FieldRadioGroupModelType";

export class FieldRadioGroupModel extends StoreBaseModel implements FieldRadioGroupModelInterface {
    name = "radiogroup";

    displayfield: string;

    valuefield: string;

    recordsStore: RecordsModelType;

    suggestions: RadioSuggestionsType;

    constructor({bc, pageStore}: RadioConstructorType) {
        super({bc, pageStore});

        const noLoadChilds = Boolean(bc.clIsMaster);

        this.displayfield = camelCase(bc.displayfield);
        this.valuefield = camelCase(bc.valuefield);

        this.recordsStore = new RecordsModel(bc, pageStore, {
            noLoadChilds,
            valueField: this.valuefield,
        });

        extendObservable(this, {
            get suggestions() {
                return this.recordsStore.records.map(this.getSuggestion);
            },
        });
    }

    getSuggestion = (record: Object): RadioSuggestionType => ({
        label: toString(record[this.displayfield]),
        value: toString(record[this.valuefield]),
    });

    reloadStoreAction = action(
        "reloadStoreAction",
        async (): Promise<void> => {
            if (!this.recordsStore.isLoading) {
                await this.recordsStore.loadRecordsAction();
            }
        },
    );
}
