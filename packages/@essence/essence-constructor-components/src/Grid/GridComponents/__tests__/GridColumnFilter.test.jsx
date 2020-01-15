// @flow
import * as React from "react";
import {Icon} from "@essence-community/constructor-share/Icon";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import BuilderForm from "../../../Form/BuilderForm";
import BuilderField from "../../../TextField/BuilderField";
import GridColumnFilter from "../GridColumnFilter";

// eslint-disable-next-line max-lines-per-function
describe("GridColumnFilter", () => {
    const gridBc = {
        [VAR_RECORD_NAME]: "grid",
        [VAR_RECORD_OBJECT_ID]: "grid",
        [VAR_RECORD_PAGE_OBJECT_ID]: "grid",
        childwindow: [],
        columns: [],
        orderdirection: "asc",
        orderproperty: "cv_value",
    };
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});

    it("render boolean", () => {
        const bc = {datatype: "boolean"};
        const wrapper = mountWithTheme(
            <GridColumnFilter bc={bc} filterResetCount={0} pageStore={pageStore} store={store} visible />,
        );

        expect(wrapper.find(GridColumnFilter).html()).toBe(null);

        wrapper.unmount();
    });

    it("render checkbox", () => {
        const bc = {datatype: "checkbox"};
        const wrapper = mountWithTheme(
            <GridColumnFilter bc={bc} filterResetCount={0} pageStore={pageStore} store={store} visible />,
        );

        expect(wrapper.find(GridColumnFilter).html()).toBe(null);

        wrapper.unmount();
    });

    it("render text", () => {
        const bc = {datatype: "text"};
        const wrapper = mountWithTheme(
            <BuilderForm pageStore={pageStore}>
                <GridColumnFilter bc={bc} filterResetCount={0} pageStore={pageStore} store={store} visible />
            </BuilderForm>,
        );

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(BuilderField).length).toBe(1);
        expect(wrapper.find(Icon).length).toBe(2);

        wrapper.unmount();
    });

    it("render date", () => {
        const iconLength = 5;
        const bc = {datatype: "date"};
        const wrapper = mountWithTheme(
            <BuilderForm pageStore={pageStore}>
                <GridColumnFilter bc={bc} filterResetCount={0} pageStore={pageStore} store={store} visible />
            </BuilderForm>,
        );

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(BuilderField).length).toBe(3);
        expect(wrapper.find(Icon).length).toBe(iconLength);

        wrapper.unmount();
    });
});
