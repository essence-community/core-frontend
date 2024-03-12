import * as React from "react";
import {Grid, Paper, useTheme} from "@material-ui/core";
import {getComponent} from "@essence-community/constructor-share/components";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {Pagination, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {useObserver} from "mobx-react";
import {useModel} from "@essence-community/constructor-share/hooks";
import {FileRecord} from "../components/FileRecord/FileRecord";
import {FilePanelModel} from "../store/FilePanelModel";
import {getFilePanelBtnsConfig} from "./FilePanelModelBtnConfigs";
import {useStyles} from "./FilePanelContainer.styles";

export const FilePanelContainer: React.FC<IClassProps> = (props) => {
    const { bc, elevation, disabled, readOnly, pageStore, visible } = props;
    const { pagesize } = bc;
    const theme = useTheme<IEssenceTheme>();
    const classes = useStyles();
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height ?? "100%",
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight ?? "100%",
        }),
        [bc.height, bc.maxheight, bc.minheight],
    );
    const btnsConfig = React.useMemo(() => getFilePanelBtnsConfig(bc, theme.essence.layoutTheme), [
        bc,
        theme.essence.layoutTheme,
    ]);
    const [store] = useModel((options) => new FilePanelModel(options), {
        ...props,
        btnsConfig,
    });
    const btns = React.useMemo(
        () =>
            bc.btnrefresh
                ? [btnsConfig["Override Add Button"], btnsConfig["Override Refresh Button"]]
                : [btnsConfig["Override Add Button"]],
        [btnsConfig, bc],
    );

    const PanelWrapper = React.useMemo(() => getComponent('PANEL.PANELFORM'), []);
    const BCPanel = React.useMemo(() => ({ ...props.bc, contentview: 'vbox', align: 'stretch', topbtn: btns.reverse() }), [props.bc]);

    return useObserver(() => (
        <Paper elevation={elevation} className="paper-overflow-hidden" data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}>
            <PanelWrapper {...props} bc={BCPanel}>
                <Grid container direction="column" spacing={1}>
                    <Grid item>
                        <Scrollbars
                            autoHeightMax={contentStyle.height}
                            hideTracksWhenNotNeeded
                            style={contentStyle}
                            pageStore={pageStore}
                        >
                            <Grid className={classes.contentPanel} container direction="row" spacing={1}>
                                {store.recordsStore.records.map((record) => (
                                    <Grid item xs={4} key={record[VAR_RECORD_ID] as string}>
                                        <FileRecord
                                            pageStore={pageStore}
                                            bc={bc}
                                            record={record}
                                            store={store}
                                            disabled={disabled}
                                            readOnly={readOnly}
                                            visible={visible}
                                        />
                                    </Grid>
                                ))}

                            </Grid>
                        </Scrollbars>
                    </Grid>
                    {store.recordsStore.pageSize ? <Grid container item justify="center" alignItems="center">
                        <Grid item>
                         <Pagination
                            pageStore={store.pageStore}
                            disabled={props.disabled}
                            pageSizeRange={store.recordsStore.pageSizeRange}
                            pageSize={store.recordsStore.pageSize}
                            onChangePageSize={store.recordsStore.setPageSize}
                            ckPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                            count={store.recordsStore.recordsCount}
                            rowsPerPage={store.recordsStore.pageSize}
                            page={store.recordsStore.pageNumber}
                            onChangePage={store.recordsStore.setPageNumberAction}
                        //className={classes.pagination}
                            />
                        </Grid>
                    </Grid> : null}
                </Grid>
            </PanelWrapper>
        </Paper>
    ));
};
