import * as React from "react";
import {mapComponents, SideResizer, IWindowClassProps} from "@essence/essence-constructor-share";
import {Grid, Drawer} from "@material-ui/core";
import {useStyles} from "./WindowDrawerContainer.styles";

const ALIGNS = {
    left: "left",
    right: "right",
};

export const WindowDrawerContainer: React.FC<IWindowClassProps> = (props) => {
    const classes = useStyles(props);
    const {bc} = props;
    const anchor = ALIGNS[bc.align];
    const [isOpen, setIsOpen] = React.useState(false);
    const [drawerWidth, setDrawerWidth] = React.useState(bc.width);
    const paperProps = React.useMemo(() => ({style: {width: drawerWidth}}), [drawerWidth]);
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
                minDrawerWidth={bc.width}
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
            <Grid container spacing={0} direction="row" alignItems="stretch" className={classes.container}>
                {bc.align === "right" ? sideResizer : null}
                <Grid item xs={true} className={classes.content}>
                    {mapComponents(bc.childs, (ChildComp, childBc) => (
                        <ChildComp key={childBc.ckPageObject} {...props} bc={childBc} />
                    ))}
                </Grid>
                {bc.align === "left" ? sideResizer : null}
            </Grid>
        </Drawer>
    );
};
