// @flow
import * as React from "react";
import Grid from "@material-ui/core/Grid/Grid";
import panelMock from "../../../mocks/panel/panel";
import {mountWithTheme} from "../../utils/test";
import {createEmptyPageStore} from "../../stores/index";
import Panel from "../Panel/Panel";

describe("Panel", () => {
    const props = {
        bc: panelMock,
        pageStore: createEmptyPageStore(),
    };

    it("render", () => {
        const wrapper = mountWithTheme(<Panel {...props} />);

        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.find(Grid).exists()).toBeTruthy();
        wrapper.unmount();
    });
});
