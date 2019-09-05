// @flow
import * as React from "react";
import noop from "lodash/noop";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import BuilderFilter from "../BuilderFilter";
import {redirectToPage} from "../../stores/PageModel";
import filterGlobalDefaultvaluesBc from "../__mocks__/filterGlobalDefaultvaluesBc";
import filterComboGlobalBc from "../__mocks__/filterComboGlobalBc";

import "../../TextField/BuilderField";

describe("BuilderFilterRedirect", () => {
    const getWrapper = ({handleSearch, bc, pageStore}) =>
        mountWithTheme(
            <BuilderFilter
                bc={bc}
                addRefAction={noop}
                handleGlobals={noop}
                onChangeCollapse={noop}
                onSearch={handleSearch}
                pageStore={pageStore}
                parentBc={{ckObject: "testfilter", ckPageObject: "testfilter", cvName: "testfilter"}}
                editing
                visible
                open
            />,
        );

    it("Проверяем поиск с учетом глобальных переменных и defaultvaluequery", async () => {
        expect.assertions(2);

        const pageStore = createEmptyPageStore();
        const handleSearch = (values) => {
            expect(values).toEqual({
                ckId: "",
                value1: "test",
                value2: "t1 - test",
                value3: "t2 - t1 - test",
                valueDate: "2018-03-01T00:00:00",
                valueTextDate: "2018-03-01T00:00:00",
            });
        };
        const wrapper = getWrapper({bc: filterGlobalDefaultvaluesBc, handleSearch, pageStore});

        await redirectToPage(pageStore, {});

        expect(wrapper.exists()).toBeTruthy();
    });

    it("Проверяем поиск с учетом глобальных переменных и defaultvaluequery, 2 поиска", async () => {
        expect.assertions(3);

        const pageStore = createEmptyPageStore();
        const handleSearch = (values) => {
            expect(values).toEqual({
                ckId: "",
                value1: "test",
                value2: "t1 - test",
                value3: "t2 - t1 - test",
                valueDate: "2018-03-01T00:00:00",
                valueTextDate: "2018-03-01T00:00:00",
            });
        };
        const wrapper = getWrapper({bc: filterGlobalDefaultvaluesBc, handleSearch, pageStore});

        await redirectToPage(pageStore, {});
        await redirectToPage(pageStore, {});

        expect(wrapper.exists()).toBeTruthy();
    });

    it("Проверяем поиск с учетом глобальных переменных и combo=first", async () => {
        expect.assertions(2);

        const pageStore = createEmptyPageStore();
        const handleSearch = (values) => {
            expect(values).toEqual({
                ckId: "",
                combo1: "71400",
                value1: "71400",
                value2: "АНО",
            });
        };
        const wrapper = getWrapper({bc: filterComboGlobalBc, handleSearch, pageStore});

        await redirectToPage(pageStore, {});

        expect(wrapper.exists()).toBeTruthy();
    });

    it("Проверяем поиск с учетом глобальных переменных и combo=first, 2 поиска", async () => {
        expect.assertions(3);

        const pageStore = createEmptyPageStore();
        const handleSearch = (values) => {
            expect(values).toEqual({
                ckId: "",
                combo1: "71400",
                value1: "71400",
                value2: "АНО",
            });
        };

        const wrapper = getWrapper({bc: filterComboGlobalBc, handleSearch, pageStore});

        await redirectToPage(pageStore, {});
        await redirectToPage(pageStore, {});

        expect(wrapper.exists()).toBeTruthy();
    });
});
