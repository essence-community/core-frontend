// @flow
import {type StoreBaseModelInterface, type StoreBaseModelPropsType} from "../StoreBaseModel";

export interface AuditModelInterface extends StoreBaseModelInterface {
    +auditInfo: Object;
    constructor(props: StoreBaseModelPropsType): void;
    loadAuditInfoAction: (selectedRecord: ?Object) => void;
}

export type AuditModelType = AuditModelInterface;
