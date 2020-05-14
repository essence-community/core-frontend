import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {GridContainer} from "./containers/GridContainer";
import {GridInlineContainer} from "./containers/GridInlineContainer";
import {GridSettingsContainer} from "./containers/GridSettingsContainer";

setComponent("GRID", commonDecorator(GridContainer));
setComponent("TREEGRID", commonDecorator(GridContainer));
setComponent("INLINE_WINDOW", GridInlineContainer);
setComponent("GRID_SETTINGS", GridSettingsContainer);
