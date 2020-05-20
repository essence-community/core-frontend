import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldGroupContainer} from "./containers/FieldGroupContainer";

setComponent("IFIELD.group", commonDecorator(FieldGroupContainer));
