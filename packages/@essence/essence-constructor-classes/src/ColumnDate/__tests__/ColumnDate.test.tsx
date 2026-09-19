import * as React from "react";
import {render, screen} from "@testing-library/react";
import {RecordContext} from "@essence-community/constructor-share/context";
import {Renderer} from "@essence-community/constructor-share/utils/test";
import {dateBc} from "../../Grid/__mock__/builderConfigs";
import {ColumnDateContainer} from "../containers/ColumnDateContainer";

const DATE_VALUE = "2019-01-24T15:00:52";
const DATE_DD_MM_YYYY = "24.01.2019";

describe("ColumnDate", () => {
    it("render format 3 (DD.MM.YYYY)", () => {
        render(
            <Renderer
                bc={{...dateBc, format: "3"}}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: DATE_VALUE}}>
                        <ColumnDateContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText(DATE_DD_MM_YYYY)).toBeInTheDocument();
    });

    it("render empty if value is empty", () => {
        const {container} = render(
            <Renderer
                bc={{...dateBc, format: "3"}}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: ""}}>
                        <ColumnDateContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(container.textContent).toBe("");
    });

    it("render empty if column is missing", () => {
        const {container} = render(
            <Renderer
                bc={{...dateBc, format: "3"}}
                component={(props) => (
                    <RecordContext.Provider value={{}}>
                        <ColumnDateContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(container.textContent).toBe("");
    });

    it("render empty format with default DD.MM.YYYY", () => {
        render(
            <Renderer
                bc={{...dateBc, format: ""}}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: DATE_VALUE}}>
                        <ColumnDateContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText(DATE_DD_MM_YYYY)).toBeInTheDocument();
    });
});
