import * as React from "react";
import {Collapse, Grid, Typography} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {
    mapComponents,
    IBuilderConfig,
    IClassProps,
    Icon,
    findColumns,
    FormContext,
} from "@essence/essence-constructor-share";
import {useStyles} from "./FilterExtended.style";

// eslint-disable-next-line max-lines-per-function
export const FilterExtended = (props: IClassProps) => {
    // @ts-ignore
    const form = React.useContext(FormContext);
    const classes = useStyles(props);
    const {bc} = props;
    const [isOpen, setIsOpen] = React.useState(bc.collapsed !== "true");
    const columns = React.useMemo(() => findColumns(bc), [bc]);
    const handleClear = (event: React.SyntheticEvent) => {
        event.stopPropagation();

        if (form) {
            columns.forEach((column: string) => {
                form.has(column) && form.$(column).reset();
            });
        }
    };

    return useObserver(() => (
        <Collapse in={isOpen} collapsedHeight="24px" data-page-object={`${bc.ckPageObject}-collapsible`}>
            <Grid container direction="column" spacing={0}>
                <Grid item onClick={() => setIsOpen(!isOpen)} className={classes.header}>
                    <Grid container spacing={0}>
                        <Grid item className={classes.headerLeft}>
                            &nbsp;
                        </Grid>

                        <Grid item>
                            <Typography variant="body2" component="span">
                                {"Все параметры "}
                            </Typography>
                            <Icon iconfont={isOpen ? "angle-up" : "angle-down"} />
                        </Grid>

                        <Grid item xs className={classes.topLine}>
                            &nbsp;
                        </Grid>

                        <Grid item onClick={handleClear}>
                            <Icon className={classes.iconClear} iconfont="close" />
                        </Grid>

                        <Grid item className={classes.headerRight}>
                            &nbsp;
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.content}>
                    {mapComponents(
                        props.bc.childs,
                        (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                            <Child {...props} bc={childBc} />
                        ),
                    )}
                </Grid>
            </Grid>
        </Collapse>
    ));
};
