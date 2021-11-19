import * as React from "react";
import {Grid, Collapse, Typography, useTheme} from "@material-ui/core";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IClassProps, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {Icon} from "@essence-community/constructor-share/Icon";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {toTranslateText} from "@essence-community/constructor-share/utils/transform";
import {FormContext} from "@essence-community/constructor-share/context";
import {useObserver} from "mobx-react";
import {GRID_CONFIGS, GRID_ALIGN_CONFIGS} from "@essence-community/constructor-share/constants/ui";
import {useStyles} from "./PanelCollapsible.styles";

export const PanelCollapsible: React.FC<IClassProps> = (props) => {
    const [open, setOpen] = React.useState(true);
    const {children, bc} = props;
    const [trans] = useTranslation("meta");
    const form = React.useContext(FormContext);
    const classes = useStyles();
    const theme = useTheme<IEssenceTheme>();
    const layoutTheme = theme.essence.layoutTheme;
    const {[VAR_RECORD_DISPLAYED]: title} = bc;
    const boxBc = React.useMemo(() => ({...bc, type: "BOX.NOCOMMONDECORATOR"} as IBuilderConfig), [bc]);
    const handleChangeCollapse = React.useCallback(() => {
        setOpen((lastOpen) => !lastOpen);
    }, []);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === "enter") {
                handleChangeCollapse();
            }
        },
        [handleChangeCollapse],
    );

    return useObserver(() => (
        <Collapse
            in={open}
            collapsedHeight="35px"
            classes={{container: form.editing ? classes.editCollapseContainer : classes.collapseContainer}}
            data-page-object={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-collapsible`}
        >
            <Grid container direction="column" spacing={layoutTheme === 1 ? 0 : 1}>
                <Grid
                    item
                    container
                    onClick={handleChangeCollapse}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    data-qtip={toTranslateText(trans, title)}
                    {...GRID_CONFIGS.hbox}
                    {...GRID_ALIGN_CONFIGS["left-hbox"]}
                    className={`${classes.baseLabelGrid} ${
                        !open && layoutTheme === 1 ? classes.closedLabelGrid : classes.labelGrid
                    }`}
                >
                    <Grid
                        item
                        container
                        className={classes.labelParentBox}
                        {...GRID_CONFIGS.hbox}
                        {...GRID_ALIGN_CONFIGS["left-hbox"]}
                    >
                        <Grid item className={classes.labelBox}>
                            <Icon
                                iconfont={open ? "angle-up" : "angle-down"}
                                size="3x"
                                className={classes.chevronIcon}
                            />
                        </Grid>
                        <Grid item className={`${classes.labelBox} ${classes.labelBoxText}`}>
                            <Typography variant="body2" className={classes.labelTypography}>
                                {toTranslateText(trans, title)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.collapseContent}>
                    {children
                        ? children
                        : mapComponentOne(boxBc, (Child, childBc) => (
                              <Child key={childBc.ck_page_object} {...props} bc={childBc} />
                          ))}
                </Grid>
            </Grid>
        </Collapse>
    ));
};
