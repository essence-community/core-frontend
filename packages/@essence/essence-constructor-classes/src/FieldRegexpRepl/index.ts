import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {FieldRegexpReplContainer} from "./containers/FieldRegexpReplContainer";

setComponent("IFIELD.regexprepl", commonDecorator(FieldRegexpReplContainer));
