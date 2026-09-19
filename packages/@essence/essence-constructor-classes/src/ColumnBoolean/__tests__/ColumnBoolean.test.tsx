import * as React from "react";
import {render, screen} from "@testing-library/react";
import {RecordContext} from "@essence-community/constructor-share/context";
import {getBaseBc, Renderer} from "@essence-community/constructor-share/utils/test";
import {booleanBc} from "../../Grid/__mock__/builderConfigs";
import {ColumnBooleanContainer} from "../containers/ColumnBooleanContainer";

const QTIP_YES = "static:dacf7ab025c344cb81b700cfcc50e403";
const QTIP_NO = "static:f0e9877df106481eb257c2c04f8eb039";

describe("ColumnBoolean", () => {
    it("render yes", () => {
        render(
            <Renderer
                bc={booleanBc}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: 1}}>
                        <ColumnBooleanContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText(QTIP_YES)).toBeInTheDocument();
    });

    it("render no", () => {
        render(
            <Renderer
                bc={getBaseBc("boolean", booleanBc)}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: 0}}>
                        <ColumnBooleanContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByText(QTIP_NO)).toBeInTheDocument();
    });
});
