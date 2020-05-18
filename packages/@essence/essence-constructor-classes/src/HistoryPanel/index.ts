import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {HistoryPanelContainer} from "./container/HistoryPanelContainer";

setComponent("HISTORYPANEL", commonDecorator(HistoryPanelContainer));
