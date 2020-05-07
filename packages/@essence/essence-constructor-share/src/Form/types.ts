import {TFunction} from "../utils";
import {FieldValue, IRecord, IBuilderConfig, IPageModel} from "../types";
import {IBuilderMode} from "../types/Builder";

export interface IRegisterFieldOptions {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    isArray?: boolean;
    output?: (field: IField) => IRecord | FieldValue;
}

export interface IField {
    key: string;
    value: FieldValue;
    defaultValue: FieldValue;
    isRequired: boolean;
    rules: string[];
    isValid: boolean;
    errors: TError[];
    error?: TError;
    output?: IRegisterFieldOptions["output"];
    reset(): void;
    clear(): void;
    invalidate(error: TError[] | TError): void;
    validate(): Promise<void> | void;
    setExtraRules(extraRules: string[]): void;
    setDefaultValue(defaultValue: FieldValue): void;
    resetValidation(): void;
    add(): void;
    del(idx?: number | string): void;

    // Events
    onChange(value: FieldValue): void;
}

export interface IForm {
    values: IRecord;
    initialValues: IRecord;
    hooks: IFormHooks;
    mode: IBuilderMode;
    isValid: boolean;
    submit(): void;
    update(initialValues?: IRecord, isReset?: boolean): void;
    select(key: string): IField | undefined;
    registerField(key: string, options: IRegisterFieldOptions): IField;
    unregisterField(key: string): void;
    validate(): Promise<void> | void;
    resetValidation(): void;

    // Event
    onSubmit(event: React.SyntheticEvent): void;
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
    mode?: IBuilderMode;
}

export type TError = (trans: TFunction) => string;

export type TValidation = (field: IField, form: IForm, req?: string) => TError | undefined;
