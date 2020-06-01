/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
import * as React from "react";
import {Button, IconButton} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {shallow} from "enzyme";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {ButtonContainer} from "../containers/ButtonContainer";

// eslint-disable-next-line max-statements, max-lines-per-function
describe("ButtonContainer", () => {
    const bc = getBaseBc("BTN");

    // beforeEach(() => {
    //     parentStore = {
    //         customHandleAction: jest.fn(() => sleep(DEFAULT_SLEEP_TIME)),
    //         defaultHandlerBtnAction: jest.fn(() => sleep(DEFAULT_SLEEP_TIME)),
    //     };

    //     pageStore = createEmptyPageStore();
    //     pageStore.stores.set(bc[VAR_RECORD_PARENT_ID], parentStore);
    //     // $FlowFixMe
    //     pageStore.applicationStore.redirectToAction = jest.fn();
    // });

    it("Рендер по умолчанию", () => {
        const wrapper = shallow(<Renderer bc={bc} component={ButtonContainer} />);

        expect(wrapper.find(Button).length).toBe(1);
        expect(wrapper.find(Button).prop("color")).toBe("primary");
    });

    // it("hidden - поле скрыто по умолчанию", () => {
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton bc={{...bc, hidden: "true"}} pageStore={pageStore} visible />,
    //     );

    //     expect(wrapper.find("button").length).toBe(0);
    // });

    // it("Проверяем нажатие на кнопку", async () => {
    //     const onClick = jest.fn();
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton bc={bc} pageStore={pageStore} visible onClick={onClick}>
    //             <button />
    //         </BuilderMobxButton>,
    //     );

    //     wrapper.find("button").prop("onClick")();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);

    //     await wrapper.find("button").prop("onClick")();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
    //     expect(onClick).toHaveBeenCalledTimes(1);
    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledWith("1", bc, {});
    // });

    // it("Проверяем нажатие на кнопку по handleClick, остальные обработчики не работают", async () => {
    //     const handleClick = jest.fn();
    //     const onClick = jest.fn();

    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton bc={bc} pageStore={pageStore} visible handleClick={handleClick} onClick={onClick} />,
    //     );

    //     await wrapper.find("button").prop("onClick")(event);

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
    //     expect(handleClick).toHaveBeenCalledTimes(1);
    //     expect(onClick).toHaveBeenCalledTimes(0);
    //     expect(handleClick).toHaveBeenCalledWith(event);
    // });

    // it("Проверяем нажатие на кнопку", async () => {
    //     const wrapper = mountWithTheme(<BuilderMobxButton bc={bc} pageStore={pageStore} visible />);

    //     wrapper.find("button").prop("onClick")();
    //     await sleep(0);

    //     wrapper.find("button").prop("onClick")();
    //     await sleep(0);

    //     wrapper.update();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
    //     expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    // });

    // it("Проверяем нажатие на кнопку", async () => {
    //     const wrapper = mountWithTheme(<BuilderMobxButton bc={bc} pageStore={pageStore} visible />);

    //     wrapper.find("button").prop("onClick")();
    //     await sleep(0);

    //     wrapper.find("button").prop("onClick")();
    //     await sleep(0);

    //     wrapper.update();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
    //     expect(wrapper.find("button").prop("disabled")).toBeTruthy();
    // });

    // it("Показывает окно подтверждения", async () => {
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton bc={{...bc, confirmquestion: "Продолжить?"}} pageStore={pageStore} visible />,
    //     );

    //     await wrapper.find("button").prop("onClick")();
    //     wrapper.update();

    //     expect(wrapper.find("button").length).toBe(3);
    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);

    //     await wrapper
    //         .find("button")
    //         .at(1)
    //         .prop("onClick")(new Event("click"));

    //     wrapper.update();

    //     expect(wrapper.find("button").length).toBe(1);
    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(1);
    // });

    // it("Проверяем переход", async () => {
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton
    //             bc={{...bc, columnsfilter: "g_cv_value", redirecturl: "123"}}
    //             pageStore={pageStore}
    //             visible
    //         />,
    //     );

    //     pageStore.globalValues.set("gCvValue", "10");

    //     await wrapper.find("button").prop("onClick")();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
    //     expect(pageStore.applicationStore.redirectToAction).toHaveBeenCalledWith("123", {gCvValue: "10"});
    // });

    // it("При disabled клик не проходит", async () => {
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton bc={{...bc, disabled: "true"}} pageStore={pageStore} visible />,
    //     );

    //     await wrapper.find("button").prop("onClick")();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
    // });

    // it("Запуск своего обработчика", async () => {
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton bc={{...bc, handler: "customHandleAction"}} pageStore={pageStore} visible />,
    //     );

    //     await wrapper.find("button").prop("onClick")();

    //     expect(parentStore.defaultHandlerBtnAction).toHaveBeenCalledTimes(0);
    //     expect(parentStore.customHandleAction).toHaveBeenCalledTimes(1);
    // });

    it("Проверка темы - uitype=1", () => {
        const wrapper = shallow(<Renderer bc={{...bc, uitype: "1"}} component={ButtonContainer} />);

        expect(wrapper.find(Button).prop("color")).toBe("primary");
    });

    it("Проверка темы - uitype=2", () => {
        const wrapper = shallow(<Renderer bc={{...bc, uitype: "2"}} component={ButtonContainer} />);

        expect(wrapper.find(Button).prop("color")).toBe("secondary");
    });

    it("Отображение в види иконки", () => {
        const wrapper = shallow(<Renderer bc={{...bc, onlyicon: true}} component={ButtonContainer} />);

        expect(wrapper.find(Icon).length).toBe(1);
        expect(wrapper.find(IconButton).length).toBe(1);
        expect(wrapper.find(Button).length).toBe(0);
    });

    // it("Отображение в види иконки, variant = fab, styleTheme = dark", () => {
    //     const wrapper = mountWithTheme(
    //         <BuilderMobxButton
    //             bc={{...bc, onlyicon: "true"}}
    //             variant="fab"
    //             styleTheme="dark"
    //             pageStore={pageStore}
    //             visible
    //         />,
    //     );

    //     expect(wrapper.find(Icon).length).toBe(1);
    //     expect(wrapper.find(IconButton).length).toBe(0);
    //     expect(wrapper.find(Button).length).toBe(1);
    //     expect(wrapper.find(Button).prop("variant")).toBe("fab");
    //     expect(wrapper.find(Button).prop("mini")).toBe(true);
    // });
});
