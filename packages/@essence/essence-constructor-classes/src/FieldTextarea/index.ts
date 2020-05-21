import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldTextareaContainer} from "./containers/FieldTextareaContainer";

setComponent("IFIELD.textarea", commonDecorator(FieldTextareaContainer));
