import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {PanelContainer} from "./containers/PanelContainer";
import {Panel} from "./components/Panel/Panel";
import { PanelForm } from "./components/PanelForm/PanelForm";

setComponent("PANEL", commonDecorator(PanelContainer));
setComponent("PANEL.BOX", Panel);
setComponent("PANEL.PANELFORM", PanelForm);
