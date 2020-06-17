import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {PagerViewContainer} from "./containers/PagerViewContainer";

setComponent("PAGER_VIEW", commonDecorator(PagerViewContainer));
