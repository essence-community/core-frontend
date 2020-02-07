// @flow
import * as React from "react";
import isArray from "lodash/isArray";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {toSize} from "@essence-community/constructor-share/utils";
import {VALUE_SELF_FIRST, VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {isEmpty} from "../../../utils/base";
import Popover from "../../../Popover/Popover";
import BuilderGrid from "../../../Grid/BuilderGrid";
import {TableFieldModel, type TableFieldModelType} from "../../../stores/TableFieldModel";
import withModelDecorator from "../../../decorators/withModelDecorator";
import {type BuilderFieldType, type TextFieldChildProps} from "../../BuilderFieldType";
import {getFirstValues} from "../../TFUtils/TFUtils";
import SearchTextField from "../Helpers/SearchTextField/SearchTextField";

type PropsStoreType = {|
    store: TableFieldModelType,
|};
type PropsType = TextFieldChildProps & PropsStoreType;

type StateType = {
    isLoading?: boolean,
};

export class FieldTableBase extends React.Component<PropsType, StateType> {
    disposers: Array<Function> = [];

    constructor(props: PropsType) {
        super(props);

        const {field, store} = this.props;

        field.store = store;
    }

    componentDidMount() {
        const {value, store} = this.props;

        if (!isEmpty(value) && !isArray(value)) {
            store.setDefaultRecordAction(value);
        }

        this.props.onInitGlobal(store);
    }

    componentDidUpdate(prevProps: PropsType) {
        const {value, store, field} = this.props;

        if (value !== prevProps.value) {
            if (isEmpty(value)) {
                store.clearAction();
            } else if (value === VALUE_SELF_FIRST) {
                field.set(getFirstValues(store.recordsStore));
            } else if (!isArray(value)) {
                store.setDefaultRecordAction(value);
            }
        }
    }

    componentWillUnmount() {
        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
        this.props.field.store = undefined;
    }

    handleClear = (event: SyntheticEvent<any>) => {
        event.stopPropagation();

        this.props.onClear(event);
        this.props.store.clearAction();
    };

    handleChangeOpen = (open: boolean) => {
        if (open) {
            this.props.store.restoreSelectedAction();
        }
    };

    renderTextField = () => {
        const {disabled, InputLabelProps, error, store, bc, errorText, field, tabIndex} = this.props;

        return (
            <SearchTextField
                errorText={errorText}
                store={store}
                InputLabelProps={InputLabelProps}
                disabled={disabled}
                error={error}
                onClick={store.openFieldAction}
                handleClear={this.handleClear}
                dataPageObject={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                bc={bc}
                field={field}
                style={this.props.style}
                tabIndex={tabIndex}
            />
        );
    };

    render() {
        const {store, bc, pageStore, hidden, visible, readOnly} = this.props;

        if (hidden) {
            return null;
        }

        const popoverContent = (
            <BuilderGrid
                bc={store.gridBc}
                onDoubleClick={store.dbSelectAction}
                pageStore={pageStore}
                readOnly={readOnly}
                elevation={0}
                visible={visible}
                fireScrollEvent={false}
            />
        );

        return (
            <Popover
                popoverContent={popoverContent}
                open={store.openField}
                onChangeOpen={this.handleChangeOpen}
                onClose={store.closeAction}
                container={pageStore.pageEl}
                width={toSize(bc.pickerwidth)}
                pageStore={pageStore}
                hideOnScroll
            >
                {this.renderTextField}
            </Popover>
        );
    }
}

export default compose(
    withModelDecorator(
        (bc: BuilderFieldType, {pageStore, form, field, onChange, onClear}: PropsType): TableFieldModelType =>
            new TableFieldModel({bc, field, fieldHandlers: {onChange, onClear}, form, pageStore}),
    ),
    observer,
)(FieldTableBase);
