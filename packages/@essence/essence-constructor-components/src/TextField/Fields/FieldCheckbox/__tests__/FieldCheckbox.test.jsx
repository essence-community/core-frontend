// @flow
import * as React from "react";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {mountWithTheme} from "../../../../utils/test";
import {createEmptyPageStore} from "../../../../stores/index";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import checkboxJson from "../../../../../mocks/fields/checkbox.json";
import TextFieldLabel from "../../../TextFieldComponents/TextFieldLabel/TextFieldLabel";
import FieldCheckbox from "../FieldCheckbox";

describe("FieldCheckbox", () => {
    let fieldConfig = {};

    beforeEach(() => {
        const form = new BuilderMobxForm();

        fieldConfig = {
            field: form.add({key: checkboxJson.column}),
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
        const wrapper = mountWithTheme(<FieldCheckbox {...fieldConfig} bc={checkboxJson} />);

        expect(wrapper.exists()).toBeTruthy();
        expect(
            wrapper
                .find("label")
                .at(0)
                .prop("data-qtip"),
        ).toBe("Нет");
        expect(wrapper.find(TextFieldLabel).length).toBe(1);
        expect(wrapper.find(Icon).prop("iconfont")).toBe("square-o");
    });

    it("value = true", () => {
        const wrapper = mountWithTheme(<FieldCheckbox {...fieldConfig} bc={checkboxJson} value />);

        expect(
            wrapper
                .find("label")
                .at(0)
                .prop("data-qtip"),
        ).toBe("Да");
        expect(wrapper.find(Icon).prop("iconfont")).toBe("check-square");
    });

    it("Не выводить label", () => {
        const wrapper = mountWithTheme(<FieldCheckbox {...fieldConfig} bc={checkboxJson} noLabel />);

        expect(wrapper.find(TextFieldLabel).length).toBe(0);
    });

    it("При блокировки выводить закрашенный квардрат", () => {
        const wrapper = mountWithTheme(<FieldCheckbox {...fieldConfig} bc={checkboxJson} disabled />);

        expect(wrapper.find(Icon).prop("iconfont")).toBe("square");
    });
});
