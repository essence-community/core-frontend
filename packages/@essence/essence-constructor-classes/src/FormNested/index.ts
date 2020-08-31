import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FormNestedContainer} from "./containers/FormNestedContainer";

setComponent("FORM_NESTED", commonDecorator(FormNestedContainer));
