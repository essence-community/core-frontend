import {ObservableMap} from "mobx";
import {TFunction} from "../utils";
import {FieldValue, IRecord, IBuilderConfig, IPageModel, IBuilderMode} from "../types";
import {IGetValue} from "../utils/parser";

export interface IRegisterFieldOptions {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    parentFieldKey?: string;
    isArray?: boolean;
    isObject?: boolean;
    isFile?: boolean;
    clearValue?: FieldValue;
    defaultValueFn?: IField["defaultValueFn"];
    defaultCopyValueFn?: IField["defaultCopyValueFn"];
    output?: IField["output"];
    input?: IField["input"];
}

export interface IField {
    key: string;
    parentFieldKey?: string;
    bc: IBuilderConfig;
    value: FieldValue;
    defaultValue?: FieldValue;
    defaultValueFn?: (field: IField, changeFn: IField["onChange"], clearFn: IField["onReset"]) => void;
    defaultCopyValueFn?: (field: IField) => string;
    getParseValue: IGetValue["get"];
    label?: string;
    isRequired: boolean;
    rules: string[];
    isValid: boolean;
    errors: TError[];
    form: IForm;
    registers: number;
    hidden: boolean;
    disabled: boolean;
    error?: TError;
    isArray?: boolean;
    isObject?: boolean;
    isFile?: boolean;
    input: (initialValues: IRecord, field: IField, form: IForm) => [boolean, IRecord | FieldValue];
    output: (field: IField, form: IForm, value?: IRecord | FieldValue) => IRecord | FieldValue;
    reset(): void;
    resetChilds(): void;
    clear(): void;
    clearExtra(): void;
    invalidate(error: TError[] | TError): void;
    validate(): Promise<void> | void;
    resetValidation(): void;
    add(): void;
    del(idx?: number | string): void;
    redirect(): void;
    setExtraRules(extraRules: string[]): void;
    setDefaultValue(defaultValue: FieldValue): void;
    setDefaultCopyValueFn(fn: IField["defaultCopyValueFn"]): void;
    setDefaultValueFn(fn: IField["defaultValueFn"]): void;
    setDisabled(disabled?: boolean): void;
    setHidden(hidden?: boolean): void;
    setValue(value?: FieldValue): void;

    // Events
    onChange(value: FieldValue): void;
    onReset(): void;
    onClear(): void;
    onCopy(): void;
}

export interface IForm {
    values: IRecord;
    extraValue: IRecord;
    valueKey?: FieldValue;
    valuesFile: FormData;
    initialValues: IRecord;
    hooks: IFormHooks;
    mode: IBuilderMode;
    isValid: boolean;
    isExistFile: boolean;
    placement: string;
    isDirty: boolean;
    submitting: boolean;
    fields: ObservableMap<string, IField>;
    bc?: IBuilderConfig;
    editing: boolean;
    isExistRequired: boolean;
    validationCount: number;
    submit(): void;
    reset(): void;
    clear(): void;
    update(initialValues?: IRecord, isReset?: boolean): void;
    updateMode(mode: IBuilderMode): void;
    patch(values: IRecord, isExtra?: boolean, isExtraReset?: boolean): void;
    select(key: string): IField | undefined;
    registerField(key: string, options: IRegisterFieldOptions): IField;
    unregisterField(key: string): void;
    validate(): Promise<void> | void;
    resetValidation(): void;
    setEditing(editing: boolean): void;
    setIsDirty(boolean: true): void;

    // Event
    onSubmit(event?: React.SyntheticEvent): void;
}

export interface IFormHooks {
    onChange?: (form: IForm) => void;
    onValueChange?: (form: IForm, field: IField) => void;
    onError?: (form: IForm) => void | Promise<void>;
    onSuccess?: (form: IForm) => void | Promise<void>;
    onFilterRedirect?: (form: IForm) => void | Promise<void>;
    onReset?: (form: IForm) => void;
}

export interface IFormProps {
    values: IRecord;
    hooks: IFormHooks;
    pageStore?: IPageModel;
    mode?: IBuilderMode;
    placement: string;
    editing: boolean;
    bc?: IBuilderConfig;
}

export type TError = (trans: TFunction) => string;

export type TValidation = (field: IField, form: IForm, req?: string) => TError | undefined;

export interface IParentFieldContext {
    key: string;
    parentFieldKey: string;
    output?: IRegisterFieldOptions["output"];
    input?: IRegisterFieldOptions["input"];
}
