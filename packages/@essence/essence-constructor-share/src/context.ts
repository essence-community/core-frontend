import * as React from "react";
import {IApplicationModel} from "./types";

export const FormContext = React.createContext(undefined);
export const ApplicationContext = React.createContext<IApplicationModel | undefined>(undefined);
export const PageContext = React.createContext(undefined);
export const RoutesContext = React.createContext(undefined);
export const PagesContext = React.createContext(undefined);
