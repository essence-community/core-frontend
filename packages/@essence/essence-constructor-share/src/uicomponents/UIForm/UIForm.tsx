import * as React from "react";
import debounce from "lodash/debounce";
import cn from "clsx";
import {Form} from "../../Form/Form";
import {FormContext} from "../../context";
import {VAR_RECORD_ID} from "../../constants";
import {IForm} from "../../Form";
import {IUIFormProps} from "./UIForm.types";
import {useStyles} from "./UIForm.styles";

const CHANGE_DELAY = 1000;

export const UIForm: React.FC<IUIFormProps> = (props) => {
    const {initialValues, mode, children, noForm, submitOnChange, dataPageObject, onSubmit} = props;
    const classes = useStyles();
    const rootFormRef = React.useRef<HTMLFormElement>(null);

    const handleValueChange = React.useCallback(
        debounce((form: IForm) => {
            form.submit();
        }, CHANGE_DELAY),
        [],
    );

    const handleError = React.useCallback(() => {
        const rootElement = rootFormRef.current;

        if (rootElement instanceof HTMLElement) {
            const firstInvaliField = rootElement.querySelector(
                "input[aria-invalid='true']:not([tabindex='-1']),textarea[aria-invalid='true']:not([tabindex='-1'])",
            );

            if (firstInvaliField instanceof HTMLElement) {
                firstInvaliField.focus();
            }
        }
    }, []);

    const handleFilterRedirect = React.useCallback(
        async (form: IForm) => {
            if (onSubmit) {
                await form.validate();

                if (form.isValid) {
                    await onSubmit(form.values, {form, noClean: true, resetFilter: true});
                }
            }
        },
        [onSubmit],
    );

    const handleSubmit = React.useCallback(
        async (form: Form) => {
            if (onSubmit) {
                await onSubmit(form.values, {form});
            }
        },
        [onSubmit],
    );

    const handleReset = React.useCallback(
        async (form: Form) => {
            if (onSubmit) {
                await onSubmit(form.values, {form, noLoad: true, reset: true});
            }
        },
        [onSubmit],
    );

    const form = React.useMemo<IForm>(
        () =>
            new Form({
                hooks: {
                    onError: handleError,
                    onFilterRedirect: handleFilterRedirect,
                    onReset: handleReset,
                    onSuccess: handleSubmit,
                    onValueChange: submitOnChange ? handleValueChange : undefined,
                },
                mode,
                values: {
                    [VAR_RECORD_ID]: null,
                    ...initialValues,
                },
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    React.useEffect(() => {
        form.update(initialValues, mode === "1" || mode === "6");
    }, [form, initialValues, mode]);

    return (
        <FormContext.Provider value={form}>
            {noForm ? (
                children
            ) : (
                <form
                    action=""
                    onSubmit={form.onSubmit}
                    className={cn(classes.form, props.className)}
                    autoComplete="off"
                    data-page-object={dataPageObject}
                    style={props.style}
                    ref={rootFormRef}
                >
                    {children}
                </form>
            )}
        </FormContext.Provider>
    );
};
