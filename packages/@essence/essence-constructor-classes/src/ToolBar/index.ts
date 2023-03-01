import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ToolBar} from "./container/ToolBar";

setComponent("TOOL_BAR", commonDecorator(ToolBar));
