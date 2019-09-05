// @flow
import {extendObservable, action, reaction} from "mobx";
import camelCase from "lodash/camelCase";
import {loggerRoot} from "../../constants";
import {BaseMultiFieldModel} from "../BaseMultiFieldModel";
import {type StoreBaseModelPropsType} from "../StoreBaseModel";
import {type MoMultiFieldType} from "./MoMultiFieldType";
import {getMoMultiFieldConfig} from "./MoMultiFieldConfigs";

const logger = loggerRoot.extend("MoMultiField");

export class MoMultiField extends BaseMultiFieldModel implements MoMultiFieldType {
    displayText: string;

    disposers = [];

    builderConfigs: Array<any>;

    constructor({bc, pageStore}: StoreBaseModelPropsType) {
        super({bc, ckQuery: "jNSIGetAddrByMO", pageStore});

        const displayfield = (bc.displayfield || "").replace(/{(\w+)}/g, (match, pattern) => `{${camelCase(pattern)}}`);

        this.builderConfigs = getMoMultiFieldConfig(bc);

        extendObservable(this, {
            get displayText() {
                return this.selectedRecord
                    ? displayfield.replace(/{([A-z]+)}/g, (match, pattern) => this.selectedRecord[pattern] || "")
                    : "";
            },
        });
    }

    addListeners = (form: any) => {
        this.disposers.push(
            reaction(
                () => {
                    const areaStore = this.pageStore.stores.get(this.builderConfigs[0].ckPageObject);

                    return areaStore && areaStore.recordsStore.selectedRecord;
                },
                (selectedRecord) => {
                    if (!selectedRecord && form.has("ckId")) {
                        form.$("ckId").set(null);
                    }
                },
            ),
        );
    };

    removeListeners = () => {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    };

    clearAction = action("clearAction", () => {
        this.recordsStore.clearRecordsAction();
    });

    searchRecordAction = action("searchRecordAction", (value: string | number) =>
        this.recordsStore.searchAction({ckMo: value}),
    );

    // eslint-disable-next-line max-statements
    fillActiveRecordAction = action("fillActiveRecordAction", async (form) => {
        try {
            const [bcRegion, bcArea, bcStreet, bcHouse, bcMO] = this.builderConfigs;
            const {cvRegion, cvArea, cvStreet, ckRegion, ckArea, cvHouse, ckStreet, ckNsiAdrObjects, ckId} =
                this.selectedRecord || {};
            // $FlowFixMe
            const recordsStoreRegion = this.pageStore.stores.get(bcRegion.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreArea = this.pageStore.stores.get(bcArea.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreStreet = this.pageStore.stores.get(bcStreet.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreHouse = this.pageStore.stores.get(bcHouse.ckPageObject).recordsStore;
            // $FlowFixMe
            const recordsStoreMO = this.pageStore.stores.get(bcMO.ckPageObject).recordsStore;

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

                await recordsStoreHouse.searchAction({[bcHouse.queryparam]: cvHouse, ckArea, ckStreet});

                if (recordsStoreArea.records.length) {
                    form.$("ckHouse").set(ckNsiAdrObjects);
                }
            }

            await recordsStoreMO.searchAction({[bcHouse.queryparam]: ckId});

            this._isLoading = false;

            if (!recordsStoreMO.records.length) {
                return false;
            }

            form.$("ckId").set(ckId);

            return true;
        } catch (error) {
            logger("error:", error);

            this._isLoading = false;

            return false;
        }
    });
}
