import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ButtonCollectorContainer} from "./containers/ButtonCollectorContainer";

setComponent("BTNCOLLECTOR", commonDecorator(ButtonCollectorContainer));
