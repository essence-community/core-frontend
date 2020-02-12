// @flow
import * as React from "react";
import {Button, Paper} from "@material-ui/core";
import {Icon} from "@essence-community/constructor-share/Icon";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CV_DESCRIPTION,
    VAR_RECORD_CL_DATASET,
} from "@essence-community/constructor-share/constants";
import {when} from "mobx";
import BuilderFormPanel from "../BuilderFormPanel";
import {BuilderFormPanelBase} from "../BuilderFormPanel/BuilderFormPanel";
import BuilderMobxButton from "../../Button/BuilderMobxButton";
import BuilderPanelEditingButtons from "../BuilderPanelEditingButtons/BuilderPanelEditingButtons";
import type {PanelFormModelType} from "../../stores/PanelFormModel";
import {createEmptyPageStore} from "../../stores/index";
import {mountWithTheme} from "../../utils/test";

// eslint-disable-next-line max-lines-per-function
describe("BuilderFormPanel", () => {
    const filterBc = {
        [VAR_RECORD_CV_DESCRIPTION]: "Фильтр организаций",
        [VAR_RECORD_NAME]: "Filters Panel",
        [VAR_RECORD_OBJECT_ID]: "filter",
        [VAR_RECORD_PAGE_OBJECT_ID]: "filter",
        [VAR_RECORD_PARENT_ID]: "80A90C83CC266D04E053809BA8C09488",
        childs: [],
        dynamicfilter: "false",
        type: "FILTERPANEL",
    };

    const topbtn = [
        {
            [VAR_RECORD_CL_DATASET]: "0",
            [VAR_RECORD_CV_DESCRIPTION]: "add",
            [VAR_RECORD_DISPLAYED]: "add",
            [VAR_RECORD_NAME]: "add",
            [VAR_RECORD_OBJECT_ID]: "80801872FBB95CBCE053809BA8C0FDC6",
            [VAR_RECORD_PAGE_OBJECT_ID]: "80A90C83CC286D04E053809BA8C09488",
            [VAR_RECORD_PARENT_ID]: "80A90C83CC266D04E053809BA8C09488",
            [VAR_RECORD_ROUTE_PAGE_ID]: "3213839494951",
            iconfontname: "fa",
            mode: "1",
            reqsel: "false",
            type: "BTN",
            uitype: "1",
        },
    ];

    const props = {
        bc: {
            [VAR_RECORD_NAME]: "Test textarea",
            [VAR_RECORD_OBJECT_ID]: "80801872FBB55CBCE053809BA8C0FDC6",
            [VAR_RECORD_PAGE_OBJECT_ID]: "80A90C83CC266D04E053809BA8C09488",
            [VAR_RECORD_ROUTE_PAGE_ID]: "3213839494951",
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
