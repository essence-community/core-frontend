// @flow
import {extendObservable, action} from "mobx";
import toString from "lodash/toString";
import {VAR_RECORD_CL_IS_MASTER} from "@essence-community/constructor-share/constants";
import {StoreBaseModel, RecordsModel} from "@essence-community/constructor-share/models";
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

        const noLoadChilds = Boolean(bc[VAR_RECORD_CL_IS_MASTER]);

        this.displayfield = bc.displayfield;
        this.valuefield = bc.valuefield;

        this.recordsStore = new RecordsModel(bc, {
            applicationStore: pageStore.applicationStore,
            noLoadChilds,
            pageStore,
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

    reloadStoreAction = action("reloadStoreAction", async (): Promise<void> => {
        if (!this.recordsStore.isLoading) {
            await this.recordsStore.loadRecordsAction();
        }
    });

    setSelectRecord = action("reloadStoreAction", (value: string): Promise<void> => {
        this.recordsStore.setSelectionAction(value, this.valuefield);
    });
}
