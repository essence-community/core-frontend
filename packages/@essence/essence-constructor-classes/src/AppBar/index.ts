import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {AppBar} from "./container/AppBar";

setComponent("APP_BAR", commonDecorator(AppBar));
