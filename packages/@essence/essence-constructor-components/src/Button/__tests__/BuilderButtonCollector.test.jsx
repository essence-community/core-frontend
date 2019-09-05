// @flow
import * as React from "react";
import {mountWithTheme, getBaseBc, sleep, ANIMATION_TIMEOUT} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import BuilderButtonCollector from "../BuilderButtonCollector";
import BuilderMobxButton from "../BuilderMobxButton";

describe("BuilderButtonCollector", () => {
    const bc = {
        ...getBaseBc("collector"),
        topbtn: [getBaseBc("button")],
    };
    const pageStore = createEmptyPageStore();

    beforeAll(() => {
        pageStore.setPageElAction(global.document.querySelector("body"));
    });

    it("render", () => {
        const wrapper = mountWithTheme(
            <BuilderButtonCollector color="inherit" bc={bc} pageStore={pageStore} visible />,
        );

        expect(wrapper.find(BuilderMobxButton).length).toBe(1);

        wrapper.unmount();
    });

    it("open collector", async () => {
        const wrapper = mountWithTheme(
            <BuilderButtonCollector color="inherit" bc={bc} pageStore={pageStore} visible />,
        );

        wrapper.find("button").simulate("click");

        await sleep(ANIMATION_TIMEOUT);

        wrapper.update();

        expect(wrapper.find(BuilderMobxButton).length).toBe(2);

        wrapper.unmount();
    });

    it("render hidden", () => {
        const wrapper = mountWithTheme(
            <BuilderButtonCollector color="inherit" bc={bc} pageStore={pageStore} visible hidden />,
        );

        expect(wrapper.find(BuilderMobxButton).length).toBe(0);

        wrapper.unmount();
    });
});
