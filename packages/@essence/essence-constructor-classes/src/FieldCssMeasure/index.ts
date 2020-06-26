import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {setComponent} from "@essence-community/constructor-share/components";
import {FieldCssMeasureContainer} from "./containers/FieldCssMeasureContainer";

setComponent("IFIELD.cssmeasure", commonDecorator(FieldCssMeasureContainer));
