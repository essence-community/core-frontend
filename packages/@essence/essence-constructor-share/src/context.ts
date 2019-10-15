import * as React from "react";
import {Form} from "mobx-react-form";
import {IApplicationModel, IBuilderMode, IPageModel, IRoutesModel, IPagesModel} from "./types";

export interface IEditorContext {
    form: Form;
    mode: IBuilderMode;
}

export const EditorContex = React.createContext<IEditorContext | undefined>(undefined);
export const FormContext = React.createContext<Form | undefined>(undefined);
export const ModeContext = React.createContext<IBuilderMode>("1");
export const ApplicationContext = React.createContext<IApplicationModel | undefined>(undefined);
export const PageContext = React.createContext<IPageModel | undefined>(undefined);
export const RoutesContext = React.createContext<IRoutesModel | undefined>(undefined);
export const PagesContext = React.createContext<IPagesModel | undefined>(undefined);
