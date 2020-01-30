import * as React from "react";
import {mapComponents, SideResizer} from "@essence-community/constructor-share";
import {IWindowClassProps, IBuilderConfig, IClassProps} from "@essence-community/constructor-share/types";
import {toSize, toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Grid, Drawer} from "@material-ui/core";
import {useStyles} from "./WindowDrawerContainer.styles";

export const WindowDrawerContainer: React.FC<IWindowClassProps> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const {align = "left", width = "5%", height} = bc;
    // @ts-ignore
    const anchor: "left" | "right" = align;
    const [isOpen, setIsOpen] = React.useState(false);
    const [drawerWidth, setDrawerWidth] = React.useState(width);
    const paperProps = React.useMemo(
        () => ({
            style: {
                height: height ? toSize(height) : undefined,
                width: drawerWidth,
            },
        }),
        [drawerWidth, height],
    );
    const handleResizeWidth = React.useCallback((value: string) => {
        setDrawerWidth(value);
    }, []);
    const openCloseDrawer = () => {
        setIsOpen(false);
    };
    const handleRemoveWindow = () => {
        props.pageStore.removeWindowAction(props.store);
    };
    const sideResizer = (
        <Grid item>
            <SideResizer
                anchor={anchor}
                minDrawerWidth={width}
                maxDrawerWidth="50%"
                onChangeWidth={handleResizeWidth}
            />
        </Grid>
    );

    React.useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <Drawer
            anchor={anchor}
            open={isOpen}
            onClose={openCloseDrawer}
            variant="temporary"
            classes={{paper: classes.drawerPaper}}
            BackdropProps={{invisible: true}}
            PaperProps={paperProps}
            SlideProps={{onExited: handleRemoveWindow}}
        >
            <Grid
                container
                spacing={0}
                wrap="nowrap"
                direction="row"
                alignItems="stretch"
                className={classes.container}
            >
                {bc.align === "right" ? sideResizer : null}
                <Grid item xs={true} className={classes.content}>
                    <Grid container spacing={1} direction="row">
                        {mapComponents(
                            bc.childs,
                            (ChildComp: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                <Grid
                                    key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                    item
                                    xs={12}
                                    style={{
                                        // Pager has scrollbars, we should pass initial height for this page
                                        height: childBc.type === "PAGER" ? "100%" : undefined,
                                        ...toColumnStyleWidth(childBc.width),
                                    }}
                                >
                                    <ChildComp {...props} bc={childBc} />
                                </Grid>
                            ),
                        )}
                    </Grid>
                </Grid>
                {bc.align === "left" ? sideResizer : null}
            </Grid>
        </Drawer>
    );
};
