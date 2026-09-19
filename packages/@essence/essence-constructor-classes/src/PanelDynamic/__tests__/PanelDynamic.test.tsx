import * as React from "react";
import {render} from "@testing-library/react";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {PanelDynamicContainer} from "../containers/PanelDynamicContainer";

import "../../FieldText";

const PanelDynamicDeco = commonDecorator(PanelDynamicContainer);

const bc = getBaseBc("dynamic", {
    childs: [
        getBaseBc("text", {datatype: "text", type: "IFIELD"}),
        getBaseBc("NOT_IMPLEMENTED", {type: "NOT_IMPLEMENTED"}),
    ],
    type: "DYNAMICPANEL",
});

describe("PanelDynamic", () => {
    it("render", () => {
        const {container} = render(<Renderer bc={bc} component={PanelDynamicContainer} />);

        expect(container.querySelector(".MuiGrid-root")).toBeInTheDocument();
    });

    it("render hidden", () => {
        const {container} = render(<Renderer bc={bc} hidden component={PanelDynamicDeco} />);

        expect(container.querySelector(".MuiGrid-root")).not.toBeInTheDocument();
    });
});
