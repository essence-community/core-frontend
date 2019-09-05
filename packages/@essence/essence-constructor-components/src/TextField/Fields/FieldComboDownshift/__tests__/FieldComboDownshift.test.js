// @flow
import * as React from "react";
import {when} from "mobx";
import {mount} from "enzyme";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import MenuItem from "@material-ui/core/MenuItem";
import comboJson from "../../../../../mocks/fields/combo.json";
import comboRecords from "../../../../../mocks/data/comboRecords.json";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import {stores} from "../../../../stores";
import {theme} from "../../../../utils/test";
import FieldComboDownshiftMain, {FieldComboDownshift} from "../FieldComboDownshift";
import FieldComboDownshiftInput from "../FieldComboDownshiftInput";

describe("FieldComboDownshift", () => {
    let fieldConfig = {};

    beforeEach(() => {
        const form = new BuilderMobxForm();

        fieldConfig = {
            field: form.add({key: comboJson.column}),
            form,
            onChange: jest.fn(),
            onClear: jest.fn(),
            onInitGlobal: jest.fn(),
            pageStore: stores.pageStore,
            tips: [],
            value: "",
            visible: true,
        };
    });

    it("Should be component", () => {
        const wrapper = mount(
            <MuiThemeProvider theme={theme}>
                <FieldComboDownshiftMain {...fieldConfig} bc={camelCaseKeys(comboJson)} />
            </MuiThemeProvider>,
        );

        expect(wrapper.find(FieldComboDownshiftInput).exists()).toBeTruthy();
        expect(wrapper.find(FieldComboDownshift).exists()).toBeTruthy();
    });

    it("defaultvalue:first - autoselect first value ", async () => {
        const wrapper = mount(
            <MuiThemeProvider theme={theme}>
                <FieldComboDownshiftMain {...fieldConfig} bc={{...camelCaseKeys(comboJson), defaultvalue: "first"}} />
            </MuiThemeProvider>,
        );
        const store = wrapper.find(FieldComboDownshift).prop("store");

        if (store.recordsStore.isLoading) {
            await when(() => !store.recordsStore.isLoading);
        }

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe(comboRecords[0].cv_name);
    });

    it("Выбор нового значения", async () => {
        const wrapper = mount(
            <MuiThemeProvider theme={theme}>
                <FieldComboDownshiftMain {...fieldConfig} bc={camelCaseKeys(comboJson)} />
            </MuiThemeProvider>,
        );
        const combo = wrapper.find(FieldComboDownshift);
        const store = combo.prop("store");

        combo.find("input").simulate("click");

        await when(() => !store.recordsStore.isLoading);
        wrapper.update();

        const items = wrapper.find(MenuItem);

        expect(items.length).toBe(comboRecords.length);

        items.at(2).simulate("click");

        expect(fieldConfig.onChange).toHaveBeenLastCalledWith(null, "3");
    });
});
