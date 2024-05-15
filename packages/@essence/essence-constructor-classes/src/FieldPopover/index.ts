import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldPopoverContainer} from "./containers/FieldPopoverContainer";

setComponent("IFIELD.popover", commonDecorator(FieldPopoverContainer));
