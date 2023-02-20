/* eslint-disable max-lines-per-function */
import {
    deepFind,
    FormContext,
    ParentFieldContext,
    parseMemoize,
    RecordContext,
    isEmpty,
    noop,
    snackbarStore,
    VAR_RECORD_NAME,
} from "@essence-community/constructor-share";
import {IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {useTheme} from "@material-ui/core";
import {reaction} from "mobx";
import React from "react";
import {IMonacoBuilderClassConfig} from "../MonacoEditor.types";

const checkValue = (
    val: string | Record<string, any>,
    defaultValue = undefined,
    errorCalcBack: (err: Error) => void = noop,
) => {
    let res = defaultValue;

    try {
        res = typeof val === "string" ? JSON.parse(val) : JSON.parse(JSON.stringify(val));
    } catch (err) {
        res = defaultValue;
        errorCalcBack(err);
    }

    return res;
};

export const useEditorParams = (props: IClassProps<IMonacoBuilderClassConfig>) => {
    const {bc, pageStore} = props;
    const mTtheme = useTheme<IEssenceTheme>();
    const [theme, setTheme] = React.useState<string>(mTtheme.essence.codeTheme === "dark" ? "vs-dark" : "light");
    const [language, setLanguage] = React.useState<string>(undefined);
    const [line, setLine] = React.useState<number>(undefined);
    const [options, setOptions] = React.useState<Record<string, any>>(undefined);
    const recordContext = React.useContext(RecordContext);
    const formContext = React.useContext(FormContext);
    const parentFieldContext = React.useContext(ParentFieldContext);

    const getValue = React.useCallback(
        (name: string) => {
            if (name.charAt(0) === "g") {
                return pageStore.globalValues.get(name);
            }

            if (recordContext) {
                const [isExistRecord, recValue] = deepFind(recordContext, name);

                if (isExistRecord) {
                    return recValue;
                }
            }

            if (formContext) {
                const values = formContext.values;

                if (parentFieldContext) {
                    const [isExistParent, val] = deepFind(values, `${parentFieldContext.key}.${name}`);

                    if (isExistParent) {
                        return val;
                    }
                }

                const [isExist, val] = deepFind(values, name);

                if (isExist) {
                    return val;
                }
            }

            return undefined;
        },
        [formContext, pageStore.globalValues, parentFieldContext, recordContext],
    );

    React.useEffect(() => {
        if (bc.monacotheme) {
            setTheme(bc.monacotheme);
        }
        if (bc.monacothemerule) {
            return reaction(
                () => parseMemoize(bc.monacothemerule).runer({get: getValue}),
                (val) => {
                    if (typeof val === "string" && !isEmpty(val)) {
                        setTheme(val);
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [bc, getValue]);

    React.useEffect(() => {
        if (bc.monacolanguage) {
            setLanguage(bc.monacolanguage);
        }
        if (bc.monacolanguagerule) {
            return reaction(
                () => parseMemoize(bc.monacolanguagerule).runer({get: getValue}),
                (val) => {
                    if (typeof val === "string" && !isEmpty(val)) {
                        setLanguage(val);
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [bc, getValue]);

    React.useEffect(() => {
        if (!isEmpty(bc.monacoline) && !Number.isNaN(parseInt(bc.monacoline as string, 10))) {
            setLine(parseInt(bc.monacoline as string, 10));
        }
        if (bc.monacolinerule) {
            return reaction(
                () => parseMemoize(bc.monacolinerule).runer({get: getValue}),
                (val) => {
                    if (typeof val === "string" && !isEmpty(val) && !Number.isNaN(parseInt(val, 10))) {
                        setLine(parseInt(val, 10));
                    }

                    if (typeof val === "number") {
                        setLine(val);
                    }
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [bc, getValue]);

    React.useEffect(() => {
        const getError = (err: Error) => {
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: `Component name ${bc[VAR_RECORD_NAME]}: Options load error`,
                },
                pageStore.route,
            );

            snackbarStore.snackbarOpenAction(
                {
                    status: "debug",
                    text: err.stack,
                },
                pageStore.route,
            );
        };

        if (bc.monacooptions) {
            setOptions((oldValue) => checkValue(bc.monacooptions, oldValue, getError));
        }
        if (bc.monacooptionsrule) {
            return reaction(
                () => parseMemoize(bc.monacooptionsrule).runer({get: getValue}),
                (val) => {
                    setOptions((oldValue) => checkValue(val, oldValue, getError));
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [bc, pageStore, getValue]);

    return {
        language,
        line,
        options,
        theme,
    };
};
