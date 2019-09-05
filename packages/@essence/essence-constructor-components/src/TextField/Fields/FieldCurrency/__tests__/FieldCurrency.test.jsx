import * as React from "react";
import NumberFormat from "react-number-format";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import {mountWithTheme} from "../../../../utils/test";
import {createEmptyPageStore} from "../../../../stores/index";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import integerJson from "../../../../../mocks/fields/integer.json";
import FieldCurrency from "../FieldCurrency";

describe("FieldCurrency", () => {
    const bc = camelCaseKeys(integerJson);
    const form = new BuilderMobxForm();
    const field = form.add({key: bc.column});
    const pageStore = createEmptyPageStore();
    let fieldConfig = {};

    beforeEach(() => {
        field.set("");
        fieldConfig = {
            field,
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
        const wrapper = mountWithTheme(<FieldCurrency bc={bc} {...fieldConfig} />);

        expect(wrapper.find(FieldCurrency).exists()).toBeTruthy();
    });

    it("Измнение значения", () => {
        const wrapper = mountWithTheme(<FieldCurrency bc={bc} {...fieldConfig} />);

        wrapper.find(NumberFormat).prop("onValueChange")({value: "1"});

        expect(fieldConfig.onChange).lastCalledWith(null, "1");
    });

    it("Валидация вводимого значения", () => {
        const wrapper = mountWithTheme(<FieldCurrency bc={bc} {...fieldConfig} />);

        expect(wrapper.find(NumberFormat).prop("isAllowed")({value: "1"})).toBeTruthy();
        expect(wrapper.find(NumberFormat).prop("isAllowed")({value: "1234567890"})).toBeFalsy();
    });
});
