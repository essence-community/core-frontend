/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// @flow
import * as React from "react";
import {gridBc} from "../../../mocks/grid/grid_test";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import {GridModel} from "../../stores/GridModel";
import BuilderForm from "../../Form/BuilderForm";
import BaseGridTableHeader from "../BaseGridTableHeader";

type MountHeaderReturn = {
    store: any,
    wrapper: any,
    pageStore: any,
};

const mountHeader = (bc: any): MountHeaderReturn => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc, pageStore});

    const wrapper: any = mountWithTheme(
        <table>
            <BaseGridTableHeader
                classes={{}}
                bc={bc}
                lowerDirection="asc"
                pageStore={pageStore}
                store={store}
                visible
            />
        </table>,
    );

    return {pageStore, store, wrapper};
};

describe("BaseGridTableHeader", () => {
    it("render", () => {
        const {wrapper} = mountHeader(gridBc);

        expect(wrapper.exists()).toBeTruthy();

        wrapper.unmount();
    });

    it("filter data", async () => {
        const {store, wrapper} = mountHeader(gridBc);
        const spyOnSearchAction = jest.spyOn(store.recordsStore, "searchAction");

        await wrapper.find(BuilderForm).prop("onSubmit")({cvValue: {value: "test"}});

        expect(spyOnSearchAction).toBeCalledWith({}, {filter: [{value: "test"}]});

        await wrapper.find(BuilderForm).prop("onSubmit")({});

        expect(spyOnSearchAction).toHaveBeenCalledWith({}, {filter: []});

        wrapper.unmount();
    });
});
