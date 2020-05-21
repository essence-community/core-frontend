import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldCheckboxContainer} from "./containers/FieldCheckboxContainer";

setComponent("IFIELD.checkbox", commonDecorator(FieldCheckboxContainer));
setComponent("IFIELD.boolean", commonDecorator(FieldCheckboxContainer));
