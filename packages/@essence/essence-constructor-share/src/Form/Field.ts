/* eslint-disable max-lines */
import {observable, computed, action} from "mobx";
import {FieldValue, IBuilderConfig, IPageModel} from "../types";
import {parseMemoize, makeRedirect} from "../utils";
import {parse} from "../utils/parser";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {deepFind, deepDelete} from "../utils/transform";
import {IField, IForm, IRegisterFieldOptions, TError} from "./types";
import {validations} from "./validations";

export interface IFieldOptions {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    form: IForm;
    key: string;
    output?: IRegisterFieldOptions["output"];
    input?: IRegisterFieldOptions["input"];
    defaultValueFn?: IField["defaultValueFn"];
    isArray?: boolean;
    isObject?: boolean;
    clearValue?: FieldValue;
}

export const disabledSize = {
    addr: true,
    grid: true,
    mo: true,
    tree: true,
};

/**
 * Difference between onChange(reset/clear) and change:
 *      For "onChange" also invoke reset childs and hooks
 *      For "change" only invoke set the value without any other changes
 */
export class Field implements IField {
    public output: IField["output"];

    public input: IField["input"];

    public form: IForm;

    private pageStore: IPageModel;

    public bc: IBuilderConfig;

    public key: string;

    public defaultValue: IField["defaultValue"];

    public defaultValueFn: IField["defaultValueFn"];

    private isArray: boolean;

    private isObject: boolean;

    public disabled: boolean;

    public hidden: boolean;

    public registers = 0;

    public clearValue: FieldValue | undefined;

    @computed get label() {
        return this.bc[VAR_RECORD_DISPLAYED];
    }

    @observable value: FieldValue;

    @observable errors: TError[] = [];

    @observable private extraRules: string[] = [];

    @computed get isRequired(): boolean {
        if (this.bc.required) {
            return true;
        }

        if (!this.bc.requiredrules) {
            return false;
        }

        return Boolean(parseMemoize(this.bc.requiredrules).runer(this.pageStore.globalValues));
    }

    @computed private get requiredRule(): string | undefined {
        if (this.isRequired) {
            return this.bc.datatype === "checkbox" || this.bc.datatype === "boolean" ? "required-checkbox" : "required";
        }

        return undefined;
    }

    @computed private get regexRule(): string | undefined {
        if (this.bc.regexp) {
            return `regex:/^${this.bc.regexp}$/`;
        }

        return undefined;
    }

    @computed private get valueSizeRules(): string[] {
        const rules: string[] = [];

        if (!this.bc.datatype || !(this.bc.datatype in disabledSize)) {
            if (this.bc.datatype === "date") {
                ["maxvalue", "minvalue"].forEach((rule: "maxvalue" | "minvalue") => {
                    const bcRule = this.bc[rule];

                    if (bcRule) {
                        const value = parse(bcRule).runer(this.pageStore.globalValues);

                        if (value) {
                            rules.push(`${this.bc.datatype === "date" ? `${rule}date` : rule}:${value}`);
                        }
                    }
                });
            } else {
                ["maxvalue", "minvalue", "maxsize", "minsize"].forEach(
                    (rule: "maxvalue" | "minvalue" | "maxsize" | "minsize") => {
                        const bcRule = this.bc[rule];
                        const ruleValue =
                            bcRule && /[g_]/u.test(bcRule) ? this.pageStore.globalValues.get(bcRule) : bcRule;

                        if (ruleValue) {
                            rules.push(`${rule}:${ruleValue}`);
                        }
                    },
                );
            }
        }

        return rules;
    }

    @computed private get dateRule(): string | undefined {
        if (this.bc.datatype === "date" && this.bc.format) {
            return `date-${this.bc.format}`;
        }

        return undefined;
    }

    @computed get rules(): string[] {
        const rules: (string | undefined)[] = [
            this.requiredRule,
            this.regexRule,
            ...this.valueSizeRules,
            this.dateRule,
            ...this.extraRules,
        ];

        return rules.filter((rule?: string): boolean => Boolean(rule)) as string[];
    }

    @computed get error(): TError | undefined {
        return this.errors.length > 0 ? this.errors[0] : undefined;
    }

    @computed get isValid(): boolean {
        return !this.error;
    }

    constructor(options: IFieldOptions) {
        this.pageStore = options.pageStore;
        this.form = options.form;
        this.bc = options.bc;
        this.key = options.key;
        this.isArray = options.isArray ?? false;
        this.isObject = options.isObject ?? false;
        this.clearValue = options.clearValue;
        this.input = this.getInput(options.input);
        this.output = this.getOutput(options.output);
        this.defaultValueFn = options.defaultValueFn;

        if (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean") {
            this.defaultValue = Number(this.bc.defaultvalue === "true" || this.bc.defaultvalue === "1");
        } else if (this.bc.defaultvalue) {
            if (this.isArray && typeof this.bc.defaultvalue === "string") {
                this.defaultValue = JSON.parse(this.bc.defaultvalue);
            } else {
                this.defaultValue = this.bc.defaultvalue;
            }
        } else if (!this.bc.defaultvalue && this.isArray) {
            this.defaultValue = [];
        }

        const [, val] = this.input(this.form.initialValues, this, this.form);

        this.value = val;

        if (this.value === undefined && this.isArray) {
            this.value = [];
        }
    }

