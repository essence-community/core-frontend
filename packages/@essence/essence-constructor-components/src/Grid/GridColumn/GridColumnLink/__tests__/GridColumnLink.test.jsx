// @flow
import * as React from "react";
import keycode from "keycode";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {mountWithTheme} from "../../../../utils/test";
import {createEmptyPageStore} from "../../../../stores";
import gridBc from "../../../../../mocks/fields/gridlinks.json";
import GridColumnLink from "../GridColumnLink";
import GridColumnLinkItem from "../GridColumnLinkItem";

// eslint-disable-next-line max-statements
describe("GridColumnLink", () => {
    const pageStore = createEmptyPageStore();
    const icon = <Icon iconfont="close" />;
    const props = {
        bc: {},
        gridBc,
        iconComponent: icon,
        pageStore,
        visible: true,
    };

    // $FlowFixMe
    pageStore.applicationStore.redirectToAction = jest.fn();
    // $FlowFixMe
    pageStore.setPageInnerElAction(document.body);

    it("render", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} />);

        expect(wrapper.find(Icon).length).toBe(1);
        expect(wrapper.find(GridColumnLinkItem).length).toBe(0);

        wrapper.unmount();
    });

    it("hidden = true", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} hidden />);

        expect(wrapper.find(Icon).length).toBe(0);

        wrapper.unmount();
    });

    it("Проверка открытия меню", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} />);

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(GridColumnLinkItem).length).toBe(2);

        wrapper.unmount();
    });

    it("Проверка открытия меню - hiddenrules ck_d_m для первой link", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} record={{ckDMo: 5}} />);

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(GridColumnLinkItem).length).toBe(2);

        wrapper.unmount();
    });

    it("Проверка закрытия меню по esc", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} />);

        wrapper.find(Icon).simulate("click");

        document.dispatchEvent(new KeyboardEvent("keydown", {keyCode: keycode("esc")}));
        wrapper.update();

        expect(wrapper.find(GridColumnLinkItem).length).toBe(0);

        wrapper.unmount();
    });

    it("Проверка закрытия меню по клику на меню", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} record={{ckId: 1}} />);

        wrapper.find(Icon).simulate("click");
        wrapper
            .find(GridColumnLinkItem)
            .at(0)
            .simulate("click");

        expect(wrapper.find(GridColumnLinkItem).length).toBe(0);
        expect(pageStore.applicationStore.redirectToAction).toHaveBeenLastCalledWith(
            gridBc.contextmenus[0].redirecturl.substring(4),
            {gckMo: 1, gckMoSelect: 1},
        );

        wrapper.unmount();
    });

    it("Проверка закрытия меню по скролу от pageStore", () => {
        const wrapper = mountWithTheme(<GridColumnLink {...props} />);

        wrapper.find(Icon).simulate("click");
        pageStore.fireScrollEvent();
        wrapper.update();

        expect(wrapper.find(GridColumnLinkItem).length).toBe(0);
        wrapper.update();

        wrapper.unmount();
    });
});
