import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ButtonDynamic} from "./container/ButtonDynamic";

setComponent("BTN_DYNAMIC", commonDecorator(ButtonDynamic));
