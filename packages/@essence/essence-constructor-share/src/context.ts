import * as React from "react";
import {Form} from "mobx-react-form";
import {IApplicationModel, IBuilderMode, IPageModel, IRoutesModel, IPagesModel, IProjectModel, IRecord} from "./types";
import {noop} from "./utils";

export interface IEditorContext {
    form: Form;
    mode: IBuilderMode;
}

export interface IPopoverContext {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const EditorContex = React.createContext<IEditorContext | undefined>(undefined);
export const FormContext = React.createContext<Form | undefined>(undefined);
export const ModeContext = React.createContext<IBuilderMode>("1");
export const ApplicationContext = React.createContext<IApplicationModel | null>(null);
export const PageContext = React.createContext<IPageModel | undefined>(undefined);
export const RoutesContext = React.createContext<IRoutesModel | undefined>(undefined);
export const PagesContext = React.createContext<IPagesModel | undefined>(undefined);
export const PanelWidthContext = React.createContext<number | undefined>(undefined);
export const BuilderTypeContext = React.createContext("builder-type");
export const ProjectContext = React.createContext<IProjectModel | undefined>(undefined);
export const RecordContext = React.createContext<IRecord | undefined>(undefined);
export const PopoverContext = React.createContext<IPopoverContext>({
    onClose: noop,
    onOpen: noop,
    open: false,
});
