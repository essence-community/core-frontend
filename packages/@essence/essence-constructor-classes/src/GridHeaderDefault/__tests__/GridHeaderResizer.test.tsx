import * as React from "react";
import {render} from "@testing-library/react";
import {ThemeProvider} from "@mui/material";
import {createEmptyPageStore, theme} from "@essence-community/constructor-share/utils/test";
import {GridHeaderResizer} from "../components/GridHeaderResizer";
import {GridModel} from "../../Grid/stores/GridModel";
import {gridBc} from "../../Grid/__mock__/builderConfigs";

describe("GridHeaderResizer", () => {
    it("render", () => {
        const pageStore = createEmptyPageStore();
        const store = new GridModel({bc: gridBc, pageStore});

        const {container} = render(
            <ThemeProvider theme={theme}>
                <GridHeaderResizer store={store} ckPageObject="boolean" bc={gridBc} />
            </ThemeProvider>,
        );

        expect(container.querySelector("div")).toBeInTheDocument();
    });
});
