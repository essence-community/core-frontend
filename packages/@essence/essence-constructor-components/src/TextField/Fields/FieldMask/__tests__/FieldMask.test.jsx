// @flow
import * as React from "react";
import InputMask from "react-input-mask";
import baseJson from "../../../../../mocks/fields/base.json";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../../../stores/index";
import {mountWithTheme} from "../../../../utils/test";
import FieldMask from "../FieldMask";

// eslint-disable-next-line max-lines-per-function
describe("FieldMask", () => {
    let fieldConfig = {};

    beforeEach(() => {
        const form = new BuilderMobxForm();

        fieldConfig = {
            field: form.add({key: baseJson.column}),
            form,
            onChange: jest.fn(),
            onClear: jest.fn(),
            onInitGlobal: jest.fn(),
            pageStore: createEmptyPageStore(),
            tips: [],
            value: "",
            visible: true,
        };
    });

    it("render", () => {
        const wrapper = mountWithTheme(<FieldMask bc={baseJson} {...fieldConfig} imask="test-9" />);

        expect(wrapper.find(InputMask).length).toBe(1);
        expect(wrapper.exists()).toBeTruthy();
    });

    it("Без imask должен работать как текстовое полей", () => {
        const wrapper = mountWithTheme(<FieldMask bc={baseJson} {...fieldConfig} />);

        expect(wrapper.find(InputMask).length).toBe(0);
    });

    it("Значение меняется согласно маске при фокусе", () => {
        const wrapper = mountWithTheme(<FieldMask bc={baseJson} {...fieldConfig} imask="test-9" />);

        wrapper.find("input").simulate("focus");
        expect(fieldConfig.onChange.mock.calls[0][1]).toBe("test- ");
    });

    it("Значение меняется согласно маске при измнении после фокуса", () => {
        const event = {target: {value: "test-1"}};
        const wrapper = mountWithTheme(<FieldMask bc={baseJson} {...fieldConfig} imask="test-9" value="test- " />);
        const input = wrapper.find("input");
        const inputInstance = input.instance();

        input.simulate("focus");
        inputInstance.value = "test-1";
        inputInstance.selectionStart = 5;
        inputInstance.selectionEnd = 6;
        input.simulate("change", event);
        expect(fieldConfig.onChange.mock.calls[0][1]).toBe("test-1");
    });
});
