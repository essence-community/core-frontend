import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldRepeaterContainer} from "./containers/FieldRepeaterContainer";
// import {FieldRepeaterEditorContainer} from "./containers/FieldRepeaterEditorContainer";

setComponent("IFIELD.repeater", commonDecorator(FieldRepeaterContainer));
// setComponent("IFIELD.EDITOR.repeater", commonDecorator(FieldRepeaterEditorContainer));
