import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {IframeContainer} from "./containers/IframeContainer";

setComponent("IFRAME", commonDecorator(IframeContainer));
