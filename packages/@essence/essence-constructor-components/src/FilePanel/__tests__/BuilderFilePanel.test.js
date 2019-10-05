/* eslint-disable max-statements */
// @flow
import * as React from "react";
import {mountShallowWithTheme} from "../../utils/test";
import {BaseBuilderFilePanel} from "../BuilderFilePanel";
import {createEmptyPageStore} from "../../stores";
import type {PageModelType} from "../../stores/PageModel";
import {FileRecordBase} from "../FileRecord/FileRecord";
import {BuilderMobxButtonBase} from "../../Button/BuilderMobxButton";
import {FileInput} from "../../FileInput/FileInput";

type FilePanelPropsType = {
    pageStore: PageModelType,
};

const BuilderPage = () => null;

describe("BuilderFilePanel", () => {
    const getWrapper = ({pageStore}: FilePanelPropsType) =>
        mountShallowWithTheme(<BuilderPage pageStore={pageStore} visible />);

    it("render", async () => {
        const pageStore = createEmptyPageStore();

        await pageStore.loadConfigAction("file_panel_page", "");
        const wrapper = getWrapper({pageStore});

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BaseBuilderFilePanel)).toBeTruthy();
        wrapper.unmount();
    });

    it("Render FileRecord line", async () => {
        const pageStore = createEmptyPageStore();

        await pageStore.loadConfigAction("file_panel_page", "");
        const wrapper = getWrapper({pageStore});
        const store = wrapper.find(BaseBuilderFilePanel).prop("store");

        await store.reloadStoreAction();
        expect(wrapper.find(FileRecordBase)).toBeTruthy();
        wrapper.unmount();
    });

    it("Call Button add file", async () => {
        const pageStore = createEmptyPageStore();

        await pageStore.loadConfigAction("file_panel_page", "");
        const wrapper = getWrapper({pageStore});

        const blob = new Blob(["foo"], {type: "text/plain"});

        await wrapper.find("button").prop("onClick")(new Event("click"));
        wrapper.update();

        const btn = wrapper.find(BuilderMobxButtonBase).at(1);

        await btn.find("button").prop("onClick")(new Event("click"));
        const spyOnvalidateFile = jest.spyOn(btn.state("fileInputStore"), "validateFile");

        await wrapper
            .find(FileInput)
            .find("input")
            .simulate("change", {target: {files: [blob]}});

        expect(spyOnvalidateFile).toHaveBeenCalledWith(blob);
        wrapper.unmount();
    });
});
