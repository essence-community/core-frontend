import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldDateContainer} from "./containers/FieldDateContainer";

setComponent("IFIELD.date", commonDecorator(FieldDateContainer));
