/* eslint-disable max-lines */
import {observable, computed, action} from "mobx";
import {FieldValue, IBuilderConfig, IPageModel} from "../types";
import {parseMemoize, makeRedirect, isEmpty} from "../utils";
import {parse} from "../utils/parser";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {deepFind, deepDelete, deepChange} from "../utils/transform";
import {IField, IForm, IRegisterFieldOptions, TError} from "./types";
import {validations} from "./validations";

export interface IFieldOptions {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    form: IForm;
    key: string;
    parentFieldKey?: string;
    output?: IRegisterFieldOptions["output"];
    input?: IRegisterFieldOptions["input"];
    defaultValueFn?: IField["defaultValueFn"];
    isArray?: boolean;
    isObject?: boolean;
    isFile?: boolean;
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

    public parentFieldKey?: string;

    public defaultValue: IField["defaultValue"];

    public defaultValueFn: IField["defaultValueFn"];

    public isArray: boolean;

    public isObject: boolean;

    public isFile: boolean;

    public disabled: boolean;

    public hidden: boolean;

    public registers = 0;

    public clearValue: FieldValue | undefined;

    public getParseValue = (name: string) => {
        return this.form && name.charAt(0) !== "g"
            ? this.form.values[name]
            : this.pageStore.globalValues.get(name) || this.form.values[name];
    };

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

        return Boolean(parseMemoize(this.bc.requiredrules).runer({get: this.getParseValue}));
    }

    @computed private get requiredRule(): string | undefined {
        if (this.isRequired) {
            if (this.isFile) {
                return "required-file";
            }

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

    // eslint-disable-next-line max-statements
    constructor(options: IFieldOptions) {
        this.pageStore = options.pageStore;
        this.form = options.form;
        this.bc = options.bc;
        this.key = options.key;
        this.isArray = options.isArray ?? false;
        this.isObject = options.isObject ?? false;
        this.isFile = options.isFile ?? false;
        this.clearValue = options.clearValue;
        this.parentFieldKey = options.parentFieldKey;
        this.input = this.getInput(options.input);
        this.output = this.getOutput(options.output);
        this.defaultValueFn = options.defaultValueFn;

        if (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean") {
            this.defaultValue =
                typeof this.bc.defaultvalue === "string"
                    ? Number(this.bc.defaultvalue === "true" || this.bc.defaultvalue === "1")
                    : Number(this.bc.defaultvalue);
        } else if (this.bc.defaultvalue) {
            if (this.isArray && typeof this.bc.defaultvalue === "string") {
                this.defaultValue = JSON.parse(this.bc.defaultvalue);
            } else {
                this.defaultValue = this.bc.defaultvalue;
            }
        } else if (this.bc.defaultvaluelocalization) {
            this.defaultValue = this.bc.defaultvaluelocalization;
        } else if (!this.bc.defaultvalue && this.isArray && !options.defaultValueFn) {
            this.defaultValue = [];
        } else if (!this.bc.defaultvalue && this.isObject && !options.defaultValueFn) {
            this.defaultValue = {};
        }
        if (this.bc.defaultvaluerule && !this.defaultValueFn) {
            this.defaultValueFn = (field: IField, changeFn: IField["onChange"], clearFn: IField["onReset"]) => {
                const value = parseMemoize(this.bc.defaultvaluerule!).runer({get: this.getParseValue});

                if (isEmpty(value)) {
                    clearFn();
                } else {
                    changeFn(value);
                }
            };
        }

        if (this.parentFieldKey) {
            const parentField = this.form.fields.get(this.parentFieldKey);

            if (parentField) {
                const [isExists, val] = deepFind(
                    (parentField.value as any) || (parentField.isArray ? [] : {}),
                    this.key.substr(this.parentFieldKey.length + 1),
                );

                if (isExists) {
                    this.value = val;
                }
            }
        }
        if (this.value === undefined) {
            const [, val] = this.input(this.form.initialValues, this, this.form);

            this.value = val;
        }

        if (this.value === undefined && !isEmpty(this.bc.initvalue)) {
            if ((this.isArray || this.isObject) && typeof this.bc.initvalue === "string") {
                this.value = JSON.parse(this.bc.initvalue);
            } else if (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean") {
                this.value =
                    typeof this.bc.initvalue === "string"
                        ? Number(this.bc.initvalue === "true" || this.bc.initvalue === "1")
                        : Number(this.bc.initvalue);
            } else {
                this.value = this.bc.initvalue;
            }
        }

        if (
            this.value === undefined &&
            this.form.mode === "1" &&
            this.form.editing &&
            (this.defaultValue !== undefined || this.defaultValueFn !== undefined)
        ) {
            if (this.defaultValue !== undefined) {
                this.value = this.defaultValue;
            } else {
                this.defaultValueFn!(this, this.onChange, this.onClear);
            }
        }
        if (this.value === undefined && (this.isArray || this.isFile)) {
            this.value = [];
        }
        if (this.value === undefined && this.isObject) {
            this.value = {};
        }
        if (this.value === undefined && (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean")) {
            this.value = 0;
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
        if (this.isObject) {
            const newValues = this.form.values;

            deepChange(newValues, this.key, this.value);

            for (const [, field] of this.form.fields) {
                if (field.key.indexOf(this.key) === 0) {
                    const [isExists, valField] = field.input(newValues, field, this.form);

                    if (isExists) {
                        field.setValue(valField);
                    } else {
                        field.clear();
                    }
                }
            }
        }
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
            this.onChange(Array.isArray(this.value) ? [...this.value, {}] : [{}]);
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
        let val = value;

        if (this.isObject || this.isArray) {
            if (typeof value === "string") {
                try {
                    val = JSON.parse(value);
                } catch (e) {
                    val = this.isArray ? [] : {};
                }
            }
            for (const [key, field] of this.form.fields) {
                if (field.parentFieldKey !== this.key) {
                    const [isExists, val] = deepFind(value as any, key.substr(this.key.length + 1));

                    if (isExists) {
                        field.setValue(val);
                    }
                }
            }
        }
        if (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean") {
            val = typeof val === "string" ? Number(val === "true" || val === "1") : Number(val);
        }
        this.value = val;
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
