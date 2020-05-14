/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
// @flow
import * as React from "react";
import {when} from "mobx";
import {IconButton} from "@material-ui/core";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import gridfieldJson from "../../../../../mocks/fields/gridfield.json";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../../../stores/index";
import {mountWithTheme} from "../../../../utils/test";
import SearchTextField from "../../Helpers/SearchTextField/SearchTextField";
import FieldTable, {FieldTableBase} from "../FieldTable";

// eslint-disable-next-line max-statements, max-lines-per-function
describe("FieldTable", () => {
    const form = new BuilderMobxForm();
    const field = form.add({key: gridfieldJson.column});
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

    it("render grid", () => {
        const wrapper = mountWithTheme(<FieldTable bc={{...gridfieldJson, pagesize: 0}} {...fieldConfig} />);

        expect(wrapper.find(FieldTableBase).exists()).toBeTruthy();
        expect(wrapper.find(SearchTextField).exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render hidden", () => {
        const wrapper = mountWithTheme(<FieldTable bc={gridfieldJson} {...fieldConfig} hidden />);

        expect(wrapper.find(SearchTextField).exists()).toBeFalsy();
    });

    it("render grid с установленным value = 4", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={gridfieldJson} {...fieldConfig} value="4" />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => store.displayText);

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");
    });

    it("Измнение значение через props", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={gridfieldJson} {...fieldConfig} />);
        const store = wrapper.find(FieldTableBase).prop("store");

        wrapper.setProps({value: 4});

        await when(() => store.displayText);

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");
    });

    it("Загрузка значения без pageSize", async () => {
        const wrapper = mountWithTheme(
            <FieldTable
                bc={{
                    ...gridfieldJson,
                    getglobaltostore: "test",
                    pagesize: 0,
                }}
                {...fieldConfig}
                value="4"
            />,
        );
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => store.displayText);

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");
    });

    // TODO: Не работает, если не нужно, то функционал удалить
    it.skip("Установка значение в first", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={{...gridfieldJson, autoload: "true"}} {...fieldConfig} />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => !store.recordsStore.isLoading);
        wrapper.setProps({value: "first"});

        expect(field.value).toBe(store.recordsStore.records[0][VAR_RECORD_ID]);
    });

    it("Удалиние значеия через код", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={gridfieldJson} {...fieldConfig} value="4" />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => store.displayText);
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");

        wrapper.setProps({value: ""});
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("");
    });

    it("Удалиние значеия через кнопку очистить", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={gridfieldJson} {...fieldConfig} value="4" />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => store.displayText);
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");

        wrapper
            .find(IconButton)
            .at(0)
            .simulate("click");

        expect(wrapper.find("input").prop("value")).toBe("");
    });
});
