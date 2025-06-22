import * as React from "react";
import cn from "clsx";
import {Grid} from "@mui/material";
import {useTranslation, toColumnStyleWidth} from "@essence-community/constructor-share/utils";
import {mapComponents} from "@essence-community/constructor-share/components";
import {FormContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {useStyles} from "./Group.styles";
import {IGroupProps} from "./Group.types";

export const Group: React.FC<IGroupProps> = (props) => {
    const {error, isRow, bc, status, renderComponent, children} = props;
    const form = React.useContext(FormContext);
    const inFilter = form.placement === "filter";
    const classes = useStyles(undefined);
    const label = bc[VAR_RECORD_DISPLAYED];
     
    const {t} = useTranslation();

    return (
        <Grid
            container
            spacing={1}
            className={cn(classes.root, {
                [classes.rootError]: error,
                [classes.filterRoot]: inFilter,
                [classes.panelRoot]: !inFilter,
            })}
            direction={isRow ? "row" : "column"}
            wrap={isRow ? "nowrap" : "wrap"}
            data-qtip={error ? t("static:a5a5d7213d1f4f77861ed40549ee9c57") : ""}
            style={toColumnStyleWidth(bc.width)}
        >
            <Grid container className={classes.label} wrap="nowrap" justifyContent="space-between">
                <Grid className={classes.labelTextStartAngle}>
                    &nbsp;
                </Grid>
                {label ? (
                    <Grid className={`${classes.labelDisplay}`} data-qtip={t(label)}>
                        <span>{t(label)}</span>
                    </Grid>
                ) : null}
                <Grid className={classes.labelTextLine}>
                    &nbsp;
                </Grid>
                {status}
                <Grid className={classes.labelTextEndAngle}>
                    &nbsp;
                </Grid>
            </Grid>
            {renderComponent &&
                mapComponents(bc.childs, (ChildCmp, child) => (
                    <Grid size={12}
                        key={child[VAR_RECORD_PAGE_OBJECT_ID]}
                        className={classes.child}
                        style={toColumnStyleWidth(child.width)}
                    >
                        {renderComponent(ChildCmp, child)}
                    </Grid>
                ))}
            {children}
        </Grid>
    );
};
