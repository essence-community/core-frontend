import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {PanelContainer} from "./containers/PanelContainer";
import {Panel} from "./components/Panel/Panel";

setComponent("PANEL", commonDecorator(PanelContainer));
setComponent("PANEL.BOX", Panel);
