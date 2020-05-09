import * as React from "react";
import {IApplicationModel, IBuilderMode, IPageModel, IRoutesModel, IPagesModel, IProjectModel, IRecord} from "./types";
import {noop} from "./utils";
import {IForm, Form, IParentFieldContext} from "./Form";

export interface IPopoverContext {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const ParentFieldContext = React.createContext<IParentFieldContext | undefined>(undefined);
export const FormContext = React.createContext<IForm>(new Form({hooks: {}, values: {}}));
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
