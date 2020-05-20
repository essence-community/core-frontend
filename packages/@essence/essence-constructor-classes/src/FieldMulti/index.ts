import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share";
import {FieldMultiContainer} from "./containers/FieldMultiContainer";

setComponent("CUSTOM.addr", commonDecorator(FieldMultiContainer));
setComponent("CUSTOM.mo", commonDecorator(FieldMultiContainer));
