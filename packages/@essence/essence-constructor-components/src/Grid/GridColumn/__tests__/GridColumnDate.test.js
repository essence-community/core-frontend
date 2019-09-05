// @flow
import * as React from "react";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridColumnDate from "../GridColumnDate";
import {gridBc, dateBc} from "../../__mock__/builderConfigs";
import {renderTip} from "../gridColumnHelpers";

describe("GridColumnDate", () => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});
    const props = {
        bc: dateBc,
        gridBc,
        pageStore,
        qtip: renderTip(dateBc.datatype, "2019-01-24T15:00:52", dateBc.format),
        store,
        value: "2019-01-24T15:00:52",
        visible: true,
    };

    it("render qtip ", () => {
        const wrapper = mountWithTheme(<GridColumnDate {...props} />);

        expect(wrapper.text()).toBe(props.qtip);
    });

    ["value", "qtip"].forEach((key) => {
        it(`render empty if ${key} is empty`, () => {
            const wrapper = mountWithTheme(<GridColumnDate {...{...props, [key]: ""}} />);

            expect(wrapper.text()).toBe(null);
        });
    });

    it("render empty if format is empty", () => {
        const wrapper = mountWithTheme(<GridColumnDate {...props} bc={{...dateBc, format: ""}} />);

        expect(wrapper.text()).toBe(null);
    });
});
