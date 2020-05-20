import * as React from "react";
import {reaction} from "mobx";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {TextFieldLabel, TextFieldMask} from "@essence-community/constructor-share/uicomponents";
import {ITextFieldExtendProps} from "@essence-community/constructor-share/hooks/useTextFieldProps";
import {
    getRegexFromImask,
    extendValidMask,
    getStrRegexFromImask,
    InputState,
    MaskOptions,
} from "@essence-community/constructor-share/uicomponents/TextFieldMask";
import {TextFieldProps} from "@material-ui/core";
import {FormContext} from "@essence-community/constructor-share/context";
import {IField} from "@essence-community/constructor-share/Form";
import {IRecord, IPageModel} from "@essence-community/constructor-share/types";
import {ICkeckNewMaskType} from "../../FieldText.types";
import {handleGetNewValueAndSelection} from "../../utils";

interface IFieldTextSmartMaskProps {
    textFieldProps: ITextFieldExtendProps & TextFieldProps;
    imask: string;
    field: IField;
    disabled?: boolean;
    onChange: TextFieldProps["onChange"];
    pageStore: IPageModel;
}

// eslint-disable-next-line max-lines-per-function
export const FieldTextSmartMask: React.FC<IFieldTextSmartMaskProps> = (props) => {
    const {field, pageStore} = props;
    const form = React.useContext(FormContext);
    const [imask, setImask] = React.useState("");
    const [info, setInfo] = React.useState("");
    const [sourceImask, setSourceImask] = React.useState("");

    const [valueColumnName, maskColumnName] = props.imask ? props.imask.substring(1).split(".") : ["", ""];

    const handleCkeckNewMask = React.useCallback(
        ({value, oldValue, selection, formatChars, userInput, mask}: ICkeckNewMaskType): InputState => {
            const regex = getRegexFromImask(sourceImask);
            const {newValue, newSelection} = handleGetNewValueAndSelection({
                formatChars,
                mask,
                oldValue,
                selection,
                userInput,
                value,
            });

            const {newImask, valid} = extendValidMask({
                imask: sourceImask || "",
                oldImask: mask,
                regex,
                value: newValue,
            });

            if (mask !== newImask) {
                setImask(newImask);
            }

            return {
                selection: newSelection,
                value: valid ? newValue : value,
            };
        },
        [sourceImask],
    );

    const handleBeforeMaskedValueChange = React.useCallback(
        (
            newState: InputState,
            oldState: InputState,
            userInput: string,
            maskOptions: MaskOptions,
            // eslint-disable-next-line max-params
        ): InputState => {
            const {mask: newMask = "", formatChars} = maskOptions;

            if (
                !newState.selection ||
                newMask.indexOf("R") === -1 ||
                (!userInput && newState.value !== oldState.value)
            ) {
                return newState;
            }

            return handleCkeckNewMask({
                formatChars,
                mask: newMask as string,
                oldValue: oldState.value,
                selection: newState.selection,
                userInput,
                value: newState.value,
            });
        },
        [handleCkeckNewMask],
    );

    const handleSetImask = React.useCallback(
        (indentityDoctTypeRecord: IRecord = {}) => {
            const imaskRecordValue = indentityDoctTypeRecord[maskColumnName];
            const imaskRecord = typeof imaskRecordValue === "string" ? imaskRecordValue : "";
            const imaskDesc = indentityDoctTypeRecord[`${maskColumnName}_desc`];
            const regex = getRegexFromImask(imaskRecord);

            setImask(
                imaskRecord
                    ? extendValidMask({
                          imask: imaskRecord,
                          oldImask: imaskRecord,
                          regex,
                          value: String(field.value),
                      }).newImask
                    : "",
            );
            setInfo(typeof imaskDesc === "string" ? imaskDesc : "");
            setSourceImask(imaskRecord);

            field.setExtraRules(imaskRecord ? [`regex:^${getStrRegexFromImask(imaskRecord)}$`] : []);
        },
        [field, maskColumnName],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(valueColumnName)?.value,
                () => {
                    if (form.editing) {
                        props.field.onClear();
                    }
                },
            ),
        [form, props.field, valueColumnName],
    );

    React.useEffect(
        () =>
            reaction(
                () => {
                    if (!form.select(valueColumnName)) {
                        return {};
                    }

                    const {indentityDocTypeRecordsStore} = pageStore.applicationStore.pagesStore.globalRecordsStore;
                    const recordId = form.select(valueColumnName)?.value;
                    const indentityDoctTypeRecord = indentityDocTypeRecordsStore.records.find(
                        (record) =>
                            String(record[indentityDocTypeRecordsStore.recordId || VAR_RECORD_ID]) === String(recordId),
                    );

                    return indentityDoctTypeRecord;
                },
                handleSetImask,
                {
                    equals: () => false,
                    fireImmediately: true,
                },
            ),
        [form, handleSetImask, pageStore, valueColumnName],
    );

    return imask ? (
        <TextFieldMask
            textFieldProps={{
                ...props.textFieldProps,
                label: (
                    <TextFieldLabel
                        bc={field.bc}
                        error={Boolean(!props.disabled && !field.isValid)}
                        info={info}
                        isRequired={field.isRequired}
                    />
                ),
            }}
            imask={imask}
            onChange={props.onChange}
            beforeMaskedValueChange={handleBeforeMaskedValueChange}
        />
    ) : null;
};
