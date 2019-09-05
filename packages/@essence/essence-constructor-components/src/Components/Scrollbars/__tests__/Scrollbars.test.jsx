// @flow
import * as React from "react";
import {mount} from "enzyme";
import {Scrollbars as ReactCustomScrollbars} from "react-custom-scrollbars";
import {sleep} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import Scrollbars, {SCROLL_DEBOUNCE} from "../Scrollbars";

const Content = () => <div style={{height: 500, width: 100}} />;

describe("Scrollbars", () => {
    const pageStore = createEmptyPageStore();
    const spyOnFireScrollEvent = jest.spyOn(pageStore, "fireScrollEvent");

    it("render", () => {
        const wrapper = mount(
            <Scrollbars pageStore={pageStore}>
                <Content />
            </Scrollbars>,
        );

        expect(wrapper.find(Content).exists()).toBeTruthy();
        expect(wrapper.find(ReactCustomScrollbars).exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("check scroll", async () => {
        const onScrollFrame = jest.fn();
        const values = {};
        const wrapper = mount(
            <Scrollbars pageStore={pageStore} onScrollFrame={onScrollFrame} fireScrollEvent>
                <Content />
            </Scrollbars>,
        );

        wrapper.find(ReactCustomScrollbars).prop("onScrollFrame")(values);

        await sleep(SCROLL_DEBOUNCE);

        expect(onScrollFrame).toHaveBeenCalledWith(values);
        expect(spyOnFireScrollEvent).toHaveBeenCalledWith();

        wrapper.unmount();
    });

    it("wheel", () => {
        const wrapper = mount(
            <Scrollbars pageStore={pageStore} preventAltScroll>
                <Content />
            </Scrollbars>,
        );

        expect(wrapper.find(Scrollbars).instance().lastWheelAlt).toBeFalsy();

        wrapper.find(Content).simulate("wheel", {altKey: true});

        expect(wrapper.find(Scrollbars).instance().lastWheelAlt).toBeTruthy();

        wrapper.find(Content).simulate("wheel", {altKey: false});

        expect(wrapper.find(Scrollbars).instance().lastWheelAlt).toBeFalsy();

        wrapper.unmount();
    });
});
