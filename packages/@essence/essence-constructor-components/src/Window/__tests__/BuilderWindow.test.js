// @flow
import * as React from "react";
import {FormControl, Checkbox, DialogTitle} from "@material-ui/core";
import {
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_NAME,
    VAR_RECORD_ROUTE_PAGE_ID,
    VAR_RECORD_CV_DESCRIPTION,
    VAR_RECORD_CL_DATASET,
} from "@essence/essence-constructor-share/constants";
import BuilderWindowButtonCustom from "../BuilderWindowButtons/BuilderWindowButtonCustom";
import {mountWithTheme} from "../../utils/test";
import BuilderWindow from "../BuilderWindow";
import {GridModel} from "../../stores/GridModel";
import {WindowModel} from "../../stores/WindowModel";
import {createEmptyPageStore} from "../../stores";
import TextField from "../../TextField/TextField";

const BuilderPage = () => null;

// eslint-disable-next-line max-statements, max-lines-per-function
describe("BuilderWindow", () => {
    const btnBc = {
        [VAR_RECORD_NAME]: "btn",
        [VAR_RECORD_OBJECT_ID]: "btn",
        [VAR_RECORD_PAGE_OBJECT_ID]: "btn",
        type: "BTN",
    };
    const columnText = {
        [VAR_RECORD_OBJECT_ID]: "cv_internal",
        [VAR_RECORD_PAGE_OBJECT_ID]: "cv_internal",
        column: "cv_internal",
        datatype: "text",
        type: "IFIELD",
    };
    const gridBc = {
        [VAR_RECORD_CV_DESCRIPTION]: "Грид Результат поиска Организации",
        [VAR_RECORD_DISPLAYED]: "Грид Организации",
        [VAR_RECORD_NAME]: "Org Search Grid",
        [VAR_RECORD_OBJECT_ID]: "grid",
        [VAR_RECORD_PAGE_OBJECT_ID]: "grid",
        [VAR_RECORD_QUERY_ID]: "OrgShowOrganizations",
        autoload: "false",
        columns: [columnText],
        edittype: "modalwindow",
        orderdirection: "ASC",
        orderproperty: "cv_name",
        type: "GRID",
    };
    const windowBc = {
        [VAR_RECORD_CV_DESCRIPTION]: "Роли",
        [VAR_RECORD_DISPLAYED]: "Великолепный мир2",
        [VAR_RECORD_MASTER_ID]: "7FF99ACF84713521E053809BA8C08289",
        [VAR_RECORD_NAME]: "Org Roles_gridwindow",
        [VAR_RECORD_OBJECT_ID]: "7FF99ACF84713521E053809BA8C08289_gridwindow",
        [VAR_RECORD_PAGE_OBJECT_ID]: "7FF99ACF84713521E053809BA8C08289_gridwindow",
        [VAR_RECORD_PARENT_ID]: "7FF99ACF84713521E053809BA8C08289",
        [VAR_RECORD_ROUTE_PAGE_ID]: "61",
        autobuild: "true",
        bottombtn: [],
        checkaddmore: "true",
        childs: [],
        ckwindow: "gridwindow",
        columns: [],
        edittype: "modalwindow",
    };
    const inputRow = {
        [VAR_RECORD_CL_DATASET]: "0",
        [VAR_RECORD_NAME]: "name",
        [VAR_RECORD_OBJECT_ID]: "68E2ADA0B2CC4BD893CEB06D7D8D17D2",
        [VAR_RECORD_PAGE_OBJECT_ID]: "8149AF5CC0E2435FE053809BA8C0DBC7",
        [VAR_RECORD_PARENT_ID]: "8149AF5CC0D5435FE053809BA8C0DBC7",
        [VAR_RECORD_ROUTE_PAGE_ID]: "2",
        datatype: "text",
        type: "IFIELD",
    };
    const inputRowIsDisabled = {
        ...inputRow,
        editmode: "false",
        visibileinwindow: "true",
    };
    const inputRowIsNull = {
        ...inputRow,
        editmode: "false",
        visibileinwindow: "false",
    };

    const pageStore = createEmptyPageStore();

    beforeEach(() => {
        pageStore.windowsOne.clear();
    });

    it("Create a new default window for insert", () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = new GridModel({bc: gridBc, pageStore});

        gridStore.onCreateChildWindowMaster("1", btnBc);
        wrapper.update();

        expect(wrapper.find(TextField).prop("value")).toBe("");

        wrapper.unmount();
    });

    it("Create a new default window for update", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = new GridModel({bc: gridBc, pageStore});

        await gridStore.loadRecordsAction({selectedRecordId: 20081});

        gridStore.onRowCreateChildWindowMaster("2", btnBc);
        wrapper.update();

        expect(wrapper.find(TextField).prop("value")).toBe("Великолепный мир1");

        wrapper.unmount();
    });
    it("Create a new default window for update  and title = cv_description", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = new GridModel({bc: gridBc, pageStore});

        await gridStore.loadRecordsAction({selectedRecordId: 20081});

        gridStore.onRowCreateChildWindowMaster("2", btnBc);
        wrapper.update();
        expect(wrapper.find(TextField).prop("value")).toBe("Великолепный мир1");
        const dialogtitle = wrapper.find(DialogTitle);

        expect(dialogtitle.find("div").text()).toBe(`Редактирование ${gridBc[VAR_RECORD_CV_DESCRIPTION]}`);

        wrapper.unmount();
    });
    it("Create a new default window with windowTitle = [VAR_RECORD_DISPLAYED] and check Добавить ещё", async () => {
        const gridStore = new GridModel({bc: gridBc, pageStore});
        const windowStore = new WindowModel({
            bc: windowBc,
            gridStore,
            mode: "1",
            pageStore,
        });
        const wrapper = mountWithTheme(<BuilderWindow pageStore={pageStore} store={windowStore} visible addMore />);

        await gridStore.loadRecordsAction({selectedRecordId: 20081});

        gridStore.onRowCreateChildWindowMaster("2", btnBc);
        wrapper.update();
        const dialogtitle = wrapper.find(DialogTitle);

        expect(dialogtitle.find("div").text()).toBe("Великолепный мир2");
        expect(wrapper.find(Checkbox)).toBeTruthy();
        wrapper.unmount();
    });

    it("Create a new default window with windowTitle = title and autobuild=false ", () => {
        const gridStore = new GridModel({bc: gridBc, pageStore});
        const windowStore = new WindowModel({
            bc: {...windowBc, autobuild: "false", title: "Чебурек"},
            gridStore,
            mode: "1",
            pageStore,
        });
        const wrapper = mountWithTheme(<BuilderWindow pageStore={pageStore} store={windowStore} visible />);

        const dialogtitle = wrapper.find(DialogTitle);

        expect(dialogtitle.find("div").text()).toBe("Чебурек");
        expect(wrapper.find(BuilderWindowButtonCustom)).toBeTruthy();
        wrapper.unmount();
    });

    it("Create a new default window field is disabled", () => {
        const gridStore = new GridModel({bc: gridBc, pageStore});
        const windowStore = new WindowModel({
            bc: {...windowBc, childs: [inputRowIsDisabled]},
            checkaddmore: false,
            gridStore,
            mode: "9",
            pageStore,
        });
        const wrapper = mountWithTheme(<BuilderWindow pageStore={pageStore} store={windowStore} visible />);

        expect(
            wrapper
                .find(FormControl)
                .at(0)
                .prop("disabled"),
        ).toBeTruthy();
        wrapper.unmount();
    });
    it("Create a new default window field is null", () => {
        const gridStore = new GridModel({bc: gridBc, pageStore});
        const windowStore = new WindowModel({
            bc: {...windowBc, childs: [inputRowIsNull]},
            checkaddmore: false,
            gridStore,
            mode: "9",
            pageStore,
        });
        const wrapper = mountWithTheme(<BuilderWindow pageStore={pageStore} store={windowStore} visible />);

        expect(wrapper.find(FormControl).length).toBe(0);
        wrapper.unmount();
    });
});
