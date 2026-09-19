import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {Panel} from "../components/Panel/Panel";
import {PanelContainer} from "../containers/PanelContainer";
import {PanelForm} from "../components/PanelForm/PanelForm";

import "../../Box";
import "../../Button";
import "../../FormPanel";
import "../../PanelCollapsible";

describe("Panel", () => {
    const bc = getBaseBc("panel", {childs: [], type: "PANEL"});

    it("render", () => {
        const {container} = render(<Renderer bc={bc} component={Panel} />);

        expect(container.querySelector("div")).toBeInTheDocument();
    });
});

describe("PanelContainer", () => {
    const bc = getBaseBc("panel", {childs: [], type: "PANEL"});

    it("render", () => {
        const {container} = render(<Renderer bc={bc} component={PanelContainer} />);

        expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("collapsible", () => {
        const {container} = render(
            <Renderer bc={{...bc, collapsible: true}} component={PanelContainer} />,
        );

        expect(container.querySelector("[data-page-object='panel-collapsible-panel-collapsible']")).toBeInTheDocument();
    });

    it("editmodepanel", () => {
        const {container} = render(
            <Renderer
                bc={{
                    ...bc,
                    [VAR_RECORD_DISPLAYED]: "Panel title",
                    editmodepanel: true,
                }}
                component={PanelContainer}
            />,
        );

        expect(container.querySelector("div")).toBeInTheDocument();
    });
});

describe("PanelForm", () => {
    const bc = getBaseBc("panel", {childs: [], type: "PANEL"});

    it("render", () => {
        const {container} = render(<Renderer bc={bc} component={PanelForm} />);

        expect(container.querySelector("div")).toBeInTheDocument();
    });
});
