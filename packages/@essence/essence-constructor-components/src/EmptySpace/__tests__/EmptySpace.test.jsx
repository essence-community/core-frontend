// @flow
import * as React from "react";
import {mount} from "enzyme";
import {getBaseBc} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import EmptySpace from "../EmptySpace";

describe("EmptySpace", () => {
    const bc = getBaseBc("empty");
    const pageStore = createEmptyPageStore();

    it("render", () => {
        const wrapper = mount(<EmptySpace bc={bc} pageStore={pageStore} visible />);

        expect(wrapper.find("div").length).toBe(1);

        wrapper.unmount();
    });

    it("render hidden", () => {
        const wrapper = mount(<EmptySpace bc={bc} pageStore={pageStore} hidden visible />);

        expect(wrapper.find("div").length).toBe(0);

        wrapper.unmount();
    });
});
