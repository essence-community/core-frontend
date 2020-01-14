import {IClassProps, Icon, Scrollbars, SnackbarStatus} from "@essence-community/constructor-share";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {ButtonBase, Grid, Tabs} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {Notification} from "../components/Notification/Notification";
import NotificationsReadButton from "../components/NotificationsReadButton/NotificationsReadButton";
import {getTabsData, mapNotification} from "../components/NotificationsTabs/NotificationsTabs";
import {NotificationsTab} from "../components/NotificationsTabs/NotificationTab";
import {useStyles} from "./NotificationPanel.styles";

const SCROLLBARS_STYLE = {
    height: "calc(100% - 106px)",
};

export const NotificationPanel: React.FC<IClassProps> = (props) => {
    const classes = useStyles(props);
    const [trans] = useTranslation("meta");
    const tabsBc = React.useMemo(() => {
        return getTabsData(props.bc, props.bc.childs || []);
    }, [props.bc]);
    const handlerChangeTab = (event: React.ChangeEvent<{}>, tabValue: number) => {
        const {value} = tabsBc[tabValue];

        snackbarStore.setStatusAction(value as SnackbarStatus);
    };

    return useObserver(() => (
        <div className={classes.root}>
            <Tabs
                value={mapNotification[snackbarStore.activeStatus]}
                classes={{
                    root: classes.tabsRoot,
                }}
                variant="scrollable"
                onChange={handlerChangeTab}
            >
                {tabsBc.map((tabBc) => (
                    <NotificationsTab
                        {...props}
                        key={tabBc.value}
                        selected={snackbarStore.activeStatus === tabBc.value}
                        bc={tabBc}
                    />
                ))}
            </Tabs>
            <Scrollbars style={SCROLLBARS_STYLE}>
                {snackbarStore.snackbarsInStatus.map((snackbar) => (
                    <Notification key={snackbar.id} snackbar={snackbar} snackbarStore={snackbarStore} />
                ))}
            </Scrollbars>
            <Grid container spacing={0} direction="row" wrap="nowrap" className={classes.bottomBar}>
                <Grid item>
                    <ButtonBase
                        onClick={snackbarStore.deleteAllSnackbarAction}
                        classes={{
                            disabled: classes.disabledBtn,
                            root: classes.btn,
                        }}
                        disabled={!snackbarStore.snackbarsInStatus.length}
                        disableRipple
                        data-qtip={trans("static:b0c16afd6507416196e01223630f9d62")}
                        data-page-object={"snackbar-remove-all"}
                    >
                        <Icon iconfont="trash-o" iconfontname="fa" size="2x" />
                    </ButtonBase>
                </Grid>
                <Grid item>
                    <NotificationsReadButton snackbarStore={snackbarStore} />
                </Grid>
            </Grid>
        </div>
    ));
};
