import * as React from "react";
import {render} from "@testing-library/react";
import {Renderer, createEmptyPageStore} from "@essence-community/constructor-share/utils/test";
import {GridTableHeader} from "../components/GridTableHeader";
import {GridModel} from "../stores/GridModel";
import {gridBc} from "../__mock__/builderConfigs";

import "../../GridHeaderDefault";

describe("GridTableHeader", () => {
    it("render", () => {
        const pageStore = createEmptyPageStore();
        const store = new GridModel({bc: gridBc, pageStore});

        render(<Renderer bc={gridBc} component={GridTableHeader} pageStore={pageStore} store={store} />);

        expect(document.querySelector("thead")).toBeInTheDocument();
    });
});
