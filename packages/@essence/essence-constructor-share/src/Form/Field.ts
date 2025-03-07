/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
/* eslint-disable max-lines */
import {observable, computed, action, makeObservable} from "mobx";
import {FieldValue, IBuilderConfig, IPageModel} from "../types";
import {parseMemoize, makeRedirect, isEmpty, transformToBoolean} from "../utils";
import {parse} from "../utils/parser";
import {VAR_RECORD_DISPLAYED, VAR_RECORD_PAGE_OBJECT_ID} from "../constants";
import {deepFind, deepChange, cloneDeepElementary, deepDelete} from "../utils/transform";
import {copyToClipboard} from "../utils/copyToClipboard";
import {snackbarStore} from "../models";
import {IField, IForm, IRegisterFieldOptions, TError} from "./types";
import {validations} from "./validations";

export interface IFieldOptions {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    form: IForm;
    key: string;
    parentFieldKey?: string;
    parentPrefix?: string;
    output?: IRegisterFieldOptions["output"];
    input?: IRegisterFieldOptions["input"];
    defaultValueFn?: IField["defaultValueFn"];
    defaultCopyValueFn?: IField["defaultCopyValueFn"];
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

    public parentPrefix?: string;

    public defaultValue: IField["defaultValue"];

    public defaultValueFn: IField["defaultValueFn"];

    public defaultCopyValueFn?: IField["defaultCopyValueFn"];

    public isArray: boolean;

    public isObject: boolean;

    public isFile: boolean;

    public disabled: boolean;

    public hidden: boolean;

    public registers = 0;

    public clearValue: FieldValue | undefined;

    public getParseValue = (name: string): any => {
        if (typeof name === "string" && name.charAt(0) === "g" && this.pageStore.globalValues.has(name)) {
            return this.pageStore.globalValues.get(name);
        }
        const values = this.form.values;

        if (this.parentPrefix) {
            const [isExistNested, valueNested] = deepFind(values, `${this.parentPrefix}.${name}`);

            if (isExistNested) {
                return valueNested;
            }
        }

        return deepFind(values, name)[1];
    };

