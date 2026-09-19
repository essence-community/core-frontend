import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldMultiContainer} from "../containers/FieldMultiContainer";

const bc = getBaseBc("addr", {
    column: "ck_addr",
    datatype: "addr",
    type: "CUSTOM",
});

describe("FieldMulti", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldMultiContainer} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
