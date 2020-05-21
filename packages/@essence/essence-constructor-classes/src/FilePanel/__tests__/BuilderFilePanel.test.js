/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable import/namespace */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import {mountShallowWithTheme} from "../../../../essence-constructor-components/src/utils/test";
import {BaseBuilderFilePanel} from "../../../../essence-constructor-components/src/FilePanel/BuilderFilePanel";
import {createEmptyPageStore} from "../../stores";
import {FileRecordBase} from "../../../../essence-constructor-components/src/FilePanel/FileRecord/FileRecord";
import {BuilderMobxButtonBase} from "../../Button/BuilderMobxButton";
import {FileInput} from "../../../../essence-constructor-components/src/FileInput/FileInput";

const BuilderPage = () => null;

// eslint-disable-next-line max-lines-per-function
describe("BuilderFilePanel", () => {
    const getWrapper = ({pageStore}) => mountShallowWithTheme(<BuilderPage pageStore={pageStore} visible />);

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
