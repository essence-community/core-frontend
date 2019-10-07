// @flow
import * as React from "react";
import {FormControl, Checkbox, DialogTitle} from "@material-ui/core";
import BuilderWindowButtonCustom from "../BuilderWindowButtons/BuilderWindowButtonCustom";
import {mountWithTheme} from "../../utils/test";
import BuilderWindow from "../BuilderWindow";
import {GridModel} from "../../stores/GridModel";
import {WindowModel} from "../../stores/WindowModel";
import {createEmptyPageStore} from "../../stores";
import TextField from "../../TextField/TextField";

const BuilderPage = () => null;

// eslint-disable-next-line max-statements
describe("BuilderWindow", () => {
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
    const gridBc = {
        autoload: "false",
        ckObject: "grid",
        ckPageObject: "grid",
        ckQuery: "OrgShowOrganizations",
        columns: [columnText],
        cvDescription: "Грид Результат поиска Организации",
        cvDisplayed: "Грид Организации",
        cvName: "Org Search Grid",
        edittype: "modalwindow",
        orderdirection: "ASC",
        orderproperty: "cv_name",
        type: "GRID",
    };
    const windowBc = {
        autobuild: "true",
        bottombtn: [],
        checkaddmore: "true",
        childs: [],
        ckMaster: "7FF99ACF84713521E053809BA8C08289",
        ckObject: "7FF99ACF84713521E053809BA8C08289_gridwindow",
        ckPage: "61",
        ckPageObject: "7FF99ACF84713521E053809BA8C08289_gridwindow",
        ckParent: "7FF99ACF84713521E053809BA8C08289",
        ckwindow: "gridwindow",
        columns: [],
        cvDescription: "Роли",
        cvDisplayed: "Великолепный мир2",
        cvName: "Org Roles_gridwindow",
        edittype: "modalwindow",
    };
    const inputRow = {
        ckObject: "68E2ADA0B2CC4BD893CEB06D7D8D17D2",
        ckPage: "2",
        ckPageObject: "8149AF5CC0E2435FE053809BA8C0DBC7",
        ckParent: "8149AF5CC0D5435FE053809BA8C0DBC7",
        clDataset: "0",
        cvName: "name",
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
    it("Create a new default window for update  and title = cvDescription", async () => {
        const wrapper = mountWithTheme(<BuilderPage pageStore={pageStore} visible />);
        const gridStore = new GridModel({bc: gridBc, pageStore});

        await gridStore.loadRecordsAction({selectedRecordId: 20081});

        gridStore.onRowCreateChildWindowMaster("2", btnBc);
        wrapper.update();
        expect(wrapper.find(TextField).prop("value")).toBe("Великолепный мир1");
        const dialogtitle = wrapper.find(DialogTitle);

        expect(dialogtitle.find("div").text()).toBe(`Редактирование ${gridBc.cvDescription}`);

        wrapper.unmount();
    });
    it("Create a new default window with windowTitle = cvDisplayed and check Добавить ещё", async () => {
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
