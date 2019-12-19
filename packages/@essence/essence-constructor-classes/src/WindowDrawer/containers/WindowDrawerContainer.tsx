import * as React from "react";
import {mapComponents, SideResizer} from "@essence/essence-constructor-share";
import {IWindowClassProps, IBuilderConfig, IClassProps} from "@essence/essence-constructor-share/types";
import {toSize} from "@essence/essence-constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
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
                    {mapComponents(
                        bc.childs,
                        (ChildComp: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                            <ChildComp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                        ),
                    )}
                </Grid>
                {bc.align === "left" ? sideResizer : null}
            </Grid>
        </Drawer>
    );
};
