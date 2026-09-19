import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldCheckboxContainer} from "../containers/FieldCheckboxContainer";

const QTIP_NO = "static:f0e9877df106481eb257c2c04f8eb039";
const QTIP_YES = "static:dacf7ab025c344cb81b700cfcc50e403";

const bc = getBaseBc("checkbox", {
    [VAR_RECORD_DISPLAYED]: "checkbox-label",
    column: "ck_id",
    datatype: "checkbox",
    type: "IFIELD",
});

describe("FieldCheckbox", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldCheckboxContainer} />);

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByText("checkbox-label")).toBeInTheDocument();
        expect(document.querySelector("label")).toHaveAttribute("data-qtip", QTIP_NO);
        expect(document.querySelector(".fa-square-o")).toBeInTheDocument();
    });

    it("value = true", async () => {
        const user = userEvent.setup();

        render(<Renderer bc={bc} component={FieldCheckboxContainer} />);

        await user.click(screen.getByRole("checkbox"));

        expect(screen.getByRole("checkbox")).toBeChecked();
        expect(document.querySelector("label")).toHaveAttribute("data-qtip", QTIP_YES);
        expect(document.querySelector(".fa-check-square")).toBeInTheDocument();
    });

    it("Не выводить label", () => {
        const { [VAR_RECORD_DISPLAYED]: _displayed, ...bcNoLabel } = bc;

        render(<Renderer bc={bcNoLabel} component={FieldCheckboxContainer} />);

        expect(screen.queryByText("checkbox-label")).not.toBeInTheDocument();
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("При блокировки выводить закрашенный квардрат", () => {
        render(<Renderer bc={bc} disabled component={FieldCheckboxContainer} />);

        expect(screen.getByRole("checkbox")).toBeDisabled();
        expect(document.querySelector(".fa-square")).toBeInTheDocument();
    });
});
