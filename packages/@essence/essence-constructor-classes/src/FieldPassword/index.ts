import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldPasswordContainer} from "./containers/FIeldPasswordContainer";

setComponent("IFIELD.password", commonDecorator(FieldPasswordContainer));
