import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldItemSelector} from "./containers/FieldItemSelector";

setComponent("ITEMSELECTOR", commonDecorator(FieldItemSelector));
