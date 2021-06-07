import {setComponent} from "@essence-community/constructor-share/components";
import {GuiEditorClassesContainer} from "./containers/GuiEditorClassesContainer";
import {GuiEditorContainer} from "./containers/GuiEditorContainer";
// import {GuiEditorContentContainer} from "./containers/GuiEditorContentContainer";
// import {GuiEditorElementContainer} from "./containers/GuiEditorElementContainer";
import {GuiEditorNavigationContainer} from "./containers/GuiEditorNavigationContainer";
// import {GuiEditorPropertyContainer} from "./containers/GuiEditorPropertyContainer";

setComponent("GUI_EDITOR", GuiEditorContainer);
// setComponent("GUI_EDITOR_ELEMENT", GuiEditorElementContainer);
// setComponent("GUI_EDITOR_CONTENT", GuiEditorContentContainer);
setComponent("GUI_EDITOR_NAVIGATION", GuiEditorNavigationContainer);
// setComponent("GUI_EDITOR_PROPERTY", GuiEditorPropertyContainer);
setComponent("GUI_EDITOR_CLASSES", GuiEditorClassesContainer);
