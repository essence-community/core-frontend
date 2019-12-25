// @flow
import {Form} from "mobx-react-form";
import dvr from "mobx-react-form/lib/validators/DVR";
import validatorjs from "validatorjs";

type MobxFormPropsType = {
    values?: {},
    fields: Array<Object>,
    hooks?: Object,
};

validatorjs.useLang("ru");

export class MobxForm extends Form {
    constructor({fields, hooks}: MobxFormPropsType) {
        super(
            {fields},
            {hooks, options: {validateOnChange: true, validateOnInit: false}, plugins: {dvr: dvr(validatorjs)}},
        );
    }

    bindings() {
        return {
            MaterialTextField: ({$try, field, props}: any) => ({
                autoComplete: $try(props.autoComplete, "off"),
                autoFocus: $try(props.autoFocus, field.autoFocus),
                disabled: $try(props.disabled, field.disabled),
                error: field.hasError,
                fullWidth: $try(props.fullWidth, true),
                id: $try(props.id, field.id),
                label: $try(props.label, field.label),
                margin: $try(props.margin, "dense"),
                name: $try(props.name, field.name),
                onBlur: $try(props.onBlur, field.onBlur),
                onChange: $try(props.onChange, field.onChange),
                onFocus: $try(props.onFocus, field.onFocus),
                placeholder: $try(props.placeholder, field.placeholder),
                required: field.rules ? field.rules.indexOf("required") >= 0 : false,
                title: $try(props.title, field.error),
                type: $try(props.type, field.type),
                value: $try(props.value, field.value),
            }),
        };
    }
}
