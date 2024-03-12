import * as React from "react";
import {IPageModel} from "../../types";
import {deepFind} from "../../utils";
import {ParentFieldContext, FormContext, RecordContext} from "../../context";

interface IDisabledProps {
    pageStore: IPageModel;
}

export function useGetValue(props: IDisabledProps) {
    const {pageStore} = props;
    const recordContext = React.useContext(RecordContext);
    const formContext = React.useContext(FormContext);
    const parentFieldContext = React.useContext(ParentFieldContext);

    const getValue = React.useCallback(
        (name: string) => {
            if (typeof name === "string" && name.charAt(0) === "g") {
                return pageStore.globalValues.get(name);
            }

            if (recordContext) {
                const [isExistRecord, recValue] = deepFind(recordContext, name);

                if (isExistRecord) {
                    return recValue;
                }
            }

            if (formContext) {
                const values = formContext.values;

                if (parentFieldContext) {
                    const [isExistParent, val] = deepFind(values, `${parentFieldContext.key}.${name}`);

                    if (isExistParent) {
                        return val;
                    }
                }

                const [isExist, val] = deepFind(values, name);

                if (isExist) {
                    return val;
                }
            }

            return undefined;
        },
        [formContext, pageStore.globalValues, parentFieldContext, recordContext],
    );

    return getValue;
}
