import {createContext} from "react";
import {GuiEditorContentModel} from "./stores/GuiEditorContentModel";
import {GuiEditorModel} from "./stores/GuiEditorModel";

export const GuiEditorContext = createContext<GuiEditorModel>(undefined);
export const GuiEditorContentContext = createContext<GuiEditorContentModel>(undefined);
