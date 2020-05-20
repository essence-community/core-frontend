import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {setComponent} from "@essence-community/constructor-share/components";
import {FieldImageContainer} from "./containers/FieldImageContainer";

setComponent("IFIELD.image", commonDecorator(FieldImageContainer));
