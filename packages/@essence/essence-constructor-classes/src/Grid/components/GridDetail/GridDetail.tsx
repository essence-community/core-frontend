import * as React from "react";
import {TableCell, Grid} from "@material-ui/core";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {noop, toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {IRecord, IClassProps, IPageModel} from "@essence-community/constructor-share/types";
import {IGridModel} from "../../stores/GridModel/GridModel.types";
import {useStyles} from "./GridDetail.styles";

interface IGridDetailProps extends IClassProps {
    record: IRecord;
    store: IGridModel;
    pageStore: IPageModel;
}

export const GridDetail: React.FC<IGridDetailProps> = ({record, bc, store, ...classProps}) => {
    const classes = useStyles();
    const panelDetails = React.useMemo(
        () => bc.detail?.map((detailBc) => ({...detailBc, type: detailBc.type || "BOX"})),
        [bc.detail],
    );

    return (
        <TableCell colSpan={store.gridColumns.length} padding="none">
            <UIForm onSubmit={noop} noForm initialValues={record} pageStore={classProps.pageStore} editing={false}>
                <div className={classes.content}>
                    <Grid container spacing={1}>
                        {mapComponents(panelDetails, (ChildCmp, childBc) => (
                            <Grid
                                item
                                key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                xs={12}
                                style={toColumnStyleWidth(childBc.width)}
                            >
                                <ChildCmp {...classProps} bc={childBc} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </UIForm>
        </TableCell>
    );
};
