/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable capitalized-comments */
/* eslint-disable import/order */
/* eslint-disable max-len */
/* eslint-disable import/namespace */
/* eslint-disable import/named */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import {Grid} from "@material-ui/core";
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
