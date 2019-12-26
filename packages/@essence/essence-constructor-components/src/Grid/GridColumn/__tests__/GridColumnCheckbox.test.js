// @flow
import * as React from "react";
import {Checkbox} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {VAR_RECORD_ID} from "@essence/essence-constructor-share";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import {gridBc as baseGridBc, checkboxBc} from "../../__mock__/builderConfigs";
import {records, treeRecords} from "../../__mock__/records";
import GridColumnCheckbox from "../GridColumnCheckbox";

// eslint-disable-next-line max-lines-per-function
describe("GridColumnCheckbox", () => {
    const pageStore = createEmptyPageStore();
    const baseProps = {
        pageStore,
        visible: true,
    };
    const expectCheckbox = (wrapper, result) => {
        expect({
            checked: wrapper.find(Checkbox).prop("checked"),
            iconfont: wrapper
                .find(Icon)
                .at(0)
                .prop("iconfont"),
        }).toEqual(result);
    };

    it("render without record", () => {
        const store = new GridModel({bc: baseGridBc, pageStore});

        store.recordsStore.setRecordsAction(records);

        const wrapper = mountWithTheme(
            <GridColumnCheckbox {...baseProps} store={store} gridBc={baseGridBc} bc={checkboxBc} />,
        );

        expectCheckbox(wrapper, {checked: false, iconfont: "square-o"});

        wrapper.unmount();
    });

    it("render tree without record", () => {
        const gridBc = {...baseGridBc, type: "TREEGRID"};
        const store = new GridModel({bc: gridBc, pageStore});

        store.recordsStore.setRecordsAction(records);

        const wrapper = mountWithTheme(
            <GridColumnCheckbox {...baseProps} gridBc={gridBc} bc={checkboxBc} store={store} />,
        );

        expectCheckbox(wrapper, {checked: false, iconfont: "square-o"});

        wrapper.unmount();
    });

    it("render tree and record.leaf = false and selected", () => {
        const gridBc = {...baseGridBc, type: "TREEGRID"};
        const store = new GridModel({bc: gridBc, pageStore});

        store.recordsStore.setRecordsAction(treeRecords);
        store.toggleSelectedRecordAction(treeRecords[2][VAR_RECORD_ID], treeRecords[2], false);

        const wrapper = mountWithTheme(
            <GridColumnCheckbox {...baseProps} gridBc={gridBc} bc={checkboxBc} store={store} record={treeRecords[1]} />,
        );

        expectCheckbox(wrapper, {checked: false, iconfont: "minus-square"});

        wrapper.unmount();
    });

    it("render tree and recod.left = true and selected", () => {
        const gridBc = {...baseGridBc, type: "TREEGRID"};
        const store = new GridModel({bc: gridBc, pageStore});
        const [, , record] = treeRecords;

        store.recordsStore.setRecordsAction(treeRecords);

        const wrapper = mountWithTheme(
            <GridColumnCheckbox {...baseProps} gridBc={gridBc} bc={checkboxBc} store={store} record={record} />,
        );

        wrapper.find("input").simulate("click");
        wrapper.find("input").simulate("change");

        expectCheckbox(wrapper, {checked: true, iconfont: "check-square"});

        wrapper.unmount();
    });

    it("render tree and record.leaf = false and not selected", () => {
        const gridBc = {...baseGridBc, type: "TREEGRID"};
        const store = new GridModel({bc: gridBc, pageStore});

        const wrapper = mountWithTheme(
            <GridColumnCheckbox {...baseProps} gridBc={gridBc} bc={checkboxBc} store={store} record={treeRecords[1]} />,
        );

        expectCheckbox(wrapper, {checked: false, iconfont: "square-o"});

        wrapper.unmount();
    });

    it("render tree and record = root and not selected", () => {
        const gridBc = {...baseGridBc, type: "TREEGRID"};
        const store = new GridModel({bc: gridBc, pageStore});

        store.recordsStore.setRecordsAction(treeRecords);
        store.toggleSelectedRecordAction(treeRecords[2][VAR_RECORD_ID], treeRecords[2], false);

        const wrapper = mountWithTheme(
            <GridColumnCheckbox {...baseProps} gridBc={gridBc} bc={checkboxBc} store={store} record={treeRecords[0]} />,
        );

        expectCheckbox(wrapper, {checked: false, iconfont: "minus-square"});

        wrapper.unmount();
    });
});
