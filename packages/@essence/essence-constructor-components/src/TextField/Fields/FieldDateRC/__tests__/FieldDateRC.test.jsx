// @flow
import * as React from "react";
import moment from "moment";
import TodayButton from "rc-calendar/lib/calendar/TodayButton";
import {IconButton} from "@material-ui/core";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import dateJson from "../../../../../mocks/fields/date.json";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../../../stores/index";
import {mountWithTheme} from "../../../../utils/test";
import FieldMask from "../../FieldMask/FieldMask";
import FieldDateRC, {FieldDateRCBase} from "../FieldDateRC";

// eslint-disable-next-line max-statements
describe("FieldDateRC", () => {
    const form = new BuilderMobxForm();
    const field = form.add({key: dateJson.column});
    const pageStore = createEmptyPageStore();
    const value = "2018-10-15T00:00:00";
    const bc = camelCaseKeys(dateJson);
    let fieldConfig = {};

    form.add({key: `${bc.column}_en`, value: "2018-11-01T00:00:00"});
    form.add({key: `${bc.column}_st`, value: "2018-10-01T00:00:00"});

    form.add({key: `${bc.column}_en_error`, value: ""});
    form.add({key: `${bc.column}_st_error`, value: ""});

    beforeEach(() => {
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
        const wrapper = mountWithTheme(<FieldDateRC bc={bc} {...fieldConfig} />);

        wrapper.find(IconButton).simulate("focus");

        expect(wrapper.find(FieldDateRCBase).exists()).toBeTruthy();
    });

    it("Проверяем disabledstartdate - валидное значение", () => {
        const momentValue = moment(value);
        const wrapper = mountWithTheme(
            <FieldDateRC bc={{...bc, disabledstartdate: `${bc.column}_en`}} {...fieldConfig} />,
        );
        const dateRCInstance = wrapper.find(FieldDateRCBase).instance();

        expect(dateRCInstance.getDisabledFunction()).toBe(dateRCInstance.disabledStartDate);
        expect(dateRCInstance.disabledStartDate(momentValue)).toBe(false);
        expect(dateRCInstance.disabledEndDate(momentValue)).toBe(false);
    });

    it("Проверяем disabledstartdate  - не валидное значение", () => {
        const momentValue = moment("2018-12-01T00:00:00");
        const wrapper = mountWithTheme(
            <FieldDateRC bc={{...bc, disabledstartdate: `${bc.column}_en`}} {...fieldConfig} />,
        );
        const dateRCInstance = wrapper.find(FieldDateRCBase).instance();

        expect(dateRCInstance.disabledStartDate(momentValue)).toBe(true);
        expect(dateRCInstance.disabledEndDate(momentValue)).toBe(false);
    });

    it("Проверяем disabledenddate - валидное значение", () => {
        const momentValue = moment(value);
        const wrapper = mountWithTheme(
            <FieldDateRC bc={{...bc, disabledenddate: `${bc.column}_st`}} {...fieldConfig} />,
        );
        const dateRCInstance = wrapper.find(FieldDateRCBase).instance();

        expect(dateRCInstance.getDisabledFunction()).toBe(dateRCInstance.disabledEndDate);
        expect(dateRCInstance.disabledStartDate(momentValue)).toBe(false);
        expect(dateRCInstance.disabledEndDate(momentValue)).toBe(false);
    });

    it("Проверяем disabledenddate - не валидное значение", () => {
        const momentValue = moment("2018-09-01T00:00:00");
        const wrapper = mountWithTheme(
            <FieldDateRC bc={{...bc, disabledenddate: `${bc.column}_st`}} {...fieldConfig} />,
        );
        const dateRCInstance = wrapper.find(FieldDateRCBase).instance();

        expect(dateRCInstance.disabledStartDate(momentValue)).toBe(false);
        expect(dateRCInstance.disabledEndDate(momentValue)).toBe(true);
    });

    it("Проверяем disabledstartdate и disabledenddate - неверный формат данных", () => {
        const momentValue = moment("2018-09-01T00:00:00");
        const wrapper = mountWithTheme(
            <FieldDateRC
                bc={{...bc, disabledenddate: `${bc.column}_st_error`, disabledstartdate: `${bc.column}_en_error`}}
                {...fieldConfig}
            />,
        );
        const dateRCInstance = wrapper.find(FieldDateRCBase).instance();

        expect(dateRCInstance.disabledStartDate(momentValue)).toBe(false);
        expect(dateRCInstance.disabledEndDate(momentValue)).toBe(false);
    });

    ["1", "2", "3", "4", "5", "6"].forEach((format) => {
        it(`Проверяем открытии/закрытие календаря, format: ${format}`, (done) => {
            const wrapper = mountWithTheme(<FieldDateRC bc={{...bc, format}} {...fieldConfig} />);
            const dateRCInstance = wrapper.find(FieldDateRCBase).instance();
            const formatSelector = {
                // $FlowFixMe
                1: ".rc-calendar-year-panel-year",
                // $FlowFixMe
                2: ".rc-calendar-month-panel-month",
            };

            expect.assertions(2);

            wrapper.find(IconButton).simulate("click");

            expect(dateRCInstance.state.open).toBeTruthy();

            if (formatSelector[format]) {
                wrapper
                    .find(formatSelector[format])
                    .at(1)
                    .simulate("click");
            } else {
                wrapper.find(TodayButton).simulate("click");
            }

            requestAnimationFrame(() => {
                expect(dateRCInstance.state.open).toBeFalsy();
                done();
            });
        });
    });

    it("Проверяем открытии/закрытие календаря, format: 2", (done) => {
        const wrapper = mountWithTheme(<FieldDateRC bc={{...bc, format: "2"}} {...fieldConfig} />);
        const dateRCInstance = wrapper.find(FieldDateRCBase).instance();

        expect.assertions(2);

        wrapper.find(IconButton).simulate("click");

        expect(dateRCInstance.state.open).toBeTruthy();

        wrapper
            .find(".rc-calendar-month-panel-month")
            .at(0)
            .simulate("click");

        requestAnimationFrame(() => {
            expect(dateRCInstance.state.open).toBeFalsy();
            done();
        });
    });

    it("Измнение значение через ввод значения в полей ввода", () => {
        const wrapper = mountWithTheme(<FieldDateRC bc={bc} {...fieldConfig} />);

        wrapper.find(FieldMask).prop("onChange")(null, "19.11.2018 12:00");

        expect(fieldConfig.onChange).lastCalledWith(null, "2018-11-19T12:00:00");
    });

    it("Измнение значение через ввод значения в полей ввода - невалидное значение", () => {
        const wrapper = mountWithTheme(<FieldDateRC bc={bc} {...fieldConfig} />);

        wrapper.find(FieldMask).prop("onChange")(null, "");

        expect(fieldConfig.onChange).lastCalledWith(null, "");
    });
});
