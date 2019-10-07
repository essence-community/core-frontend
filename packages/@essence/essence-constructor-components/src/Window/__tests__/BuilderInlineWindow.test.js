// @flow
import * as React from "react";
import {GRID_ROW_HEIGHT} from "../../constants";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores";
import {BaseBuilderGrid} from "../../Grid/BuilderGrid";
import TextField from "../../TextField/TextField";
import InlineTable from "../InlineTable";
import InlineButtons from "../InlineButtons/InlineButtons";

const BuilderPage = () => null;

// eslint-disable-next-line max-statements
describe("BuilderInlineWindow", () => {
    const btnBc = {
        ckObject: "btn",
        ckPageObject: "btn",
        cvName: "btn",
        type: "BTN",
    };
    const columnText = {
        ckObject: "cv_internal",
        ckPageObject: "cv_internal",
        column: "cv_internal",
        datatype: "text",
        type: "IFIELD",
    };
    const columnHidden = {
        ckObject: "cv_kpp",
        ckPageObject: "cv_kpp",
        column: "cv_kpp",
        datatype: "text",
        editmode: "disabled",
        type: "IFIELD",
    };
    const gridBc = {
        autoload: "false",
        ckObject: "grid",
        ckPageObject: "grid",
        ckQuery: "OrgShowOrganizations",
        columns: [columnHidden, columnText],
        cvDescription: "Грид Результат поиска Организации",
        cvDisplayed: "Грид Организации",
        cvName: "Org Search Grid",
        edittype: "inline",
        orderdirection: "ASC",
        orderproperty: "cv_name",
        type: "GRID",
    };
    const pageStore = createEmptyPageStore();

    // $FlowFixMe
    pageStore.pageBc = [gridBc];

    beforeEach(() => {
        pageStore.windowsOne.clear();
    });

    it("Create a new default window for insert and non editable fields are hidden", () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        gridStore.onCreateChildWindowMaster("1", btnBc);
        wrapper.update();

        expect(wrapper.find(TextField).prop("value")).toBe("");
        expect(wrapper.find(InlineTable).length).toBe(1);

        wrapper.unmount();
    });

    it("Create a new default window for update and non editable fields are hidden", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        await gridStore.loadRecordsAction({selectedRecordId: 31061});

        gridStore.onRowCreateChildWindowMaster("2", btnBc);
        wrapper.update();

        expect(wrapper.find(TextField).prop("value")).toBe("ПОЗИТИВ ПЛЮС 1");

        wrapper.unmount();
    });

    it("Check type of the field - shoubd be input with type='text'", () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        gridStore.onCreateChildWindowMaster("1", btnBc);
        wrapper.update();

        expect(wrapper.find("input").length).toBe(1);
        expect(wrapper.find("input").prop("type")).toBe("text");
        expect(wrapper.find(TextField).prop("bc").datatype).toBe("text");

        wrapper.unmount();
    });

    it("Create a new record on the top of grid", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        await gridStore.loadRecordsAction({selectedRecordId: 31061});

        gridStore.onCreateChildWindowMaster("1", btnBc);
        wrapper.update();

        expect(
            wrapper
                .find(InlineTable)
                .find("form")
                .prop("style").top,
        ).toBe(0);

        wrapper.unmount();
    });

    it("Edit new record on the same line of grid", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        await gridStore.loadRecordsAction({selectedRecordId: 31061});

        gridStore.onRowCreateChildWindowMaster("2", btnBc);
        wrapper.update();

        expect(
            wrapper
                .find(InlineTable)
                .find("form")
                .prop("style").top,
        ).toBe(GRID_ROW_HEIGHT * 3);

        wrapper.unmount();
    });

    it("Clone record shoud be on the first line of grid", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        await gridStore.loadRecordsAction({selectedRecordId: 31061});

        gridStore.defaultHandlerBtnAction("6", btnBc);
        wrapper.update();

        expect(
            wrapper
                .find(InlineTable)
                .find("form")
                .prop("style").top,
        ).toBe(0);

        wrapper.unmount();
    });

    it("Can save data", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = wrapper.find(BaseBuilderGrid).prop("store");

        gridStore.onCreateChildWindowMaster("1", btnBc);
        wrapper.update();

        const onSpySaveAction = jest.spyOn(gridStore, "saveAction");

        wrapper
            .find(InlineTable)
            .find("input")
            .simulate("change", {target: {value: "test"}});

        expect(wrapper.find(InlineButtons).find("button").length).toBe(2);

        await wrapper
            .find(InlineButtons)
            .find("button")
            .at(0)
            .prop("onClick")(new Event("click"));

        expect(onSpySaveAction.mock.calls[0][0]).toEqual({ckId: "", cvInternal: "test", cvKpp: ""});

        wrapper.unmount();
    });
});
