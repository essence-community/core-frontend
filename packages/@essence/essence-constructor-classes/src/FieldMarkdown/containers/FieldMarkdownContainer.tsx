import * as React from "react";
import cn from "clsx";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {Scrollbars, VerticalResizer} from "@essence-community/constructor-share/uicomponents";
import ReactMarkdown from "react-markdown";
import {Grid, TextField} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {FieldMarkdownLabel} from "../components/FieldMarkdownLabel";
import {useStyles} from "./FieldMarkdownContainer.styles";
import {IFieldMarkdownContainerProps} from "./FieldMarkdownContainer.types";

type TStatus = "code" | "view" | "all";

export const FieldMarkdownContainer: React.FC<IFieldMarkdownContainerProps> = (props) => {
    const classes = useStyles();
    const {bc, disabled, field} = props;
    const [trans] = useTranslation("meta");
    const [status, setStatus] = React.useState<TStatus>("all");
    const minHeight = React.useMemo(() => (bc.minheight ? parseInt(bc.minheight, 10) : undefined), [bc.minheight]);
    const maxHeight = React.useMemo(() => (bc.maxheight ? parseInt(bc.maxheight, 10) : "auto"), [bc.maxheight]);
    const [height, setHeight] = React.useState<number>(0);
    const mardownRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLDivElement>(null);

    const handleChangeHeight = React.useCallback((newHeight: number) => {
        setHeight(newHeight);
    }, []);

    const handleInitialHeight = React.useCallback(() => {
        if (mardownRef.current) {
            return mardownRef.current.offsetHeight + 16;
        } else if (inputRef.current) {
            return inputRef.current.offsetHeight;
        }

        return 0;
    }, []);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event, event.target.value);
    };

    return useObserver(() => {
        const error = Boolean(!disabled && !field.isValid);
        const errorText = disabled ? undefined : field.error;

        return (
            <div
                className={cn(classes.root, {[classes.error]: error})}
                data-qtip={errorText ? trans(errorText, errorText) : undefined}
            >
                <div className={classes.label}>
                    <FieldMarkdownLabel
                        title={bc[VAR_RECORD_DISPLAYED]}
                        disabled={disabled}
                        status={status}
                        onStatusChange={setStatus}
                        isRequired={field.rules && field.rules.indexOf("required") >= 0}
                    />
                </div>
                <Scrollbars
                    autoHeight
                    autoHeightMax={maxHeight && !height ? maxHeight : height}
                    autoHeightMin={minHeight && !height ? minHeight : height}
                    hideHorizontalScrollbar
                >
                    <div className={classes.scrollContent}>
                        <Grid container spacing={2} alignItems="stretch">
                            {status !== "view" && !disabled ? (
                                <Grid item xs className={classes.editor}>
                                    <TextField
                                        className={props.className}
                                        InputProps={{
                                            ...props.InputProps,
                                            className: classes.inputWrapper,
                                            endAdornment: null,
                                        }}
                                        // @ts-ignore
                                        inputProps={{
                                            ...props.inputProps,
                                            style: {minHeight: height ? height - 48 : 32},
                                        }}
                                        error={error}
                                        onChange={handleChange}
                                        value={props.value}
                                        multiline
                                        fullWidth
                                        autoComplete="off"
                                        inputRef={inputRef}
                                        style={{height: "auto"}}
                                    />
                                </Grid>
                            ) : null}
                            {status !== "code" || disabled ? (
                                <Grid item xs className={classes.preview} ref={mardownRef}>
                                    <ReactMarkdown source={typeof props.value === "string" ? props.value : ""} />
                                </Grid>
                            ) : null}
                        </Grid>
                    </div>
                </Scrollbars>
                <div className={classes.resizerWrapper}>
                    <VerticalResizer
                        height={height || 0}
                        minHeight={minHeight}
                        maxHeight={maxHeight === "auto" ? undefined : maxHeight}
                        onChangeHeight={handleChangeHeight}
                        className={classes.resizer}
                        getInitialHeight={handleInitialHeight}
                    />
                </div>
            </div>
        );
    });
};
