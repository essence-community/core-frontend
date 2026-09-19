import * as React from "react";
import {render, screen} from "@testing-library/react";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldSetContainer} from "../containers/FieldSetContainer";

import "../../Box";
import "../../FieldText";

const FieldSetDeco = commonDecorator(FieldSetContainer);

const childs = [
    getBaseBc("cn_value", {column: "cn_value", datatype: "text", type: "IFIELD"}),
    getBaseBc("cl_overstep", {column: "cl_overstep", datatype: "text", type: "IFIELD"}),
];

const bc = getBaseBc("fieldset", {
    childs,
    column: "fieldset",
    type: "FIELDSET",
});

describe("FieldSet", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldSetContainer} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(2);
    });

    it("render hidden", () => {
        render(<Renderer bc={bc} hidden component={FieldSetDeco} />);

        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
});
