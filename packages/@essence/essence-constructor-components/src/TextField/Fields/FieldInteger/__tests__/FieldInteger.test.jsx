import * as React from "react";
import {mountWithTheme} from "../../../../utils/test";
import {createEmptyPageStore} from "../../../../stores/index";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import integerJson from "../../../../../mocks/fields/integer.json";
import FieldInteger from "../FieldInteger";

describe("FieldInteger", () => {
    const form = new BuilderMobxForm();
    const field = form.add({key: integerJson.column});
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
        const wrapper = mountWithTheme(<FieldInteger bc={integerJson} {...fieldConfig} />);

        expect(wrapper.find(FieldInteger).exists()).toBeTruthy();
    });
});
