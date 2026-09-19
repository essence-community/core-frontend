import * as React from "react";
import {render, screen} from "@testing-library/react";
import {Renderer} from "@essence-community/constructor-share/utils/test";
import {checkboxBc} from "../../Grid/__mock__/builderConfigs";
import {GridHeaderCheckboxContainer} from "../containers/GridHeaderCheckboxContainer";

describe("GridHeaderCheckbox", () => {
    it("render checkbox in table cell", () => {
        render(
            <table>
                <thead>
                    <tr>
                        <Renderer bc={checkboxBc} component={GridHeaderCheckboxContainer} />
                    </tr>
                </thead>
            </table>,
        );

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByRole("checkbox").closest("td")).toBeInTheDocument();
    });
});
