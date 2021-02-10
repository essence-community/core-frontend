import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldInputContainer} from "./containers/FieldInputContainer";

setComponent("IFIELD.input", commonDecorator(FieldInputContainer));
