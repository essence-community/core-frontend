import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share";
import {TabPanelContainer} from "./containers/TabPanelContainer";

setComponent("TABPANEL", commonDecorator(TabPanelContainer));
