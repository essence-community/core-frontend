/*
 *Import * as React from "react";
 *import {mountWithTheme, getBaseBc} from "../../../../essence-constructor-components/src/utils/test";
 *import {createEmptyPageStore} from "../../../../essence-constructor-components/src/stores";
 *import BuilderForm from "../../Form/BuilderForm";
 *import BuilderField from "../../../../essence-constructor-components/src/TextField/BuilderField";
 *import BuilderPanelDynamic, {BaseBuilderPanelDynamic} from "../BuilderPanelDynamic";
 *
 *describe("BuilderPanelDynamic", () => {
 *    const pageStore = createEmptyPageStore();
 *    const bc = {
 *        ...getBaseBc("dynamic"),
 *        childs: [
 *            {...getBaseBc("text"), datatype: "text", type: "IFIELD"},
 *            {...getBaseBc("NOT_IMPLEMENTED"), type: "NOT_IMPLEMENTED"},
 *        ],
 *        type: "DYNAMICPANEL",
 *    };
 *
 *    it("render", () => {
 *        const wrapper = mountWithTheme(
 *            <BuilderForm pageStore={pageStore} noForm>
 *                <BuilderPanelDynamic bc={bc} pageStore={pageStore} visible />
 *            </BuilderForm>,
 *        );
 *        const store = wrapper.find(BaseBuilderPanelDynamic).prop("store");
 *
 *        store.recordsStore.setRecordsAction(bc.childs);
 *
 *        wrapper.update();
 *
 *        expect(wrapper.find(BuilderField).length).toBe(1);
 *
 *        wrapper.unmount();
 *    });
 *
 *    it("render hidden", () => {
 *        const wrapper = mountWithTheme(
 *            <BuilderForm pageStore={pageStore} noForm>
 *                <BuilderPanelDynamic bc={bc} pageStore={pageStore} visible hidden />
 *            </BuilderForm>,
 *        );
 *        const store = wrapper.find(BaseBuilderPanelDynamic).prop("store");
 *
 *        store.recordsStore.setRecordsAction(bc.childs);
 *
 *        wrapper.update();
 *
 *        expect(wrapper.find(BuilderField).length).toBe(0);
 *
 *        wrapper.unmount();
 *    });
 *});
 */
