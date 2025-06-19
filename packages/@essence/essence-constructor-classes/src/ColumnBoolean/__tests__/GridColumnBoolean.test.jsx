/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// @flow
import * as React from "react";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridColumnBoolean from "../GridColumnBoolean";
import {gridBc, booleanBc} from "../../__mock__/builderConfigs";
import {renderTip} from "../gridColumnHelpers";

describe("GridColumnBoolean", () => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});
    const props = {
        bc: booleanBc,
        gridBc,
        pageStore,
        store,
        visible: true,
    };

    it("render yes", () => {
        const wrapper = mountWithTheme(<GridColumnBoolean {...props} value={1} />);

        expect(wrapper.text()).toBe(renderTip(booleanBc.datatype, 1));
    });

    it("render no", () => {
        const wrapper = mountWithTheme(<GridColumnBoolean {...props} value={0} />);

        expect(wrapper.text()).toBe(renderTip(booleanBc.datatype, 0));
    });
});
