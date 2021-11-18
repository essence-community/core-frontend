import * as React from "react";
import {FieldValue, IPageModel, IRecord} from "@essence-community/constructor-share/types";
import {reaction} from "mobx";
import {FormContext} from "@essence-community/constructor-share/context";
import {deepFind} from "@essence-community/constructor-share/utils";
import {IBuilderClassConfig} from "../../types";

interface IFormPanelGlobalsProps {
    bc: IBuilderClassConfig;
    pageStore: IPageModel;
}

export const FormPanelGlobals: React.FC<IFormPanelGlobalsProps> = React.memo(function FormPanelGlobalsMemo(props) {
    const {bc, pageStore} = props;
    const form = React.useContext(FormContext);
    const handleSetGlobal = React.useCallback(
        (values: IRecord) => {
            if (bc.setglobal && bc.setglobal.length) {
                const globalValues: Record<string, FieldValue> = {};

                bc.setglobal.forEach(({in: keyIn, out}) => {
                    const [isExist, res] = deepFind(values, keyIn);

                    globalValues[out] = isExist ? res : values[keyIn || bc.idproperty || out];
                });

                pageStore.updateGlobalValues(globalValues);
            }
        },
        [bc, pageStore],
    );

    React.useEffect(() => reaction(() => form.values, handleSetGlobal), [form, handleSetGlobal]);

    return null;
});
