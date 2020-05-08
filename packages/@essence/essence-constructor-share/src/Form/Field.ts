import {observable, computed, action} from "mobx";
import {FieldValue, IBuilderConfig, IPageModel} from "../types";
import {parseMemoize, makeRedirect} from "../utils";
import {parse} from "../utils/parser";
import {VAR_RECORD_DISPLAYED} from "../constants";
import {IField, IForm, IRegisterFieldOptions, TError} from "./types";
import {validations} from "./validations";

interface IFieldOptions {
    bc: IBuilderConfig;
    pageStore: IPageModel;
    form: IForm;
    key: string;
    output?: IRegisterFieldOptions["output"];
    isArray?: boolean;
}

export const disabledSize = {
    addr: true,
    grid: true,
    mo: true,
    tree: true,
};

export class Field implements IField {
    public output: IRegisterFieldOptions["output"];

    private form: IForm;

    private pageStore: IPageModel;

    public bc: IBuilderConfig;

    public key: string;

    public defaultvalue: FieldValue;

    private isArray: boolean;

    private disabled: boolean;

    private hidden: boolean;

    @computed get label() {
        return this.bc[VAR_RECORD_DISPLAYED];
    }

    @observable value: FieldValue;

    @observable errors: TError[] = [];

    @observable private extraRules: string[] = [];

    @observable defaultValue: FieldValue;

    @computed get isRequired(): boolean {
        if (this.bc.required === "true") {
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
        return this.errors[0];
    }

    @computed get isValid(): boolean {
        return !this.error;
    }

    @computed get clearValue(): FieldValue {
        switch (true) {
            case this.bc.datatype === "checkbox":
            case this.bc.datatype === "boolean":
                return 0;
            case this.bc.datatype === "text":
                return "";
            case this.bc.datatype === "date":
                return null;
            default:
                return undefined;
        }
    }

    constructor(options: IFieldOptions) {
        this.pageStore = options.pageStore;
        this.form = options.form;
        this.bc = options.bc;
        this.output = options.output;
        this.key = options.key;
        this.isArray = options.isArray ?? false;

        if (this.bc.datatype === "checkbox" || this.bc.datatype === "boolean") {
            this.defaultValue = this.bc.defaultvalue === "true" || this.bc.defaultvalue === "1";
        } else if (this.bc.defaultvalue) {
            this.defaultValue = this.bc.defaultvalue;
        }

        this.value = this.form.initialValues[this.key];

        if (this.value === undefined && this.isArray) {
            this.value = [];
        }
    }

    private execChangeHooks = () => {
        if (this.form.hooks.onChange) {
            this.form.hooks.onChange(this.form);
        }

        if (this.form.hooks.onValueChange) {
            this.form.hooks.onValueChange(this.form, this);
        }
    };

    @action
    onChange = (value: FieldValue) => {
        this.value = value;

        if (!this.isValid) {
            this.validate();
        }

        this.execChangeHooks();
    };

    @action
    validate = () => {
        if (this.disabled || this.hidden) {
            this.errors = [];
        } else {
            const errors = this.rules.reduce<TError[]>((acc, ruleConfig) => {
                const [rule, req] = ruleConfig.split(":");

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

    @action
    setDefaultValue = (defaultValue: FieldValue) => {
        this.defaultValue = defaultValue;
    };

    /**
     * Reset value to default
     * Can be call deaultquery
     */
    @action
    reset = () => {
        if (this.defaultvalue === undefined) {
            this.clear();
        } else {
            this.onChange(this.defaultValue);
        }
    };

    /**
     * Clear value of the field to empty value
     */
    @action
    clear = () => {
        this.onChange(this.clearValue);
    };

    @action
    add = () => {
        this.onChange([...this.value, {}]);
    };

    @action
    del = (index?: string | number) => {
        if (index) {
            const newValues = [...this.value];

            newValues.splice(Number(index), 1);

            this.onChange(newValues);
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
}
