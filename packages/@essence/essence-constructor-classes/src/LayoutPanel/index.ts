import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {LayoutPanelContainer} from "./container/LayoutPanelContainer";

setComponent("LAYOUT_GRID_PANEL", commonDecorator(LayoutPanelContainer));
