import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {PanelDynamicContainer} from "./containers/PanelDynamicContainer";

setComponent("DYNAMICPANEL", commonDecorator(PanelDynamicContainer));
