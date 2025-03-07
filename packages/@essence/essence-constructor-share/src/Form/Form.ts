/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
import {action, computed, makeObservable, observable, ObservableMap} from "mobx";
import merge from "lodash/merge";
import {IRecord, IBuilderMode, IBuilderConfig} from "../types";
import {cloneDeepElementary, entriesMapSort} from "../utils/transform";
import {loggerRoot} from "../constants";
import {IPageModel} from "../types/PageModel";
import {FieldValue} from "../types/Base";
import {VAR_RECORD_ID, VAR_RECORD_JL_EDITING} from "../constants/variables";
import {Field} from "./Field";
import {IField, IFormProps, IForm, IFormHooks, IRegisterFieldOptions} from "./types";

const loggerForm = loggerRoot.extend("share.form");

export class Form implements IForm {
    @observable public initialValues: IRecord = {};

    public hooks: IFormHooks;

    public mode: IBuilderMode;

    /**
     * Detect where the form use
     * Can be: filter, panel, window, etc
     */
    public placement: string;

    public bc?: IBuilderConfig;
    public pageStore?: IPageModel;

    constructor(props: IFormProps) {
        this.hooks = props.hooks;
        this.initialValues = props.values;
        this.valueKey = this.initialValues?.[this.bc?.idproperty ? this.bc.idproperty : VAR_RECORD_ID];
        this.mode = props.mode || "1";
        this.placement = props.placement;
        this.editing = props.editing;
        this.bc = props.bc;
        this.pageStore = props.pageStore;
        makeObservable(this);
    }

    @observable public fields: ObservableMap<string, IField> = observable.map();
    @observable public fieldsFile: ObservableMap<string, IField> = observable.map();

    @observable public extraValue: IRecord = {};

    @observable public submitting = false;

    @observable public isDirty = false;

    /**
     * Status of the editing form
     * Filter, Window - always editing
     * Panel, History - when click on edit or add or ... button
     */
    @observable public editing: boolean;

    @observable public validationCount = 0;

    @observable public valueKey: FieldValue;

    @computed get values(): IRecord {
        const extraValue = cloneDeepElementary(this.extraValue);
        const values: IRecord = merge(cloneDeepElementary(this.initialValues), extraValue);
        const keysAndFields = [] as {keys: string[]; field: IField}[];

        for (const [key, field] of this.fields.entries()) {
            if (key.indexOf(".") === -1) {
                const value = field.output(field, this, field.value);

                values[key] = value;
                if (typeof value === "object") {
                    if (field.isArray) {
                        const lastExtraValue = extraValue[key] || [];

                        if (Array.isArray(lastExtraValue)) {
                            values[key] = merge(lastExtraValue || [], cloneDeepElementary(value));
                        } else {
                            values[key] = value.map((val, index) =>
                                merge(extraValue[index] || {}, cloneDeepElementary(val)),
                            );
                        }
                    } else if (field.isObject) {
                        values[key] = merge(extraValue[key] || {}, cloneDeepElementary(value));
                    }
                }
            } else {
                keysAndFields.push({field, keys: key.split(".")});
            }
        }
        keysAndFields.sort(({keys: a, field: fieldA}, {keys: b, field: fieldB}) => {
            const res = a.length - b.length;

            return res === 0 ? fieldA.key.localeCompare(fieldB.key) : res;
        });
        for (const {keys, field} of keysAndFields) {
            const last = keys.pop() as string;
            const val = keys.reduce((res, key) => {
                if (!res[key]) {
                    res[key] = {};
                }

                return res[key] as any;
            }, values);

            val[last] = field.output(field, this, field.value);
            if (typeof val[last] === "object") {
                const isArray = Array.isArray(val[last]);
                const extra = keys.reduce((res, key) => {
                    if (!res[key]) {
                        res[key] = {};
                    }

                    return res[key] as any;
                }, extraValue);
                const lastExtra = extra[last];

                if (isArray && lastExtra && !Array.isArray(lastExtra) && typeof lastExtra === "object") {
                    val[last] = merge(Object.values(lastExtra), cloneDeepElementary(val[last]));
                } else if (lastExtra) {
                    val[last] = merge(lastExtra, cloneDeepElementary(val[last]));
                }
            }
        }

        values[VAR_RECORD_JL_EDITING] = this.editing;

        return cloneDeepElementary(values);
    }
    @computed get valuesFile(): FormData {
        const formData = new FormData();

        for (const [key, field] of this.fieldsFile.entries()) {
            const val = field.output(field, this) as File[];

            if (Array.isArray(val)) {
                for (const file of val) {
                    formData.append(key, file, file.name);
                }
            }
        }

        return formData;
    }
    @computed get isExistFile(): boolean {
        return this.fieldsFile.size > 0;
    }

    @computed get isExistRequired(): boolean {
        for (const field of this.fields.values()) {
            if (field.isRequired) {
                return true;
            }
        }

        for (const field of this.fieldsFile.values()) {
            if (field.isRequired) {
                return true;
            }
        }

        return false;
    }

