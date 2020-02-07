// @flow
import * as React from "react";
import {Icon} from "@essence-community/constructor-share/Icon";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import {gridBc, treeBc} from "../../__mock__/builderConfigs";
import {records} from "../../__mock__/records";
import GridColumnDetailSchevron from "../GridColumnDetailSchevron/GridColumnDetailSchevron";

// eslint-disable-next-line max-lines-per-function
describe("GridColumnDetailSchevron", () => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});
    const props = {
        bc: treeBc,
        gridBc,
        pageStore,
        store,
        visible: true,
    };

    it("render root", () => {
        const wrapper = mountWithTheme(<GridColumnDetailSchevron {...props} record={{type: "root"}} />);

        expect(wrapper.find(Icon).exists()).toBeTruthy();
        expect(wrapper.find(Icon).prop("iconfont")).toBe("caret-down");

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(Icon).prop("iconfont")).toBe("caret-right");

        wrapper.unmount();
    });

    it("render hidden", () => {
        const wrapper = mountWithTheme(<GridColumnDetailSchevron {...props} record={{}} hidden />);

        expect(wrapper.find(Icon).exists()).toBeFalsy();

        wrapper.unmount();
    });

    it("render empty record", () => {
        const wrapper = mountWithTheme(<GridColumnDetailSchevron {...props} />);

        expect(wrapper.find(Icon).exists()).toBeFalsy();

        wrapper.unmount();
    });

    it("click on the record", () => {
        const wrapper = mountWithTheme(<GridColumnDetailSchevron {...props} record={records[0]} />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("caret-right");

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(Icon).prop("iconfont")).toBe("caret-down");

        wrapper.unmount();
    });
});
