/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// @flow
import * as React from "react";
import {mountWithTheme} from "../../../utils/test";
import {gridBc} from "../../__mock__/builderConfigs";
import {records} from "../../__mock__/records";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import {TABLE_CELL_MIN_WIDTH} from "../../../constants";
import GridHeaderResizer from "../GridHeaderResizer";

describe("GridHeaderResizer", () => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});

    store.recordsStore.setRecordsAction(records);

    it("resize", () => {
        const wrapper = mountWithTheme(<GridHeaderResizer store={store} classes={{}} ckPageObject="test" />);
        const instance = wrapper.find(GridHeaderResizer).instance();
        const spyOnColumnwsWidth = jest.spyOn(store, "setColumnsWidth");
        const mousemove = new Event("mousemove");

        // $FlowFixMe
        mousemove.pageX = 2;

        wrapper.find("div").simulate("mouseDown", {pageX: 1});

        instance.handleMouseMove(mousemove);
        instance.handleMouseUp(new Event("mouseup"));

        expect(spyOnColumnwsWidth).toHaveBeenCalledWith("test", TABLE_CELL_MIN_WIDTH + 1);

        wrapper.unmount();
    });
});
