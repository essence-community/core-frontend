import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FilePanelContainer} from "../containers/FilePanelContainer";

import "../../Panel";
import "../../Box";
import "../../Button";

describe("FilePanel", () => {
    const bc = getBaseBc("filepanel", {childs: [], type: "FILEPANEL"});

    it("render", () => {
        render(<Renderer bc={bc} component={FilePanelContainer} />);

        expect(document.querySelector("[data-page-object='filepanel']")).toBeInTheDocument();
    });
});
