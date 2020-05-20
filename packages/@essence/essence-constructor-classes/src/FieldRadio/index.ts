import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share";
import {FieldRadioContainer} from "./containers/FieldRadioContainer";

setComponent("IFIELD.radio", commonDecorator(FieldRadioContainer));
