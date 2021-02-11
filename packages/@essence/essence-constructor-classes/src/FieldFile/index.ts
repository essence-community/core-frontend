import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldFileContainer} from "./containers/FieldFileContainer";

setComponent("IFIELD.file", commonDecorator(FieldFileContainer));
