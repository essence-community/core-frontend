/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// @flow
import * as React from "react";
import {Icon} from "@essence-community/constructor-share/Icon";
import {createEmptyPageStore} from "../../stores";
import {mountWithTheme, getBaseBc} from "../../utils/test";
import BuilderGrid, {BaseBuilderGrid} from "../BuilderGrid";
import {gridTreeBc} from "../__mock__/builderConfigs";
import {treeRecords} from "../__mock__/records";
import BaseGridRow from "../Row/BaseGridRow";

describe("BuilderTreeGrid", () => {
    const bc = {
        ...gridTreeBc,
        columns: [
            {
                ...getBaseBc("tree"),
                column: "cv_name",
                datatypeBase: "text",
            },
        ],
        rootvisible: "true",
    };
    const pageStore = createEmptyPageStore({styleTheme: "dark"});
    const wrapper = mountWithTheme(<BuilderGrid pageStore={pageStore} visible bc={bc} />);
    const store: any = wrapper.find(BaseBuilderGrid).prop("store");

    beforeEach(() => {
        store.selectedRecords.clear();
        store.recordsStore.setRecordsAction(treeRecords);
        wrapper.update();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it("render grid", () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BaseGridRow).length).toBe(2);
    });

    it("check text for visible columns", () => {
        expect(wrapper.find(BaseGridRow).map((el) => el.text())).toEqual(["", "root"]);
    });

    it("check rows after expand first", () => {
        wrapper
            .find(BaseGridRow)
            .at(1)
            .find(Icon)
            .at(0)
            .simulate("click");

        expect(wrapper.find(BaseGridRow).map((el) => el.text())).toEqual(["", "root", "first"]);
    });
});
