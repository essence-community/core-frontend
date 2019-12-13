import * as React from "react";
import {Collapse, Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react-lite";
import {mapComponents, IBuilderConfig, IClassProps, Icon, FormContext} from "@essence/essence-constructor-share";
import {useTranslation} from "@essence/essence-constructor-share/utils";
import {findColumns} from "@essence/essence-constructor-share/utils/findColumns";
import {useStyles} from "./FilterExtended.style";

export const FilterExtended = (props: IClassProps) => {
    const form = React.useContext(FormContext);
    const classes = useStyles(props);
    const {bc} = props;
    const [isOpen, setIsOpen] = React.useState(bc.collapsed !== "true");
    const columns = React.useMemo(() => findColumns(bc), [bc]);
    const [trans] = useTranslation("meta");
    const handleClear = (event: React.SyntheticEvent) => {
        event.stopPropagation();

        if (form) {
            columns.forEach((column: string) => {
                form.has(column) && form.$(column).reset();
            });
        }
    };

    return useObserver(() => (
        <Collapse in={isOpen} collapsedHeight="30px" data-page-object={`${bc.ckPageObject}-collapsible`}>
            <Grid container direction="column" spacing={0}>
                <Grid item onClick={() => setIsOpen(!isOpen)} className={classes.header}>
                    <Grid container spacing={0}>
                        <Grid item className={clsx(classes.headerLeft, !isOpen && classes.headerClose)}>
                            &nbsp;
                        </Grid>

                        <Grid item>
                            <Typography variant="body2" component="span">
                                {`${(bc.cvDisplayed && trans(bc.cvDisplayed)) || ""} `}
                            </Typography>
                            <Icon iconfont={isOpen ? "angle-up" : "angle-down"} />
                        </Grid>

                        <Grid item xs className={classes.topLine}>
                            &nbsp;
                        </Grid>

                        <Grid item onClick={handleClear}>
                            <Icon className={classes.iconClear} iconfont="close" />
                        </Grid>

                        <Grid item className={clsx(classes.headerRight, !isOpen && classes.headerClose)}>
                            &nbsp;
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.content}>
                    <Grid container direction="column" spacing={1}>
                        {mapComponents(
                            props.bc.childs,
                            (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                <Grid item key={childBc.ckPageObject}>
                                    <Child {...props} bc={childBc} />
                                </Grid>
                            ),
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Collapse>
    ));
};
