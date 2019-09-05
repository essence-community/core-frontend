// @flow
import {setComponent} from "@essence/essence-constructor-share";
import BuilderFieldPeriodSplit from "./BuilderFieldPeriodSplit";

const BuilderFieldPeriod = BuilderFieldPeriodSplit;

setComponent("IPERIOD", BuilderFieldPeriod);

export default BuilderFieldPeriod;
