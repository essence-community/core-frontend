import * as React from "react";
import {Paper} from "@material-ui/core";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_MASTER_ID} from "@essence-community/constructor-share/constants";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {GridModel} from "../stores/GridModel";
import {VirtualizedGrid} from "../components/VirtualizedGrid";
import {TreeGridRootRow} from "../components/TreeGridRootRow";
import {BaseGrid} from "../components/BaseGrid";
import {useGetGlobalGrid} from "../hooks/useGetGlobalGrid";

export const GridContainer: React.FC<IClassProps> = (props) => {
    const {elevation = 0, bc, disabled, pageStore, readOnly, visible} = props;
    const gridBc = React.useMemo(() => {
        const {filters} = bc;
        const resBc = {...bc};

        if (resBc.order && resBc.columns) {
            const colBc = resBc.columns.find((bcCol) => bcCol.column === resBc.order[0].property);

            if (colBc && colBc.order && colBc.order.length) {
                resBc.order = colBc.order;
            }
            resBc.order = resBc.order.map((val) => {
                const colChildBc = resBc.columns.find((bcCol) => bcCol.column === val.property);

                if (colChildBc) {
                    return {
                        ...val,
                        datatype: colChildBc.datatype,
                        format: colChildBc.format,
                    };
                }

                return val;
            });

            resBc.columns = resBc.columns.map((col) => {
                if (col.order) {
                    const order = col.order.map((val) => {
                        const colChildBc = resBc.columns.find((bcCol) => bcCol.column === val.property);

                        if (colChildBc) {
                            return {
                                ...val,
                                datatype: colChildBc.datatype,
                                format: colChildBc.format,
                            };
                        }

                        return val;
                    });

                    return {
                        ...col,
                        order,
                    };
                }

                return col;
            });
        }

        if (!resBc[VAR_RECORD_MASTER_ID] && filters && filters.length > 0 && !filters[0][VAR_RECORD_MASTER_ID]) {
            return {
                ...resBc,
                autoload: false,
                filters: filters.map((filter) => ({
                    ...filter,
                    autoload: pageStore.isActiveRedirect ? false : resBc.autoload,
                })),
            };
        }

        return resBc;
    }, [bc, pageStore]);
    const [store] = useModel((options) => new GridModel(options), {...props, bc: gridBc});

    useGetGlobalGrid({store});

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
                {gridBc.rootvisible ? <TreeGridRootRow store={store} {...props} bc={gridBc} /> : null}
                <VirtualizedGrid store={store} {...props} bc={gridBc} />
            </BaseGrid>
        </Paper>
    );
};
