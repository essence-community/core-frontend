import * as React from "react";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useObserver} from "mobx-react";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {WIDTH_MAP} from "../../constants";

interface IGridColgroup {
    store: IGridModel;
}

export const GridColgroup: React.FC<IGridColgroup> = ({store}) => {
    return useObserver(() => (
        <colgroup>
            {store.gridColumns.map(({[VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject, maxwidth, minwidth, datatype}) => (
                <col
                    key={ckPageObject}
                    style={{
                        maxWidth: maxwidth,
                        minWidth: minwidth,
                        width: store.columnsWidth.get(ckPageObject) || (datatype && WIDTH_MAP[datatype]),
                    }}
                />
            ))}
        </colgroup>
    ));
};
