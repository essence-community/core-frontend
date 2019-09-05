// @flow
import * as React from "react";
import omit from "lodash/omit";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import dateperiodJson from "../../../mocks/fields/dateperiod.json";
import BuilderMobxForm from "../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../stores/index";
import {mountWithTheme} from "../../utils/test";
import BuilderFieldPeriod from "../BuilderFieldPeriod";
import BuilderFieldPeriodSplit from "../BuilderFieldPeriodSplit";

describe("FieldMask", () => {
    const bc = camelCaseKeys(dateperiodJson);
    let fieldConfig = {};

    beforeEach(() => {
        const form = new BuilderMobxForm();

        fieldConfig = {
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
        const wrapper = mountWithTheme(<BuilderFieldPeriod {...fieldConfig} bc={bc} />);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BuilderFieldPeriodSplit).length).toBe(1);

        wrapper.unmount();
    });

    it("render без колонок", () => {
        const wrapper = mountWithTheme(
            <BuilderFieldPeriod {...fieldConfig} bc={omit(bc, ["columnstart", "columnend"])} />,
        );

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BuilderFieldPeriodSplit).length).toBe(1);

        wrapper.unmount();
    });
});
