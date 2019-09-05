import {IPageModel} from "../types";

export function setMask(noglobalmask?: string, pageStore?: IPageModel, isLoading?: boolean) {
    if (noglobalmask !== "true" && pageStore) {
        pageStore.setLoadingAction(isLoading);
    }
}
