// @flow
import * as React from "react";
import {VAR_RECORD_ID} from "@essence/essence-constructor-share/constants";
import {mountWithTheme, getBaseBc} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridRow from "../GridRow";
import BaseGridRow from "../BaseGridRow";
import {records} from "../../__mock__/records";
import {gridBc} from "../../__mock__/builderConfigs";

// eslint-disable-next-line max-lines-per-function
describe("GridRow", () => {
    const bc = {
        ...gridBc,
        detail: [getBaseBc("panel")],
    };
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc, pageStore});

    beforeEach(() => {
        store.expansionRecords.clear();
    });

    it("render", () => {
        const wrapper = mountWithTheme(
            <table>
                <tbody>
                    <GridRow store={store} record={records[0]} index={0} bc={bc} pageStore={pageStore} />
                </tbody>
            </table>,
        );

        expect(wrapper.find(BaseGridRow).length).toBe(1);

        wrapper.unmount();
    });

    it("open detail", () => {
        const [record] = records;
        const wrapper = mountWithTheme(
            <table>
                <tbody>
                    <GridRow store={store} record={record} index={0} bc={bc} pageStore={pageStore} />
                </tbody>
            </table>,
        );

        expect(wrapper.find(BaseGridRow).length).toBe(1);

        store.expansionRecords.set(record[VAR_RECORD_ID], true);
        wrapper.update();

        expect(wrapper.find(BaseGridRow).length).toBe(2);

        wrapper.unmount();
    });

    it("already open detail", () => {
        const [record] = records;

        store.expansionRecords.set(record[VAR_RECORD_ID], true);

        const wrapper = mountWithTheme(
            <table>
                <tbody>
                    <GridRow store={store} record={record} index={0} bc={bc} pageStore={pageStore} />
                </tbody>
            </table>,
        );

        expect(wrapper.find(BaseGridRow).length).toBe(2);

        wrapper.unmount();
    });
});
