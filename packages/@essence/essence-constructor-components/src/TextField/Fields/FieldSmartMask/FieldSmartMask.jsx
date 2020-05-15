// @flow
import * as React from "react";
import {reaction} from "mobx";
import {observer} from "mobx-react";
import {VAR_RECORD_ID} from "@essence-community/constructor-share/constants";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents/TextFieldLabel";
import {
    extendValidMask,
    getRegexFromImask,
    getStrRegexFromImask,
} from "@essence-community/constructor-share/uicomponents/TextFieldMask";
import {isEqualStr} from "../../../utils/base";
import {type TextFieldChildProps} from "../../BuilderFieldType";

type PropsType = TextFieldChildProps;
type StateType = {
    identityId?: number,
    imask?: string,
    info?: string,
    sourceImask?: string,
};
type CkeckNewMaskType = {
    formatChars: Object,
    mask: string,
    selection: {
        start: number,
    },
    userInput: ?string,
    value: string,
    oldValue: string,
};

type GetNewValueAndSelectionType = CkeckNewMaskType;

type ProcessFormat = {
    selection: {
        start: number,
    },
    userInput: string,
    value: string,
};

const FieldMask = () => null;

class FieldSmartMask extends React.Component<PropsType, StateType> {
    state = {
        imask: "",
        info: "",
        sourceImask: "",
    };

    valueColumnName: string;

    maskColumnName: string;

    disposers: Array<Function> = [];

    constructor(props: PropsType) {
        super(props);

        const {imask} = props;
        const [valueColumnName, maskColumnName] = imask ? imask.substring(1).split(".") : ["", ""];

        this.valueColumnName = valueColumnName;
        this.maskColumnName = maskColumnName;
    }

    componentDidMount() {
        const {pageStore, form} = this.props;
        const {indentityDocTypeRecordsStore} = pageStore.applicationStore.pagesStore.globalRecordsStore;

        this.disposers.push(
            reaction(
                () => (form.has(this.valueColumnName) ? form.$(this.valueColumnName).value : ""),
                this.handleResetField,
            ),
            reaction(
                () => {
                    if (!form.has(this.valueColumnName)) {
                        return {};
                    }

                    const recordId = form.$(this.valueColumnName).value;
                    const indentityDoctTypeRecord = indentityDocTypeRecordsStore.records.find((record) =>
                        isEqualStr(record[indentityDocTypeRecordsStore.recordId || VAR_RECORD_ID], recordId),
                    );

                    return indentityDoctTypeRecord;
                },
                this.handleSetImask,
                {
                    equals: () => false,
                    fireImmediately: true,
                },
            ),
        );
    }

    componentWillUnmount() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    }

    handleResetField = () => {
        const {editing, onClear} = this.props;

        if (editing) {
            onClear();
        }
    };

    handleSetImask = (indentityDoctTypeRecord: Object = {}) => {
        const {field} = this.props;
        const imask = indentityDoctTypeRecord[this.maskColumnName];
        const imaskDesc = indentityDoctTypeRecord[`${this.maskColumnName}_desc`];
        const identityId = indentityDoctTypeRecord[indentityDoctTypeRecord.recordId || VAR_RECORD_ID];
        const regex = getRegexFromImask(imask || "");

        this.setState({
            identityId,
            imask: imask
                ? extendValidMask({
                      imask,
                      oldImask: imask,
                      regex,
                      value: String(field.value),
                  }).newImask
                : undefined,
            info: imaskDesc,
            sourceImask: imask,
        });

        field.setExtraRules(imask ? [`regex:^${getStrRegexFromImask(imask)}$`] : []);
    };

    handleCkeckNewMask = ({value, oldValue, selection, formatChars, userInput, mask}: CkeckNewMaskType) => {
        const {sourceImask = ""} = this.state;
        const selectedIndex = selection.start - 1;
        const regex = getRegexFromImask(sourceImask);
        const {newValue, newSelection} = this.handleGetNewValueAndSelection({
            formatChars,
            mask,
            oldValue,
            selectedIndex,
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
            this.setState({
                imask: newImask,
            });
        }

        return {
            selection: newSelection,
            value: valid ? newValue : value,
        };
    };

    handleProcessRFormat = ({value, selection, userInput}: ProcessFormat) => {
        const newSelection = {...selection};

        if (value.slice(0, selection.start).indexOf("-") !== -1) {
            const newValue = `${value.slice(0, selection.start - 1)}${userInput.toUpperCase()}${value.slice(
                selection.start - 1,
            )}`;

            return {newSelection, newValue};
        }

        const newValue = `${value.slice(0, selection.start)}${userInput.toUpperCase()}${value.slice(selection.start)}`;

        newSelection.start += 1;

        return {newSelection, newValue};
    };

    handleProcessBFormat = ({value, selection, userInput}: ProcessFormat) => {
        const newValue = `${value.slice(0, selection.start)}${userInput.toUpperCase()}${value.slice(selection.start)}`;
        const newSelection = {...selection};

        newSelection.start += 1;

        return {newSelection, newValue};
    };

    handleGetNewValueAndSelection = ({
        value,
        oldValue,
        selection,
        formatChars,
        userInput,
    }: GetNewValueAndSelectionType) => {
        if (userInput && userInput !== userInput.toUpperCase()) {
            if (new RegExp(`^${formatChars.R}$`, "u").test(userInput.toUpperCase())) {
                return this.handleProcessRFormat({selection, userInput, value});
            }

            if (new RegExp(`^${formatChars.Б}$`, "u").test(userInput.toUpperCase())) {
                return this.handleProcessBFormat({selection, userInput, value});
            }
        }

        return {
            newSelection: selection,
            newValue:
                userInput && new RegExp(`^${formatChars.R}$`, "u").test(userInput) && value === oldValue
                    ? `${value.slice(0, selection.start - 1)}${userInput}${value.slice(selection.start - 1)}`
                    : value,
        };
    };

    // eslint-disable-next-line max-params
    handleBeforeMaskedValueChange = (newState: Object, oldState: Object, userInput: ?string, maskOptions: Object) => {
        const {mask = "", formatChars} = maskOptions;

        if (!newState.selection || mask.indexOf("R") === -1 || (!userInput && newState.value !== oldState.value)) {
            return newState;
        }

        return this.handleCkeckNewMask({
            formatChars,
            mask,
            oldValue: oldState.value,
            selection: newState.selection,
            userInput,
            value: newState.value,
        });
    };

    render() {
        const {bc, error, field} = this.props;

        return this.state.imask ? (
            <FieldMask
                {...this.props}
                beforeMaskedValueChange={this.handleBeforeMaskedValueChange}
                imask={this.state.imask}
                maskChar={null}
                label={
                    <TextFieldLabel
                        bc={bc}
                        error={error}
                        info={this.state.info}
                        isRequired={field.rules && field.rules.indexOf("required") >= 0}
                    />
                }
            />
        ) : null;
    }
}

export default observer(FieldSmartMask);
