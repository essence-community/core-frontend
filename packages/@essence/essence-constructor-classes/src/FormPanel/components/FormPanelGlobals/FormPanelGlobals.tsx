import * as React from "react";
import {findSetKey} from "@essence-community/constructor-share/utils";
import {FieldValue, IPageModel, IBuilderConfig, IRecord} from "@essence-community/constructor-share/types";
import {reaction} from "mobx";
import {FormContext} from "@essence-community/constructor-share/context";

interface IFormPanelGlobalsProps {
    bc: IBuilderConfig;
    pageStore: IPageModel;
}

export const FormPanelGlobals: React.FC<IFormPanelGlobalsProps> = React.memo(function FormPanelGlobalsMemo(props) {
    const {bc, pageStore} = props;
    const form = React.useContext(FormContext);
    const handleSetGlobal = React.useCallback(
        (values: IRecord) => {
            if (bc.setglobal) {
                const globalValues: Record<string, FieldValue> = {};
                const keys = findSetKey(bc.setglobal);

                Object.entries(keys).forEach(([fieldName, globaleKey]) => {
                    globalValues[globaleKey] = values[fieldName];
                });

                pageStore.updateGlobalValues(globalValues);
            }
        },
        [bc, pageStore],
    );

    React.useEffect(() => reaction(() => form.values, handleSetGlobal), [form, handleSetGlobal]);

    return null;
});
