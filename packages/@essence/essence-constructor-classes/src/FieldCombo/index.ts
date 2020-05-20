import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldComboContainer} from "./containers/FieldComboContainer";

setComponent("IFIELD.combo", commonDecorator(FieldComboContainer));
