import * as React from "react";
import {render, screen} from "@testing-library/react";
import {VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {RecordContext} from "@essence-community/constructor-share/context";
import {createEmptyPageStore, Renderer} from "@essence-community/constructor-share/utils/test";
import {checkboxBc, gridBc} from "../../Grid/__mock__/builderConfigs";
import {GridModel} from "../../Grid/stores/GridModel";
import {ColumnCheckboxContainer} from "../containers/ColumnCheckboxContainer";

describe("ColumnCheckbox", () => {
    it("render checkbox", () => {
        const pageStore = createEmptyPageStore();
        const store = new GridModel({bc: gridBc, pageStore});

        pageStore.stores.set(checkboxBc[VAR_RECORD_PARENT_ID], store);

        render(
            <Renderer
                bc={checkboxBc}
                pageStore={pageStore}
                component={(props) => (
                    <RecordContext.Provider value={{cv_value: "1"}}>
                        <ColumnCheckboxContainer {...props} />
                    </RecordContext.Provider>
                )}
            />,
        );

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });
});
