import * as React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {setComponent} from "@essence-community/constructor-share/components";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {TabPanelContainer} from "../containers/TabPanelContainer";

const TabPanelChild: React.FC<IClassProps> = ({bc, visible}) => (
    <div data-testid={`tab-child-${bc[VAR_RECORD_PAGE_OBJECT_ID]}`} data-visible={String(Boolean(visible))} />
);

setComponent("TABPANELCHILD", TabPanelChild);

describe("TabPanelContainer", () => {
    const bc = getBaseBc("tab", {
        childs: [
            {...getBaseBc("first-tab"), [VAR_RECORD_DISPLAYED]: "First", type: "TABPANELCHILD"},
            {...getBaseBc("second-tab"), [VAR_RECORD_DISPLAYED]: "Second", type: "TABPANELCHILD"},
            {...getBaseBc("third-tab"), [VAR_RECORD_DISPLAYED]: "Third", type: "TABPANELCHILD"},
        ],
        type: "TABPANEL",
    });

    it("render", () => {
        render(<Renderer bc={bc} component={TabPanelContainer} />);

        expect(screen.getByText("First")).toBeInTheDocument();
        expect(screen.getByText("Second")).toBeInTheDocument();
        expect(screen.getByText("Third")).toBeInTheDocument();
        expect(screen.getByTestId("tab-child-first-tab")).toHaveAttribute("data-visible", "true");
        expect(screen.queryByTestId("tab-child-second-tab")).not.toBeInTheDocument();
    });

    it("открывает второй таб", async () => {
        const user = userEvent.setup();

        render(<Renderer bc={bc} component={TabPanelContainer} />);

        await user.click(screen.getByText("Second"));

        expect(screen.getByTestId("tab-child-first-tab")).toHaveAttribute("data-visible", "false");
        expect(screen.getByTestId("tab-child-second-tab")).toHaveAttribute("data-visible", "true");
    });

    it("скрытый первый таб — активен второй", async () => {
        const firstHiddenBc = getBaseBc("tab", {
            childs: [
                {...getBaseBc("first-tab"), [VAR_RECORD_DISPLAYED]: "First", hidden: true, type: "TABPANELCHILD"},
                {...getBaseBc("second-tab"), [VAR_RECORD_DISPLAYED]: "Second", type: "TABPANELCHILD"},
            ],
            type: "TABPANEL",
        });

        render(<Renderer bc={firstHiddenBc} component={TabPanelContainer} />);

        await waitFor(() => {
            expect(screen.getByTestId("tab-child-second-tab")).toHaveAttribute("data-visible", "true");
        });
    });
});
