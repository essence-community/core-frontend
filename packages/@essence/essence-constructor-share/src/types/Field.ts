import * as React from "react";
import {Form, Field} from "mobx-react-form";
import {InputProps} from "@material-ui/core/Input";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";
import {IStoreBaseModel} from "./StoreBaseModel";
import {IClassProps} from "./Class";

export interface IFieldProps extends IClassProps {
    bc: IBuilderConfig;
    field: Field;
    parentKey?: string;
    editing?: boolean;
    pageStore: IPageModel;
    form: Form;
    noLabel?: boolean;
    tabIndex?: number;
    autoremove?: boolean;
    textField: React.ComponentType;
    value?: FieldValue;
    InputProps: InputProps;
    tips: React.ComponentType[];
    onChange: (event: React.SyntheticEvent | null, value: FieldValue) => void;
    onClear: (event: React.SyntheticEvent | null) => void;
    onInitGlobal: (store: IStoreBaseModel) => void;
    onInitGetGlobal: (store: IStoreBaseModel) => void;
    onInitSetGlobal: (store: IStoreBaseModel) => void;
}

export type FieldValue = number | string | object;
