import * as React from "react";
import {render, screen} from "@testing-library/react";
import {TextFieldMask} from "../TextFieldMask";

describe("TextFieldMask", () => {
    it("render", () => {
        render(
            <TextFieldMask
                imask="test-9"
                textFieldProps={{value: "", variant: "standard"}}
                onChange={jest.fn()}
            />,
        );

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
