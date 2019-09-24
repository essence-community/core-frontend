// @flow
import * as React from "react";
import {when} from "mobx";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import {IconButton} from "@material-ui/core";
import gridfieldJson from "../../../../../mocks/fields/gridfield.json";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import {createEmptyPageStore} from "../../../../stores/index";
import {mountWithTheme} from "../../../../utils/test";
import SearchTextField from "../../Helpers/SearchTextField/SearchTextField";
import FieldTable, {FieldTableBase} from "../FieldTable";

// eslint-disable-next-line max-statements
describe("FieldTable", () => {
    const form = new BuilderMobxForm();
    const field = form.add({key: gridfieldJson.column});
    const bc = camelCaseKeys(gridfieldJson);
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
        const wrapper = mountWithTheme(<FieldTable bc={{...bc, pagesize: 0}} {...fieldConfig} />);

        expect(wrapper.find(FieldTableBase).exists()).toBeTruthy();
        expect(wrapper.find(SearchTextField).exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render hidden", () => {
        const wrapper = mountWithTheme(<FieldTable bc={bc} {...fieldConfig} hidden />);

        expect(wrapper.find(SearchTextField).exists()).toBeFalsy();
    });

    it("render grid с установленным value = 4", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={bc} {...fieldConfig} value="4" />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => store.displayText);

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");
    });

    it("Измнение значение через props", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={bc} {...fieldConfig} />);
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
                    ...bc,
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
        const wrapper = mountWithTheme(<FieldTable bc={{...bc, autoload: "true"}} {...fieldConfig} />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => !store.recordsStore.isLoading);
        wrapper.setProps({value: "first"});

        expect(field.value).toBe(store.recordsStore.records[0].ckId);
    });

    it("Удалиние значеия через код", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={bc} {...fieldConfig} value="4" />);
        const store = wrapper.find(FieldTableBase).prop("store");

        await when(() => store.displayText);
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("ORCL k");

        wrapper.setProps({value: ""});
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("");
    });

    it("Удалиние значеия через кнопку очистить", async () => {
        const wrapper = mountWithTheme(<FieldTable bc={bc} {...fieldConfig} value="4" />);
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
