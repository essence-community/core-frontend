// @flow
import * as React from "react";
import {camelCaseKeys} from "@essence/essence-constructor-share/utils";
import {Typography} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {sleep} from "../../../utils/base";
import {mountWithTheme, MAX_REQUEST_TIME} from "../../../utils/test";
import {createEmptyPageStore} from "../../../stores";
import {GridModel} from "../../../stores/GridModel";
import gridJson from "../../../../mocks/grid/grid";
import GridAudit from "../GridAudit";

describe("GridAudit", () => {
    const bc = camelCaseKeys(gridJson);
    const pageStore = createEmptyPageStore();
    const gridStore = new GridModel({bc, pageStore});
    const renderChildren = ({onOpen, open, onClose}) => <Icon iconfont="info" onClick={open ? onClose : onOpen} />;

    // $FlowFixMe
    gridStore.recordsStore.selectedRecord = {
        ctChange: "2018-05-24T09:13:39",
    };

    it("Открытие аудита и заполнения данных", async () => {
        const wrapper = mountWithTheme(
            <GridAudit parentStore={gridStore} bc={bc} pageStore={pageStore}>
                {renderChildren}
            </GridAudit>,
        );

        wrapper.find(Icon).simulate("click");
        await sleep(MAX_REQUEST_TIME);

        const typos = wrapper.find(Typography);

        expect(typos.length).toBe(2);
        expect(typos.at(0).text()).toBe("Изменен: 24.05.2018 09:13:39");
        expect(typos.at(1).text()).toBe("Пользователь: test_user");

        wrapper.unmount();
    });

    it("Открытие аудита и закрытие по одной кнопке", () => {
        const onClose = jest.fn();
        const wrapper = mountWithTheme(
            <GridAudit parentStore={gridStore} bc={bc} pageStore={pageStore} onClose={onClose}>
                {renderChildren}
            </GridAudit>,
        );

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(Typography).length).toBe(2);

        wrapper.find(Icon).simulate("click");

        expect(wrapper.find(Typography).length).toBe(0);
        expect(onClose.mock.calls).toHaveLength(1);

        wrapper.unmount();
    });
});
