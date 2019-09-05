// @flow
import * as React from "react";
import camelCase from "lodash/camelCase";
import {createEmptyPageStore} from "../../stores/index";
import {mountWithTheme} from "../../utils/test";
import BuilderHistoryPanel, {BaseBuilderHistoryPanel} from "../BuilderHistoryPanel";
import BuilderPanelEditingButtons from "../../Panel/BuilderPanelEditingButtons/BuilderPanelEditingButtons";
import WindowMessageButton from "../../WindowMessage/WindowMessageButton";
import GridAudit from "../../Grid/GridComponents/GridAudit";
import testHistoryBc from "../__mock__/testHistoryBc";

import "../../TextField/BuilderField";

const mountPanel = (props) => {
    const pageStore = createEmptyPageStore();
    const wrapper = mountWithTheme(
        <BuilderHistoryPanel bc={testHistoryBc} readOnly={false} visible pageStore={pageStore} {...props} />,
    );

    const store = wrapper.find(BaseBuilderHistoryPanel).prop("store");

    return {pageStore, store, wrapper};
};

// eslint-disable-next-line max-statements
describe("BuilderHistoryPanel", () => {
    const indexPrevButton = 5;
    const indexNextButton = 6;
    const columnFirst = camelCase(testHistoryBc.childs[0].column);
    const records = [{ckId: 1, [columnFirst]: "test1"}, {ckId: 2, [columnFirst]: "test2"}];
    const buttonVisibilityNonSelected = [false, true, true, true, false, true, true, true];
    const buttonVisibilityFirstSelected = [false, false, false, false, false, false, true, false];
    const buttonVisibilitySecondSelected = [false, true, false, true, false, true, false, false];

    const mountWithFirstRecord = () => {
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(
            <BuilderHistoryPanel bc={testHistoryBc} readOnly={false} visible pageStore={pageStore} elevation={1} />,
        );
        const store = pageStore.stores.get(testHistoryBc.ckPageObject);

        if (store) {
            ["saveAction", "loadRecordsAction"].forEach((actionName) => {
                store.recordsStore[actionName] = jest.fn(() => true);
            });

            store.recordsStore.setRecordsAction(records);
            store.recordsStore.setFirstRecord();
            wrapper.update();
        }

        return {pageStore, store, wrapper};
    };

    it("render", () => {
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(
            <BuilderHistoryPanel bc={testHistoryBc} readOnly={false} visible pageStore={pageStore} elevation={1} />,
        );

        expect(wrapper.find(BuilderHistoryPanel).length).toBe(1);
        expect(wrapper.find("button").length).toBe(buttonVisibilityNonSelected.length);
        expect(wrapper.find(GridAudit).length).toBe(1);

        wrapper.unmount();
    });

    it("Доступность кнопок", () => {
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(
            <BuilderHistoryPanel bc={testHistoryBc} readOnly={false} visible pageStore={pageStore} elevation={1} />,
        );
        const store = pageStore.stores.get(testHistoryBc.ckPageObject);

        wrapper.update();

        expect(wrapper.find("button").map((button) => button.prop("disabled"))).toEqual(buttonVisibilityNonSelected);

        store && store.recordsStore.setRecordsAction(records);

        [[1, buttonVisibilityFirstSelected], [2, buttonVisibilitySecondSelected]].forEach(
            ([ckId, buttonVisibility]) => {
                store && store.recordsStore.setSelectionAction(ckId);
                wrapper.update();

                expect(wrapper.find("button").map((button) => button.prop("disabled"))).toEqual(buttonVisibility);
            },
        );
    });

    it("При добавлении форма сбрасывается", async () => {
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(
            <BuilderHistoryPanel bc={testHistoryBc} readOnly={false} visible pageStore={pageStore} elevation={1} />,
        );
        const store = pageStore.stores.get(testHistoryBc.ckPageObject);

        store && store.recordsStore.setRecordsAction(records);
        store && store.recordsStore.setFirstRecord();
        wrapper.update();

        expect(wrapper.find(`input[name="${columnFirst}"]`).prop("value")).toBe("test1");

        await wrapper
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        wrapper.update();

        expect(wrapper.find(`input[name="${columnFirst}"]`).prop("value")).toBe("");
    });

    it("Редактирование записи", async () => {
        const {store, wrapper} = mountWithFirstRecord();

        // Редактирование
        await wrapper
            .find("button")
            .at(1)
            .prop("onClick")(new Event("click"));

        wrapper.find(`input[name="${columnFirst}"]`).simulate("change", {target: {value: "update"}});

        await wrapper
            .find(BuilderPanelEditingButtons)
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        expect(store && store.recordsStore.saveAction).toHaveBeenLastCalledWith(
            {ckId: 1, [columnFirst]: "update"},
            "2",
            {
                actionBc: store && store.btnsConfig.overrides["Override Save Button"],
                query: undefined,
            },
        );
    });

    it("При отмене редактирования делаем сброс в начальное состояние", async () => {
        const {wrapper} = mountWithFirstRecord();

        // Редактирование
        await wrapper
            .find("button")
            .at(1)
            .prop("onClick")(new Event("click"));

        wrapper.update();

        expect(wrapper.find(`input[name="${columnFirst}"]`).prop("disabled")).toBe(false);
        wrapper.find(`input[name="${columnFirst}"]`).simulate("change", {target: {value: "update"}});

        // Отмена редактирования
        wrapper
            .find(BuilderPanelEditingButtons)
            .find("button")
            .at(1)
            .simulate("click");

        // Подтверждение отмены
        wrapper
            .find(BuilderPanelEditingButtons)
            .find("button")
            .at(2)
            .simulate("click");

        expect(wrapper.find(`input[name="${columnFirst}"]`).prop("value")).toBe("test1");
    });

    it("Create a new history", async () => {
        const {store, wrapper} = mountPanel();

        store.recordsStore.saveAction = jest.fn(() => true);

        await wrapper
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        wrapper.find(`input[name="${columnFirst}"]`).simulate("change", {target: {value: "test"}});

        await wrapper
            .find(BuilderPanelEditingButtons)
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        expect(store.recordsStore.saveAction).toHaveBeenLastCalledWith({ckId: "", [columnFirst]: "test"}, "1", {
            actionBc: store && store.btnsConfig.overrides["Override Save Button"],
            query: undefined,
        });
        expect(wrapper.find(BuilderHistoryPanel).length).toBe(1);

        wrapper.unmount();
    });

    it("Клонирование записи", async () => {
        const {store, wrapper} = mountWithFirstRecord();

        // Клонирование
        await wrapper
            .find("button")
            .at(2)
            .prop("onClick")(new Event("click"));

        wrapper.find(`input[name="${columnFirst}"]`).simulate("change", {target: {value: "update"}});

        await wrapper
            .find(BuilderPanelEditingButtons)
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        expect(store && store.recordsStore.saveAction).toHaveBeenLastCalledWith(
            {ckId: 1, [columnFirst]: "update"},
            "6",
            {
                actionBc: store && store.btnsConfig.overrides["Override Save Button"],
                query: undefined,
            },
        );
    });

    it("Удаление записи", async () => {
        const {store, wrapper} = mountWithFirstRecord();

        // Удаление
        wrapper
            .find("button")
            .at(3)
            .simulate("click");

        // Подтверждение
        await wrapper
            .find(WindowMessageButton)
            .find("button")
            .at(1)
            .prop("onClick")(new Event("click"));

        expect(store && store.recordsStore.saveAction).toHaveBeenLastCalledWith(
            {ckId: 1, [columnFirst]: "test1"},
            "3",
            {
                actionBc: store && store.btnsConfig.overrides["Override Delete Button"],
            },
        );
    });

    it("Обновление записи", async () => {
        const {store, wrapper} = mountWithFirstRecord();

        // Обновление
        await wrapper
            .find("button")
            .at(4)
            .prop("onClick")(new Event("click"));

        expect(store && store.recordsStore.loadRecordsAction).toHaveBeenCalledTimes(1);
    });

    it("Переход между записями", async () => {
        const {store, wrapper} = mountWithFirstRecord();

        // Переход записи влево
        await wrapper
            .find("button")
            .at(indexPrevButton)
            .prop("onClick")(new Event("click"));

        expect(store && store.selectedRecord).toBe(records[1]);

        wrapper.update();

        // Переход записи вправа
        await wrapper
            .find("button")
            .at(indexNextButton)
            .prop("onClick")(new Event("click"));

        expect(store && store.selectedRecord).toBe(records[0]);
    });

    it("Обновление записи", async () => {
        const {store, wrapper} = mountWithFirstRecord();

        // Обновление
        await wrapper
            .find("button")
            .at(4)
            .prop("onClick")(new Event("click"));

        expect(store && store.recordsStore.loadRecordsAction).toHaveBeenCalledTimes(1);
    });
});
