import {IPageModel} from "../types";

export function setMask(noglobalmask?: boolean, pageStore?: IPageModel, isLoading?: boolean) {
    if (!noglobalmask && pageStore) {
        pageStore.setLoadingAction(Boolean(isLoading));
    }
}
