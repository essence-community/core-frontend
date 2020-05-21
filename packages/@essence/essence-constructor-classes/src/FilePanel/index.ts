import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FilePanelContainer} from "./containers/FilePanelContainer";

setComponent("FILEPANEL", commonDecorator(FilePanelContainer));
