import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldTableContainer} from "../containers/FieldTableContainer";

const bc = getBaseBc("grid", {
    column: "ck_id",
    datatype: "grid",
    type: "IFIELD",
});

describe("FieldTable", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldTableContainer} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
