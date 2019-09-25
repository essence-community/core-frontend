// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Grid, TableCell} from "@material-ui/core";
import {toColumnStyleWidth} from "@essence/essence-constructor-share/utils";
import BuilderForm from "../../Form/BuilderForm";
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
        <BuilderForm noForm initialValues={record} pageStore={pageStore}>
            <Content verticalSize="8" contentType="detail">
                <Grid container spacing={1}>
                    {detail.map((panelBc) => (
                        <Grid item key={panelBc.ckPageObject} xs={12} style={toColumnStyleWidth(panelBc.width)}>
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
        </BuilderForm>
    </TableCell>
);

GridDetail.defaultProps = {
    detail: [],
};

export default observer(GridDetail);
