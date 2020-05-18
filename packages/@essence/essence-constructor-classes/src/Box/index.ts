import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {BoxContainer} from "./containers/BoxContainer";

setComponent("BOX", commonDecorator(BoxContainer));
setComponent("BOX.NOCOMMONDECORATOR", BoxContainer);
