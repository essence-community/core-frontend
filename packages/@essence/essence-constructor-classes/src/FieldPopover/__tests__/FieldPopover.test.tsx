import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldPopoverContainer} from "../containers/FieldPopoverContainer";

const bc = getBaseBc("popover", {
    column: "ck_id",
    datatype: "popover",
    type: "IFIELD",
});

describe("FieldPopover", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldPopoverContainer} />);

        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
});
