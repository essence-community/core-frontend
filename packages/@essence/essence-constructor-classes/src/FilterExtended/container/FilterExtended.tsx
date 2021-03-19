import * as React from "react";
import {Collapse, Grid, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react";
import {mapComponents, IBuilderConfig, IClassProps, Icon, FormContext} from "@essence-community/constructor-share";
import {useTranslation, toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {findColumns} from "@essence-community/constructor-share/utils/findColumns";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {useStyles} from "./FilterExtended.style";

export const FilterExtended = (props: IClassProps) => {
    const form = React.useContext(FormContext);
    const classes = useStyles(props);
    const {bc} = props;
    const [isOpen, setIsOpen] = React.useState(!bc.collapsed);
    const columns = React.useMemo(() => findColumns(bc), [bc]);
    const [trans] = useTranslation("meta");
    const label = bc[VAR_RECORD_DISPLAYED];
    const handleClear = (event: React.SyntheticEvent) => {
        event.stopPropagation();

        if (form) {
            columns.forEach((column: string) => {
                const field = form.select(column);

                if (field) {
                    field.reset();
                }
            });
        }
    };

    return useObserver(() => (
        <Collapse in={isOpen} collapsedHeight="30px" data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-collapsible`}>
            <Grid container direction="column" spacing={0}>
                <Grid item onClick={() => setIsOpen(!isOpen)} className={classes.header}>
                    <Grid container spacing={0}>
                        <Grid item className={clsx(classes.headerLeft, !isOpen && classes.headerClose)}>
                            &nbsp;
                        </Grid>

                        <Grid item>
                            <Typography variant="body2" component="span" data-qtip={label ? trans(label) : ""}>
                                {`${(label && trans(label)) || ""} `}
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
                    <Grid
                        container
                        direction="column"
                        spacing={1}
                        {...((bc.contentview && GRID_CONFIGS[bc.contentview]) || GRID_CONFIGS["hbox-wrap"])}
                        {...((bc.contentview && bc.align && GRID_ALIGN_CONFIGS[`${bc.align}-${bc.contentview}`]) ||
                            GRID_ALIGN_CONFIGS["left-hbox"])}
                    >
                        {mapComponents(
                            props.bc.childs,
                            (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                <Grid
                                    item
                                    key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}
                                    xs={12}
                                    style={toColumnStyleWidth(childBc.width)}
                                >
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
