import * as React from "react";
import {render, screen} from "@testing-library/react";
import {RecordContext} from "@essence-community/constructor-share/context";
import {Renderer} from "@essence-community/constructor-share/utils/test";
import {treeBc} from "../../Grid/__mock__/builderConfigs";
import {ColumnDetailContainer} from "../containers/ColumnDetailContainer";

import "../../Button";

describe("ColumnDetail", () => {
    it("render button without store", () => {
        render(
            <Renderer
                bc={treeBc}
                component={(props) => (
                    <RecordContext.Provider value={{}}>
                        <ColumnDetailContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});
