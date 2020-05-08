import * as React from "react";
import {InputProps} from "@material-ui/core/Input";
import {StandardTextFieldProps} from "@material-ui/core";
import {IField, IForm} from "../Form";
import {IBuilderConfig} from "./Builder";
import {IPageModel} from "./PageModel";
import {IStoreBaseModel} from "./StoreBaseModel";
import {IClassProps} from "./Class";

export interface IEssenceTextFieldProps extends StandardTextFieldProps {
    tips: (JSX.Element | React.ComponentType)[];
}

export interface IFieldProps extends IClassProps {
    bc: IBuilderConfig;
    field: IField;
    parentKey?: string;
    editing?: boolean;
    pageStore: IPageModel;
    form: IForm;
    noLabel?: boolean;
    tabIndex?: number;
    autoremove?: boolean;
    textField: React.ComponentType<IEssenceTextFieldProps>;
    value?: FieldValue;
    InputProps: InputProps;
    tips: React.ComponentType[];
    onChange: (event: React.SyntheticEvent | null, value: FieldValue) => void;
    onClear: (event: React.SyntheticEvent | null) => void;
    onInitGlobal: (store: IStoreBaseModel) => void;
    onInitGetGlobal: (store: IStoreBaseModel) => void;
    onInitSetGlobal: (store: IStoreBaseModel) => void;
}

export type FieldValue = number | string | object | undefined | null | boolean;
