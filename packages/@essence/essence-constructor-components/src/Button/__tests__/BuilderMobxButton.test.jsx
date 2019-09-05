// @flow
import * as React from "react";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Icon} from "@essence/essence-constructor-share/Icon";
import BuilderMobxButton, {BuilderMobxButtonBase} from "../BuilderMobxButton";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import topButtonJson from "../../../mocks/button/top-button.json";
import {sleep} from "../../utils/base";

const DEFAULT_SLEEP_TIME = 100;

// eslint-disable-next-line max-statements
describe("BuilderMobxButton", () => {
    const bc = camelCaseKeys(topButtonJson);
    const event = new Event("click");
    let pageStore = createEmptyPageStore();
    let parentStore = {};

    beforeEach(() => {
        parentStore = {
            customHandleAction: jest.fn(() => sleep(DEFAULT_SLEEP_TIME)),
            defaultHandlerBtnAction: jest.fn(() => sleep(DEFAULT_SLEEP_TIME)),
        };

        pageStore = createEmptyPageStore();
        pageStore.stores.set(bc.ckParent, parentStore);
        // $FlowFixMe
        pageStore.applicationStore.redirectToAction = jest.fn();
    });

    it("Рендер по умолчанию", () => {
        const wrapper = mountWithTheme(<BuilderMobxButton bc={bc} pageStore={pageStore} visible />);

        expect(wrapper.find(BuilderMobxButtonBase).length).toBe(1);
        expect(wrapper.find(Button).prop("color")).toBe("primary");
    });

    it("hidden - поле скрыто по умолчанию", () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={{...bc, hidden: "true"}} pageStore={pageStore} visible />,
        );

        expect(wrapper.find("button").length).toBe(0);
    });

    it("Проверяем нажатие на кнопку", async () => {
        const onClick = jest.fn();
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={bc} pageStore={pageStore} visible onClick={onClick}>
                <button />
            </BuilderMobxButton>,
        );

        wrapper.find("button").prop("onClick")();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);

        await wrapper.find("button").prop("onClick")();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledWith("1", bc, {});
    });

    it("Проверяем нажатие на кнопку по handleClick, остальные обработчики не работают", async () => {
        const handleClick = jest.fn();
        const onClick = jest.fn();

        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={bc} pageStore={pageStore} visible handleClick={handleClick} onClick={onClick} />,
        );

        await wrapper.find("button").prop("onClick")(event);

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledTimes(0);
        expect(handleClick).toHaveBeenCalledWith(event);
    });

    it("Проверяем нажатие на кнопку", async () => {
        const wrapper = mountWithTheme(<BuilderMobxButton bc={bc} pageStore={pageStore} visible />);

        wrapper.find("button").prop("onClick")();
        await sleep(0);

        wrapper.find("button").prop("onClick")();
        await sleep(0);

        wrapper.update();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    it("Проверяем нажатие на кнопку", async () => {
        const wrapper = mountWithTheme(<BuilderMobxButton bc={bc} pageStore={pageStore} visible />);

        wrapper.find("button").prop("onClick")();
        await sleep(0);

        wrapper.find("button").prop("onClick")();
        await sleep(0);

        wrapper.update();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
        expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    });

    it("Показывает окно подтверждения", async () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={{...bc, confirmquestion: "Продолжить?"}} pageStore={pageStore} visible />,
        );

        await wrapper.find("button").prop("onClick")();
        wrapper.update();

        expect(wrapper.find("button").length).toBe(3);
        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);

        await wrapper
            .find("button")
            .at(1)
            .prop("onClick")(new Event("click"));

        wrapper.update();

        expect(wrapper.find("button").length).toBe(1);
        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
    });

    it("Проверяем переход", async () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton
                bc={{...bc, columnsfilter: "g_cv_value", redirecturl: "123"}}
                pageStore={pageStore}
                visible
            />,
        );

        pageStore.globalValues.set("gCvValue", "10");

        await wrapper.find("button").prop("onClick")();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
        expect(pageStore.applicationStore.redirectToAction).toHaveBeenCalledWith("123", {gCvValue: "10"});
    });

    it("При disabled клик не проходит", async () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={{...bc, disabled: "true"}} pageStore={pageStore} visible />,
        );

        await wrapper.find("button").prop("onClick")();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
    });

    it("Запуск своего обработчика", async () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={{...bc, handler: "customHandleAction"}} pageStore={pageStore} visible />,
        );

        await wrapper.find("button").prop("onClick")();

        expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
        expect(parentStore.customHandleAction).toHaveBeenCalledTimes(1);
    });

    it("Проверка темы - uitype=1", () => {
        const wrapper = mountWithTheme(<BuilderMobxButton bc={{...bc, uitype: "1"}} pageStore={pageStore} visible />);

        expect(wrapper.find(Button).prop("color")).toBe("primary");
    });

    it("Проверка темы - uitype=2", () => {
        const wrapper = mountWithTheme(<BuilderMobxButton bc={{...bc, uitype: "2"}} pageStore={pageStore} visible />);

        expect(wrapper.find(Button).prop("color")).toBe("secondary");
    });

    it("Проверка темы - кастомный color", () => {
        const wrapper = mountWithTheme(<BuilderMobxButton bc={bc} color="inherit" pageStore={pageStore} visible />);

        expect(wrapper.find(Button).prop("color")).toBe("inherit");
    });

    it("Отображение в види иконки", () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={{...bc, onlyicon: "true"}} pageStore={pageStore} visible />,
        );

        expect(wrapper.find(Icon).length).toBe(1);
        expect(wrapper.find(IconButton).length).toBe(1);
        expect(wrapper.find(Button).length).toBe(0);
    });

    it("Отображение в види иконки, variant = fab, styleTheme = dark", () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton
                bc={{...bc, onlyicon: "true"}}
                variant="fab"
                styleTheme="dark"
                pageStore={pageStore}
                visible
            />,
        );

        expect(wrapper.find(Icon).length).toBe(1);
        expect(wrapper.find(IconButton).length).toBe(0);
        expect(wrapper.find(Button).length).toBe(1);
        expect(wrapper.find(Button).prop("variant")).toBe("fab");
        expect(wrapper.find(Button).prop("mini")).toBe(true);
    });

    it("Передача своих компонентов в качестве children", () => {
        const wrapper = mountWithTheme(
            <BuilderMobxButton bc={{...bc, disabled: "true"}} pageStore={pageStore} visible>
                <a href="test">test</a>
            </BuilderMobxButton>,
        );

        expect(wrapper.find("a").length).toBe(1);
        expect(wrapper.find("a").prop("disabled")).toBe(true);
    });
});
