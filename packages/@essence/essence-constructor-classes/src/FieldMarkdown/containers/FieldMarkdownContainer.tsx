import * as React from "react";
import cn from "clsx";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {Scrollbars, VerticalResizer, makeRenderers} from "@essence-community/constructor-share/uicomponents";
import ReactMarkdown from "react-markdown";
import {Grid, TextField} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {useTranslation, toTranslateTextArray} from "@essence-community/constructor-share/utils";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {
    useTextFieldProps,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {FieldMarkdownLabel} from "../components/FieldMarkdownLabel";
import {useStyles} from "./FieldMarkdownContainer.styles";

type TStatus = "code" | "view" | "all";

export const FieldMarkdownContainer: React.FC<IClassProps> = (props) => {
    const classes = useStyles();
    const {bc, disabled, hidden, pageStore, readOnly} = props;
    const field = useField({bc, disabled, hidden, pageStore});
    const [trans] = useTranslation("meta");
    const [status, setStatus] = React.useState<TStatus>("all");
    const minHeight = React.useMemo(
        () => (bc.minheight && bc.minheight.indexOf("px") !== -1 ? parseInt(bc.minheight, 10) : undefined),
        [bc.minheight],
    );
    const maxHeight = React.useMemo(
        () => (bc.maxheight && bc.maxheight.indexOf("px") !== -1 ? parseInt(bc.maxheight, 10) : "auto"),
        [bc.maxheight],
    );
    const [height, setHeight] = React.useState<number>(0);
    const mardownRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLDivElement>(null);
    const textFieldProps = useTextFieldProps({bc, disabled, field, readOnly});

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
        field.onChange(event.target.value);
    };

    useFieldGetGlobal({bc, field, pageStore});
    useFieldSetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    const renderers = React.useMemo(() => makeRenderers(pageStore, bc), [bc, pageStore]);

    return useObserver(() => {
        const error = Boolean(!textFieldProps.disabled && !field.isValid);
        const errorText = textFieldProps.disabled ? undefined : field.error;

        return (
            <div
                className={cn(classes.root, {[classes.error]: error})}
                data-qtip={toTranslateTextArray(trans, errorText)}
            >
                <div className={classes.label}>
                    <FieldMarkdownLabel
                        title={bc[VAR_RECORD_DISPLAYED]}
                        disabled={textFieldProps.disabled}
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
                            {status !== "view" && !textFieldProps.disabled ? (
                                <Grid item xs className={classes.editor}>
                                    <TextField
                                        className={textFieldProps.className}
                                        InputProps={{
                                            ...textFieldProps.InputProps,
                                            className: classes.inputWrapper,
                                            endAdornment: null,
                                        }}
                                        inputProps={{
                                            ...textFieldProps.inputProps,
                                            style: {minHeight: height ? height - 48 : 32},
                                        }}
                                        onChange={handleChange}
                                        value={field.value}
                                        multiline
                                        fullWidth
                                        inputRef={inputRef}
                                        style={{height: "auto"}}
                                    />
                                </Grid>
                            ) : null}
                            {status !== "code" || textFieldProps.disabled ? (
                                <Grid item xs className={classes.preview} ref={mardownRef}>
                                    <ReactMarkdown
                                        source={typeof field.value === "string" ? field.value : ""}
                                        renderers={renderers}
                                    />
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
