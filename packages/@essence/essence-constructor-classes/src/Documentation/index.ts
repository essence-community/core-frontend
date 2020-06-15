import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {setComponent} from "@essence-community/constructor-share/components";
import {DocumentationContainer} from "./containers/DocumentationContainer";

setComponent("DOCUMENTATION", commonDecorator(DocumentationContainer));
