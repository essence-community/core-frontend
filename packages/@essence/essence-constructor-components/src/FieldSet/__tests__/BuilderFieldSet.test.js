// @flow
import * as React from "react";
import {mountWithTheme} from "../../utils/test";
import BuilderMobxForm from "../../Components/MobxForm/BuilderMobxForm";
import BuilderFieldSet from "../BuilderFieldSet";
import {createEmptyPageStore} from "../../stores";
import BuilderField from "../../TextField/BuilderField";

const firstField = {
    ckObject: "cn_value",
    ckPageObject: "cn_value",
    clDataset: "0",
    column: "cn_value",
    cvDisplayed: "Показание/Расход Э/Э 3-тарифн ночь",
    cvName: "cn_value",
    datatype: "string",
    type: "IFIELD",
};
const secondField = {
    checked: "true",
    ckObject: "cl_overstep",
    ckPageObject: "cl_overstep",
    clDataset: "0",
    column: "cl_overstep",
    cvDescription: "Переход через ноль",
    cvDisplayed: "Переход через ноль",
    cvName: "cl_overstep",
    datatype: "string",
    type: "IFIELD",
};

const getBc = (fields) => ({
    childs: fields,
    ckModify: "modify",
    ckObject: "59",
    ckPageObject: "59",
    clDataset: "1",
    column: "59",
    cvName: "Dynamic Panel",
    datatype: "array",
    reqsel: "true",
    type: "FIELDSET",
});

const getAllFields = (form) => {
    const fields = [];

    form.each((field) => {
        fields.push(field);
    });

    return fields;
};

describe("BuilderFieldSet", () => {
    const bc = getBc([firstField, secondField]);

    it("render", () => {
        const form = new BuilderMobxForm();
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} />);

        expect(wrapper.find(BuilderField).length).toBe(2);

        wrapper.unmount();
    });

    it("render with parentKey", () => {
        const form = new BuilderMobxForm();
        const pageStore = createEmptyPageStore();

        form.add({key: "fieldSet"});

        const wrapper = mountWithTheme(
            <BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} parentKey="fieldSet" />,
        );

        expect(wrapper.find(BuilderField).length).toBe(2);

        wrapper.unmount();
    });

    it("render without form", () => {
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible />);

        expect(wrapper.find(BuilderField).length).toBe(0);

        wrapper.unmount();
    });

    it("render hidden form", () => {
        const form = new BuilderMobxForm();
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} hidden />);

        expect(wrapper.find(BuilderField).length).toBe(0);

        wrapper.unmount();
    });

    it("Change field to hidden", () => {
        const form = new BuilderMobxForm();
        const pageStore = createEmptyPageStore();
        const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} />);

        expect(getAllFields(form).length).toBe(3);

        wrapper.setProps({hidden: true});

        expect(getAllFields(form).length).toBe(0);

        wrapper.unmount();
    });

    it("Change field to hidden  with parentKey", () => {
        const form = new BuilderMobxForm();
        const pageStore = createEmptyPageStore();

        form.add({key: "fieldSet"});

        const wrapper = mountWithTheme(
            <BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} parentKey="fieldSet" />,
        );

        expect(getAllFields(form).length).toBe(2);

        wrapper.setProps({hidden: true});

        // TODO: Тут странно очень, по логике должно быть 1, но по коду явно 3
        expect(getAllFields(form).length).toBe(2);

        wrapper.unmount();
    });
});
