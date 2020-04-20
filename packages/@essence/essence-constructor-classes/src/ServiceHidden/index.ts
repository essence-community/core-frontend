import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {ServiceHiddenContainer} from "./containers/ServiceHiddenContainer";

setComponent("SERVICE_HIDDEN", commonDecorator(ServiceHiddenContainer));
