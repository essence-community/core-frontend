// @flow
import * as React from "react";
import {type ReactWrapper} from "enzyme";
import {gridBc} from "../../../mocks/grid/grid_test";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import {type PageModelType} from "../../stores/PageModel";
import {GridModel, type GridModelType} from "../../stores/GridModel";
import BuilderForm from "../../Form/BuilderForm";
import BaseGridTableHeader from "../BaseGridTableHeader";
import {type BuilderGridType} from "../BuilderGridType";

type MountHeaderReturn = {
    store: GridModelType,
    wrapper: ReactWrapper,
    pageStore: PageModelType,
};

const mountHeader = (bc: BuilderGridType): MountHeaderReturn => {
    const pageStore = createEmptyPageStore();
    const store = new GridModel({bc, pageStore});

    const wrapper: ReactWrapper = mountWithTheme(
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
