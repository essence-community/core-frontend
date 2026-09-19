import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {GridHeaderFilter} from "../components/GridHeaderFilter";
import {GridHFText} from "../../GridHFText/containers/GridHFText";

describe("GridHeaderFilter", () => {
    it("checkbox не рендерит фильтр", () => {
        const bc = getBaseBc("col", {datatype: "checkbox"});
        const {container} = render(<Renderer bc={bc} component={GridHeaderFilter} />);

        expect(container).toBeEmptyDOMElement();
    });

    it("text рендерит иконку фильтра", () => {
        const bc = getBaseBc("col", {column: "cv_name", datatype: "text"});

        render(<Renderer bc={bc} component={GridHeaderFilter} />);

        expect(document.querySelector(".fa-caret-down")).toBeInTheDocument();
    });
});

describe("GridHFText", () => {
    it("render", () => {
        const bc = getBaseBc("col", {column: "text_column", datatype: "text"});

        render(<Renderer bc={bc} component={GridHFText} />);

        expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);
    });
});
