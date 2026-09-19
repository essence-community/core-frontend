import * as React from "react";
import {render} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {PanelCollapsible} from "../containers/PanelCollapsible";

import "../../Box";

describe("PanelCollapsible", () => {
    const bc = getBaseBc("panel", {
        [VAR_RECORD_DISPLAYED]: "Collapsible",
        childs: [],
        type: "PANELCOLLAPSED",
    });

    it("render", () => {
        render(<Renderer bc={bc} component={PanelCollapsible} />);

        expect(document.querySelector("[data-page-object='panel-collapsible']")).toBeInTheDocument();
        expect(document.querySelector(".fa-angle-up")).toBeInTheDocument();
    });

    it("сворачивает по клику", async () => {
        const user = userEvent.setup();

        render(<Renderer bc={bc} component={PanelCollapsible} />);

        await user.click(document.querySelector("[data-qtip='Collapsible']")!);

        expect(document.querySelector(".fa-angle-down")).toBeInTheDocument();
    });

    it("стартует свёрнутым при collapsed=true", () => {
        render(<Renderer bc={{...bc, collapsed: true}} component={PanelCollapsible} />);

        expect(document.querySelector(".fa-angle-down")).toBeInTheDocument();
    });
});
