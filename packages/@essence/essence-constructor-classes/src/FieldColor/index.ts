import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldColorContainer} from "./containers/FieldColorContainer";

setComponent("IFIELD.color", commonDecorator(FieldColorContainer));
