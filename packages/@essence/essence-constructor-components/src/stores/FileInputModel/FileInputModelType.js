// @flow
import type {StoreBaseModelType} from "../StoreBaseModel";
import type {PageModelType} from "../PageModel";
import type {ButtonConfigType} from "../ButtonModel";

export type FileInputConstructorType = {
    bc: ButtonConfigType,
    pageStore: PageModelType,
};
export type FileInputChooseAwaitType = (files: File[]) => any;
export type FileInputCallBackType = (files: File[]) => any;
export interface FileInputModelInterface extends StoreBaseModelType {
    +fileTypes: Array<string>;
    +fileChooseAwait: ?FileInputChooseAwaitType;
    +initFileChooseAwait: (callBack: FileInputCallBackType) => any;
}
export type FileInputModelType = FileInputModelInterface;
