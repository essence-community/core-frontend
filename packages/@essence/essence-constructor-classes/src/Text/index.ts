import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {TextContainer} from "./containers/TextContainer";

setComponent("TEXT", commonDecorator(TextContainer));
