import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ThemeProvider} from "@mui/material";
import {ISnackbar} from "@essence-community/constructor-share/types";
import {theme} from "@essence-community/constructor-share/utils/test";
import {Snackbar} from "../Snackbar";

const snackbarDefault: ISnackbar = {
    autoHidden: false,
    code: "test",
    createdAt: "01.01.2019",
    hiddenTimeout: 0,
    id: "1",
    open: true,
    pageName: "dfdf",
    read: false,
    status: "warning",
    text: "test",
    type: "msg",
};

describe("Snackbar", () => {
    it("render", () => {
        render(
            <ThemeProvider theme={theme}>
                <Snackbar snackbars={[snackbarDefault]} onClose={jest.fn()} onSetCloseble={jest.fn()} />
            </ThemeProvider>,
        );

        expect(screen.getByText("test")).toBeInTheDocument();
    });

    it("закрытие по клику по иконке", async () => {
        const user = userEvent.setup();
        const onSetCloseble = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <Snackbar snackbars={[snackbarDefault]} onClose={jest.fn()} onSetCloseble={onSetCloseble} />
            </ThemeProvider>,
        );

        await user.click(document.querySelector(".fa-times")!);

        expect(onSetCloseble).toHaveBeenCalledWith(snackbarDefault.id);
    });

    it("закрытие через некоторое время", async () => {
        const onSetCloseble = jest.fn();

        render(
            <ThemeProvider theme={theme}>
                <Snackbar
                    snackbars={[{...snackbarDefault, autoHidden: true, hiddenTimeout: 15}]}
                    onClose={jest.fn()}
                    onSetCloseble={onSetCloseble}
                />
            </ThemeProvider>,
        );

        await waitFor(() => expect(onSetCloseble).toHaveBeenCalledWith(snackbarDefault.id));
    });
});
