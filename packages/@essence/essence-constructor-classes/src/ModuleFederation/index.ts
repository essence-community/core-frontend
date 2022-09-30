import {setComponent} from "@essence-community/constructor-share";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ModuleFederationContainer} from "./containers/ModuleFederationContainer";

setComponent("MODULE_FEDERATION", commonDecorator(ModuleFederationContainer));
