import * as React from "react";
import cn from "clsx";
import {
    mapComponents,
    VAR_RECORD_PAGE_OBJECT_ID,
    IFieldProps,
    useTranslation,
    VAR_RECORD_DISPLAYED,
    Scrollbars,
} from "@essence-community/constructor-share";
import ReactMarkdown from "react-markdown";
import {Grid, Typography, Divider} from "@material-ui/core";
import {useStyles} from "./FieldMarkdownContainer.styles";

type TStatus = "code" | "view" | "all";

export const FieldMarkdownContainer: React.FC<IFieldProps> = (props) => {
    const classes = useStyles();
    const {bc, disabled} = props;
    const title = bc[VAR_RECORD_DISPLAYED];
    const [trans] = useTranslation("meta");
    const textareaBc = React.useMemo(
        () => ({...bc, [VAR_RECORD_DISPLAYED]: "", datatype: "", type: "IFIELD.TEXTAREA"}),
        [bc],
    );
    const [status, setStatus] = React.useState<TStatus>("all");
    const minHeight = React.useMemo(() => (bc.minheight ? parseInt(bc.minheight, 10) : undefined), [bc.minheight]);
    const maxHeight = React.useMemo(() => (bc.maxheight ? parseInt(bc.maxheight, 10) : "auto"), [bc.maxheight]);

    return (
        <div className={classes.root}>
            <div className={classes.header}>
                <Typography>{title ? trans(title, title) : ""}</Typography>
                <Divider />
                {!disabled && (
                    <Grid container>
                        <Grid
                            item
                            className={cn(classes.button, {[classes.selected]: status === "code"})}
                            onClick={() => setStatus("code")}
                        >
                            <Typography>{trans("static:4b03d66f260a4fb99b8a20c3cc5e161f")}</Typography>
                        </Grid>
                        <Grid
                            item
                            className={cn(classes.button, {[classes.selected]: status === "view"})}
                            onClick={() => setStatus("view")}
                        >
                            <Typography>{trans("static:3773203b8c714e26a99cfab1b4ec84c4")}</Typography>
                        </Grid>
                        <Grid
                            item
                            className={cn(classes.button, {[classes.selected]: status === "all"})}
                            onClick={() => setStatus("all")}
                        >
                            <Typography>{trans("static:f0d2b23a7b7f49ac8c25cd6ae3d2d545")}</Typography>
                        </Grid>
                    </Grid>
                )}
            </div>
            <Grid container spacing={2}>
                <Grid item xs className={classes.editor}>
                    {status !== "view" &&
                        !disabled &&
                        mapComponents([textareaBc], (ChildCmp, childBc) => (
                            <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                        ))}
                </Grid>
                <Grid item xs className={classes.preview}>
                    {status !== "code" || disabled ? (
                        <Scrollbars
                            autoHeight
                            autoHeightMin={minHeight}
                            autoHeightMax={maxHeight}
                            hideHorizontalScrollbar
                        >
                            <ReactMarkdown source={typeof props.value === "string" ? props.value : ""} />
                        </Scrollbars>
                    ) : null}
                </Grid>
            </Grid>
        </div>
    );
};
