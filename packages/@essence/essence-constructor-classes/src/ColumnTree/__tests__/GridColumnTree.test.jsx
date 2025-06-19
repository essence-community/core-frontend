/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// @flow
import * as React from "react";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridColumnTree from "../GridColumnTree";
import {gridBc, treeBc} from "../../__mock__/builderConfigs";
import GridColumnDetailSchevron from "../GridColumnDetailSchevron/GridColumnDetailSchevron";

describe("GridColumnTree", () => {
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
        const wrapper = mountWithTheme(<GridColumnTree {...props} record={{type: "root"}} />);

        expect(wrapper.text()).toBe("Корневой каталог");
        expect(wrapper.find(GridColumnDetailSchevron).exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render leaf=true integer", () => {
        const wrapper = mountWithTheme(<GridColumnTree {...props} value="100500" record={{leaf: "true"}} />);

        expect(wrapper.text()).toBe("100 500");
        expect(wrapper.find(GridColumnDetailSchevron).exists()).toBeFalsy();

        wrapper.unmount();
    });

    it("render leaf=false integer", () => {
        const wrapper = mountWithTheme(<GridColumnTree {...props} value="100500" record={{leaf: "false"}} />);

        expect(wrapper.text()).toBe("100 500");
        expect(wrapper.find(GridColumnDetailSchevron).exists()).toBeTruthy();

        wrapper.unmount();
    });
});
