import {setComponent} from "@essence/essence-constructor-share/components";
import {commonDecorator} from "@essence/essence-constructor-share/decorators";
import {IframeContainer} from "./containers/IframeContainer";

setComponent("IFRAME", commonDecorator(IframeContainer));
