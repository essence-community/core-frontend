/* eslint-disable max-lines */
// @flow
import * as React from "react";
import startsWith from "lodash/startsWith";
import uniqueId from "lodash/uniqueId";
import {reaction} from "mobx";
import {disposeOnUnmount} from "mobx-react";
import {Field, Form} from "mobx-react-form";
import {EditorContex} from "@essence/essence-constructor-share";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_QUERY_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence/essence-constructor-share/constants";
import {loggerRoot} from "../constants";
import {isEmpty} from "../utils/base";
import {checkEditable} from "../utils/access";
import {inputTypes} from "../TextField/TFUtils/TFConstants";
import {getTextValidation} from "../utils/getTextValidation";
import {type BuilderFieldType} from "../TextField/BuilderFieldType";
import TFDefaultValueQuery from "../TextField/TFDefaultValueQuery";
import {type WithFieldPropsType, type WithFieldInjectPropsType} from "./DecoratorsType";

const logger: Function = loggerRoot.extend("withFieldDecorator");

// eslint-disable-next-line max-lines-per-function
function withFieldDecorator<Props: WithFieldPropsType>(): (
    React.ComponentType<Props>,
) => React.ComponentType<$Diff<Props, WithFieldInjectPropsType>> {
    // eslint-disable-next-line max-lines-per-function
    return (WrappedComponent) => {
        class WithFieldDecorator extends React.Component<Props & WithT> {
            static contextType = EditorContex;

            static defaultProps = {
                autoremove: true,
                parentKey: "",
            };

            key: string;

            bcDefaultValueQuery: Object = {};

            isRequired: boolean = false;

            constructor(...args: Array<*>) {
                super(...args);

                const {bc} = this.props;

                this.key = bc.column || uniqueId("builderField");

                if (!bc.column) {
                    logger(this.props.t("static:d4055d1153af44a4ba5eb73ac9bc437e", {key: this.key}));
                }

                if (bc.defaultvaluequery) {
                    this.bcDefaultValueQuery = {
                        ...bc,
                        [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_defaultstore`,
                        [VAR_RECORD_QUERY_ID]: bc.defaultvaluequery,
                        autoload: isEmpty(bc[VAR_RECORD_MASTER_ID]) ? "true" : "false",
                    };
                }
            }

            componentDidMount() {
                const {requiredrules} = this.props.bc;
                const {pageStore} = this.props;

                if (requiredrules) {
                    disposeOnUnmount(
                        this,
                        reaction(
                            () => parseMemoize(requiredrules).runer(pageStore.globalValues),
                            this.handleChangeRequiredRules,
                        ),
                    );
                    this.isRequired = Boolean(parseMemoize(requiredrules).runer(pageStore.globalValues));
                }

                const field = this.addField(this.key, this.props.bc);

                this.initValidation(field);

                disposeOnUnmount(this, [
                    reaction(() => field.isValid, this.handleIsValid),
                    reaction(this.handleGetReactionRules, this.handleSetRules),
                ]);

                this.forceUpdate();
            }

            // eslint-disable-next-line max-statements
            componentDidUpdate(prevProps: Props) {
                const field = this.getField();
                const {hidden, disabled, bc} = this.props;

                if (field) {
                    if (prevProps.hidden !== hidden || prevProps.disabled !== disabled) {
                        field.set("rules", this.handleGetRules(field));
                        field.resetValidation();
                    }

                    if (bc.datatype !== "hidden" && prevProps.hidden !== hidden) {
                        field.set("options", {
                            ...field.get("options"),
                            hidden,
                        });
                    }

                    if (prevProps.disabled !== disabled) {
                        field.set("options", {
                            ...field.get("options"),
                            disabled,
                        });
                        field.set("disabled", disabled);
                    }
                }
            }

            componentDidCatch(error: any, info: any) {
                logger(this.props.t("static:d56944511bd243b1a0914ccdea58ce0d", {key: this.key}));
                logger(
                    this.props.t("static:47b7b12c1d9c413da54a08331191aded"),
                    error,
                    this.props.t("static:cfac299d53f8466d9745ddfa53e09958"),
                    info,
                );
            }

            componentWillUnmount() {
                const {autoremove} = this.props;

                if (autoremove) {
                    this.handleRemoveField();
                }
            }

            // $FlowFixMe
            getForm = (): Form => this.props.form || this.context.form;

            getField = (): ?Field => {
                const parentKey = isEmpty(this.props.parentKey)
                    ? ""
                    : `${this.props.parentKey.replace(/fieldSetObj_/giu, "")}.`;

                /*
                 * TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                 */
                return this.getForm().select(`${parentKey}${this.key}`, null, false);
            };

            // eslint-disable-next-line max-statements, max-lines-per-function
            addField = (key: string, bc: BuilderFieldType): Field => {
                const form = this.getForm();
                const trans = this.props.t;
                const keyField = this.props.parentKey ? this.props.parentKey.replace(/fieldSetObj_/giu, "") : key;

                const inputType = inputTypes[bc.datatype || "text"];

                // TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                let field = form.select(keyField, null, false);

                if (isEmpty(field)) {
                    field = form.add({
                        key: keyField,
                    });
                }

                if (this.props.parentKey && startsWith(this.props.parentKey, "fieldSetObj")) {
                    field = field.add({
                        key,
                        options: {fieldSetObj: true},
                    });
                }

                field.set("rules", this.handleGetRules(field));
                field.set("options", {
                    ...field.get("options"),
                    bc,
                    disabled: this.props.disabled,
                    hidden: bc.datatype === "hidden" || this.props.hidden,
                });

                if (bc[VAR_RECORD_DISPLAYED]) {
                    field.set("label", trans(bc[VAR_RECORD_DISPLAYED]));
                }

                if (!isEmpty(bc.defaultvalue)) {
                    this.setDefaultValue({bc, field, form, inputType});
                } else if (inputType === "checkbox") {
                    field.set("default", false);
                }

                if (isEmpty(field.get("value")) && (inputType === "checkbox" || inputType === "boolean")) {
                    field.set(false);
                    field.resetValidation();
                }

                if (bc[VAR_RECORD_MASTER_ID]) {
                    this.props.pageStore.addToMastersAction(bc[VAR_RECORD_MASTER_ID], field);
                }

                return field;
            };

            setDefaultValue = ({bc, field, inputType}: {bc: BuilderFieldType, field: Field, inputType?: string}) => {
                if (inputType === "checkbox" || inputType === "boolean") {
                    field.set(
                        "default",
                        bc.defaultvalue === "true" || bc.defaultvalue === 1 || bc.defaultvalue === "1",
                    );
                } else {
                    field.set("default", bc.defaultvalue);
                }
                if (this.context.mode === "1" || field.get("options").fieldSetObj) {
                    field.reset();
                    field.resetValidation();
                }
            };

            handleChangeRequiredRules = (isRequired: mixed) => {
                const field = this.getField();

                this.isRequired = Boolean(isRequired);

                if (field) {
                    field.set("rules", this.handleGetRules(field));
                    field.resetValidation();
                }
            };

            handleGetReactionRules = (): Array<string> => {
                const field = this.getField();

                return field ? this.handleGetRules(field) : [];
            };

            handleGetRules = (field: Field): Array<string> => {
                const {hidden, disabled, pageStore} = this.props;

                return hidden || disabled
                    ? []
                    : getTextValidation(this.props.bc, field, {isRequired: this.isRequired, pageStore});
            };

            handleSetRules = (rules: Array<string>) => {
                const field = this.getField();

                if (field) {
                    field.set("rules", rules);
                }
            };

            handleRemoveField = () => {
                const {parentKey, bc, pageStore} = this.props;
                const form = this.getForm();

                if (isEmpty(parentKey)) {
                    pageStore.removeFromMastersAction(bc[VAR_RECORD_MASTER_ID], form.fields.get(this.key));
                    form.fields.delete(this.key);
                } else if (!isEmpty(parentKey)) {
                    /*
                     * TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                     */
                    const field = form.select(parentKey.replace(/fieldSetObj_/giu, ""), null, false);

                    if (field) {
                        field.fields.delete(this.key);
                    }

                    pageStore.removeFromMastersAction(bc[VAR_RECORD_MASTER_ID], field);
                }
            };

            handleValidateRelatedFields = ({form}) => {
                const {validaterelated} = this.props.bc;

                if (validaterelated) {
                    validaterelated.split(",").forEach((fieldName) => {
                        form.$(fieldName).validate({showErrors: true});
                    });
                }
            };

            handleIsValid = (isValid) => {
                const {onExpand} = this.props;

                if (!isValid && typeof onExpand === "function") {
                    onExpand();
                }
            };

            initValidation = (field: Field) => {
                const {validaterelated} = this.props.bc;

                if (validaterelated) {
                    field.observe(this.handleValidateRelatedFields);
                }
            };

            render() {
                const {mode} = this.context;
                const {bc, pageStore, editing, disabled} = this.props;
                const field = this.getField();

                if (!field) {
                    return null;
                }

                const isDisabled = disabled || !checkEditable(this.context.mode, bc.editmode);

                return (
                    <React.Fragment>
                        {bc.defaultvaluequery ? (
                            <TFDefaultValueQuery
                                bc={this.bcDefaultValueQuery}
                                field={field}
                                mode={mode}
                                pageStore={pageStore}
                                editing={editing}
                                disabled={isDisabled}
                            />
                        ) : null}
                        <WrappedComponent {...this.props} disabled={isDisabled} field={field} form={this.getForm()} />
                    </React.Fragment>
                );
            }
        }

        return withTranslation("meta")(WithFieldDecorator);
    };
}

export default withFieldDecorator;
