import {setComponent, commonDecorator} from "@essence-community/constructor-share";
import {FieldTextContainer} from "./containers/FieldTextContainer";

setComponent("IFIELD.text", commonDecorator(FieldTextContainer));
