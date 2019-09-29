import * as React from "react";
import {Form, Field} from "mobx-react-form";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";

export interface IFieldProps {
    bc: IBuilderConfig;
    field: Field;
    parentKey?: string;
    editing?: boolean;
    pageStore: IPageModel;
    form: Form;
    noLabel?: boolean;
    tabIndex?: string;
    autoremove?: boolean;
    textField: React.ComponentType;
    value?: never;
    onChange?: (event: React.SyntheticEvent | null, value: undefined | never) => void;
    onClear: (event: React.SyntheticEvent | null) => void;
    onExpand?: () => void;

    // CommonDecoratorInjectType
    record?: Record<string, any>;
    disabled?: boolean;
    hidden?: boolean;
    visible: boolean;
    readOnly?: boolean;
}
