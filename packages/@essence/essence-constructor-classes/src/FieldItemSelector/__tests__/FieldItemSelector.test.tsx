import * as React from "react";
import {render, screen} from "@testing-library/react";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {FieldItemSelector} from "../containers/FieldItemSelector";

import "../../Button";
import "../../Grid";

const bc = getBaseBc("itemselector", {
    childs: [getBaseBc("from", {type: "GRID"}), getBaseBc("to", {type: "GRID"})],
    column: "itemselector",
    type: "ITEMSELECTOR",
});

describe("FieldItemSelector", () => {
    it("render", () => {
        render(<Renderer bc={bc} component={FieldItemSelector} />);

        expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
    });

    it.skip("Проверяем выбор всех значений — нет DImprovement.json", () => undefined);

    it.skip("Проверяем удаление всех значений — нет DImprovement.json", () => undefined);

    it.skip("Выбор первого значения — нет DImprovement.json", () => undefined);

    it.skip("Удаление первого значения — нет DImprovement.json", () => undefined);
});
