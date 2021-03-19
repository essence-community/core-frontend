import * as React from "react";
import cn from "clsx";
import {Typography, Divider, Grid} from "@material-ui/core";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useStyles} from "./FieldMarkdownLabel.styles";

type TStatus = "code" | "view" | "all";

interface IFieldMarkdownLabelProps {
    title?: string;
    status: TStatus;
    disabled?: boolean;
    isRequired: boolean;
    onStatusChange: (status: TStatus) => void;
}

export const FieldMarkdownLabel: React.FC<IFieldMarkdownLabelProps> = React.memo(function FieldMarkdownLabelMemo(
    props,
) {
    const {title, status, onStatusChange, disabled, isRequired} = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");

    return (
        <div className={classes.header}>
            <Typography data-qtip={title ? trans(title, title) : ""}>
                {title ? trans(title, title) : ""}
                {isRequired ? <span className={classes.labelAsterisk}>{"\u2009*"}</span> : null}
            </Typography>
            <Divider />
            {!disabled && (
                <Grid container>
                    <Grid
                        item
                        className={cn(classes.button, {[classes.selected]: status === "code"})}
                        onClick={() => onStatusChange("code")}
                    >
                        <Typography>{trans("static:4b03d66f260a4fb99b8a20c3cc5e161f")}</Typography>
                    </Grid>
                    <Grid
                        item
                        className={cn(classes.button, {[classes.selected]: status === "view"})}
                        onClick={() => onStatusChange("view")}
                    >
                        <Typography>{trans("static:3773203b8c714e26a99cfab1b4ec84c4")}</Typography>
                    </Grid>
                    <Grid
                        item
                        className={cn(classes.button, {[classes.selected]: status === "all"})}
                        onClick={() => onStatusChange("all")}
                    >
                        <Typography>{trans("static:f0d2b23a7b7f49ac8c25cd6ae3d2d545")}</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    );
});
