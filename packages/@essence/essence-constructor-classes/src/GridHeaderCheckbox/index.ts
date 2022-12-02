import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {GridHeaderCheckboxContainer} from "./containers/GridHeaderCheckboxContainer";

setComponent("GRID_HEADER.CHECKBOX", commonDecorator(GridHeaderCheckboxContainer));
