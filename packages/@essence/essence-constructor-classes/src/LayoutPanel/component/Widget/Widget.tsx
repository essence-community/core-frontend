import * as React from "react";
import cn from "clsx";
import {Grid, Paper} from "@material-ui/core";
import {IClassProps, Icon, useTranslation, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share";
import {useCommon} from "@essence-community/constructor-share/hooks/useCommon/useCommon";
import {useObserver} from "mobx-react";
import {Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {IBuilderClassConfig, IChildBuilderConfig} from "../../types";
import {LayoutPanelModel} from "../../store/LayoutPanelModel";
import {useStyles} from "./Widget.styles";

export interface IWidgetProps<BC, BCParent> extends IClassProps<BC> {
    bc: BC;
    bcParent: BCParent;
    store: LayoutPanelModel;
    className?: string;
    draggableHandle?: string;
    style?: React.CSSProperties;
}

const VERTICAL_STYLE = {zIndex: 3};
const SCROLLABRS_STYLE = {height: "100%", paddingRight: 10, width: "100%"};

export const Widget: React.FC<IWidgetProps<IChildBuilderConfig, IBuilderClassConfig>> = (props) => {
    const {bc, bcParent, store, children, className, draggableHandle, style} = props;
    const classes = useStyles(props);
    const {hidden} = useCommon(props);
    const [trans] = useTranslation();

    React.useEffect(() => {
        store.setHiddenComponent(bc[VAR_RECORD_PAGE_OBJECT_ID], hidden);
    }, [hidden, store, bc]);

    const isDraggable = React.useMemo(() => {
        let res =
            typeof bcParent.layoutpanelconfig?.isDraggable === "boolean"
                ? bcParent.layoutpanelconfig?.isDraggable
                : true;

        if (typeof bc.layoutcomponentconfig?.isDraggable === "boolean") {
            res = bc.layoutcomponentconfig.isDraggable;
        }

        return res;
    }, [bc, bcParent]);

    const isCollapsible = React.useMemo(() => {
        let res =
            typeof bcParent.layoutpanelconfig?.isCollapsible === "boolean"
                ? bcParent.layoutpanelconfig?.isCollapsible
                : true;

        if (typeof bc.layoutcomponentconfig?.isCollapsible === "boolean") {
            res = bc.layoutcomponentconfig.isCollapsible;
        }

        return res;
    }, [bc, bcParent]);

    const isFullScreen = React.useMemo(() => {
        let res =
            typeof bcParent.layoutpanelconfig?.isFullScreen === "boolean"
                ? bcParent.layoutpanelconfig?.isFullScreen
                : true;

        if (typeof bc.layoutcomponentconfig?.isFullScreen === "boolean") {
            res = bc.layoutcomponentconfig.isFullScreen;
        }

        return res;
    }, [bc, bcParent]);

    const handleCollapse = React.useCallback(() => store.handleCollapse(bc[VAR_RECORD_PAGE_OBJECT_ID]), [store, bc]);

    const handleFullScreen = React.useCallback(() => store.handleFullScreen(bc[VAR_RECORD_PAGE_OBJECT_ID]), [
        store,
        bc,
    ]);

    return useObserver(() => (
        <Paper className={cn(classes.root, "paper-overflow-hidden", className)}>
            <Grid
                container
                item
                className={cn(classes.root, className)}
                wrap="wrap"
                style={style}
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >
                <Grid
                    container
                    item
                    className={classes.headerWidget}
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    style={{
                        height: bcParent.layoutpanelconfig?.rowHeight || 30,
                    }}
                >
                    <Grid container item xs={true} direction="row" justify="flex-start" alignItems="center">
                        <Grid item className={classes.label}>
                            {trans(store.label.get(bc[VAR_RECORD_PAGE_OBJECT_ID]))}
                        </Grid>
                    </Grid>
                    <Grid item justify="center" alignItems="center">
                        <Grid container item>
                            {isFullScreen ? (
                                <Icon
                                    onClick={handleFullScreen}
                                    className={cn(classes.icon, classes.clickIcon)}
                                    iconfont={
                                        store.activeFullScreen &&
                                        store.activeFullScreen.i === bc[VAR_RECORD_PAGE_OBJECT_ID]
                                            ? "fullscreen-exit"
                                            : "fullscreen"
                                    }
                                    iconfontname="mdi"
                                />
                            ) : null}
                        </Grid>
                    </Grid>
                    <Grid item justify="center" alignItems="center">
                        <Grid container item>
                            {isCollapsible &&
                            (!store.activeFullScreen ||
                                (store.activeFullScreen &&
                                    store.activeFullScreen.i !== bc[VAR_RECORD_PAGE_OBJECT_ID])) ? (
                                <Icon
                                    onClick={handleCollapse}
                                    className={cn(classes.icon, classes.clickIcon, classes.collapse)}
                                    iconfont={
                                        store.collapsedLayout.has(bc[VAR_RECORD_PAGE_OBJECT_ID])
                                            ? "chevron-down"
                                            : "chevron-up"
                                    }
                                    iconfontname="fa"
                                />
                            ) : null}
                        </Grid>
                    </Grid>
                    <Grid item justify="center" alignItems="center">
                        <Grid container item>
                            {isDraggable &&
                            (!store.activeFullScreen ||
                                (store.activeFullScreen &&
                                    store.activeFullScreen.i !== bc[VAR_RECORD_PAGE_OBJECT_ID])) ? (
                                <Icon
                                    className={cn(classes.icon, classes.moveIcon, draggableHandle)}
                                    iconfont="arrow-all"
                                    iconfontname="mdi"
                                />
                            ) : null}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={true}>
                    <Scrollbars
                        style={SCROLLABRS_STYLE}
                        hideTracksWhenNotNeeded
                        withRequestAnimationFrame
                        verticalStyle={VERTICAL_STYLE}
                    >
                        {children}
                    </Scrollbars>
                </Grid>
            </Grid>
        </Paper>
    ));
};
