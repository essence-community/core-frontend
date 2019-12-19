// @flow
import * as React from "react";
import {when} from "mobx";
import {Modal, Button, IconButton} from "@material-ui/core";
import {VAR_RECORD_CK_HOUSE} from "@essence/essence-constructor-share/constants";
import BuilderMobxForm from "../../../../Components/MobxForm/BuilderMobxForm";
import addrJson from "../../../../../mocks/fields/addr.json";
import {stores} from "../../../../stores";
import {mountWithTheme} from "../../../../utils/test";
import TextField from "../../../TextField";
import {sleep} from "../../../../utils/base";
import {PopoverBase} from "../../../../Popover/Popover";
import {BuilderFieldBase} from "../../../BuilderField";
import FieldMulti, {FieldMultiBase} from "../FieldMulti";

const TWO_FRAMES = 32;

// eslint-disable-next-line max-lines-per-function, max-statements
describe("BuilderForm - FieldMulti", () => {
    let fieldConfig = {};

    beforeEach(() => {
        const form = new BuilderMobxForm();

        fieldConfig = {
            field: form.add({key: addrJson.column}),
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

    it("Не отобрадается поле при hidden = true", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} hidden />);

        expect(wrapper.find(TextField).exists()).toBeFalsy();
    });

    it("Отображение пустого выбора", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);

        expect(wrapper.find(FieldMultiBase).exists()).toBeTruthy();
        expect(wrapper.find("input").prop("value")).toBe("");

        wrapper.unmount();
    });

    it("В поиске адреса должно быть 3 поля ввода и 2 кнопки", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);

        wrapper.find(TextField).simulate("click");
        wrapper.update();

        const modal = wrapper.find(Modal);

        expect(modal.find(TextField).length).toBe(3);
        expect(modal.find(Button).length).toBe(2);
    });

    it("Отображения значения при установленном значении", async () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} value="7777775" />);
        const store = wrapper.find(FieldMultiBase).prop("store");

        await when(() => !store.isLoading);

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("Белгородская обл., Старый Оскол г., Круговая ул., д. 16");
    });

    it("Установка значения через didUpdate", async () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);
        const store = wrapper.find(FieldMultiBase).prop("store");

        expect(wrapper.find("input").prop("value")).toBe("");

        wrapper.setProps({value: "7777775"});

        await when(() => !store.isLoading);

        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("Белгородская обл., Старый Оскол г., Круговая ул., д. 16");
    });

    it("Проверка заполнения значений в выпадающей форме поиска", async () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} value="7777775" />);
        const store = wrapper.find(FieldMultiBase).prop("store");

        expect(wrapper.find(TextField).length).toBe(1);

        await when(() => !store.isLoading);
        wrapper.find(TextField).simulate("click");
        await when(() => !store.isLoading);

        wrapper.update();

        expect(wrapper.find(TextField).length).toBe(4);

        ["Белгородская обл., Старый Оскол г.", "Круговая ул.", "д. 16"].forEach((name, index) => {
            expect(
                wrapper
                    .find(TextField)
                    .at(index + 1)
                    .prop("value"),
            ).toBe(name);
        });
    });

    it("При клике подтвердить происходит сохранение данных", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);
        const {form} = wrapper.find(FieldMultiBase).instance();

        wrapper.find(TextField).simulate("click");
        wrapper.update();

        form.set({[VAR_RECORD_CK_HOUSE]: "7781393"});

        wrapper
            .find(Button)
            .at(0)
            .simulate("click");

        expect(fieldConfig.onChange).toHaveBeenLastCalledWith(null, "7781393");
    });

    it("При клике Отменить происходит сохранение данных", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);
        const {form} = wrapper.find(FieldMultiBase).instance();

        wrapper.find(TextField).simulate("click");
        wrapper.update();

        form.set({[VAR_RECORD_CK_HOUSE]: "7781393"});

        wrapper
            .find(Button)
            .at(1)
            .simulate("click");

        expect(form.fields.size).toEqual(0);
    });

    it("Не вызывает загрузку данных, если поповер не открыт", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);

        wrapper
            .find(FieldMultiBase)
            .instance()
            .handleChangeOpen(false);

        expect(wrapper.find(FieldMultiBase).prop("store").isLoading).toBeFalsy();
    });

    it("Проверям фокус на следующем поле", async () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);

        wrapper.find(TextField).simulate("click");
        wrapper.update();

        wrapper
            .find(BuilderFieldBase)
            .at(1)
            .instance()
            .handleChange(null, "7781393");

        await sleep(TWO_FRAMES);

        expect(document.activeElement).toBe(
            wrapper
                .find("input")
                .at(2)
                .instance(),
        );
    });

    it("Меняем значение на пустое", async () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} value="7777775" />);
        const store = wrapper.find(FieldMultiBase).prop("store");

        await when(() => !store.isLoading);
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("Белгородская обл., Старый Оскол г., Круговая ул., д. 16");

        wrapper.setProps({value: ""});
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("");
    });

    it("Нажимаем очистить", async () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} value="7777775" />);
        const store = wrapper.find(FieldMultiBase).prop("store");

        await when(() => !store.isLoading);
        wrapper.update();

        expect(wrapper.find("input").prop("value")).toBe("Белгородская обл., Старый Оскол г., Круговая ул., д. 16");

        wrapper
            .find(IconButton)
            .at(0)
            .simulate("click");

        expect(wrapper.find("input").prop("value")).toBe("");
    });

    it("При outside должны очищаться поля", () => {
        const wrapper = mountWithTheme(<FieldMulti bc={addrJson} {...fieldConfig} />);
        const {form} = wrapper.find(FieldMultiBase).instance();

        wrapper.find("input").simulate("click");
        form.set({[VAR_RECORD_CK_HOUSE]: "7781393"});
        wrapper.find(PopoverBase).prop("onClickOutside")();

        expect(form.$(VAR_RECORD_CK_HOUSE).value).toBe("");
    });
});
