import * as React from "react";
import {Paper} from "@material-ui/core";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_MASTER_ID} from "@essence-community/constructor-share/constants";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {GridModel} from "../stores/GridModel";
import {VirtualizedGrid} from "../components/VirtualizedGrid";
import {TreeGridRootRow} from "../components/TreeGridRootRow";
import {BaseGrid} from "../components/BaseGrid";

export const GridContainer: React.FC<IClassProps> = (props) => {
    const {elevation = 0, bc, disabled, pageStore, readOnly, visible} = props;
    const gridBc = React.useMemo(() => {
        const {filters} = bc;

        if (
            bc[VAR_RECORD_MASTER_ID] === undefined &&
            filters &&
            filters.length > 0 &&
            filters[0][VAR_RECORD_MASTER_ID] === undefined
        ) {
            return {
                ...bc,
                autoload: undefined,
                filters: filters.map((filter) => ({
                    ...filter,
                    autoload: bc.autoload,
                })),
            };
        }

        return bc;
    }, [bc]);
    const [store] = useModel((options) => new GridModel(options), {...props, bc: gridBc});

    return (
        <Paper
            elevation={elevation}
            className="paper-overflow-hidden"
            data-page-object={gridBc[VAR_RECORD_PAGE_OBJECT_ID]}
        >
            <BaseGrid
                bc={gridBc}
                store={store}
                disabled={disabled}
                pageStore={pageStore}
                readOnly={readOnly}
                visible={visible}
            >
                {gridBc.rootvisible === "true" ? <TreeGridRootRow store={store} {...props} bc={gridBc} /> : null}
                <VirtualizedGrid store={store} {...props} bc={gridBc} />
            </BaseGrid>
        </Paper>
    );
};
