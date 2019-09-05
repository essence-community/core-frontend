// @flow
import * as React from "react";
import InputMask from "react-input-mask";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import DIdentityDocTypeJson from "../../../../../mocks/data/DIdentityDocType.json";
import baseJson from "../../../../../mocks/fields/base.json";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../../../stores/index";
import {GlobalRecordsModel} from "../../../../stores/GlobalRecordsModel";
import {mountWithTheme} from "../../../../utils/test";
import FieldSmartMask from "../FieldSmartMask";

function changeField(value, input, selectionStart = 0) {
    const event = {target: {value}};
    const inputInstance = input.instance();

    input.simulate("focus");
    inputInstance.value = value;
    inputInstance.selectionStart = selectionStart;
    inputInstance.selectionEnd = value.length;
    input.simulate("change", event);
}

describe("FieldSmartMask", () => {
    const dIdentityDocTypeData = camelCaseKeys(DIdentityDocTypeJson);

    let fieldConfig = {};
    let form = {};
    let pageStore = {};

    beforeEach(() => {
        form = new BuilderMobxForm();
        pageStore = createEmptyPageStore();

        pageStore.applicationStore.pagesStore.globalRecordsStore = new GlobalRecordsModel({pageStore});
        pageStore.applicationStore.pagesStore.globalRecordsStore.indentityDocTypeRecordsStore.setRecordsAction(
            dIdentityDocTypeData,
        );

        fieldConfig = {
            editing: true,
            field: form.add({key: baseJson.column}),
            form,
            onChange: jest.fn(),
            onClear: jest.fn(),
            onInitGlobal: jest.fn(),
            pageStore,
            tips: [],
            value: "",
            visible: true,
        };
    });

    it("render", () => {
        form.add({key: "ckDIdentityDoc", value: 3});
        const wrapper = mountWithTheme(
            <FieldSmartMask bc={baseJson} {...fieldConfig} imask="!ck_d_identity_doc.cv_series_mask" />,
        );

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(InputMask).length).toBe(1);

        wrapper.unmount();
    });

    it("render без маски", () => {
        form.add({key: "ckDIdentityDoc", value: 3});
        const wrapper = mountWithTheme(<FieldSmartMask bc={baseJson} {...fieldConfig} />);

        expect(wrapper.find(InputMask).length).toBe(0);

        wrapper.unmount();
    });

    it("Ввод значения по маске", () => {
        form.add({key: "ckDIdentityDoc", value: 11});
        const wrapper = mountWithTheme(
            <FieldSmartMask bc={baseJson} {...fieldConfig} imask="!ck_d_identity_doc.cv_series_mask" />,
        );

        changeField("911", wrapper.find("input"));

        expect(fieldConfig.onChange.mock.calls[0][1]).toBe("91");
    });

    it("Ввод значения по маске c R", () => {
        form.add({key: "ckDIdentityDoc", value: 3});
        const wrapper = mountWithTheme(
            <FieldSmartMask bc={baseJson} {...fieldConfig} imask="!ck_d_identity_doc.cv_series_mask" />,
        );

        changeField("I", wrapper.find("input"));

        expect(fieldConfig.onChange.mock.calls[0][1]).toBe("I-");

        changeField("I-I", wrapper.find("input"), 2);

        expect(fieldConfig.onChange.mock.calls[1][1]).toBe("II-");
    });

    it("Очистка поля при смене маски", () => {
        form.add({key: "ckDIdentityDoc", value: 11});
        const wrapper = mountWithTheme(
            <FieldSmartMask bc={baseJson} {...fieldConfig} imask="!ck_d_identity_doc.cv_series_mask" />,
        );

        changeField("91", wrapper.find("input"));

        expect(fieldConfig.onChange.mock.calls[0][1]).toBe("91");

        form.$("ckDIdentityDoc").set("3");

        expect(fieldConfig.onClear).toHaveBeenCalledWith();
    });
});
