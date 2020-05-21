import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldTableContainer} from "./containers/FieldTableContainer";

setComponent("IFIELD.grid", commonDecorator(FieldTableContainer));
setComponent("IFIELD.tree", commonDecorator(FieldTableContainer));
