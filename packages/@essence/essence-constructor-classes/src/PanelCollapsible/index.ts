import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {PanelCollapsible} from "./containers/PanelCollapsible";

setComponent("PANELCOLLAPSED", commonDecorator(PanelCollapsible));
setComponent("PANELCOLLAPSED.NOCOMMONDECORATOR", PanelCollapsible);
