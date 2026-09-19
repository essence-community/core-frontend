import * as React from "react";
import {render} from "@testing-library/react";
import {getBaseBc, Renderer, createEmptyPageStore} from "@essence-community/constructor-share/utils/test";
import {GridRow} from "../components/GridRow";
import {GridModel} from "../stores/GridModel";
import {gridBc} from "../__mock__/builderConfigs";
import {records} from "../__mock__/records";

describe("GridRow", () => {
    const bc = {
        ...gridBc,
        detail: [getBaseBc("panel")],
    };

    it("render", () => {
        const pageStore = createEmptyPageStore();
        const store = new GridModel({bc, pageStore});

        render(<Renderer bc={bc} component={GridRow} pageStore={pageStore} store={store} record={records[0]} />);

        expect(document.querySelector("tr")).toBeInTheDocument();
    });
});
