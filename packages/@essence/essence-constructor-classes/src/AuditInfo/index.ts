import {setComponent} from "@essence-community/constructor-share/components";
import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {AuditInfoContainer} from "./containers/AuditInfoContainer";

setComponent("AUDIT_INFO", commonDecorator(AuditInfoContainer));
