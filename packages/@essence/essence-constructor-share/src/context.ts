import * as React from "react";
import {IApplicationModel, IBuilderMode, IPageModel, IRoutesModel, IPagesModel, IProjectModel, IRecord} from "./types";
import {noop} from "./utils";
import {IForm, Form, IParentFieldContext} from "./Form";

export interface IPopoverContext {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export interface IWindowContext {
    onClose: () => void;
    onQuestionClose: () => void;
}

export interface IResizeEventContext {
    once(event: "resize", callback: () => void, context?: any): void;
    on(event: "resize", callback: () => void, context?: any): void;
    removeListener(event: "resize", callback: () => void, context?: any): void;
    emit(event: "resize"): void;
}

export const ParentFieldContext = React.createContext<IParentFieldContext | undefined>(undefined);
export const FormContext = React.createContext<IForm>(
    new Form({editing: true, hooks: {}, placement: "default", values: {}}),
);
export const ModeContext = React.createContext<IBuilderMode>("1");
export const ApplicationContext = React.createContext<IApplicationModel | null>(null);
export const PageContext = React.createContext<IPageModel | undefined>(undefined);
export const RoutesContext = React.createContext<IRoutesModel | undefined>(undefined);
export const PagesContext = React.createContext<IPagesModel | undefined>(undefined);
export const PanelWidthContext = React.createContext<number | undefined>(undefined);
export const ProjectContext = React.createContext<IProjectModel | undefined>(undefined);
export const RecordContext = React.createContext<IRecord | undefined>(undefined);
export const ResizeContext = React.createContext<IResizeEventContext>({
    on: noop,
    once: noop,
    removeListener: noop,
});
export const PopoverContext = React.createContext<IPopoverContext>({
    onClose: noop,
    onOpen: noop,
    open: false,
});
export const WindowContext = React.createContext<IWindowContext>({
    onClose: noop,
    onQuestionClose: noop,
});
