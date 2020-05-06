// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Grid, TableCell} from "@material-ui/core";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {UIForm} from "@essence-community/constructor-share/uicomponents";
import {type GridModelType} from "../../stores/GridModel";
import {type PageModelType} from "../../stores/PageModel";
import Content from "../../Components/Content/Content";
import BuilderBasePanel from "../../Panel/BuilderBasePanel";

type PropsType = {
    record: Object,
    detail: Array<Object>,
    store: GridModelType,
    pageStore: PageModelType,
    visible: boolean,
};

const GridDetail = ({record, detail, pageStore, visible, store}: PropsType) => (
    <TableCell colSpan={store.gridColumns.length} padding="none">
        <UIForm noForm initialValues={record} pageStore={pageStore}>
            <Content verticalSize="8" contentType="detail">
                <Grid container spacing={1}>
                    {detail.map((panelBc) => (
                        <Grid
                            item
                            key={panelBc[VAR_RECORD_PAGE_OBJECT_ID]}
                            xs={12}
                            style={toColumnStyleWidth(panelBc.width)}
                        >
                            <BuilderBasePanel
                                bc={panelBc}
                                editing={false}
                                pageStore={pageStore}
                                visible={visible}
                                record={record}
                                readOnly
                            />
                        </Grid>
                    ))}
                </Grid>
            </Content>
        </UIForm>
    </TableCell>
);

GridDetail.defaultProps = {
    detail: [],
};

export default observer(GridDetail);
