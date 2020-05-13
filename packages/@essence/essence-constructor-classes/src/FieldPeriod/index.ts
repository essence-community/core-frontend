import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldPeriodContainer} from "./containers/FieldPeriod";

setComponent("IPERIOD", commonDecorator(FieldPeriodContainer));
