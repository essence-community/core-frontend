import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldMarkdownContainer} from "./containers/FieldMarkdownContainer";

setComponent("IFIELD.markdown", commonDecorator(FieldMarkdownContainer));
