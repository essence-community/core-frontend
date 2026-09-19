import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer, createEmptyPageStore} from "@essence-community/constructor-share/utils/test";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {WindowContainer} from "../containers/WindowContainer";

import "../../Box";
import "../../Button";

describe("Window", () => {
    const bc = getBaseBc("window", {
        [VAR_RECORD_DISPLAYED]: "Test Window",
        mode: "2",
        childs: [],
        type: "WIN",
    });

    it("render", () => {
        const pageStore = createEmptyPageStore();

        pageStore.setPageElAction(document.body as HTMLDivElement);

        render(<Renderer bc={bc} component={WindowContainer} pageStore={pageStore} />);

        expect(document.querySelector("[data-page-object='window']")).toBeInTheDocument();
    });
});
