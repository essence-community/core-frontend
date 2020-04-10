/* eslint-disable max-lines */
// @flow
import * as React from "react";
import {findDOMNode} from "react-dom";
import cn from "classnames";
import {action, reaction} from "mobx";
import {Form} from "mobx-react-form";
import noop from "lodash/noop";
import forOwn from "lodash/forOwn";
import {withStyles} from "@material-ui/core/styles";
import debounce from "lodash/debounce";
import isFunction from "lodash/isFunction";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";
import {FormContext, EditorContex, ModeContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import BuilderMobxForm from "../Components/MobxForm/BuilderMobxForm";
import {styleTheme} from "../constants";
import {type PageModelType} from "../stores/PageModel";
import {type BuilderModeType, type FormOptionsType} from "../BuilderType";

import "./validations";

const darkStyles = {
    form: {
        display: "flex",
        flexDirection: "row",
    },
};

const lightStyles = {
    form: {
        display: "flex",
        flexDirection: "column",
    },
};

const styles = styleTheme === "light" ? lightStyles : darkStyles;

const plugins = {dvr: dvr(validatorjs)};

type PropsTypes = {|
    noForm: boolean,
    onSubmit?: (values: Object, options: FormOptionsType) => void | Promise<any>,
    onError: () => void,
    onSetForm?: (form: Object) => void,
    onSetValues: (values: Object, options?: FormOptionsType) => void | Promise<void>,
    onSetFormStatus?: (value: boolean) => void,
    children: React.Node,
    initialValues?: Object,
    classes: Object,
    injectType?: "filter",
    pageStore: PageModelType,
    method?: string,
    submitOnChange: boolean,
    dataPageObject?: string,
    mode?: BuilderModeType,
    isEditing?: boolean,
    className?: string,
    style?: Object,
    hasMaster?: boolean,
|};

type StateTypes = {
    form?: Form,
    mode?: BuilderModeType,
};

const FORM_OPTIONS = {
    validateOnChange: false,
};
const CHANGE_DELAY = 1000;
const CHANGE_DEFAULT_DELAY = 100;

export class BuilderFormBase extends React.Component<PropsTypes, StateTypes> {
    static defaultProps = {
        noForm: false,
        onError: noop,
        onSetValues: noop,
        onSubmit: noop,
        submitOnChange: false,
    };

    state: StateTypes = {
        mode: this.props.mode,
    };

    disposers: Array<Function> = [];

    // eslint-disable-next-line max-statements
    componentDidMount() {
        const {injectType, pageStore, submitOnChange, mode, hasMaster} = this.props;
        const form = this.createForm();

        form.hasMaster = hasMaster;

        if (injectType) {
            pageStore.addFormAction(injectType, form);
        }

        if (mode === "1") {
            form.each((field) => {
                field.reset();
                field.resetValidation();
            });
        }

        if (submitOnChange) {
            this.disposers.push(
                reaction(
                    () => form.values(),
                    (values) => this.handleReactValues(form, values),
                    {
                        delay: CHANGE_DEFAULT_DELAY,
                        fireImmediately: true,
                    },
                ),
            );
        }

        if (isFunction(this.props.onSetForm)) {
            this.props.onSetForm(form);
        }

        this.handleAddNewFields(this.props.initialValues || {});
        this.setState({form});
    }

    componentDidUpdate(prevProps: PropsTypes) {
        if (this.props.initialValues !== prevProps.initialValues || this.props.isEditing !== prevProps.isEditing) {
            this.handleFormUpdate();
        }

        if (this.props.mode !== prevProps.mode) {
            this.setState({mode: this.props.mode});
        }
    }

    componentWillUnmount() {
        const {injectType, pageStore} = this.props;
        const {form} = this.state;

        if (injectType) {
            pageStore.removeFormAction(injectType, this.state.form);
        }

        this.disposers.forEach((dispose) => dispose());

        if (form) {
            // $FlowFixMe
            form.dispose();
        }
    }

    createForm = () => {
        const {initialValues = {}, submitOnChange, onSubmit} = this.props;

        return new BuilderMobxForm(
            {
                values: {
                    [VAR_RECORD_ID]: null,
                    ...initialValues,
                },
            },
            {
                hooks: {
                    onError: this.handleError,
                    onFieldChange: submitOnChange ? this.handleChange : this.handleFieldChange,
                    onFieldClear: submitOnChange ? this.handleChange : undefined,
                    onFilterRedirect: this.handleFilterRedirect,
                    onReset: this.handleReset,
                    onSuccess: onSubmit ? this.handleSubmit : undefined,
                },
                options: FORM_OPTIONS,
                plugins,
            },
        );
    };

    handleReactValues = (form: Form, values: Object) => {
        this.props.onSetValues(values, {form});
    };

    handleFormUpdate = action("BuilderForm.handleFormUpdate", () => {
        const {mode, initialValues = {}} = this.props;
        const {form} = this.state;

        if (form) {
            if (mode === "1" || mode === "6") {
                form.reset();
            } else {
                form.clear();
            }

            // Remove repeater items by self.
            form.each((field) => {
                const {options} = field;

                if (options && options.bc && options.bc.datatype === "repeater") {
                    field.fields.forEach((childField) => {
                        field.del(childField.key);
                    });
                }
            });

            form.update(initialValues);

            form.each((field) => {
                field.resetValidation();
            });
        }

        this.handleAddNewFields(initialValues);
    });

    handleChange = debounce(() => {
        const {form} = this.state;

        if (form) {
            // $FlowFixMe
            form.submit();

            if (this.props.onSetFormStatus) {
                this.props.onSetFormStatus(true);
            }
        }
    }, CHANGE_DELAY);

    handleAddNewFields = (values: Object) => {
        const {form} = this.state;

        if (form) {
            forOwn(values, (value: any, key: string) => {
                if (!form.has(key)) {
                    form.add({key, value});
                }
            });
        }
    };

    handleSubmit = (form: Form) => {
        const {onSubmit} = this.props;

        if (this.props.onSetFormStatus) {
            this.props.onSetFormStatus(false);
        }

        return onSubmit && onSubmit(form.values(), {form});
    };

    handleReset = (form: Form) => {
        const {onSubmit} = this.props;

        if (this.props.onSetFormStatus) {
            this.props.onSetFormStatus(false);
        }

        return onSubmit && onSubmit(form.values(), {form, noLoad: true, reset: true});
    };

    handleError = () => {
        // eslint-disable-next-line react/no-find-dom-node
        const rootElement: ?(Element | Text) = findDOMNode(this);

        if (rootElement instanceof HTMLElement) {
            const firstInvaliField = rootElement.querySelector(
                "input[aria-invalid='true']:not([tabindex='-1']),textarea[aria-invalid='true']:not([tabindex='-1'])",
            );

            if (firstInvaliField) {
                firstInvaliField.focus();
            }
        }
    };

    handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        const {form} = this.state;

        if (form && !form.submitting) {
            if (this.props.onSetFormStatus) {
                this.props.onSetFormStatus(false);
            }

            return form.onSubmit(event);
        }

        return false;
    };

    handleFilterRedirect = async (form: Object) => {
        const {onSubmit} = this.props;

        if (onSubmit) {
            await form.validate();

            if (form.isValid) {
                await onSubmit(form.values(), {form, noClean: true, resetFilter: true});
            }
        }
    };

    handleFieldChange = () => {
        if (this.props.onSetFormStatus) {
            this.props.onSetFormStatus(true);
        }
    };

    render() {
        const {form} = this.state;

        if (!form) {
            return null;
        }

        if (this.props.noForm) {
            return (
                <FormContext.Provider value={form}>
                    <ModeContext.Provider value={this.props.mode}>
                        <EditorContex.Provider value={this.state}>{this.props.children}</EditorContex.Provider>
                    </ModeContext.Provider>
                </FormContext.Provider>
            );
        }

        const {classes} = this.props;

        return (
            <FormContext.Provider value={form}>
                <ModeContext.Provider value={this.props.mode}>
                    <EditorContex.Provider value={this.state}>
                        <form
                            action=""
                            onSubmit={this.handleFormSubmit}
                            className={cn(classes.form, this.props.className)}
                            autoComplete="off"
                            data-page-object={this.props.dataPageObject}
                            style={this.props.style}
                        >
                            {this.props.children}
                        </form>
                    </EditorContex.Provider>
                </ModeContext.Provider>
            </FormContext.Provider>
        );
    }
}

export default withStyles(styles)(BuilderFormBase);