    @computed get label(): string | undefined {
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

    @computed private get checkRule(): string | undefined {
        if (this.bc.check) {
            return "check";
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
            this.checkRule,
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
        this.parentPrefix = options.parentPrefix;
        this.input = this.getInput(options.input);
        this.output = this.getOutput(options.output);
        this.defaultValueFn = options.defaultValueFn;
        this.defaultCopyValueFn = options.defaultCopyValueFn;

        if (this.bc.defaultvalue ||
            typeof this.bc.defaultvalue === "boolean" ||
            typeof this.bc.defaultvalue === "number") {
            if (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean") {
                this.defaultValue = transformToBoolean(this.bc.defaultvalue);
                if (this.bc.valuetype === "integer") {
                    this.defaultValue = Number(this.defaultValue);
                }
            }
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
                this.value = transformToBoolean(this.bc.initvalue);
                if (this.bc.valuetype === "integer") {
                    this.value = Number(this.value);
                }
            } else {
                this.value = this.bc.initvalue;
            }
        }

        if (
            this.value === undefined &&
            (this.form.mode === "1" || this.bc.defaultisclear) &&
            this.form.editing &&
            (this.defaultValue !== undefined || this.defaultValueFn !== undefined)
        ) {
            if (this.defaultValue !== undefined) {
                this.value = this.defaultValue;
            } else {
                this.defaultValueFn?.(this, this.onChange, this.onClear);
            }
        }
        if (this.value === undefined && (this.isArray || this.isFile)) {
            this.value = [];
        }
        if (this.value === undefined && this.isObject) {
            this.value = {};
        }
        if (this.value === undefined && (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean")) {
            this.value = this.bc.valuetype === "integer" ? 0 : false;
        }
        makeObservable(this);
    }

    private getOutput = (output?: IFieldOptions["output"]): IField["output"] => {
        if (output) {
            return output;
        } else if (this.isArray) {
            const keyChild = new RegExp(`^${this.key}\\.(\\d+)\\.([^\\.]+)$`, "u");

            return (field, form, value) => {
                const val = value || field.value;
                const obj: Record<string, Record<string, FieldValue>> = Array.isArray(val)
                    ? val.reduce((res, rec, index) => {
                          res[index] = rec;

                          return res;
                      }, {})
                    : {};

                for (const [key, fieldChild] of form.fields) {
                    if (keyChild.test(key)) {
                        const [keyParent, keyReal] = key.replace(keyChild, "$1:$2").split(":");

                        obj[keyParent] = {
                            ...(obj[keyParent] || {}),
                            [keyReal]: fieldChild.output(fieldChild, form),
                        };
                    }
                }

                return field.bc.valuetype === "text" ? JSON.stringify(Object.values(obj)) : Object.values(obj);
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

                return field.bc.valuetype === "text" ? JSON.stringify(obj) : obj;
            };
        }

        return (field, form, value) => {
            const val = value || field.value;

            if (typeof val === "undefined" || val === null) {
                return val;
            }
            if (field.bc.valuetype === "integer") {
                return parseInt(val as string, 10);
            }
            if (field.bc.valuetype === "numeric") {
                return parseFloat(val as string);
            }
            if (field.bc.valuetype === "text") {
                return `${val}`;
            }
            if (field.bc.valuetype === "json" && typeof val === "string") {
                try {
                    return JSON.parse(val);
                } catch (e) {}
            }
            if (field.bc.valuetype === "boolean") {
                return transformToBoolean(val);
            }

            return val;
        };
    };

    private getInput = (input?: IFieldOptions["input"]): IField["input"] => {
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
    onChange = (value: FieldValue): void => {
        this.setValue(value);

        if (!this.isValid) {
            this.validate();
        }

        this.resetChilds();
        this.execChangeHooks();
        if (this.isObject || this.isArray) {
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
    onReset = (): void => {
        if (this.defaultValue === undefined && this.defaultValueFn === undefined) {
            this.onClear();
        } else if (this.defaultValueFn) {
            this.defaultValueFn(this, this.onChange, this.onClear);
        } else {
            this.onChange(this.defaultValue);
        }
    };

    @action
    onClear = (isClearGetGlobal?: boolean): void => {
        if (this.bc.defaultisclear && (this.defaultValue !== undefined || this.defaultValueFn !== undefined)) {
            if (this.defaultValueFn) {
                this.defaultValueFn(this, this.onChange, this.onClear);
            } else {
                this.onChange(this.defaultValue);
            }

            return;
        }
        if (isClearGetGlobal && this.bc.getglobal) {
            const updateGlobal = {};

            parseMemoize(this.bc.getglobal).runer({
                get: (name) => {
                    if (this.pageStore.globalValues.has(name) || (name && name.charAt(0) === "g")) {
                        updateGlobal[name] = null;
                    }
                },
            });

            this.pageStore.updateGlobalValues(updateGlobal);
        }
        this.onChange(this.clearValue);
    };

    @action
    onCopy = (): void => {
        const value = typeof this.defaultCopyValueFn === "function" ? this.defaultCopyValueFn(this) : this.value;

        copyToClipboard(value).catch(() => {
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: "static:17f3610bc821435ba8f08bca96c588ab",
                },
                this.pageStore.route,
            );
        });
    };

    @action
    validate = async (): Promise<void> => {
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
    resetValidation = (): void => {
        this.errors = [];
    };

    @action
    invalidate = (errors: TError[] | TError): void => {
        this.errors = Array.isArray(errors) ? errors : [errors];
    };

    @action
    setExtraRules = (extraRules: string[]): void => {
        this.extraRules = extraRules;
    };

    setDefaultValue = (defaultValue: FieldValue): void => {
        this.defaultValue = defaultValue;
    };

    public setDefaultCopyValueFn = (defaultCopyValueFn: IField["defaultCopyValueFn"]): void => {
        this.defaultCopyValueFn = defaultCopyValueFn;
    };

    public setDefaultValueFn = (defaultValueFn: IField["defaultValueFn"]): void => {
        this.defaultValueFn = defaultValueFn;
    };

    /**
     * Reset value to default
     * Can be call deaultquery
     */
    @action
    reset = (): void => {
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
    clear = (): void => {
        if (this.bc.defaultisclear && (this.defaultValue !== undefined || this.defaultValueFn !== undefined)) {
            if (this.defaultValueFn) {
                this.defaultValueFn(this, this.setValue, this.clear);
            } else {
                this.setValue(this.defaultValue);
            }

            return;
        }
        this.setValue(this.clearValue);
        this.clearExtra();
    };

    @action
    clearExtra = (): void => {
        if (this.bc.valuefield) {
            let parentKey = "";

            if (this.key.indexOf(".") > -1) {
                const arrKey = this.key.split(".");

                parentKey = arrKey.slice(0, arrKey.length - 1).join(".");
            }

            const fieldParent = this.parentFieldKey ? this.form.fields.get(this.parentFieldKey) : null;

            if (!fieldParent || !fieldParent.isArray) {
                let extraValue = cloneDeepElementary(this.form.extraValue);

                this.bc.valuefield.forEach(({out}) => {
                    if (out) {
                        extraValue = deepDelete(extraValue, `${parentKey ? `${parentKey}.` : ""}${out}`);
                    } else {
                        extraValue = deepDelete(extraValue, this.key);
                    }
                });
                this.form.patch(extraValue, true, true);
            }
        }
    };

    @action
    add = (): void => {
        if (this.isArray) {
            let value = this.getOutput()(this, this.form, this.value);

            if (value && this.bc.valuetype === "text") {
                value = JSON.parse(value as string);
            }
            this.onChange(Array.isArray(value) ? [...value, {}] : [{}]);
        }
    };

    @action
    del = (ind?: string | number): void => {
        const index = typeof ind === "string" ? parseInt(ind, 10) : ind || 0;

        if (this.isArray && index >= 0) {
            const extraValue = cloneDeepElementary(this.form.extraValue);
            const [isExist, valueExtraOrigin] = deepFind(extraValue, this.key);

            if (isExist && typeof valueExtraOrigin === "object") {
                let valueExtra = valueExtraOrigin as any[];
                const isNotArray = !Array.isArray(valueExtraOrigin);

                if (isNotArray) {
                    valueExtra = Object.values(valueExtraOrigin as any);
                }
                valueExtra.splice(index, 1);
                deepChange(
                    extraValue,
                    this.key,
                    isNotArray
                        ? valueExtra.reduce((res, val, i) => {
                              res[i] = val;

                              return res;
                          }, {})
                        : valueExtra,
                );

                this.form.patch(extraValue, true, true);
            }

            let value = this.getOutput()(this, this.form, this.value);

            if (value && this.bc.valuetype === "text") {
                value = JSON.parse(value as string);
            }
            (value as any[]).splice(index, 1);
            this.onChange(value);
        }
    };

    @action
    redirect = (): void => {
        makeRedirect(this.bc, this.pageStore, this.form.values);
    };

    @action
    setDisabled = (disabled = false): void => {
        if (disabled) {
            this.resetValidation();
        }
        this.disabled = disabled;
    };

    @action
    setHidden = (hidden = false): void => {
        if (hidden) {
            this.resetValidation();
        }
        this.hidden = hidden;
    };

    @action
    setValue = (value: FieldValue): void => {
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
            if (this.bc.valuetype === "boolean") {
                val = transformToBoolean(val);
            } else {
                val = Number(transformToBoolean(val));
            }
        }

        this.value = val;
    };

    @action
    resetChilds = (): void => {
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
