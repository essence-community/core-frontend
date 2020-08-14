import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ColumnCheckboxContainer} from "./containers/ColumnCheckboxContainer";

setComponent("COLUMN.CHECKBOX", commonDecorator(ColumnCheckboxContainer));
