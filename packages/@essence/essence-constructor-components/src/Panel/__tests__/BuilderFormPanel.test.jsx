// @flow
import * as React from "react";
import {Button, Paper} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {when} from "mobx";
import BuilderFormPanel, {BuilderFormPanelBase} from "../BuilderFormPanel";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import BuilderPanelEditingButtons from "../BuilderPanelEditingButtons/BuilderPanelEditingButtons";
import type {PanelFormModelType} from "../../stores/PanelFormModel";
import {createEmptyPageStore} from "../../stores/index";
import {mountWithTheme} from "../../utils/test";

// eslint-disable-next-line max-lines-per-function
describe("BuilderFormPanel", () => {
    const filterBc = {
        childs: [],
        ckObject: "filter",
        ckPageObject: "filter",
        ckParent: "80A90C83CC266D04E053809BA8C09488",
        cvDescription: "Фильтр организаций",
        cvName: "Filters Panel",
        dynamicfilter: "false",
        type: "FILTERPANEL",
    };

    const topbtn = [
        {
            ckObject: "80801872FBB95CBCE053809BA8C0FDC6",
            ckPage: "3213839494951",
            ckPageObject: "80A90C83CC286D04E053809BA8C09488",
            ckParent: "80A90C83CC266D04E053809BA8C09488",
            clDataset: "0",
            cvDescription: "add",
            cvDisplayed: "add",
            cvName: "add",
            iconfontname: "fa",
            mode: "1",
            reqsel: "false",
            type: "BTN",
            uitype: "1",
        },
    ];

    const props = {
        bc: {
            ckObject: "80801872FBB55CBCE053809BA8C0FDC6",
            ckPage: "3213839494951",
            ckPageObject: "80A90C83CC266D04E053809BA8C09488",
            cvName: "Test textarea",
            type: "PANEL",
        },
        pageStore: createEmptyPageStore(),
        visible: true,
    };

    it("render", () => {
        const wrapper = mountWithTheme(
            <BuilderFormPanel {...props} pageStore={createEmptyPageStore({styleTheme: "dark"})} />,
        );

        expect(wrapper.exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("elevetation exist", () => {
        const wrapper = mountWithTheme(<BuilderFormPanel elevation={1} {...props} />);

        expect(wrapper.find(Paper).exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("render  editing=true", async () => {
        const wrapper = mountWithTheme(<BuilderFormPanel {...props} bc={{...props.bc, topbtn}} readOnly={false} />);
        const store: PanelFormModelType = wrapper.find(BuilderFormPanelBase).prop("store");

        wrapper.find(Button).simulate("click");
        await when(() => store.editing);

        wrapper.update();
        expect(wrapper.find(BuilderPanelEditingButtons).exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("render  editing=false", () => {
        const wrapper = mountWithTheme(<BuilderFormPanel {...props} bc={{...props.bc, topbtn}} readOnly={true} />);

        expect(wrapper.find(BuilderMobxButton).exists()).toBeTruthy();
        wrapper.unmount();
    });

    it("change collapse for filter", async () => {
        const wrapper = mountWithTheme(
            <BuilderFormPanel
                {...props}
                bc={{...props.bc, childs: [], filters: [filterBc], topbtn}}
                pageStore={createEmptyPageStore({styleTheme: "dark"})}
            />,
        );
        const store = wrapper.find(BuilderFormPanelBase).prop("store");
        const spyOnToggleIsFilterOpen = jest.spyOn(store, "toggleIsFilterOpen");

        expect(wrapper.find(Icon).length).toBe(3);

        await wrapper
            .find(Icon)
            .at(0)
            .simulate("click");
        expect(spyOnToggleIsFilterOpen).toHaveBeenLastCalledWith();
    });
});
