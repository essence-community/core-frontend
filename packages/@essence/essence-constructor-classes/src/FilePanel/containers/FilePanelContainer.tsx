import * as React from "react";
import {Grid, Paper, useTheme} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {toSize} from "@essence-community/constructor-share/utils/transform";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {useObserver} from "mobx-react-lite";
import {useModel} from "@essence-community/constructor-share/hooks";
import {PanelWrapper} from "../components/PanelWrapper/PanelWrapper";
import {FileRecord} from "../components/FileRecord/FileRecord";
import {FilePanelModel} from "../store/FilePanelModel";
import {getFilePanelBtnsConfig} from "./FilePanelModelBtnConfigs";
import {useStyles} from "./FilePanelContainer.styles";

export const FilePanelContainer: React.FC<IClassProps> = (props) => {
    const {bc, elevation, disabled, readOnly, pageStore, visible} = props;
    const theme = useTheme();
    const isDarkTheme = theme.palette.type === "dark";
    const classes = useStyles();
    const contentStyle = React.useMemo(
        () => ({
            height: toSize(bc.height, "100%"),
            maxHeight: toSize(bc.maxheight, "100%"),
            minHeight: toSize(bc.minheight, "100%"),
        }),
        [bc.height, bc.maxheight, bc.minheight],
    );
    const btnsConfig = React.useMemo(() => getFilePanelBtnsConfig(bc, theme.palette.type), [bc, theme.palette.type]);
    const [store] = useModel((options) => new FilePanelModel(options), {
        ...props,
        btnsConfig,
    });
    const btns = React.useMemo(
        () =>
            bc.btnrefresh === "true"
                ? [btnsConfig["Override Add Button"], btnsConfig["Override Refresh Button"]]
                : [btnsConfig["Override Add Button"]],
        [btnsConfig, bc],
    );
    const actionsBar = (
        <Grid
            container
            className={classes.actionsContent}
            alignItems="center"
            spacing={1}
            direction={isDarkTheme ? "column-reverse" : "row"}
        >
            {mapComponents(btns, (ChildCmp, childBc) => (
                <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                    <ChildCmp
                        key="add"
                        bc={childBc}
                        disabled={readOnly || disabled}
                        pageStore={pageStore}
                        visible={visible}
                    />
                </Grid>
            ))}
        </Grid>
    );

    return useObserver(() => (
        <Paper elevation={elevation} className="paper-overflow-hidden" data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}>
            <PanelWrapper {...props} actionsBar={actionsBar}>
                <Scrollbars
                    autoHeightMax={contentStyle.height}
                    hideTracksWhenNotNeeded
                    style={contentStyle}
                    pageStore={pageStore}
                >
                    <Grid className={classes.contentPanel} container direction="row" spacing={1}>
                        {store.recordsStore.records.map((record) => (
                            <Grid item xs={6} key={record[VAR_RECORD_ID] as string}>
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
            </PanelWrapper>
        </Paper>
    ));
};
