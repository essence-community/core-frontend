// @flow
import * as React from "react";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores/index";
import BuilderBasePanel from "../BuilderBasePanel";
import BuilderForm from "../../Form/BuilderForm";
import BasePanelCollapsible from "../BasePanelCollapsible";
import {BuilderFormPanelBase} from "../BuilderFormPanel";
import panelMock from "../../../mocks/panel/panel";

describe("BuilderFormPanel", () => {
    const props = {
        bc: panelMock,
        pageStore: createEmptyPageStore(),
        visible: true,
    };

    it("render", () => {
        const wrapper = mountWithTheme(
            <BuilderForm pageStore={props.pageStore}>
                <BuilderBasePanel {...props} />
            </BuilderForm>,
        );

        expect(wrapper.exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("collapsible=true", () => {
        const wrapper = mountWithTheme(
            <BuilderForm pageStore={props.pageStore}>
                <BuilderBasePanel
                    {...props}
                    bc={{...props.bc, collapsible: "true"}}
                    hidden={false}
                    readOnly={false}
                    editing={true}
                />
            </BuilderForm>,
        );

        expect(wrapper.find(BasePanelCollapsible).exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("render BuilderFormPanel ", () => {
        const wrapper = mountWithTheme(<BuilderBasePanel {...props} bc={{...props.bc, editmodepanel: "true"}} />);

        expect(wrapper.find(BuilderFormPanelBase).exists()).toBeTruthy();
        wrapper.unmount();
    });
});
