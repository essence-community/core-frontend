// @flow
import {extendObservable, action} from "mobx";
import compact from "lodash/compact";
import noop from "lodash/noop";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CV_REGION,
    VAR_RECORD_CK_REGION,
    VAR_RECORD_CV_AREA,
    VAR_RECORD_CK_AREA,
    VAR_RECORD_CV_STREET,
    VAR_RECORD_CV_HOUSE,
    VAR_RECORD_CK_STREET,
    VAR_RECORD_CK_NSI_ADR_OBJECTS,
    VAR_RECORD_CK_HOUSE,
    VAR_RECORD_QUERY_ID,
} from "@essence/essence-constructor-share/constants";
import {loggerRoot} from "../../constants";
import {type StoreBaseModelPropsType} from "../StoreBaseModel";
import {BaseMultiFieldModel} from "../BaseMultiFieldModel";
import {type AddrMultiFieldType} from "./AddrMultiFieldType";
import {getAddrMultiFieldConfig} from "./AddrMultiFieldConfigs";

const logger = loggerRoot.extend("AddrMultiField");

export class AddrMultiField extends BaseMultiFieldModel implements AddrMultiFieldType {
    displayText: string;

    builderConfigs: Array<any>;

    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        super({[VAR_RECORD_QUERY_ID]: "jNSIGetAddrByID", bc, pageStore});

        this.builderConfigs = getAddrMultiFieldConfig(bc);

        extendObservable(this, {
            get displayText() {
                return this.selectedRecord
                    ? compact([
                          this.selectedRecord[VAR_RECORD_CV_REGION],
                          this.selectedRecord[VAR_RECORD_CV_AREA],
                          this.selectedRecord[VAR_RECORD_CV_STREET],
                          this.selectedRecord[VAR_RECORD_CV_HOUSE],
                      ]).join(", ")
                    : "";
            },
        });
    }

    addListeners = noop;

    removeListeners = noop;

    clearAction = action("clearAction", () => {
        this.recordsStore.clearRecordsAction();
    });

    searchRecordAction = action("searchRecordAction", (value: string | number) =>
        this.recordsStore.searchAction({[VAR_RECORD_CK_NSI_ADR_OBJECTS]: value}),
    );

    // eslint-disable-next-line max-lines-per-function, max-statements
    fillActiveRecordAction = action("fillActiveRecordAction", async (form) => {
        try {
            const [bcRegion, bcArea, bcStreet, bcHouse] = this.builderConfigs;
            const selectedRecord = this.selectedRecord || {};

            // $FlowFixMe
            const recordsStoreRegion = this.pageStore.stores.get(bcRegion[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreArea = this.pageStore.stores.get(bcArea[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreStreet = this.pageStore.stores.get(bcStreet[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreHouse = this.pageStore.stores.get(bcHouse[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;

            this._isLoading = true;

            await recordsStoreRegion.searchAction({[bcRegion.queryparam]: selectedRecord[VAR_RECORD_CV_REGION]});

            if (!recordsStoreRegion.records.length) {
                this._isLoading = false;

                return false;
            }

            form.$(VAR_RECORD_CK_REGION).set(selectedRecord[VAR_RECORD_CK_REGION]);

            await recordsStoreArea.searchAction({[bcArea.queryparam]: selectedRecord[VAR_RECORD_CV_AREA]});

            if (!recordsStoreArea.records.length) {
                this._isLoading = false;

                return false;
            }

            form.$(VAR_RECORD_CK_AREA).set(selectedRecord[VAR_RECORD_CK_AREA]);

            await recordsStoreStreet.searchAction({
                [bcStreet.queryparam]: selectedRecord[VAR_RECORD_CV_STREET],
                [VAR_RECORD_CK_AREA]: selectedRecord[VAR_RECORD_CK_AREA],
            });

            if (recordsStoreArea.records.length) {
                form.$(VAR_RECORD_CK_STREET).set(selectedRecord[VAR_RECORD_CK_STREET]);
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

            form.$(VAR_RECORD_CK_HOUSE).set(selectedRecord[VAR_RECORD_CK_NSI_ADR_OBJECTS]);

            return true;
        } catch (error) {
            logger("error:", error);

            this._isLoading = false;

            return false;
        }
    });
}
