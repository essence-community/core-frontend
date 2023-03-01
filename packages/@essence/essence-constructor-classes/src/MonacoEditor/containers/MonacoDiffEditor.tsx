/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useFieldSetGlobal, useFieldGetGlobal, useDefaultValueQuery} from "@essence-community/constructor-share/hooks";
import {DiffEditor, OnChange, DiffOnMount} from "@monaco-editor/react";
import {useObserver} from "mobx-react";
import {Grid} from "@material-ui/core";
import {
    isEmpty,
    TFunction,
    toColumnStyleWidthBc,
    toTranslateTextArray,
    useTranslation,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_SETTING_PROJECT_LOADER,
} from "@essence-community/constructor-share/constants";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import loader from "@monaco-editor/loader";
// eslint-disable-next-line import/no-unresolved
import * as monaco from "monaco-editor";
import {PageLoader} from "@essence-community/constructor-share/uicomponents";
import {settingsStore} from "@essence-community/constructor-share/models";
import {IMonacoDiffBuilderClassConfig} from "../MonacoEditor.types";
import {useEditorParams} from "../hooks/useEditorParams";
import {useStyles} from "./MonacoEditor.styles";

loader.config({monaco});

export const MonacoDiffEditorContainer: React.FC<IClassProps<IMonacoDiffBuilderClassConfig>> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const classes = useStyles(props);
    const fieldLeft = useField({bc: bc.childs[0], clearValue: "", disabled, hidden, pageStore});
    const fieldRight = useField({
        bc: bc.childs[1],
        clearValue: "",
        disabled,
        hidden,
        pageStore,
    });
    const [trans] = useTranslation("meta");
    const handleChange: OnChange = React.useCallback(
        (value?: string) => {
            fieldRight.onChange(value);
        },
        [fieldRight],
    );
    const onMount: DiffOnMount = React.useCallback(
        (editor) => {
            const modifiedEditor = editor.getModifiedEditor();

            if (modifiedEditor && modifiedEditor.onDidChangeModelContent) {
                modifiedEditor.onDidChangeModelContent((event) => {
                    handleChange(modifiedEditor.getValue(), event);
                });
            }
        },
        [handleChange],
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
        if (isError && fieldRight.error) {
            return toTranslateTextArray(trans, fieldRight.error);
        }

        if (isEmpty(fieldRight.label) || isEmpty(fieldLeft.label)) {
            return toTranslateTextArray(trans, bc[VAR_RECORD_DISPLAYED]);
        }

        return toTranslateTextArray(trans, `${fieldRight.label} <> ${fieldLeft.label}`);
    };

    useFieldSetGlobal({bc, field: fieldRight, pageStore});
    useFieldGetGlobal({bc, field: fieldRight, pageStore});
    useDefaultValueQuery({bc, field: fieldRight, pageStore});

    useFieldSetGlobal({bc, field: fieldLeft, pageStore});
    useFieldGetGlobal({bc, field: fieldLeft, pageStore});
    useDefaultValueQuery({bc, field: fieldLeft, pageStore});

    const editorProps = useEditorParams(props);

    return useObserver(() => {
        const isError = Boolean(!disabled && !fieldRight.isValid);
        const isDisabled =
            (readOnly && fieldRight.form.placement === "filter" && typeof bc.readonly === "undefined"
                ? false
                : readOnly) ||
            disabled ||
            !fieldRight.form.editing;
        const contentProps = {
            "data-page-object": bc[VAR_RECORD_PAGE_OBJECT_ID],
            "data-qtip": getTipText(trans, isError),
        };

        if (!bc.childs || bc.childs.length !== 2) {
            return null;
        }

        return (
            <Grid container item spacing={0} alignItems="stretch" style={contentStyle} {...contentProps}>
                <Grid item xs={12} alignItems="stretch" zeroMinWidth>
                    <DiffEditor
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
                        original={fieldLeft.value as string}
                        modified={fieldRight.value as string}
                        onMount={onMount}
                    />
                </Grid>
                <div className={isDisabled || readOnly ? classes.disabled : ""}></div>
            </Grid>
        );
    });
};

export const MonacoDiffEditor = commonDecorator(MonacoDiffEditorContainer);

export default MonacoDiffEditor;
