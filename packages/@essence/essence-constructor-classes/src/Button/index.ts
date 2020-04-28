import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ButtonContainer} from "./containers/ButtonContainer";

setComponent("BTN", commonDecorator(ButtonContainer));
