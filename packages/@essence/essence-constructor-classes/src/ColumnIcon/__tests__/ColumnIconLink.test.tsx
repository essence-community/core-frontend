import * as React from "react";
import {act, fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {getBaseBc, Renderer, createEmptyPageStore} from "@essence-community/constructor-share/utils/test";
import {ColumnIconContainer} from "../containers/ColumnIconContainer";

import "../../Button";

const bc = getBaseBc("COLUMN.ICON", {
    handler: "showMenu",
    readonly: false,
});

const popoverSelector = "[data-page-object='COLUMN.ICON-links']";

function renderColumnIcon(pageStore = createEmptyPageStore()) {
    pageStore.setPageElAction(document.body);

    return {
        pageStore,
        user: userEvent.setup(),
        ...render(<Renderer bc={bc} component={ColumnIconContainer} pageStore={pageStore} />),
    };
}

describe("ColumnIconLink", () => {
    it("render", () => {
        renderColumnIcon();

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Проверка открытия меню", async () => {
        const {user} = renderColumnIcon();

        await user.click(screen.getByRole("button"));

        expect(document.querySelector(popoverSelector)).toBeInTheDocument();
    });

    it.skip("Проверка открытия меню - hiddenrules ck_d_m для первой link", async () => {
        const {user} = renderColumnIcon();

        await user.click(screen.getByRole("button"));

        expect(screen.getAllByRole("button").length).toBeGreaterThan(1);
    });

    it("Проверка закрытия меню по esc", async () => {
        const {user} = renderColumnIcon();

        await user.click(screen.getByRole("button"));
        fireEvent.keyDown(document.querySelector(popoverSelector)!, {key: "Escape"});

        expect(document.querySelector(popoverSelector)).not.toBeInTheDocument();
    });

    it("Проверка закрытия меню по скролу от pageStore", async () => {
        const {user, pageStore} = renderColumnIcon();

        await user.click(screen.getByRole("button"));
        act(() => {
            pageStore.fireScrollEvent();
        });

        expect(document.querySelector(popoverSelector)).not.toBeInTheDocument();
    });
});
