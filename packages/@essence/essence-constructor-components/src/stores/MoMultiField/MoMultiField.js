// @flow
import {extendObservable, action, reaction} from "mobx";
import {
    VAR_RECORD_ID,
    VAR_RECORD_CK_REGION,
    VAR_RECORD_CK_AREA,
    VAR_RECORD_CV_STREET,
    VAR_RECORD_CV_REGION,
    VAR_RECORD_CV_HOUSE,
    VAR_RECORD_CV_AREA,
    VAR_RECORD_CK_STREET,
    VAR_RECORD_CK_NSI_ADR_OBJECTS,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_CK_HOUSE,
    VAR_RECORD_CK_MO,
} from "@essence/essence-constructor-share/constants";
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
        super({[VAR_RECORD_QUERY_ID]: "jNSIGetAddrByMO", bc, pageStore});

        // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
        const displayfield = (bc.displayfield || "").replace(/{(\w+)}/g, (match, pattern) => `{${pattern}}`);

        this.builderConfigs = getMoMultiFieldConfig(bc);

        extendObservable(this, {
            get displayText() {
                return this.selectedRecord
                    ? // eslint-disable-next-line require-unicode-regexp,  prefer-named-capture-group
                      displayfield.replace(/{([A-z]+)}/g, (match, pattern) => this.selectedRecord[pattern] || "")
                    : "";
            },
        });
    }

    addListeners = (form: any) => {
        this.disposers.push(
            reaction(
                () => {
                    const areaStore = this.pageStore.stores.get(this.builderConfigs[0][VAR_RECORD_PAGE_OBJECT_ID]);

                    return areaStore && areaStore.recordsStore.selectedRecord;
                },
                (selectedRecord) => {
                    if (!selectedRecord && form.has(VAR_RECORD_ID)) {
                        form.$(VAR_RECORD_ID).set(null);
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
        this.recordsStore.searchAction({[VAR_RECORD_CK_MO]: value}),
    );

    // eslint-disable-next-line max-statements, max-lines-per-function
    fillActiveRecordAction = action("fillActiveRecordAction", async (form) => {
        try {
            const [bcRegion, bcArea, bcStreet, bcHouse, bcMO] = this.builderConfigs;
            const selectedRecord = this.selectedRecord || {};
            // $FlowFixMe
            const recordsStoreRegion = this.pageStore.stores.get(bcRegion[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreArea = this.pageStore.stores.get(bcArea[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreStreet = this.pageStore.stores.get(bcStreet[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreHouse = this.pageStore.stores.get(bcHouse[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;
            // $FlowFixMe
            const recordsStoreMO = this.pageStore.stores.get(bcMO[VAR_RECORD_PAGE_OBJECT_ID]).recordsStore;

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

                await recordsStoreHouse.searchAction({
                    [bcHouse.queryparam]: selectedRecord[VAR_RECORD_CV_HOUSE],
                    [VAR_RECORD_CK_AREA]: selectedRecord[VAR_RECORD_CK_AREA],
                    [VAR_RECORD_CK_STREET]: selectedRecord[VAR_RECORD_CK_STREET],
                });

                if (recordsStoreArea.records.length) {
                    form.$(VAR_RECORD_CK_HOUSE).set(selectedRecord[VAR_RECORD_CK_NSI_ADR_OBJECTS]);
                }
            }

            await recordsStoreMO.searchAction({[bcHouse.queryparam]: selectedRecord[VAR_RECORD_ID]});

            this._isLoading = false;

            if (!recordsStoreMO.records.length) {
                return false;
            }

            form.$(VAR_RECORD_ID).set(selectedRecord[VAR_RECORD_ID]);

            return true;
        } catch (error) {
            logger("error:", error);

            this._isLoading = false;

            return false;
        }
    });
}
