// @flow
import * as React from "react";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {mountWithTheme} from "../../../utils/test";
import {checkboxBc, gridBc} from "../../__mock__/builderConfigs";
import {records} from "../../__mock__/records";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridColumnHeaderCheckbox from "../GridColumnHeaderCheckbox";

// eslint-disable-next-line max-lines-per-function
describe("GridColumnHeaderCheckbox", () => {
    const bc = checkboxBc;
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});

    beforeEach(() => {
        store.recordsStore.setRecordsAction(records);
        store.selectedRecords.clear();
    });

    it("render", () => {
        const wrapper = mountWithTheme(<GridColumnHeaderCheckbox bc={bc} store={store} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("square-o");

        wrapper.unmount();
    });

    it("selected all", () => {
        const wrapper = mountWithTheme(<GridColumnHeaderCheckbox bc={bc} store={store} />);

        wrapper.find(Checkbox).prop("onChange")();
        wrapper.find(Checkbox).simulate("click");

        expect(wrapper.find(Icon).prop("iconfont")).toBe("check-square");

        wrapper.unmount();
    });

    it("Select one record", () => {
        store.selectedRecords.set(records[0][VAR_RECORD_ID], records[0]);

        const wrapper = mountWithTheme(<GridColumnHeaderCheckbox bc={bc} store={store} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("minus-square");

        wrapper.unmount();
    });

    it("deselect all", () => {
        store.setAllSelectedRecords(true);

        const wrapper = mountWithTheme(<GridColumnHeaderCheckbox bc={bc} store={store} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("check-square");

        wrapper.find(Checkbox).prop("onChange")();
        wrapper.find(Checkbox).simulate("click");

        expect(wrapper.find(Icon).prop("iconfont")).toBe("square-o");

        wrapper.unmount();
    });
});

describe("GridColumnHeaderCheckbox - tree", () => {
    const bc = checkboxBc;
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: {...gridBc, type: "TREEGRID"}, pageStore});

    beforeEach(() => {
        store.recordsStore.setRecordsAction(records);
        store.selectedRecords.clear();
    });

    it("render", () => {
        const wrapper = mountWithTheme(<GridColumnHeaderCheckbox bc={bc} store={store} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("square-o");

        wrapper.unmount();
    });

    it("selected all", () => {
        store.setAllSelectedRecords(true);

        const wrapper = mountWithTheme(<GridColumnHeaderCheckbox bc={bc} store={store} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("check-square");

        wrapper.unmount();
    });
});
