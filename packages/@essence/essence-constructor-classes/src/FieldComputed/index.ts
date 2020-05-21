import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldComputedContainer} from "./containers/FieldComputedContainer";

setComponent("IFIELD.computed", commonDecorator(FieldComputedContainer));