    private getOutput = (output: IFieldOptions["output"]): IField["output"] => {
        if (output) {
            return output;
        } else if (this.isArray) {
            const keyChild = new RegExp(`^${this.key}\\.(\\d+)\\.([^\\.]+)$`, "u");

            return (field, form) => {
                const obj: Record<string, Record<string, FieldValue>> = {};

                for (const [key, fieldChild] of form.fields) {
                    if (keyChild.test(key)) {
                        const [keyParent, keyReal] = key.replace(keyChild, "$1:$2").split(":");

                        obj[keyParent] = {
                            ...(obj[keyParent] || {}),
                            [keyReal]: fieldChild.output(fieldChild, form),
                        };
                    }
                }

                return Object.values(obj);
            };
        } else if (this.isObject) {
            const keyChild = new RegExp(`^${this.key}\\.([^\\.]+)$`, "u");

            return (field, form) => {
                const obj: any = typeof field.value === "object" ? {...field.value} : {};

                for (const [key, fieldChild] of form.fields) {
                    if (keyChild.test(key)) {
                        obj[key.replace(keyChild, "$1")] = fieldChild.output(fieldChild, form);
                    }
                }

                return obj;
            };
        }

        return (field, form, value) => value || field.value;
    };

    private getInput = (input: IFieldOptions["input"]): IField["input"] => {
        if (input) {
            return input;
        } else if (this.key.indexOf(".") > 0) {
            return (initialValues) => deepFind(initialValues, this.key);
        }

        return (initialValues) => {
            if (Object.prototype.hasOwnProperty.call(initialValues, this.key)) {
                return [true, initialValues[this.key]];
            }

            return [false, undefined];
        };
    };

    private execChangeHooks = () => {
        this.form.setIsDirty(true);

        if (this.form.hooks.onChange) {
            this.form.hooks.onChange(this.form);
        }

        if (this.form.hooks.onValueChange) {
            this.form.hooks.onValueChange(this.form, this);
        }
    };

    @action
    onChange = (value: FieldValue) => {
        this.setValue(value);

        if (!this.isValid) {
            this.validate();
        }

        this.resetChilds();
        this.execChangeHooks();
    };

    @action
    onReset = () => {
        if (this.defaultValue === undefined && this.defaultValueFn === undefined) {
            this.onClear();
        } else if (this.defaultValueFn) {
            this.defaultValueFn(this, this.onChange, this.onClear);
        } else {
            this.onChange(this.defaultValue);
        }
    };

    @action
    onClear = () => {
        this.onChange(this.clearValue);
    };

    @action
    validate = () => {
        if (this.disabled || this.hidden) {
            this.errors = [];
        } else {
            const errors = this.rules.reduce<TError[]>((acc, ruleConfig) => {
                const posSep = ruleConfig.indexOf(":");
                const rule = posSep === -1 ? ruleConfig : ruleConfig.slice(0, posSep);
                const req = posSep === -1 ? undefined : ruleConfig.slice(posSep + 1);

                if (validations[rule]) {
                    const err: TError | undefined = validations[rule](this, this.form, req);

                    if (err) {
                        acc.push(err);
                    }
                }

                return acc;
            }, []);

            this.errors = errors;
        }
    };

    @action
    resetValidation = () => {
        this.errors = [];
    };

    @action
    invalidate = (errors: TError[] | TError) => {
        this.errors = Array.isArray(errors) ? errors : [errors];
    };

    @action
    setExtraRules = (extraRules: string[]) => {
        this.extraRules = extraRules;
    };

    setDefaultValue = (defaultValue: FieldValue) => {
        this.defaultValue = defaultValue;
    };

    public setDefaultValueFn = (defaultValueFn: IField["defaultValueFn"]) => {
        this.defaultValueFn = defaultValueFn;
    };

    /**
     * Reset value to default
     * Can be call deaultquery
     */
    @action
    reset = () => {
        if (this.defaultValue === undefined && this.defaultValueFn === undefined) {
            this.clear();
        } else if (this.defaultValueFn) {
            this.defaultValueFn(this, this.setValue, this.clear);
        } else {
            this.setValue(this.defaultValue);
        }
    };

    /**
     * Clear value of the field to empty value
     */
    @action
    clear = () => {
        this.setValue(this.clearValue);
    };

    @action
    add = () => {
        if (this.isArray) {
            this.onChange([...this.value, {}]);
        }
    };

    @action
    del = (index?: string | number) => {
        if (this.isArray && index) {
            const newValues = this.form.values;

            this.form.update(deepDelete(newValues, `${this.key}.${index}`), false);
        }
    };

    @action
    redirect = () => {
        makeRedirect(this.bc, this.pageStore, this.form.values);
    };

    @action
    setDisabled = (disabled = false) => {
        this.disabled = disabled;
    };

    @action
    setHidden = (hidden = false) => {
        this.hidden = hidden;
    };

    @action
    setValue = (value: FieldValue) => {
        this.value = value;
    };

    @action
    resetChilds = () => {
        const ckPageObject = this.bc[VAR_RECORD_PAGE_OBJECT_ID];
        const childs: Array<IField> = this.pageStore.masters[ckPageObject];

        if (childs) {
            childs.forEach((childField: IField) => {
                childField.clear();
                childField.resetChilds();
            });
        }
    };
}
