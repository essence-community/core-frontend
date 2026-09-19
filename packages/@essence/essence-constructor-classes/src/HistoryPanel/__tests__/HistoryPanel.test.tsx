import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {HistoryPanelContainer} from "../container/HistoryPanelContainer";

import "../../FormPanel";
import "../../Panel";
import "../../Box";
import "../../Button";

describe("HistoryPanel", () => {
    const bc = getBaseBc("history", {childs: [], type: "HISTORYPANEL"});

    it("render", () => {
        render(<Renderer bc={bc} component={HistoryPanelContainer} />);

        expect(document.querySelector("[data-page-object='history']")).toBeInTheDocument();
    });
});
