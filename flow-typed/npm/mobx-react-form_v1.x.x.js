declare module "mobx-react-form" {
    declare export type ObserverChangeType = {
        newValue?: mixed,
        oldValue?: mixed,
        type: "update",
    };
    declare export type ObserverCallPropsType = {
        form: Form,
        field: Field,
        change: ObserverChangeType,
    };
    declare export type ObserverCallType = (props: ObserverCallPropsType) => void | Promise<void>;

    declare export type FormProps = {
        struct?: Object,
        fields?: Array<Object>,
    }

    declare type FormPlugins = {

    }

    declare export class Form {
        size: number,
        submitting: boolean,
        validating: boolean,
        hasErrors: boolean,
        isValid: boolean,
        isDirty: boolean,
        isPristine: boolean,
        isDefault: boolean,
        isEmpty: boolean,
        disabled: boolean,
        autoFocus: boolean,
        focused: boolean,
        touched: boolean,
        changed: boolean,
        error: string,
        +fields: Map<string, Field>,
        constructor(props: FormProps, options?: FormPlugins): void,
        $(path: string): Field,

        // Base Methods
        init(obj: Object): void,
        clear(): void,
        reset(): void,
        validate(path?: string): Promise<any>,
        invalidate(msg: string): void,
        showErrors(bool: boolean): void,

        // Shared Methods
        update(obj: Object): void,
        select(path: string, fields?: ?Map<string, Field>, isStrict?: boolean): ?Field,
        submit(obj: Object): void,
        check(computed: string, deep?: boolean): boolean,
        get(prop?: mixed): Object,
        set(val: mixed): void,
        set(obj: Object): void,
        set(prop: string, val: mixed): void,
        set(prop: string, obj: Object): void,
        has(key: string): boolean,
        map<R>(callback: (value: Field, index: number) => R): Array<R>,
        each(callback: Function): void,
        add(obj: mixed): Object,
        del(key: mixed): void,
        observe(obj: Object): void,
        intercept(obj: Object): void,
        hasNestedFields(): boolean,
        hasIncrementalKeys(): boolean,

        // Helpers
        values(): Object,
        errors(): Object,
        labels(): Object,
        placeholders(): Object,
        defaults(): Object,
        initials(): Object,
        types(): Object,

        onSubmit(e: SyntheticEvent<>): any,

        // Private
        execHook(name: string): any,
    }

    declare export class Field {
        submitting: boolean,
        validating: boolean,
        bindings: string,
        observers: Object,
        interceptors: Object,
        size: number,
        path: string,
        key: string,
        name: string,
        type: string,
        label: string,
        placeholder: string,
        default: boolean,
        disabled: boolean,
        value: mixed,
        focused: boolean,
        touched: boolean,
        changed: boolean,
        related: boolean,
        rules: Array<string>,
        validators: boolean,
        validateWith: string,
        isValid: boolean,
        isDirty: boolean,
        isPristine: boolean,
        isDefault: boolean,
        isEmpty: boolean,
        hasError: boolean,
        error: string,
        options: Object,
        extra: mixed,
        files: string,
        hasNestedFields: boolean,
        hasIncrementalKeys: boolean,
        +fields: Map<string, Field>,

        store: any,
        bc: Object,

        // Base Methods
        bind(): void,
        clear(): void,
        reset(): void,
        focus(): void,
        validate({showErrors: boolean}): void,
        invalidate(msg: string): void,
        resetValidation(): void,
        showErrors(bool: boolean): void,

        // Shared Methods
        update(obj: Object): void,
        select(path: string, fields?: ?Map<string, Field>, isStrict?: boolean): ?Field,
        container(): Object,
        submit(obj: Object): void,
        check(computed: string, deep?: boolean): boolean,
        get(): Object,
        get(prop: mixed): Object,
        set(val: mixed): void,
        set(obj: Object): void,
        set(prop: string, val: mixed): void,
        set(prop: string, obj: Object): void,
        has(key: string): boolean,
        map<R>(callback: (value: Field, index: number) => R): Array<R>,
        each(callback: Function): void,
        add(obj: mixed): Object,
        del(key: mixed): void,
        on(event: string, callback: Function): Function,
        observe(obj: {path: string, key: string, call: ObserverCallType}): Function,
        observe(call: ObserverCallType): Function,
        intercept(obj: Object): void,

        // Event Handlers
        sync(e: SyntheticEvent<>): any,
        onChange(e: SyntheticEvent<>): any,
        onToggle(e: SyntheticEvent<>): any,
        onFocus(e: SyntheticEvent<>): any,
        onBlur(e: SyntheticEvent<>): any,
        onSubmit(e: SyntheticEvent<>): any,
        onClear(e: SyntheticEvent<>): any,
        onReset(e: SyntheticEvent<>): any,
        onAdd(e: SyntheticEvent<>): any,
        onDel(e: SyntheticEvent<>): any,
    }

    declare export default typeof Form;
}
