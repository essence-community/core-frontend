// @flow
import * as React from "react";
import {when} from "mobx";
import BuilderGrid from "../../Grid/BuilderGrid";
import GridRow from "../../Grid/Row/BaseGridRow";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import {mountWithTheme} from "../../utils/test";
import itemselectorJson from "../../../mocks/fields/itemselector.json";
import dImprovementJson from "../../../mocks/data/DImprovement.json";
import mOShowMOImprovementJson from "../../../mocks/data/MOShowMOImprovement.json";
import {createEmptyPageStore} from "../../stores/index";
import FieldItemSelector, {FieldItemSelectorBase} from "../FieldItemSelector";

export const sleep = (time: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, time);
    });

const getStores = async (store, {fieldFrom, fieldTo}) => {
    const [fromStore, toStore] = store.getStores({fieldFrom, fieldTo});

    await when(() => !fromStore.recordsStore.isLoading && !toStore.recordsStore.isLoading);

    return [fromStore, toStore];
};

// eslint-disable-next-line max-lines-per-function
describe("FieldItemSelector", () => {
    const [fieldFrom, fieldTo] = itemselectorJson.childs;
    const pageStore = createEmptyPageStore();

    it("render", () => {
        const wrapper = mountWithTheme(<FieldItemSelector bc={itemselectorJson} pageStore={pageStore} visible />);
        const itemSelector = wrapper.find(FieldItemSelectorBase);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BuilderMobxButton)).toHaveLength(4);
        expect(itemSelector.instance().disposers).toHaveLength(2);

        wrapper.unmount();
    });

    it("Проверяем выбор всех значений", async () => {
        const wrapper = mountWithTheme(<FieldItemSelector bc={itemselectorJson} pageStore={pageStore} visible />);
        const {store} = wrapper.find(FieldItemSelectorBase).props();
        const [fromStore, toStore] = await getStores(store, {fieldFrom, fieldTo});

        const saveStatus = await wrapper
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        expect(saveStatus).toBeTruthy();
        expect(fromStore.recordsStore.records).toHaveLength(0);
        expect(toStore.recordsStore.records).toHaveLength(dImprovementJson.length);

        wrapper.unmount();
    });

    it("Проверяем удаление всех значений", async () => {
        const wrapper = mountWithTheme(<FieldItemSelector bc={itemselectorJson} pageStore={pageStore} visible />);
        const {store} = wrapper.find(FieldItemSelectorBase).props();
        const [fromStore, toStore] = await getStores(store, {fieldFrom, fieldTo});

        const saveStatus = await wrapper
            .find("button")
            .at(3)
            .prop("onClick")(new Event("click"));

        expect(saveStatus).toBeTruthy();
        expect(fromStore.recordsStore.records).toHaveLength(dImprovementJson.length);
        expect(toStore.recordsStore.records).toHaveLength(0);

        wrapper.unmount();
    });

    it("Выбор первого значения", async () => {
        const wrapper = mountWithTheme(<FieldItemSelector bc={itemselectorJson} pageStore={pageStore} visible />);
        const {store} = wrapper.find(FieldItemSelectorBase).props();
        const [fromStore, toStore] = await getStores(store, {fieldFrom, fieldTo});

        wrapper
            .update()
            .find(BuilderGrid)
            .at(0)
            .find(GridRow)
            .at(0)
            .simulate("click");

        const saveStatus = await wrapper
            .find("button")
            .at(1)
            .prop("onClick")(new Event("click"));

        expect(saveStatus).toBeTruthy();
        expect(fromStore.recordsStore.records).toHaveLength(
            dImprovementJson.length - mOShowMOImprovementJson.length - 1,
        );
        expect(toStore.recordsStore.records).toHaveLength(mOShowMOImprovementJson.length + 1);

        wrapper.unmount();
    });

    it("Удаление первого значения", async () => {
        const wrapper = mountWithTheme(<FieldItemSelector bc={itemselectorJson} pageStore={pageStore} visible />);
        const {store} = wrapper.find(FieldItemSelectorBase).props();
        const [fromStore, toStore] = await getStores(store, {fieldFrom, fieldTo});

        wrapper
            .update()
            .find(BuilderGrid)
            .at(1)
            .find(GridRow)
            .at(0)
            .simulate("click");

        const saveStatus = await wrapper
            .find("button")
            .at(2)
            .prop("onClick")(new Event("click"));

        expect(saveStatus).toBeTruthy();
        expect(fromStore.recordsStore.records).toHaveLength(
            dImprovementJson.length - mOShowMOImprovementJson.length + 1,
        );
        expect(toStore.recordsStore.records).toHaveLength(mOShowMOImprovementJson.length - 1);

        wrapper.unmount();
    });
});