    @computed get isValid(): boolean {
        for (const field of this.fields.values()) {
            if (field.isValid === false) {
                return false;
            }
        }

        for (const field of this.fieldsFile.values()) {
            if (field.isValid === false) {
                return false;
            }
        }

        return true;
    }

    @action
    registerField = (key: string, options: IRegisterFieldOptions): IField => {
        const keyStore = options.isFile ? "fieldsFile" : "fields";
        let field = this[keyStore].get(key);

        if (!field) {
            field = new Field({
                bc: options.bc,
                clearValue: options.clearValue,
                defaultCopyValueFn: options.defaultCopyValueFn,
                defaultValueFn: options.defaultValueFn,
                form: this,
                input: options.input,
                isArray: options.isArray,
                isFile: options.isFile,
                isObject: options.isObject,
                key,
                output: options.output,
                pageStore: options.pageStore,
                parentFieldKey: options.parentFieldKey,
                parentPrefix: options.parentPrefix,
            });

            this[keyStore].set(key, field);
            this[keyStore] = new ObservableMap(
                entriesMapSort(this[keyStore], ([keyOld], [keyNew]) => {
                    const res = keyOld.length - keyNew.length;

                    return res === 0 ? keyOld.localeCompare(keyNew) : res;
                }),
            );
        }

        field.registers += 1;

        return field;
    };

    @action
    unregisterField = (key: string): void => {
        const field = this.fields.get(key) || this.fieldsFile.get(key);

        if (field) {
            field.registers -= 1;

            if (field.registers <= 0) {
                this[field.isFile ? "fieldsFile" : "fields"].delete(key);
                field.clearExtra();
            }
        }
    };

    @action
    validate = async (): Promise<void> => {
        const fields = [...this.fields.values(), ...this.fieldsFile.values()];

        await Promise.all(fields.map((field) => field.validate()));

        if (this.isValid) {
            this.validationCount += 1;
        }

        return undefined;
    };

    @action
    onSubmit = async (event?: React.SyntheticEvent): Promise<void> => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        await this.validate();

        if (this.isValid) {
            await this.submit();
        } else {
            if (this.hooks.onError) {
                this.hooks.onError(this);
            }
        }
    };

    @action
    update = (initialValues: IRecord = {}, isReset = false): void => {
        this.initialValues = initialValues;
        this.valueKey = initialValues[this.bc?.idproperty ? this.bc.idproperty : VAR_RECORD_ID];

        for (const [, field] of this.fields) {
            const [isExists, value] = field.input(initialValues, field, this);

            if (isExists) {
                field.setValue(value);
            } else if (isReset) {
                field.reset();
            } else {
                field.clear();
            }
        }

        this.setIsDirty(false);
    };

    updateMode = (mode: IBuilderMode): void => {
        this.mode = mode;
    };

    @action
    patch = (values: IRecord, isExtra = false, isReset = false): void => {
        if (isExtra) {
            this.extraValue = isReset
                ? cloneDeepElementary(values)
                : merge(cloneDeepElementary(this.extraValue), cloneDeepElementary(values));
        }
        Object.keys(values)
            .sort((a, b) => {
                const res = a.length - b.length;

                return res === 0 ? a.localeCompare(b) : res;
            })
            .forEach((key) => {
                const field = this.fields.get(key);

                if (field && (!isExtra || !field.isArray)) {
                    const [isExists, value] = field.input(values, field, this);

                    if (isExists) {
                        field.value = value;
                    } else {
                        field.clear();
                    }
                } else {
                    loggerForm(`Can not update field ${key}. Field should be added from class`);
                }
            });

        this.setIsDirty(false);
    };

    @action
    clear = (): void => {
        this.extraValue = {};
        for (const field of this.fields.values()) {
            field.clear();
        }
        for (const field of this.fieldsFile.values()) {
            field.clear();
        }

        this.setIsDirty(false);
    };

    @action
    reset = (): void => {
        this.extraValue = {};
        for (const field of this.fields.values()) {
            field.reset();
        }
        for (const field of this.fieldsFile.values()) {
            field.reset();
        }

        this.setIsDirty(false);
    };

    @action
    resetValidation = (): void => {
        for (const field of this.fields.values()) {
            field.resetValidation();
        }
        for (const field of this.fieldsFile.values()) {
            field.resetValidation();
        }
    };

    @action
    setEditing = (editing: boolean): void => {
        this.editing = editing;
        this.resetValidation();
    };

    @action
    setIsDirty = (isDirty: boolean): void => {
        this.isDirty = isDirty;
    };

    submit = async () => {
        this.submitting = true;

        if (this.hooks.onSuccess) {
            await this.hooks.onSuccess(this);
        }

        this.setIsDirty(false);

        this.submitting = false;
    };

    select = (key: string): IField | null => {
        return this.fields.get(key);
    };

    // Alias to select
    $ = this.select;

    has = (key: string): boolean => {
        return this.fields.has(key);
    };

    onFilterRedirect = async (): Promise<void> => {
        if (this.hooks.onFilterRedirect) {
            await this.hooks.onFilterRedirect(this);
        }
    };
}
