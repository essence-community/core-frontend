/**
 *Import * as React from "react";
 *import {
 *  VAR_RECORD_PAGE_OBJECT_ID,
 *  VAR_RECORD_OBJECT_ID,
 *  VAR_RECORD_DISPLAYED,
 *  VAR_RECORD_NAME,
 *  VAR_RECORD_CV_DESCRIPTION,
 *  VAR_RECORD_CK_MODIFY,
 *  VAR_RECORD_CL_DATASET,
 *} from "@essence-community/constructor-share/constants";
 *import {mountWithTheme} from "../../../../essence-constructor-components/src/utils/test";
 *import BuilderMobxForm from "../../Components/MobxForm/BuilderMobxForm";
 *import BuilderFieldSet from "../BuilderFieldSet";
 *import {createEmptyPageStore} from "../../../../essence-constructor-components/src/stores";
 *import BuilderField from "../../../../essence-constructor-components/src/TextField/BuilderField";
 *
 *const firstField = {
 *  [VAR_RECORD_CL_DATASET]: "0",
 *  [VAR_RECORD_DISPLAYED]: "Показание/Расход Э/Э 3-тарифн ночь",
 *  [VAR_RECORD_NAME]: "cn_value",
 *  [VAR_RECORD_OBJECT_ID]: "cn_value",
 *  [VAR_RECORD_PAGE_OBJECT_ID]: "cn_value",
 *  column: "cn_value",
 *  datatype: "string",
 *  type: "IFIELD",
 *};
 *const secondField = {
 *  [VAR_RECORD_CL_DATASET]: "0",
 *  [VAR_RECORD_CV_DESCRIPTION]: "Переход через ноль",
 *  [VAR_RECORD_DISPLAYED]: "Переход через ноль",
 *  [VAR_RECORD_NAME]: "cl_overstep",
 *  [VAR_RECORD_OBJECT_ID]: "cl_overstep",
 *  [VAR_RECORD_PAGE_OBJECT_ID]: "cl_overstep",
 *  checked: "true",
 *  column: "cl_overstep",
 *  datatype: "string",
 *  type: "IFIELD",
 *};
 *
 *const getBc = (fields) => ({
 *  [VAR_RECORD_CK_MODIFY]: "modify",
 *  [VAR_RECORD_CL_DATASET]: "1",
 *  [VAR_RECORD_NAME]: "Dynamic Panel",
 *  [VAR_RECORD_OBJECT_ID]: "59",
 *  [VAR_RECORD_PAGE_OBJECT_ID]: "59",
 *  childs: fields,
 *  column: "59",
 *  datatype: "array",
 *  reqsel: "true",
 *  type: "FIELDSET",
 *});
 *
 *const getAllFields = (form) => {
 *  const fields = [];
 *
 *  form.each((field) => {
 *      fields.push(field);
 *  });
 *
 *  return fields;
 *};
 *
 *  // eslint-disable-next-line max-lines-per-function
 *describe("BuilderFieldSet", () => {
 *  const bc = getBc([firstField, secondField]);
 *
 *  it("render", () => {
 *      const form = new BuilderMobxForm();
 *      const pageStore = createEmptyPageStore();
 *      const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} />);
 *
 *      expect(wrapper.find(BuilderField).length).toBe(2);
 *
 *      wrapper.unmount();
 *  });
 *
 *  it("render with parentKey", () => {
 *      const form = new BuilderMobxForm();
 *      const pageStore = createEmptyPageStore();
 *
 *      form.add({key: "fieldSet"});
 *
 *      const wrapper = mountWithTheme(
 *          <BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} parentKey="fieldSet" />,
 *      );
 *
 *      expect(wrapper.find(BuilderField).length).toBe(2);
 *
 *      wrapper.unmount();
 *  });
 *
 *  it("render without form", () => {
 *      const pageStore = createEmptyPageStore();
 *      const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible />);
 *
 *      expect(wrapper.find(BuilderField).length).toBe(0);
 *
 *      wrapper.unmount();
 *  });
 *
 *  it("render hidden form", () => {
 *      const form = new BuilderMobxForm();
 *      const pageStore = createEmptyPageStore();
 *      const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} hidden />);
 *
 *      expect(wrapper.find(BuilderField).length).toBe(0);
 *
 *      wrapper.unmount();
 *  });
 *
 *  it("Change field to hidden", () => {
 *      const form = new BuilderMobxForm();
 *      const pageStore = createEmptyPageStore();
 *      const wrapper = mountWithTheme(<BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} />);
 *
 *      expect(getAllFields(form).length).toBe(3);
 *
 *      wrapper.setProps({hidden: true});
 *
 *      expect(getAllFields(form).length).toBe(0);
 *
 *      wrapper.unmount();
 *  });
 *
 *  it("Change field to hidden  with parentKey", () => {
 *      const form = new BuilderMobxForm();
 *      const pageStore = createEmptyPageStore();
 *
 *      form.add({key: "fieldSet"});
 *
 *      const wrapper = mountWithTheme(
 *          <BuilderFieldSet bc={bc} pageStore={pageStore} visible form={form} parentKey="fieldSet" />,
 *      );
 *
 *      expect(getAllFields(form).length).toBe(2);
 *
 *      wrapper.setProps({hidden: true});
 *
 *      // TODO: Тут странно очень, по логике должно быть 1, но по коду явно 3
 *      expect(getAllFields(form).length).toBe(2);
 *
 *      wrapper.unmount();
 *  });
 *});
 */
