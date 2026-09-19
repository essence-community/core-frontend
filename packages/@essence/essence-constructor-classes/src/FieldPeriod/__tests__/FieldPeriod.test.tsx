import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldPeriodContainer} from "../containers/FieldPeriod";

import "../../FieldDate";

const bc = getBaseBc("date", {
    columnend: "date_en",
    columnstart: "date_st",
    datatype: "date",
    type: "IPERIOD",
});

describe("FieldPeriod", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldPeriodContainer} />);

        expect(screen.getAllByRole("textbox")).toHaveLength(2);
    });
});
