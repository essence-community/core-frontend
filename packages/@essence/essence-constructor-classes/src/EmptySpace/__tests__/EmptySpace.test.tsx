import * as React from "react";
import {render} from "@testing-library/react";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {EmptySpace} from "../container/EmptySpace";

const EmptySpaceDeco = commonDecorator(EmptySpace);

describe("EmptySpace", () => {
    const bc = getBaseBc("empty");

    it("render", () => {
        const {container} = render(<Renderer bc={bc} component={EmptySpace} />);

        expect(container.querySelector("div")).toBeInTheDocument();
    });

    it("render hidden", () => {
        const {container} = render(<Renderer bc={bc} hidden component={EmptySpaceDeco} />);

        expect(container.querySelector("div")).not.toBeInTheDocument();
    });
});
