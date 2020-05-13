/* eslint-disable max-len */
/* eslint-disable import/namespace */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import omit from "lodash/omit";
import dateperiodJson from "../../../../essence-constructor-components/mocks/fields/dateperiod.json";
import BuilderMobxForm from "../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../../../essence-constructor-components/src/stores/index";
import {mountWithTheme} from "../../../../essence-constructor-components/src/utils/test";
import BuilderFieldPeriod from "../../../../essence-constructor-components/src/FieldPeriod/BuilderFieldPeriod";
import BuilderFieldPeriodSplit from "../../../../essence-constructor-components/src/FieldPeriod/BuilderFieldPeriodSplit";

describe("FieldPeriod", () => {
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
        const wrapper = mountWithTheme(<BuilderFieldPeriod {...fieldConfig} bc={dateperiodJson} />);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BuilderFieldPeriodSplit).length).toBe(1);

        wrapper.unmount();
    });

    it("render без колонок", () => {
        const wrapper = mountWithTheme(
            <BuilderFieldPeriod {...fieldConfig} bc={omit(dateperiodJson, ["columnstart", "columnend"])} />,
        );

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(BuilderFieldPeriodSplit).length).toBe(1);

        wrapper.unmount();
    });
});
