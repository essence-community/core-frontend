/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import * as React from "react";
import {Checkbox} from "@material-ui/core";
import {
    VAR_RECORD_ID,
    VAR_MOCK_TEXT_COLUMN,
    VAR_MOCK_DATE_COLUMN,
    VAR_MOCK_DATE_COLUMN_EN,
    VAR_MOCK_DATE_COLUMN_ST,
} from "@essence-community/constructor-share/constants";
import {mountWithTheme} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import BuilderForm, {BuilderFormBase} from "../../../Form/BuilderForm";
import BuilderField from "../../../TextField/BuilderField";
import FieldMask from "../../../TextField/Fields/FieldMask/FieldMask";
import GridColumnFilterFields from "../GridColumnFilterFields";

// eslint-disable-next-line max-lines-per-function
describe("GridColumnFilterFields", () => {
    const pageStore = createEmptyPageStore();
    const renderPopover = ({fieldContent}) => fieldContent;
    const mountDate = (onSubmit) => {
        const bc = {column: "date_column", datatype: "date", format: "d.m.Y"};
        const wrapper = mountWithTheme(
            <BuilderForm pageStore={pageStore} onSubmit={onSubmit}>
                <GridColumnFilterFields bc={bc} pageStore={pageStore} visible renderPopover={renderPopover} />
            </BuilderForm>,
        );
        const {form} = wrapper.find(BuilderFormBase).instance().state;

        return {form, wrapper};
    };

    it("Измнение текста", () => {
        const bc = {column: "text_column", datatype: "text"};
        const wrapper = mountWithTheme(
            <BuilderForm pageStore={pageStore}>
                <GridColumnFilterFields bc={bc} pageStore={pageStore} visible renderPopover={renderPopover} />
            </BuilderForm>,
        );
        const {form} = wrapper.find(BuilderFormBase).instance().state;

        expect(form.values()).toEqual({
            [VAR_MOCK_TEXT_COLUMN]: undefined,
            [VAR_RECORD_ID]: "",
        });

        wrapper.find("input").simulate("change", {target: {value: "test"}});

        expect(form.values()).toEqual({
            [VAR_MOCK_TEXT_COLUMN]: {
                datatype: "text",
                format: undefined,
                operator: "like",
                property: "text_column",
                value: "test",
            },
            [VAR_RECORD_ID]: "",
        });
        expect(wrapper.find(BuilderField).length).toBe(1);
    });

    it("Измнение Даты от", () => {
        const {form, wrapper} = mountDate();

        expect(form.values()).toEqual({
            [VAR_MOCK_DATE_COLUMN]: "",
            [VAR_MOCK_DATE_COLUMN_EN]: "",
            [VAR_MOCK_DATE_COLUMN_ST]: "",
            [VAR_RECORD_ID]: "",
        });

        wrapper
            .find(FieldMask)
            .at(0)
            .prop("onChange")(null, "18.02.2018");

        expect(form.values()).toEqual({
            [VAR_MOCK_DATE_COLUMN]: "",
            [VAR_MOCK_DATE_COLUMN_EN]: "",
            [VAR_MOCK_DATE_COLUMN_ST]: {
                datatype: "date",
                format: "d.m.Y",
                operator: "ge",
                property: "date_column",
                value: "2018-02-18T00:00:00",
            },
            [VAR_RECORD_ID]: "",
        });
        expect(wrapper.find(BuilderField).length).toBe(3);
    });

    it("Измнение Даты по", () => {
        const {form, wrapper} = mountDate();

        wrapper
            .find(FieldMask)
            .at(1)
            .prop("onChange")(null, "18.02.2018");

        expect(form.values()).toEqual({
            [VAR_MOCK_DATE_COLUMN]: "",
            [VAR_MOCK_DATE_COLUMN_EN]: {
                datatype: "date",
                format: "d.m.Y",
                operator: "le",
                property: "date_column",
                value: "2018-02-18T00:00:00",
            },
            [VAR_MOCK_DATE_COLUMN_ST]: "",
            [VAR_RECORD_ID]: "",
        });
    });

    it("Измнение Даты - совпадение", () => {
        const {form, wrapper} = mountDate();

        wrapper
            .find(FieldMask)
            .at(2)
            .prop("onChange")(null, "18.02.2018");

        expect(form.values()).toEqual({
            [VAR_MOCK_DATE_COLUMN]: {
                datatype: "date",
                format: "d.m.Y",
                operator: "eq",
                property: "date_column",
                value: "2018-02-18T00:00:00",
            },
            [VAR_MOCK_DATE_COLUMN_EN]: "",
            [VAR_MOCK_DATE_COLUMN_ST]: "",
            [VAR_RECORD_ID]: "",
        });
    });

    it("Измнение Даты - клик по checkbox", async () => {
        const onSubmit = jest.fn();
        const {wrapper} = mountDate(onSubmit);

        await Promise.all(wrapper.find(Checkbox).map((checkbox) => checkbox.prop("onChange")()));

        expect(onSubmit.mock.calls.length).toBe(3);
    });
});
