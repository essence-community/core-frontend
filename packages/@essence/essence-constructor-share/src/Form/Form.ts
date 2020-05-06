import {action, computed, observable, ObservableMap} from "mobx";
import {IRecord} from "../types";
import {IBuilderMode} from "../types/Builder";
import {Field} from "./Field";
import {IField, IFormProps, IForm, IFormHooks, IRegisterFieldOptions} from "./types";

export class Form implements IForm {
    public initialValues: IRecord = {};

    public hooks: IFormHooks;

    public mode: IBuilderMode;

    constructor(props: IFormProps) {
        this.hooks = props.hooks;
        this.initialValues = props.values;
        this.mode = props.mode || "1";
    }

    @observable public fields: ObservableMap<string, IField> = observable.map();

    @observable public submitting = false;

    @computed get values(): IRecord {
        const values: IRecord = {};

        for (const [key, field] of this.fields.entries()) {
            if (field.output) {
                values[key] = field.output(field);
            } else {
                values[key] = field.value;
            }
        }

        return values;
    }

    @computed get isValid(): boolean {
        for (const field of this.fields.values()) {
            if (field.isValid === false) {
                return false;
            }
        }

        return true;
    }

    @action
    registerField = (key: string, options: IRegisterFieldOptions): IField => {
        let field = this.fields.get(key);

        if (!field) {
            field = new Field({
                bc: options.bc,
                form: this,
                key,
                output: options.output,
                pageStore: options.pageStore,
            });

            this.fields.set(key, field);
        }

        return field;
    };

    @action
    unregisterField = (key: string) => {
        if (this.fields.has(key)) {
            this.fields.delete(key);

            delete this.values[key];
        }
    };

    @action
    validate = async () => {
        await Promise.all(Object.values(this.fields).map((field) => field.validate));

        return undefined;
    };

    @action
    onSubmit = async () => {
        await this.validate();
        await this.submit();
    };

    @action
    update = (initialValues: IRecord = {}, isReset = false) => {
        for (const [key, field] of this.fields.entries()) {
            if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
                field.value = initialValues[key];
            } else if (isReset) {
                field.reset();
            } else {
                field.clear();
            }
        }
    };

    submit = async () => {
        this.submitting = true;

        if (this.hooks.onSuccess) {
            await this.hooks.onSuccess(this);
        }

        this.submitting = false;
    };

    select = (key: string) => {
        return this.fields.get(key);
    };

    // Alias to select
    $ = this.select;

    has = (key: string) => {
        return this.fields.has(key);
    };

    onFilterRedirect = async () => {
        if (this.hooks.onFilterRedirect) {
            await this.hooks.onFilterRedirect(this);
        }
    };
}
