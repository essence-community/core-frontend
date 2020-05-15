/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// @flow
import * as React from "react";
import {TableCell, TableSortLabel} from "@material-ui/core";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_CV_DESCRIPTION,
} from "@essence-community/constructor-share/constants";
import gridMock from "../../../mocks/grid/grid";
import {createEmptyPageStore} from "../../stores";
import {mountWithTheme} from "../../utils/test";
import BuilderFilter from "../../Filter/BuilderFilter";
import Pagination from "../../Pagination/Pagination";
import GridRow from "../Row/GridRow";
import BuilderGrid, {BaseBuilderGrid} from "../BuilderGrid";
import BaseGridTableHeader from "../BaseGridTableHeader";
import {sleep} from "../../utils/base";

type GridPropsType = {
    bc: any,
    visible?: boolean,
};

type MountGridRetunType = {
    store: any,
    pageStore: any,
    wrapper: any,
};

const mountGrid = ({bc, visible = true}: GridPropsType): MountGridRetunType => {
    const pageStore = createEmptyPageStore({styleTheme: "dark"});
    const wrapper = mountWithTheme(<BuilderGrid pageStore={pageStore} visible={visible} bc={bc} />);
    const store: any = wrapper.find(BaseBuilderGrid).prop("store");

    return {pageStore, store, wrapper};
};

// eslint-disable-next-line max-lines-per-function
describe("BuilderGrid", () => {
    const filterBc = {
        [VAR_RECORD_CV_DESCRIPTION]: "Фильтр организаций",
        [VAR_RECORD_NAME]: "Filters Panel",
        [VAR_RECORD_OBJECT_ID]: "filter",
        [VAR_RECORD_PAGE_OBJECT_ID]: "filter",
        [VAR_RECORD_PARENT_ID]: "grid",
        childs: [
            {
                [VAR_RECORD_DISPLAYED]: "Краткое наименование организации",
                [VAR_RECORD_NAME]: "cv_short",
                [VAR_RECORD_PAGE_OBJECT_ID]: "cv_short_filter_column",
                column: "cv_short",
                datatype: "text",
                type: "IFIELD",
            },
        ],
        type: "FILTERPANEL",
    };

    it("render grid", () => {
        const {wrapper} = mountGrid({bc: gridMock});

        wrapper.update();

        expect(wrapper.find(BuilderFilter).exists()).toBeFalsy();
        expect(wrapper.exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render tree grid", () => {
        const {wrapper} = mountGrid({bc: {...gridMock, rootvisible: "true", type: "TREEGRID"}});

        expect(wrapper.find(BuilderFilter).exists()).toBeFalsy();
        expect(wrapper.exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("render filter", () => {
        const {wrapper} = mountGrid({bc: {...gridMock, filters: [filterBc]}});

        expect(wrapper.exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("can move to next page", async () => {
        const {store, wrapper} = mountGrid({bc: {...gridMock, filters: [filterBc]}});
        const spyOnSetPageNumberAction = jest.spyOn(store.recordsStore, "setPageNumberAction");

        await store.loadRecordsAction();

        wrapper
            .find(Pagination)
            .find({iconfont: "angle-right"})
            .first()
            .simulate("click");

        expect(wrapper.exists()).toBeTruthy();
        expect(spyOnSetPageNumberAction).toHaveBeenCalledWith(1);

        wrapper.unmount();
    });

    it("Check text structure for row", async () => {
        const {store, wrapper} = mountGrid({bc: {...gridMock, filters: [filterBc]}});

        await store.loadRecordsAction();

        wrapper.update();

        wrapper.find(GridRow).forEach((row) => {
            expect(row.text()).toMatchSnapshot();
        });

        wrapper.unmount();
    });

    it("Check text structure for header", async () => {
        const {store, wrapper} = mountGrid({bc: {...gridMock, filters: [filterBc]}});

        await store.loadRecordsAction();

        wrapper.update();

        wrapper
            .find(BaseGridTableHeader)
            .find(TableCell)
            .forEach((cell) => {
                expect(cell.text()).toMatchSnapshot();
            });

        wrapper.unmount();
    });

    it("Ckeck search action", async () => {
        const {store, wrapper} = mountGrid({bc: {...gridMock, filters: [filterBc]}});
        const spyOnLoadRecordsAction = jest.spyOn(store.recordsStore, "loadRecordsAction");

        // Submit search form
        wrapper
            .find(BuilderFilter)
            .find("form")
            .prop("onSubmit")(new Event("submit"));

        await sleep(0);

        expect(spyOnLoadRecordsAction).toHaveBeenCalledWith({selectedRecordId: undefined});

        wrapper.unmount();
    });

    it("Change sort of column", () => {
        const {store, wrapper} = mountGrid({bc: {...gridMock, filters: [filterBc]}});
        const spyOnLoadRecordsAction = jest.spyOn(store.recordsStore, "loadRecordsAction");

        expect(store.recordsStore.order).toEqual({
            direction: gridMock.orderdirection,
            property: gridMock.orderproperty,
        });

        wrapper
            .find(TableSortLabel)
            .first()
            .simulate("click");

        expect(store.recordsStore.order).toEqual({direction: "DESC", property: "cv_name_displayed"});
        expect(spyOnLoadRecordsAction).toHaveBeenCalledWith();

        wrapper
            .find(TableSortLabel)
            .first()
            .simulate("click");
        expect(store.recordsStore.order).toEqual({direction: "ASC", property: "cv_name_displayed"});

        wrapper.unmount();
    });

    it("orderproperty is required for grid", () => {
        const {wrapper} = mountGrid({bc: {...gridMock, orderproperty: ""}});

        expect(wrapper.text()).toContain("Необходимо заполнить orderproperty для дальнейшей работы таблицы");

        wrapper.unmount();
    });
});
