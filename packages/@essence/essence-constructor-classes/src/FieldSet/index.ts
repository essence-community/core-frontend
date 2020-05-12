import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldSetContainer} from "./containers/FieldSetContainer";

setComponent("FIELDSET", commonDecorator(FieldSetContainer));
