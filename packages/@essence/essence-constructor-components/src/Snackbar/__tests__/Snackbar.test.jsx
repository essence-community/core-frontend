import {Grow} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import * as React from "react";
import {createEmptyPageStore} from "../../stores/index";
import {mountWithTheme} from "../../utils/test";
import Snackbar from "../Snackbar";
import SnackbarContent from "../SnackbarContent";
import {sleep} from "../../utils/base";

describe("Snackbar", () => {
    const timer = 15;
    const snackbarDefault = {
        code: "test",
        createdAt: "01.01.2019",
        id: 1,
        open: true,
        pageName: "dfdf",
        status: "warning",
        text: "test",
    };

    it("render", () => {
        const wrapper = mountWithTheme(<Snackbar snackbars={[snackbarDefault]} pageStore={createEmptyPageStore()} />);

        expect(wrapper.find(Snackbar).exists()).toBeTruthy();
        expect(wrapper.find(SnackbarContent).exists()).toBeTruthy();
        wrapper.unmount();
    });
    it("закрытие по клику по иконке", () => {
        const handlerSetCloseble = jest.fn();
        const wrapper = mountWithTheme(
            <Snackbar
                snackbars={[snackbarDefault]}
                pageStore={createEmptyPageStore()}
                onSetCloseble={handlerSetCloseble}
            />,
        );

        const content = wrapper.find(SnackbarContent).at(0);

        content
            .find(Icon)
            .at(1)
            .simulate("click");

        expect(handlerSetCloseble).toHaveBeenCalledWith(snackbarDefault.id);
        wrapper.unmount();
    });
    it("закрытие по клику по Grow", () => {
        const handlerClose = jest.fn();
        const wrapper = mountWithTheme(
            <Snackbar snackbars={[snackbarDefault]} pageStore={createEmptyPageStore()} onClose={handlerClose} />,
        );

        const content = wrapper.find(SnackbarContent).at(0);

        content
            .find(Grow)
            .at(0)
            .prop("onExited")(snackbarDefault);
        expect(handlerClose).toHaveBeenCalledWith(snackbarDefault.id);
        wrapper.unmount();
    });

    it("закрытие через некоторе время", async () => {
        const snackbarAutoHidden = {
            ...snackbarDefault,
            autoHidden: true,
            hiddenTimeout: 15,
        };
        const handlerSetCloseble = jest.fn();
        const wrapper = mountWithTheme(
            <Snackbar
                snackbars={[snackbarAutoHidden]}
                pageStore={createEmptyPageStore()}
                onSetCloseble={handlerSetCloseble}
            />,
        );

        await sleep(timer);
        expect(handlerSetCloseble).toHaveBeenCalledWith(snackbarAutoHidden.id);
        wrapper.unmount();
    });
});
