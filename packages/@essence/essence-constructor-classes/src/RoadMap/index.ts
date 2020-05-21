import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {RoadMapContainer} from "./containers/RoadMapContainer";

setComponent("ROADMAPPANEL", commonDecorator(RoadMapContainer));
