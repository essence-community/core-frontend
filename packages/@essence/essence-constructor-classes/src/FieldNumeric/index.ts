import {setComponent, commonDecorator} from "@essence-community/constructor-share";
import {FieldNumericContainer} from "./containers/FieldNumericContainer";

setComponent("IFIELD.integer", commonDecorator(FieldNumericContainer));
setComponent("IFIELD.numeric", commonDecorator(FieldNumericContainer));
