/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import noop from "lodash/noop";
import {saveToStore} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share/constants";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import {awaitFormFilter} from "../../stores/PageModel";
import BuilderFilter, {BuilderFilterBase} from "../BuilderFilter";
import {BuilderFormBase} from "../../Form/BuilderForm";
import filterComboGlobalBc from "../__mocks__/filterComboGlobalBc";
import {sleep} from "../../utils/base";

import "../../TextField/BuilderField";

// eslint-disable-next-line max-lines-per-function
describe("BuilderFilter", () => {
    const getWrapper = ({handleSearch, bc, pageStore}) =>
        mountWithTheme(
            <BuilderFilter
                bc={bc}
                addRefAction={noop}
                handleGlobals={noop}
                onChangeCollapse={noop}
                onSearch={handleSearch}
                pageStore={pageStore}
                parentBc={{
                    [VAR_RECORD_NAME]: "testfilter",
                    [VAR_RECORD_OBJECT_ID]: "testfilter",
                    [VAR_RECORD_PAGE_OBJECT_ID]: "testfilter",
                }}
                editing
                visible
                open
            />,
        );

    it("render", () => {
        const pageStore = createEmptyPageStore();
        const wrapper = getWrapper({bc: filterComboGlobalBc, handleSearch: noop, pageStore});

        expect(wrapper.exists()).toBeTruthy();
    });

    it("Установка значения из хранилища", () => {
        const pageStore = createEmptyPageStore();
        const values = {combo1: 50201, testArray: []};

        saveToStore(`${pageStore.pageId}_filter_${filterComboGlobalBc[VAR_RECORD_PAGE_OBJECT_ID]}`, values);

        const wrapper = getWrapper({bc: filterComboGlobalBc, handleSearch: noop, pageStore});
        const {store} = wrapper.find(BuilderFilterBase).props();

        expect(store.values).toEqual({combo1: 50201});
    });

    it("Сброс формы", async () => {
        const pageStore = createEmptyPageStore();
        const handleSearch = jest.fn();
        const wrapper = getWrapper({bc: filterComboGlobalBc, handleSearch, pageStore});
        const {form} = wrapper.find(BuilderFormBase).instance().state;

        await awaitFormFilter(form, false);
        wrapper.find("button[data-page-object='filter-reset']").simulate("click");
        await sleep(4);

        expect(handleSearch.mock.calls).toHaveLength(1);
        expect(form.values()).toEqual({[VAR_RECORD_ID]: "", combo1: "71400", value1: "71400", value2: "АНО"});
        expect(handleSearch.mock.calls[0][1].reset).toBe(true);
    });

    it("Поиск формы", async () => {
        expect.assertions(2);

        const pageStore = createEmptyPageStore();
        const handleSearch = jest.fn();
        const wrapper = getWrapper({bc: filterComboGlobalBc, handleSearch, pageStore});
        const {form} = wrapper.find(BuilderFormBase).instance().state;

        await awaitFormFilter(form, false);
        wrapper.find("form").simulate("submit");
        await sleep(4);

        expect(handleSearch.mock.calls).toHaveLength(1);
        expect(handleSearch.mock.calls[0][0]).toEqual({
            [VAR_RECORD_ID]: "",
            combo1: "71400",
            value1: "71400",
            value2: "АНО",
        });
    });

    it("Измнение значения", async () => {
        expect.assertions(3);

        const pageStore = createEmptyPageStore();
        const handleSearch = jest.fn();
        const wrapper = getWrapper({bc: {...filterComboGlobalBc, dynamicfilter: "true"}, handleSearch, pageStore});

        // eslint-disable-next-line no-magic-numbers
        await sleep(150);

        wrapper.find("input[name='value1']").simulate("change", {target: {value: "test"}});

        // eslint-disable-next-line no-magic-numbers
        await sleep(110);

        expect(handleSearch.mock.calls[0][0]).toEqual({[VAR_RECORD_ID]: ""});
        expect(handleSearch.mock.calls[0][1].noLoad).toBeTruthy();
        expect(handleSearch.mock.calls[2][0]).toEqual({
            [VAR_RECORD_ID]: "",
            combo1: "71400",
            value1: "test",
            value2: "АНО",
        });
    });
});
