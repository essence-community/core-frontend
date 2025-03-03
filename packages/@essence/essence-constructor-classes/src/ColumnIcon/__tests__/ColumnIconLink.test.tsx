/* eslint-disable multiline-comment-style */
/* eslint-disable capitalized-comments */
import * as React from "react";
import {shallow} from "enzyme";
import {Icon} from "@essence-community/constructor-share/Icon";
import {getBaseBc, Renderer, createEmptyPageStore} from "@essence-community/constructor-share/utils/test";
import {ColumnIconLink} from "../components/ColumnIconLink";
import {ColumnIconContainer} from "../containers/ColumnIconContainer";

// Register
import "../../Button";

const bc = getBaseBc("COLUMN.ICON", {
    handler: "showMenu",
});

// eslint-disable-next-line max-statements, max-lines-per-function
describe("ColumnIconLink", () => {
    // $FlowFixMe
    // PageStore.applicationStore.redirectToAction = jest.fn();
    // // $FlowFixMe
    // PageStore.setPageInnerElAction(document.body);

    it("render", () => {
        // Const wrapper = mountWithTheme(<GridColumnLink {...props} />);
        // TODO переделать
        // @ts-ignore
        const wrapper = shallow(<Renderer bc={bc} component={ColumnIconContainer} />);

        expect(wrapper.find(Icon).length).toBe(1);
        expect(wrapper.find(ColumnIconLink).length).toBe(0);

        wrapper.unmount();
    });

    it("Проверка открытия меню", () => {
        // TODO переделать
        // @ts-ignore
        const wrapper = shallow(<Renderer bc={bc} component={ColumnIconContainer} />);

        wrapper.find(Icon).simulate("click");

        // expect(wrapper.find(ColumnIconLink).length).toBe(2);

        wrapper.unmount();
    });

    it.skip("Проверка открытия меню - hiddenrules ck_d_m для первой link", () => {
        // const wrapper = mountWithTheme(<GridColumnLink {...props} record={{ckDMo: 5}} />);
        // TODO переделать
        // @ts-ignore
        const wrapper = shallow(<Renderer bc={bc} component={ColumnIconContainer} />);

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(ColumnIconLink).length).toBe(2);

        wrapper.unmount();
    });

    it("Проверка закрытия меню по esc", () => {
        // TODO переделать
        // @ts-ignore
        const wrapper = shallow(<Renderer bc={bc} component={ColumnIconContainer} />);

        wrapper.find(Icon).simulate("click");

        // document.dispatchEvent(new KeyboardEvent("keydown", {keyCode: keycode("esc")}));
        wrapper.update();

        expect(wrapper.find(ColumnIconLink).length).toBe(0);

        wrapper.unmount();
    });

    // it("Проверка закрытия меню по клику на меню", () => {
    //     const wrapper = mountWithTheme(<GridColumnLink {...props} record={{[VAR_RECORD_ID]: 1}} />);

    //     wrapper.find(Icon).simulate("click");
    //     wrapper
    //         .find(ColumnIconLink)
    //         .at(0)
    //         .simulate("click");

    //     expect(wrapper.find(ColumnIconLink).length).toBe(0);
    //     expect(
    //         pageStore.applicationStore.redirectToAction,
    //     ).toHaveBeenLastCalledWith(gridBc.contextmenus[0].redirecturl.substring(4), {gckMo: 1, gckMoSelect: 1});

    //     wrapper.unmount();
    // });

    it("Проверка закрытия меню по скролу от pageStore", () => {
        const pageStore = createEmptyPageStore();
        // TODO переделать
        // @ts-ignore
        const wrapper = shallow(<Renderer bc={bc} component={ColumnIconContainer} pageStore={pageStore} />);

        wrapper.find(Icon).simulate("click");
        pageStore.fireScrollEvent();
        wrapper.update();

        expect(wrapper.find(ColumnIconLink).length).toBe(0);
        wrapper.update();

        wrapper.unmount();
    });
});
