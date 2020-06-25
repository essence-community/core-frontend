import {IStoreBaseModelProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {
    VAR_RECORD_QUERY_ID,
    VALUE_SELF_ALWAYSFIRST,
    VAR_RECORD_CK_NSI_ADR_OBJECTS,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CV_REGION,
    VAR_RECORD_CK_REGION,
    VAR_RECORD_CV_AREA,
    VAR_RECORD_CK_AREA,
    VAR_RECORD_CV_STREET,
    VAR_RECORD_CK_STREET,
    VAR_RECORD_CV_HOUSE,
    VAR_RECORD_CK_HOUSE,
    VAR_RECORD_ID,
    VAR_RECORD_CK_MO,
} from "@essence-community/constructor-share/constants";
import {action, computed} from "mobx";
import {IForm} from "@essence-community/constructor-share/Form";
import {getFieldMoConfig} from "../utils";
import {IFieldMultiModel, FieldMultiModel} from "./FieldMultiModel";

export class FieldMultiMoModel extends FieldMultiModel implements IFieldMultiModel {
    constructor(props: IStoreBaseModelProps) {
        super({
            ...props,
            bc: {
                ...props.bc,
                [VAR_RECORD_QUERY_ID]: "jNSIGetAddrByMO",
                defaultvalue: VALUE_SELF_ALWAYSFIRST,
                orderdirection: undefined,
                orderproperty: "",
            },
        });
    }

    @computed get displayText() {
        // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
        const displayfield = (this.bc.displayfield || "").replace(/{(\w+)}/g, (match, pattern) => `{${pattern}}`);
        const {selectedRecord} = this;

        return selectedRecord
            ? // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
              displayfield.replace(/{([A-z]+)}/g, (match, pattern) => {
                  const value = selectedRecord[pattern];

                  if (typeof value === "string" || typeof value === "number") {
                      return String(value);
                  }

                  return "";
              })
            : "";
    }

    @action
    searchRecordAction = (value: string | number) => this.recordsStore.searchAction({[VAR_RECORD_CK_MO]: value});

    @action
    // eslint-disable-next-line max-statements, complexity
    fillActiveRecordAction = async (form: IForm, configs: IBuilderConfig[]) => {
        const [bcRegion, bcArea, bcStreet, bcHouse, bcMO] = configs;
        const selectedRecord = this.selectedRecord || {};

        const recordsStoreRegion = this.pageStore.stores.get(bcRegion[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreArea = this.pageStore.stores.get(bcArea[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreStreet = this.pageStore.stores.get(bcStreet[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreHouse = this.pageStore.stores.get(bcHouse[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreMO = this.pageStore.stores.get(bcMO[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const regionField = form.select(VAR_RECORD_CK_REGION);
        const areaField = form.select(VAR_RECORD_CK_AREA);
        const streetField = form.select(VAR_RECORD_CK_STREET);
        const houseField = form.select(VAR_RECORD_CK_HOUSE);
        const idField = form.select(VAR_RECORD_ID);

        if (
            regionField === undefined ||
            areaField === undefined ||
            streetField === undefined ||
            houseField === undefined ||
            idField === undefined ||
            recordsStoreRegion === undefined ||
            recordsStoreArea === undefined ||
            recordsStoreStreet === undefined ||
            recordsStoreHouse === undefined ||
            recordsStoreMO === undefined ||
            bcRegion.queryparam === undefined ||
            bcArea.queryparam === undefined ||
            bcStreet.queryparam === undefined ||
            bcHouse.queryparam === undefined
        ) {
            return false;
        }

        this._isLoading = true;

        await recordsStoreRegion.searchAction({[bcRegion.queryparam]: selectedRecord[VAR_RECORD_CV_REGION]});

        if (!recordsStoreRegion.records.length) {
            return this.stopFill();
        }

        if (regionField) {
            regionField.onChange(selectedRecord[VAR_RECORD_CK_REGION]);
        }

        await recordsStoreArea.searchAction({[bcArea.queryparam]: selectedRecord[VAR_RECORD_CV_AREA]});

        if (!recordsStoreArea.records.length) {
            return this.stopFill();
        }

        areaField.onChange(selectedRecord[VAR_RECORD_CK_AREA]);

        await recordsStoreStreet.searchAction({
            [bcStreet.queryparam]: selectedRecord[VAR_RECORD_CV_STREET],
            [VAR_RECORD_CK_AREA]: selectedRecord[VAR_RECORD_CK_AREA],
        });

        if (recordsStoreArea.records.length) {
            streetField.onChange(selectedRecord[VAR_RECORD_CK_STREET]);

            await recordsStoreHouse.searchAction({
                [bcHouse.queryparam]: selectedRecord[VAR_RECORD_CV_HOUSE],
                [VAR_RECORD_CK_AREA]: selectedRecord[VAR_RECORD_CK_AREA],
                [VAR_RECORD_CK_STREET]: selectedRecord[VAR_RECORD_CK_STREET],
            });

            if (recordsStoreArea.records.length) {
                houseField.onChange(selectedRecord[VAR_RECORD_CK_NSI_ADR_OBJECTS]);
            }
        }

        await recordsStoreMO.searchAction({[bcHouse.queryparam]: selectedRecord[VAR_RECORD_ID]});

        this._isLoading = false;

        if (!recordsStoreMO.records.length) {
            return false;
        }

        idField.onChange(selectedRecord[VAR_RECORD_ID]);

        return true;
    };

    getFieldsConfig = (): IBuilderConfig[] => {
        return getFieldMoConfig(this.bc);
    };
}
