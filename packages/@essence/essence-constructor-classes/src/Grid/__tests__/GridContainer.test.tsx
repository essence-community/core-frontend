import * as React from "react";
import {render} from "@testing-library/react";
import {Renderer} from "@essence-community/constructor-share/utils/test";
import {GridContainer} from "../containers/GridContainer";
import {gridBc, gridTreeBc} from "../__mock__/builderConfigs";

import "../../Button";

describe("GridContainer", () => {
    it("render grid", () => {
        render(<Renderer bc={gridBc} component={GridContainer} />);

        expect(document.querySelector("[data-page-object='boolean']")).toBeInTheDocument();
    });

    it("render tree grid", () => {
        render(<Renderer bc={{...gridTreeBc, rootvisible: true}} component={GridContainer} />);

        expect(document.querySelector("[data-page-object='boolean']")).toBeInTheDocument();
    });
});
