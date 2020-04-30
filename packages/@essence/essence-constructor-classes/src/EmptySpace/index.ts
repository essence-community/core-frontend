import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {EmptySpace} from "./container/EmptySpace";

setComponent("EMPTY_SPACE", commonDecorator(EmptySpace));
