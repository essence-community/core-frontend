import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FormPanelContainer} from "./containers/FormPanelContainer";

setComponent("FORMPANEL", commonDecorator(FormPanelContainer));
setComponent("FORMPANEL.NOCOMMONDECORATOR", FormPanelContainer);
