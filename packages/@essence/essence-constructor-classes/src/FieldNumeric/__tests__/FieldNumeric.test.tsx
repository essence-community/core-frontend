import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldNumericContainer} from "../containers/FieldNumericContainer";

const bc = getBaseBc("integer", {
    column: "cn_value",
    datatype: "integer",
    type: "IFIELD",
});

describe("FieldNumeric", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldNumericContainer} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
