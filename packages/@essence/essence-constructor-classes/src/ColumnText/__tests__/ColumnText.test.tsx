import * as React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {createEmptyPageStore, getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {integerBc, numberBc, textBc} from "../../Grid/__mock__/builderConfigs";
import {ColumnTextContainer} from "../containers/ColumnTextContainer";

describe("ColumnText", () => {
    it("render empty value", () => {
        const {container} = render(
            <Renderer
                bc={textBc}
                component={(props) => (
                    <RecordContext.Provider value={{}}>
                        <ColumnTextContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("render default", () => {
        render(
            <Renderer
                bc={textBc}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: "test"}}>
                        <ColumnTextContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText("test")).toBeInTheDocument();
    });

    [
        ["200.5", "200.5"],
        ["100500.505", "100500.505"],
    ].forEach(([value, view]) => {
        it(`render integer: ${value}`, () => {
            render(
                <Renderer
                    bc={integerBc}
                    component={(props) => (
                        <RecordContext.Provider value={{cv_value: value}}>
                            <ColumnTextContainer {...props} />
                        </RecordContext.Provider>
                    )}
                />,
            );

            expect(screen.getByText(view)).toBeInTheDocument();
        });

        it(`render numeric: ${value}`, () => {
            render(
                <Renderer
                    bc={numberBc}
                    component={(props) => (
                        <RecordContext.Provider value={{cv_value: value}}>
                            <ColumnTextContainer {...props} />
                        </RecordContext.Provider>
                    )}
                />,
            );

            expect(screen.getByText(view)).toBeInTheDocument();
        });

        it(`render numeric: ${value} with decimalprecision=-1`, () => {
            render(
                <Renderer
                    bc={{...numberBc, decimalprecision: -1}}
                    component={(props) => (
                        <RecordContext.Provider value={{cv_value: value}}>
                            <ColumnTextContainer {...props} />
                        </RecordContext.Provider>
                    )}
                />,
            );

            expect(screen.getByText(view)).toBeInTheDocument();
        });
    });

    it("redirect to page", () => {
        const pageStore = createEmptyPageStore();
        const spyOnRedirectToAction = jest.spyOn(pageStore.applicationStore, "redirectToAction");
        const bc = getBaseBc("text", {
            ...textBc,
            columnsfilter: [{in: VAR_RECORD_ID, out: VAR_RECORD_ID}],
            redirecturl: "core-1",
        });

        render(
            <Renderer
                bc={bc}
                pageStore={pageStore}
                component={(props) => (
                    <RecordContext.Provider value={{[VAR_RECORD_ID]: "100500", cv_value: "test"}}>
                        <ColumnTextContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        fireEvent.click(screen.getByRole("link"));

        expect(spyOnRedirectToAction).toHaveBeenCalledWith("core-1", {[VAR_RECORD_ID]: "100500"});
    });
});
