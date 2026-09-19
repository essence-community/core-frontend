import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FilterContainer} from "../containers/FilterContainer";

import "../../Button";

describe("Filter", () => {
    const bc = getBaseBc("filter", {
        childs: [],
        type: "FILTERPANEL",
    });

    it("render", () => {
        render(<Renderer bc={bc} component={FilterContainer} />);

        expect(document.querySelector("[data-page-object='filter']")).toBeInTheDocument();
    });
});
