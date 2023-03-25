/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useFieldSetGlobal, useFieldGetGlobal, useDefaultValueQuery} from "@essence-community/constructor-share/hooks";
import Editor, {OnChange} from "@monaco-editor/react";
import {useObserver} from "mobx-react";
import {Grid} from "@material-ui/core";
import {
    TFunction,
    toColumnStyleWidthBc,
    toTranslateTextArray,
    useTranslation,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import loader from "@monaco-editor/loader";
// eslint-disable-next-line import/no-unresolved
import * as monaco from "monaco-editor";
import {settingsStore} from "@essence-community/constructor-share/models";
import {PageLoader, TextFieldLabel} from "@essence-community/constructor-share/uicomponents";
import {IMonacoBuilderClassConfig} from "../MonacoEditor.types";
import {useEditorParams} from "../hooks/useEditorParams";
import {useStyles} from "./MonacoEditor.styles";

loader.config({monaco});

export const MonacoEditorContainer: React.FC<IClassProps<IMonacoBuilderClassConfig>> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const classes = useStyles(props);
    const field = useField({bc, clearValue: "", disabled, hidden, pageStore});
    const [trans] = useTranslation("meta");
    const handleChange: OnChange = React.useCallback(
        (value?: string) => {
            field.onChange(value);
        },
        [field],
    );
    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
            ...toColumnStyleWidthBc(bc),
        }),
        [bc],
    );

    const getTipText = (trans: TFunction, isError: boolean) => {
        if (isError && field.error) {
            return toTranslateTextArray(trans, field.error);
        }

        return undefined;
    };

    useFieldSetGlobal({bc, field, pageStore});
    useFieldGetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    const editorProps = useEditorParams(props);

    return useObserver(() => {
        const isError = Boolean(!disabled && !field.isValid);
        const displayed = bc[VAR_RECORD_DISPLAYED];
        const isDisabled =
            (readOnly && field.form.placement === "filter" && typeof bc.readonly === "undefined" ? false : readOnly) ||
            disabled ||
            !field.form.editing;
        const contentProps = {
            "data-page-object": bc[VAR_RECORD_PAGE_OBJECT_ID],
            "data-qtip": getTipText(trans, isError),
        };

        return (
            <Grid container item spacing={0} direction="row" wrap="wrap" style={contentStyle} {...contentProps}>
                {displayed || field.isRequired || bc.info ? (
                    <Grid item>
                        <TextFieldLabel
                            bc={bc}
                            info={bc.info && trans(bc.info)}
                            error={!field.isValid}
                            isRequired={field.isRequired}
                        />
                    </Grid>
                ) : null}
                <Grid item xs={12} alignItems="stretch" zeroMinWidth>
                    <Editor
                        {...editorProps}
                        loading={
                            <PageLoader
                                container={null}
                                isLoading
                                loaderType={
                                    settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"
                                }
                            />
                        }
                        value={field.value as string}
                        onChange={handleChange}
                    />
                </Grid>
                <div className={isDisabled || readOnly ? classes.disabled : ""}></div>
            </Grid>
        );
    });
};

export const MonacoEditor = commonDecorator(MonacoEditorContainer);

export default MonacoEditor;
