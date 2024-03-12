/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {useFieldSetGlobal, useFieldGetGlobal, useDefaultValueQuery} from "@essence-community/constructor-share/hooks";
import Editor, {Monaco, OnChange} from "@monaco-editor/react";
import {useObserver} from "mobx-react";
import {Grid} from "@material-ui/core";
import {
    entriesMapSort,
    TFunction,
    toColumnStyleWidthBc,
    toTranslateTextArray,
    useTranslation,
} from "@essence-community/constructor-share/utils";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_SETTING_PROJECT_LOADER,
    VAR_RECORD_DISPLAYED,
    VAR_SETTING_BASE_PATH,
} from "@essence-community/constructor-share/constants";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import loader from "@monaco-editor/loader";
// eslint-disable-next-line import/no-unresolved
import * as monaco from "monaco-editor";

import {settingsStore} from "@essence-community/constructor-share/models";
import {PageLoader, TextFieldLabel} from "@essence-community/constructor-share/uicomponents";
import {useEditorParams} from "../hooks/useEditorParams";
import {IMonacoBuilderClassConfig} from "../MonacoEditor.types";

const publicPath = settingsStore.settings[VAR_SETTING_BASE_PATH];

function getWorkerUrl(workerId: string, label: string) {
    switch (label) {
        case "json":
            return publicPath + "json.worker.js";
        case "css":
        case "less":
        case "scss":
            return publicPath + "css.worker.js";
        case "html":
        case "handlebars":
        case "razor":
            return publicPath + "html.worker.js";
        case "javascript":
        case "typescript":
            return publicPath + "ts.worker.js";
        default:
            return publicPath + "editor.worker.js";
    }
}
window.MonacoEnvironment = {
    baseUrl: publicPath,
    getWorkerUrl(workerId, label) {
        return getWorkerUrl(workerId, label);
    },
    globalAPI: false,
};

loader.config({monaco});

export const MonacoEditorContainer: React.FC<IClassProps<IMonacoBuilderClassConfig>> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const field = useField({bc, clearValue: "", disabled, hidden, pageStore});
    const [monaco, setMonaco] = React.useState<{
        editor: monaco.editor.IStandaloneCodeEditor;
        monaco: Monaco;
    }>(undefined);
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

    React.useEffect(() => {
        if (monaco?.monaco && editorProps?.options?.worker) {
            const workerProps = editorProps?.options?.worker;

            if (workerProps.javascript) {
                if (Array.isArray(workerProps.javascript.extraLib)) {
                    workerProps.javascript.extraLib.forEach(({value, file}) => {
                        monaco.monaco.languages.typescript.javascriptDefaults.addExtraLib(value as string, file);
                        monaco.monaco.languages.typescript.typescriptDefaults.addExtraLib(value as string, file);
                    });
                }
                if (workerProps.javascript.addedGlobal) {
                    const lib = entriesMapSort(pageStore.globalValues)
                        .map(([key]) => `const ${key}: any;`)
                        .join("\n");

                    monaco.monaco.languages.typescript.javascriptDefaults.addExtraLib(lib, "global_value.d.ts");
                    monaco.monaco.languages.typescript.typescriptDefaults.addExtraLib(lib, "global_value.d.ts");
                }
                if (workerProps.javascript.compilerOptions) {
                    monaco.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
                        workerProps.javascript.compilerOptions as any,
                    );
                    monaco.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                        workerProps.javascript.compilerOptions as any,
                    );
                }
                if (workerProps.javascript.diagnosticsOptions) {
                    monaco.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                        workerProps.javascript.diagnosticsOptions as any,
                    );
                    monaco.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                        workerProps.javascript.diagnosticsOptions as any,
                    );
                }
            }

            if (workerProps.typescript) {
                if (Array.isArray(workerProps.typescript.extraLib)) {
                    workerProps.typescript.extraLib.forEach(({file, value}) => {
                        monaco.monaco.languages.typescript.javascriptDefaults.addExtraLib(value as string, file);
                        monaco.monaco.languages.typescript.typescriptDefaults.addExtraLib(value as string, file);
                    });
                }
                if (workerProps.javascript.addedGlobal) {
                    const lib = entriesMapSort(pageStore.globalValues)
                        .map(([key]) => `const ${key}: any;`)
                        .join("\n");

                    monaco.monaco.languages.typescript.javascriptDefaults.addExtraLib(lib, "global_value.d.ts");
                    monaco.monaco.languages.typescript.typescriptDefaults.addExtraLib(lib, "global_value.d.ts");
                }
                if (workerProps.typescript.compilerOptions) {
                    monaco.monaco.languages.typescript.javascriptDefaults.setCompilerOptions(
                        workerProps.typescript.compilerOptions as any,
                    );
                    monaco.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                        workerProps.typescript.compilerOptions as any,
                    );
                }
                if (workerProps.typescript.diagnosticsOptions) {
                    monaco.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions(
                        workerProps.typescript.diagnosticsOptions as any,
                    );
                    monaco.monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
                        workerProps.typescript.diagnosticsOptions as any,
                    );
                }
            }
        }
    }, [editorProps, monaco]);

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
                        options={{
                            ...(editorProps.options || {}),
                            readOnly: isDisabled,
                        }}
                        value={field.value as string}
                        onChange={handleChange}
                        onMount={(editor, monaco) => {
                            setMonaco({
                                editor,
                                monaco,
                            });
                        }}
                    />
                </Grid>
            </Grid>
        );
    });
};

export const MonacoEditor = commonDecorator(MonacoEditorContainer);

export default MonacoEditor;
