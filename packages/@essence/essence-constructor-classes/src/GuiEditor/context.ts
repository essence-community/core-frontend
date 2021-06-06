import {createContext} from "react";
import {GuiEditorModel} from "./stores/GuiEditorModel";

export const GuiEditorContext = createContext<GuiEditorModel>(undefined);
