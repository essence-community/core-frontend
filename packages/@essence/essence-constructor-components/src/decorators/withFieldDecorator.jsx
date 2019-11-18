/* eslint-disable max-lines */
// @flow
import * as React from "react";
import camelCase from "lodash/camelCase";
import startsWith from "lodash/startsWith";
import uniqueId from "lodash/uniqueId";
import {reaction} from "mobx";
import {disposeOnUnmount} from "mobx-react";
import {Field, Form} from "mobx-react-form";
import {EditorContex} from "@essence/essence-constructor-share";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {loggerRoot} from "../constants";
import {isEmpty} from "../utils/base";
import {checkEditable} from "../utils/access";
import {inputTypes} from "../TextField/TFUtils/TFConstants";
import {getTextValidation} from "../utils/getTextValidation";
import {type BuilderFieldType} from "../TextField/BuilderFieldType";
import TFDefaultValueQuery from "../TextField/TFDefaultValueQuery";
import {type WithFieldPropsType, type WithFieldInjectPropsType} from "./DecoratorsType";

const logger: Function = loggerRoot.extend("withFieldDecorator");

function withFieldDecorator<Props: WithFieldPropsType>(): (
    React.ComponentType<Props>,
) => React.ComponentType<$Diff<Props, WithFieldInjectPropsType>> {
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

                this.key = camelCase(bc.column || uniqueId("builderField"));

                if (!bc.column) {
                    logger("Поле может работать некорректно без column, автогенерируемое значение:", this.key);
                }

                if (bc.defaultvaluequery) {
                    this.bcDefaultValueQuery = {
                        ...bc,
                        autoload: isEmpty(bc.ckMaster) ? "true" : "false",
                        ckPageObject: `${bc.ckPageObject}_defaultstore`,
                        ckQuery: bc.defaultvaluequery,
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

                disposeOnUnmount(this, [reaction(() => field.isValid, this.handleIsValid)]);

                this.forceUpdate();
            }

            // eslint-disable-next-line max-statements
            componentDidUpdate(prevProps: Props) {
                const field = this.getField();
                const {hidden, disabled, bc} = this.props;

                if (field) {
                    if (prevProps.hidden !== hidden || prevProps.disabled !== disabled) {
                        this.handleValidate(field);
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
                logger("Поле не может быть построено:", this.key);
                logger("Ошибка:", error, "Информация:", info);
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
                    : `${this.props.parentKey.replace(/fieldSetObj_/gi, "")}.`;

                /*
                 * TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                 */
                return this.getForm().select(`${parentKey}${this.key}`, null, false);
            };

            // eslint-disable-next-line max-statements
            addField = (key: string, bc: BuilderFieldType): Field => {
                const form = this.getForm();
                const trans = this.props.t;
                const keyField = this.props.parentKey ? this.props.parentKey.replace(/fieldSetObj_/gi, "") : key;

                const inputType = inputTypes[bc.datatype || "text"];

                // TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                let field = form.select(keyField, null, false);

                if (isEmpty(field)) {
                    field = form.add({key: keyField});
                }

                if (this.props.parentKey && startsWith(this.props.parentKey, "fieldSetObj")) {
                    field = field.add({
                        key,
                        options: {fieldSetObj: true},
                    });
                }

                this.handleValidate(field);
                field.set("options", {
                    ...field.get("options"),
                    bc,
                    disabled: this.props.disabled,
                    hidden: bc.datatype === "hidden" || this.props.hidden,
                });

                if (bc.cvDisplayed) {
                    field.set("label", trans(bc.cvDisplayed));
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

                if (bc.ckMaster) {
                    this.props.pageStore.addToMastersAction(bc.ckMaster, field);
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
                    this.handleValidate(field);
                    field.resetValidation();
                }
            };

            handleValidate = (field: Field) => {
                const {hidden, disabled} = this.props;

                field.set(
                    "rules",
                    hidden || disabled ? [] : getTextValidation(this.props.bc, field, {isRequired: this.isRequired}),
                );
            };

            handleRemoveField = () => {
                const {parentKey, bc, pageStore} = this.props;
                const form = this.getForm();

                if (isEmpty(parentKey)) {
                    pageStore.removeFromMastersAction(bc.ckMaster, form.fields.get(this.key));
                    form.fields.delete(this.key);
                } else if (!isEmpty(parentKey)) {
                    /*
                     * TODO mobx-react-form@^1.34.0 вызываю silent ($() - метод вызывает exception)
                     */
                    const field = form.select(parentKey.replace(/fieldSetObj_/gi, ""), null, false);

                    if (field) {
                        field.fields.delete(this.key);
                    }

                    pageStore.removeFromMastersAction(bc.ckMaster, field);
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
                const {validaterelated, imask} = this.props.bc;

                if (validaterelated) {
                    field.observe(this.handleValidateRelatedFields);
                }

                if (imask) {
                    disposeOnUnmount(this, [reaction(() => field.options, () => this.handleValidate(field))]);
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
