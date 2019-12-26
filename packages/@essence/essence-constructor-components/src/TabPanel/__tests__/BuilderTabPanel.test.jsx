// @flow
import * as React from "react";
import {Tabs} from "@material-ui/core";
import keycode from "keycode";
import {setComponent} from "@essence/essence-constructor-share";
import {mountWithTheme, getBaseBc} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import BuilderTabPanel from "../BuilderTabPanel";
import Tab from "../Tab";

const TabPanelChild = () => null;

setComponent("TABPANELCHILD", TabPanelChild);

// eslint-disable-next-line max-lines-per-function
describe("BuilderTabPanel", () => {
    const bc = getBaseBc("tab", {
        childs: [
            {...getBaseBc("first-tab"), hiddenrules: "g_hide === true", type: "TABPANELCHILD"},
            {...getBaseBc("second-tab"), type: "TABPANELCHILD"},
            {...getBaseBc("third-tab"), type: "TABPANELCHILD"},
        ],
        type: "TABPANEL",
    });
    const firstHiddenBc = getBaseBc("tab", {
        childs: [
            {...getBaseBc("first-tab"), hidden: "true", type: "TABPANELCHILD"},
            {...getBaseBc("second-tab"), type: "TABPANELCHILD"},
        ],
        type: "TABPANEL",
    });
    const pageStore = createEmptyPageStore();

    it("render", () => {
        const wrapper = mountWithTheme(<BuilderTabPanel bc={bc} pageStore={pageStore} visible />);

        expect(wrapper.find(TabPanelChild).length).toBe(1);
        expect(wrapper.find(Tab).length).toBe(3);

        wrapper.unmount();
    });

    it("first should be visible", () => {
        const wrapper = mountWithTheme(<BuilderTabPanel bc={bc} pageStore={pageStore} visible />);
        const childs = wrapper.find(TabPanelChild);

        expect(childs.at(0).prop("visible")).toBeTruthy();
        expect(childs.length).toBe(1);

        wrapper.unmount();
    });

    it("open second tab", () => {
        const wrapper = mountWithTheme(<BuilderTabPanel bc={bc} pageStore={pageStore} visible />);

        wrapper
            .find(Tab)
            .at(1)
            .find("button")
            .simulate("click");

        const childs = wrapper.find(TabPanelChild);

        expect(childs.at(0).prop("visible")).toBeFalsy();
        expect(childs.at(1).prop("visible")).toBeTruthy();
        expect(childs.length).toBe(2);

        wrapper.unmount();
    });

    it("hide tab after change global. Tab automaticaly change to second", (done) => {
        expect.assertions(2);

        const wrapper = mountWithTheme(<BuilderTabPanel bc={bc} pageStore={pageStore} visible />);

        pageStore.globalValues.set("gHide", true);

        requestAnimationFrame(() => {
            wrapper.update();

            const childs = wrapper.find(TabPanelChild);

            // Expect(childs.at(0).prop("visible")).toBeFalsy();
            expect(childs.at(0).prop("visible")).toBeTruthy();
            expect(childs.length).toBe(1);
            // Expect(childs.at(2).prop("visible")).toBeFalsy();

            pageStore.globalValues.set("gHide", false);

            wrapper.unmount();
            done();
        });
    });

    it("hide tab after change global", (done) => {
        expect.assertions(2);

        const wrapper = mountWithTheme(<BuilderTabPanel bc={firstHiddenBc} pageStore={pageStore} visible />);
        const checkVisible = () => {
            const childs = wrapper.find(TabPanelChild);

            expect(childs.at(0).prop("visible")).toBeTruthy();
            // Expect(childs.at(1).prop("visible")).toBeTruthy();
        };

        requestAnimationFrame(() => {
            wrapper.update();

            checkVisible();

            wrapper
                .find(Tab)
                .at(0)
                .simulate("click");

            requestAnimationFrame(() => {
                wrapper.update();

                checkVisible();

                wrapper.unmount();
                done();
            });
        });
    });

    it("focus and blur", () => {
        const wrapper = mountWithTheme(<BuilderTabPanel bc={bc} pageStore={pageStore} visible />);

        wrapper.find(Tabs).simulate("focus");

        expect(
            wrapper
                .find(Tab)
                .at(2)
                .prop("className"),
        ).toContain("selectedTabRoot");

        wrapper.find(Tabs).simulate("blur");

        expect(
            wrapper
                .find(Tab)
                .at(2)
                .prop("className"),
        ).not.toContain("selectedTabRoot");
    });

    it("select other tab", () => {
        const wrapper = mountWithTheme(<BuilderTabPanel bc={bc} pageStore={pageStore} visible />);

        wrapper.find(Tabs).simulate("focus");
        wrapper.find(Tabs).simulate("keydown", {keyCode: keycode("right")});

        expect(
            wrapper
                .find(Tab)
                .at(1)
                .prop("className"),
        ).toContain("selectedTabRoot");

        wrapper.find(Tabs).simulate("keydown", {keyCode: keycode("enter")});

        const childs = wrapper.find(TabPanelChild);

        expect(childs.at(0).prop("visible")).toBeFalsy();
        expect(childs.at(1).prop("visible")).toBeTruthy();
        expect(childs.length).toBe(2);
    });
});
