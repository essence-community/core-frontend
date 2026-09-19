import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {ButtonContainer} from "../containers/ButtonContainer";

describe("ButtonContainer", () => {
    const bc = getBaseBc("BTN");

    it("Рендер по умолчанию", () => {
        render(<Renderer bc={bc} component={ButtonContainer} />);

        expect(screen.getByRole("button")).toHaveClass("MuiButton-root");
    });

    it("Проверка темы - uitype=1", () => {
        render(<Renderer bc={{...bc, uitype: "1"}} component={ButtonContainer} />);

        expect(screen.getByRole("button")).toHaveClass("MuiButton-colorPrimary");
    });

    it("Проверка темы - uitype=2", () => {
        render(<Renderer bc={{...bc, uitype: "2"}} component={ButtonContainer} />);

        expect(screen.getByRole("button")).toHaveClass("MuiButton-colorSecondary");
    });

    it("Отображение в виде иконки", () => {
        render(<Renderer bc={{...bc, onlyicon: true}} component={ButtonContainer} />);

        const button = screen.getByRole("button");

        expect(button).toHaveClass("MuiIconButton-root");
        expect(button).not.toHaveClass("MuiButton-root");
    });
});
