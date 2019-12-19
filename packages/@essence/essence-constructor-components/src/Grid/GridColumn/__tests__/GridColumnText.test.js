// @flow
import * as React from "react";
import {VAR_RECORD_ID} from "@essence/essence-constructor-share/constants";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import GridColumnText from "../GridColumnText";
import {gridBc, textBc, integerBc, numberBc} from "../../__mock__/builderConfigs";

// eslint-disable-next-line max-lines-per-function
describe("GridColumnText", () => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc: gridBc, pageStore});
    const spyOnRedicrectToAction = jest.spyOn(pageStore.applicationStore, "redirectToAction");
    const props = {
        gridBc,
        pageStore,
        store,
        visible: true,
    };

    it("render empty value", () => {
        const wrapper = mountWithTheme(<GridColumnText {...props} bc={textBc} />);

        expect(wrapper.text()).toBe(null);

        wrapper.unmount();
    });

    it("render default", () => {
        const wrapper = mountWithTheme(<GridColumnText {...props} bc={textBc} value="test" />);

        expect(wrapper.text()).toBe("test");

        wrapper.unmount();
    });

    [
        ["200.5", "200", "200,50", "200,5"],
        ["100500.505", "100 500", "100 500,50", "100 500,505"],
    ].forEach(([value, intView, numberView, infinityView]) => {
        it(`render integer: ${value}`, () => {
            const wrapper = mountWithTheme(<GridColumnText {...props} bc={integerBc} value={value} />);

            expect(wrapper.text()).toBe(intView);

            wrapper.unmount();
        });

        it(`render numeric: ${value}`, () => {
            const wrapper = mountWithTheme(<GridColumnText {...props} bc={numberBc} value={value} />);

            expect(wrapper.text()).toBe(numberView);

            wrapper.unmount();
        });

        it(`render numeric: ${value} with decimalprecision=-1`, () => {
            const wrapper = mountWithTheme(
                <GridColumnText {...props} bc={{...numberBc, decimalprecision: "-1"}} value={value} />,
            );

            expect(wrapper.text()).toBe(infinityView);

            wrapper.unmount();
        });
    });

    it("redirect to page", () => {
        const wrapper = mountWithTheme(
            <GridColumnText
                {...props}
                bc={{...textBc, columnsfilter: "ck_id", redirecturl: "core-1"}}
                value="test"
                record={{[VAR_RECORD_ID]: "100500"}}
            />,
        );

        wrapper.find("a").simulate("click");

        expect(wrapper.html()).toMatchSnapshot();
        expect(spyOnRedicrectToAction).toHaveBeenCalledWith("1", {[VAR_RECORD_ID]: "100500"});

        wrapper.setProps({record: {[VAR_RECORD_ID]: "350"}});

        wrapper.find("a").simulate("click");
        expect(spyOnRedicrectToAction).toHaveBeenCalledWith("1", {[VAR_RECORD_ID]: "350"});

        wrapper.unmount();
    });
});
