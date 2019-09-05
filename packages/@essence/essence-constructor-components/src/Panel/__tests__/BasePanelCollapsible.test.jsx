// @flow
import * as React from "react";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {mountWithTheme} from "../../utils/test";
import BasePanelCollapsible, {BasePanelCollapsibleBase} from "../BasePanelCollapsible";
import Panel from "../Panel/Panel";
import panelMock from "../../../mocks/panel/panel";
import {createEmptyPageStore} from "../../stores/index";

describe("BasePanelCollapsible", () => {
    const panelProps = {
        bc: panelMock,
        pageStore: createEmptyPageStore(),
    };
    const renderBasePanel = () => <Panel {...panelProps} />;
    const props = {
        bc: {},
        renderBasePanel,
    };

    it("render", () => {
        const wrapper = mountWithTheme(<BasePanelCollapsible {...props} />);

        expect(wrapper.exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("change Collapse по нажитию мыши", () => {
        const wrapper = mountWithTheme(<BasePanelCollapsible {...props} />);

        wrapper.find(Icon).simulate("click");
        wrapper.update();
        expect(wrapper.find(Icon).prop("iconfont")).toBe("angle-down");
        wrapper.unmount();
    });
    it("change Collapse по нажитию мыш enter", () => {
        const wrapper = mountWithTheme(<BasePanelCollapsible {...props} />);

        wrapper.find(Icon).simulate("keyDown", {keyCode: 13});
        wrapper.update();
        expect(wrapper.find(Icon).prop("iconfont")).toBe("angle-down");
        wrapper.unmount();
    });

    it("check onExpand if already true", () => {
        const renderPanel = ({onExpand}) => <Icon iconfont="add" onClick={onExpand} />;
        const wrapper = mountWithTheme(<BasePanelCollapsible bc={{}} renderBasePanel={renderPanel} />);

        expect(wrapper.find(BasePanelCollapsibleBase).instance().state.in).toBeTruthy();

        wrapper
            .find({iconfont: "add"})
            .find(Icon)
            .simulate("click");

        expect(wrapper.find(BasePanelCollapsibleBase).instance().state.in).toBeTruthy();
    });

    it("check onExpand if false", () => {
        const renderPanel = ({onExpand}) => <Icon iconfont="add" onClick={onExpand} />;
        const wrapper = mountWithTheme(<BasePanelCollapsible bc={{collapsed: "true"}} renderBasePanel={renderPanel} />);

        expect(wrapper.find(BasePanelCollapsibleBase).instance().state.in).toBeFalsy();

        wrapper
            .find({iconfont: "add"})
            .find(Icon)
            .simulate("click");

        expect(wrapper.find(BasePanelCollapsibleBase).instance().state.in).toBeTruthy();
    });
});
