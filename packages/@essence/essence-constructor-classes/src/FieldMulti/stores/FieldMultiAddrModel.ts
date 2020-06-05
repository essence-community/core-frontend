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
} from "@essence-community/constructor-share/constants";
import {action, computed} from "mobx";
import {IForm} from "@essence-community/constructor-share/Form";
import {getFieldAddrConfig} from "../utils";
import {IFieldMultiModel, FieldMultiModel} from "./FieldMultiModel";

export class FieldMultiAddrModel extends FieldMultiModel implements IFieldMultiModel {
    constructor(props: IStoreBaseModelProps) {
        super({
            ...props,
            bc: {
                ...props.bc,
                [VAR_RECORD_QUERY_ID]: "jNSIGetAddrByID",
                defaultvalue: VALUE_SELF_ALWAYSFIRST,
                orderdirection: undefined,
                orderproperty: "",
            },
        });
    }

    @computed get displayText() {
        return this.selectedRecord
            ? [
                  this.selectedRecord[VAR_RECORD_CV_REGION],
                  this.selectedRecord[VAR_RECORD_CV_AREA],
                  this.selectedRecord[VAR_RECORD_CV_STREET],
                  this.selectedRecord[VAR_RECORD_CV_HOUSE],
              ]
                  .filter(Boolean)
                  .join(", ")
            : "";
    }

    @action
    // eslint-disable-next-line max-statements
    fillActiveRecordAction = async (form: IForm, configs: IBuilderConfig[]) => {
        const [bcRegion, bcArea, bcStreet, bcHouse] = configs;
        const selectedRecord = this.selectedRecord || {};

        const recordsStoreRegion = this.pageStore.stores.get(bcRegion[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreArea = this.pageStore.stores.get(bcArea[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreStreet = this.pageStore.stores.get(bcStreet[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const recordsStoreHouse = this.pageStore.stores.get(bcHouse[VAR_RECORD_PAGE_OBJECT_ID])?.recordsStore;
        const regionField = form.select(VAR_RECORD_CK_REGION);
        const areaField = form.select(VAR_RECORD_CK_AREA);
        const streetField = form.select(VAR_RECORD_CK_STREET);
        const houseField = form.select(VAR_RECORD_CK_HOUSE);

        if (
            regionField === undefined ||
            areaField === undefined ||
            streetField === undefined ||
            houseField === undefined ||
            recordsStoreRegion === undefined ||
            recordsStoreArea === undefined ||
            recordsStoreStreet === undefined ||
            recordsStoreHouse === undefined ||
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
        }

        await recordsStoreHouse.searchAction({
            [bcHouse.queryparam]: selectedRecord[VAR_RECORD_CV_HOUSE],
            [VAR_RECORD_CK_AREA]: selectedRecord[VAR_RECORD_CK_AREA],
            [VAR_RECORD_CK_STREET]: selectedRecord[VAR_RECORD_CK_STREET],
        });

        this._isLoading = false;

        if (!recordsStoreArea.records.length) {
            return false;
        }

        houseField.onChange(selectedRecord[VAR_RECORD_CK_NSI_ADR_OBJECTS]);

        return true;
    };

    getFieldsConfig = (): IBuilderConfig[] => {
        return getFieldAddrConfig(this.bc);
    };
}
