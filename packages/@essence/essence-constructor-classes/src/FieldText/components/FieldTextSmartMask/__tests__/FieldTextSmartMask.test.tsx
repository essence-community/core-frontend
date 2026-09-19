import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldTextContainer} from "../../../containers/FieldTextContainer";

const bc = getBaseBc("text", {
    column: "cv_series",
    datatype: "text",
    imask: "!ck_d_identity_doc.cv_series_mask",
    type: "IFIELD",
});

describe("FieldTextSmartMask", () => {
    it("render", () => {
        const {container} = render(<Renderer bc={bc} component={FieldTextContainer} />);

        expect(container).toBeTruthy();
    });
});
