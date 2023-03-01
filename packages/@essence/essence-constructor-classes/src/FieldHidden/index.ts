import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FIeldHiddenContainer} from "./containers/FieldHiddenContainer";

setComponent("IFIELD.hidden", commonDecorator(FIeldHiddenContainer));
