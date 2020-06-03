import * as React from "react";
import {mapComponents, SideResizer} from "@essence-community/constructor-share";
import {IClassProps} from "@essence-community/constructor-share/types";
import {toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {Grid, Drawer} from "@material-ui/core";
import {useStyles} from "./WindowDrawerContainer.styles";

export const WindowDrawerContainer: React.FC<IClassProps> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const {align = "left", width = "5%", height} = bc;
    const [isOpen, setIsOpen] = React.useState(false);
    const [drawerWidth, setDrawerWidth] = React.useState(width);
    const paperProps = React.useMemo(
        () => ({
            style: {
                height: height,
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
        props.pageStore.closeWindowAction(bc[VAR_RECORD_PAGE_OBJECT_ID]);
    };
    const sideResizer = (
        <Grid item>
            <SideResizer
                anchor={align as "left" | "right"}
                minDrawerWidth={width}
                maxDrawerWidth="50%"
                onChangeWidth={handleResizeWidth}
            />
        </Grid>
    );
    const isOneChild = bc.childs?.length === 1;

    React.useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <Drawer
            anchor={align as "left" | "right"}
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
                <Grid item xs={true} container spacing={1} direction="column" alignItems="stretch">
                    {mapComponents(bc.childs, (ChildComp, childBc) => (
                        <Grid
                            key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                            item
                            xs={childBc.type === "PAGER" || isOneChild ? true : undefined}
                            style={{
                                // Pager has scrollbars, we should pass initial height for this page
                                height: childBc.type === "PAGER" ? "100%" : undefined,
                                ...toColumnStyleWidth(childBc.width),
                                flexBasis: undefined,
                            }}
                        >
                            <ChildComp {...props} bc={childBc} />
                        </Grid>
                    ))}
                </Grid>
                {bc.align === "left" ? sideResizer : null}
            </Grid>
        </Drawer>
    );
};
