// @flow
import {extendObservable, action} from "mobx";
import compact from "lodash/compact";
import noop from "lodash/noop";
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
        super({bc, ckQuery: "jNSIGetAddrByID", pageStore});

        this.builderConfigs = getAddrMultiFieldConfig(bc);

        extendObservable(this, {
            get displayText() {
                return this.selectedRecord
                    ? compact([
                          this.selectedRecord.cvRegion,
                          this.selectedRecord.cvArea,
                          this.selectedRecord.cvStreet,
                          this.selectedRecord.cvHouse,
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
        this.recordsStore.searchAction({ckNsiAdrObjects: value}),
    );

    // eslint-disable-next-line max-statements
    fillActiveRecordAction = action("fillActiveRecordAction", async (form) => {
        try {
            const [bcRegion, bcArea, bcStreet, bcHouse] = this.builderConfigs;
            const {cvRegion, cvArea, cvStreet, ckRegion, ckArea, cvHouse, ckStreet, ckNsiAdrObjects} =
                this.selectedRecord || {};
            // $FlowFixMe
            const recordsStoreRegion = this.pageStore.stores.get(bcRegion.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreArea = this.pageStore.stores.get(bcArea.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreStreet = this.pageStore.stores.get(bcStreet.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreHouse = this.pageStore.stores.get(bcHouse.ckPageObject).recordsStore;

            this._isLoading = true;

            await recordsStoreRegion.searchAction({[bcRegion.queryparam]: cvRegion});

            if (!recordsStoreRegion.records.length) {
                this._isLoading = false;

                return false;
            }

            form.$("ckRegion").set(ckRegion);

            await recordsStoreArea.searchAction({[bcArea.queryparam]: cvArea});

            if (!recordsStoreArea.records.length) {
                this._isLoading = false;

                return false;
            }

            form.$("ckArea").set(ckArea);

            await recordsStoreStreet.searchAction({[bcStreet.queryparam]: cvStreet, ckArea});

            if (recordsStoreArea.records.length) {
                form.$("ckStreet").set(ckStreet);
            }

            await recordsStoreHouse.searchAction({[bcHouse.queryparam]: cvHouse, ckArea, ckStreet});

            this._isLoading = false;

            if (!recordsStoreArea.records.length) {
                return false;
            }

            form.$("ckHouse").set(ckNsiAdrObjects);

            return true;
        } catch (error) {
            logger("error:", error);

            this._isLoading = false;

            return false;
        }
    });
}
