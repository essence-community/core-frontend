import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldDateContainer} from "../containers/FieldDateContainer";

const bc = getBaseBc("date", {
    column: "ct_date",
    datatype: "date",
    type: "IFIELD",
});

describe("FieldDate", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldDateContainer} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
