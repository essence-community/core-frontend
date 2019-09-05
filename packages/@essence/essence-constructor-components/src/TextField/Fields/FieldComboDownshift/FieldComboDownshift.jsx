/* eslint max-lines: ["error", 500]*/
// @flow
import * as React from "react";
import {compose} from "recompose";
import debounce from "lodash/debounce";
import toString from "lodash/toString";
import {reaction, when} from "mobx";
import {observer} from "mobx-react";
import Downshift from "downshift";
import Trigger from "rc-trigger";
import placements from "rc-calendar/lib/picker/placements";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import {camelCaseMemoized} from "@essence/essence-constructor-share/utils";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {isEmpty, isEqualStr} from "../../../utils/base";
import {ComboFieldModel} from "../../../stores/ComboFieldModel";
import {type RecordsStateType} from "../../../stores/RecordsModel";
import withModelDecorator from "../../../decorators/withModelDecorator";
import {type BuilderFieldType} from "../../BuilderFieldType";
import {getFirstValues} from "../../TFUtils/TFUtils";
import {FieldComboDownshiftStylesDark} from "./FieldComboDownshiftStyles/FieldComboDownshiftStylesDark";
import {type DownshiftContentType, type OwnPropsType, type PropsType, type StateType} from "./FieldComboDownshiftType";
import FieldComboDownshiftContent from "./FieldComboDownshiftContent";
import FieldComboDownshiftInput from "./FieldComboDownshiftInput";

const styles = FieldComboDownshiftStylesDark;

const SECOND = 1000;
const POPUP_ALIGN = {
    offset: [0, 0],
    points: ["tl", "bl"],
};

export class FieldComboDownshift extends React.Component<PropsType, StateType> {
    haneleRemoteLoadDebounce: (inputValue: string) => void;

    hideTrigger: boolean;

    input: ?HTMLInputElement;

    constructor(...args: Array<any>) {
        super(...args);

        const {bc, field, store} = this.props;
        const minChars = isEmpty(bc.minchars) ? 1 : parseInt(bc.minchars, 10);

        this.hideTrigger = bc.querymode === "remote" && !isEmpty(bc.pagesize) && minChars > 0;
        this.haneleRemoteLoadDebounce = debounce(
            this.handleRemoteLoad,
            parseInt(this.props.bc.querydelay, 10) * SECOND,
        );

        field.store = store;
    }

    disposers = [];

    componentDidMount() {
        const {store, value, onInitGlobal} = this.props;

        onInitGlobal(this.props.store);
        this.setReacions();

        store.changeValueAction(value);
    }

    componentDidUpdate(prevProps: PropsType) {
        const {value} = this.props;

        if (value !== prevProps.value) {
            this.handleReactValue(value);
        }
    }

    componentWillUnmount() {
        this.disposers.map((disposer) => disposer());
        this.disposers = [];
        this.props.field.store = undefined;
    }

    setReacions() {
        const {bc, field, store, pageStore} = this.props;

        if (bc.querymode === "remote") {
            if (bc.allownew !== "true") {
                this.disposers.push(
                    reaction(() => field.get("value"), this.handleRemoteLoadValue, {
                        fireImmediately: true,
                    }),
                );
            }

            this.disposers.push(reaction(() => store.displayText, this.haneleRemoteLoadDebounce));
        } else if (bc.autoload !== "true" && isEmpty(bc.ckMaster)) {
            this.disposers.push(reaction(() => field.get("value") || store.displayText, this.handleReactAutoloadValue));
        }

        this.disposers.push(reaction(() => store.recordsStore.recordsState, this.handleRecrodsStateChange));

        if (bc.getgloballist) {
            this.disposers.push(
                reaction(
                    () => pageStore.globalValues.get(camelCaseMemoized(bc.getgloballist)),
                    (records) => {
                        if (Array.isArray(records)) {
                            // $FlowFixMe
                            store.recordsStore.setRecordsAction(records);
                        }
                    },
                    {fireImmediately: true},
                ),
            );
        }
    }

    handleReactValue = (value: mixed) => {
        const {store, bc, field} = this.props;

        if (isEmpty(value)) {
            store.clearStoreAction();
            store.changeValueAction(value);
        } else if (value === "first" && bc.defaultvalue === "first") {
            field.set(getFirstValues(store.recordsStore));
        } else {
            store.changeValueAction(value);

            if (
                store.recordsStore.setSelectionAction(String(value), store.valuefield) === -1 &&
                bc.selfclean === "true"
            ) {
                store.recordsStore.clearRecordsAction();
            }
        }
    };

    /**
     * Вызов подгрузки данных если данные пришли или существует ручной ввод данных
     *
     * @param {string} text Значение поля или ввода
     * @param {Object} reactionInst класс reaction для остановки
     *
     * @returns {undefined}
     */
    handleReactAutoloadValue = (text: mixed, reactionInst: Object) => {
        const {store} = this.props;

        if (!isEmpty(text)) {
            reactionInst.dispose();
            store.recordsStore.loadRecordsAction().then(() => {
                const {value} = this.props;

                if (!isEmpty(value)) {
                    store.changeValueAction(value);
                }
            });
        }
    };

    clearNestedField = (value: string) => {
        const {bc, store} = this.props;

        if (bc.clearfield && value !== store.displayText) {
            bc.clearfield.split(",").forEach((fieldName) => {
                this.props.form.$(camelCaseMemoized(fieldName)).clear();
            });
        }
    };

    setInputRef = (element: ?HTMLInputElement) => {
        this.input = element;
    };

    handleRemoteLoadValue = (newValue: mixed): void => {
        if (isEmpty(newValue)) {
            return undefined;
        }

        const {
            bc: {valuefield, column},
            store,
        } = this.props;
        const record = store.suggestions.find((suggestion) => isEqualStr(suggestion.value, newValue));
        const {searchValues: oldSearchValues} = store.recordsStore;

        if (record) {
            store.changeValueAction(String(newValue));
        } else {
            store.recordsStore.searchAction({[valuefield || column || ""]: newValue}).then(() => {
                store.changeValueAction(String(newValue), true);
                store.recordsStore.searchAction(oldSearchValues, {noLoad: true});
            });
        }

        return undefined;
    };

    handleRecrodsStateChange = (recordsState: RecordsStateType<Object>) => {
        const {store, value, field} = this.props;

        /*
         * Если значение измненилось
         * 1. при defaultvalue = first
         */
        if ((recordsState.defaultValueSet && isEmpty(value)) || value === "first") {
            when(
                (): boolean => Boolean(store.recordsStore.selectedRecord),
                (): void => {
                    const {selectedRecord} = store.recordsStore;

                    if (selectedRecord && selectedRecord[store.valuefield]) {
                        field.set(selectedRecord[store.valuefield]);
                        store.changeValueAction(selectedRecord[store.valuefield]);
                    }
                },
            );
        } else if (recordsState.status === "autoload" && !isEmpty(value)) {
            store.changeValueAction(String(value));
        }
    };

    handleRemoteLoad = (inputValue: string) => {
        const {
            bc: {autoload, queryparam, minchars},
            store,
        } = this.props;
        const valueLength = parseInt(minchars, 10);
        const displaySelect = store.selectedRecord && store.selectedRecord[store.displayfield];
        const lastSearchValue = store.recordsStore.searchValues[queryparam];

        if (
            queryparam &&
            toString(inputValue).length >= valueLength &&
            !isEqualStr(lastSearchValue, inputValue) &&
            !isEqualStr(displaySelect, inputValue)
        ) {
            store.recordsStore.searchAction({[queryparam]: inputValue});
        } else if (toString(inputValue).length < valueLength && autoload !== "true") {
            store.recordsStore.clearRecordsAction();
            store.recordsStore.setSearchValuesAction({});
        }
    };

    handleStateChange = (changes: Object) => {
        if (changes.isOpen === false && this.input) {
            this.input.focus();
        }

        if (typeof changes.isOpen !== "undefined") {
            this.props.store.setAllowFilterAction(false);
        }

        if (changes.isOpen) {
            this.props.store.reloadStoreByOpen();
        }
    };

    handleChange = (selectedItem: string) => {
        const {store} = this.props;

        if (this.props.field.value === selectedItem) {
            store.changeValueAction(selectedItem);
        }

        this.props.onChange(null, selectedItem);
        this.clearNestedField(selectedItem);

        this.handleReloadField(selectedItem);
    };

    handleReloadField = (selectedItem?: string | number) => {
        const {pageStore, bc} = this.props;

        if (selectedItem && bc.reloadfield) {
            const childFieldStore = pageStore.stores.get(bc.reloadfield);

            if (childFieldStore) {
                childFieldStore.recordsStore.loadRecordsAction();
            }
        }
    };

    /**
     * Востанавливает значение после потери фокуса, если не было выбрано значение
     *
     * @returns {void}
     */
    handleBlur = () => {
        const {
            bc: {allownew},
            value,
            store,
        } = this.props;

        if (allownew !== "true") {
            store.changeValueAction(String(value));
        }
    };

    handlFocusInput = () => {
        if (this.input) {
            this.input.focus();
        }
    };

    getStringItem = (item: string) => this.props.store.displayText || item || "";

    renderInputButton = ({clearSelection, toggleMenu, selectedItem, isOpen}: DownshiftContentType) => {
        const {classes = {}, bc, store} = this.props;
        const {
            suggestions,
            recordsStore: {isLoading},
        } = store;

        const chevron = isOpen ? (
            <IconButton
                color="secondary"
                onClick={toggleMenu}
                disableRipple
                tabIndex={-1}
                className={classes.iconRoot}
                data-page-object={`${bc.ckPageObject}-chevron-up`}
                onFocus={this.handlFocusInput}
            >
                <Icon iconfont="chevron-up" />
            </IconButton>
        ) : (
            <IconButton
                color="secondary"
                onClick={suggestions.length > 0 || isLoading ? toggleMenu : undefined}
                disableRipple
                tabIndex={-1}
                className={classes.iconRoot}
                data-page-object={`${bc.ckPageObject}-chevron-down`}
                onFocus={this.handlFocusInput}
            >
                <Icon iconfont="chevron-down" />
            </IconButton>
        );

        return (
            <div className={classes.secondaryActionFrame}>
                {selectedItem && bc.clearable !== "false" ? (
                    <IconButton
                        color="secondary"
                        onClick={clearSelection}
                        disableRipple
                        tabIndex={-1}
                        className={`${classes.clearSelection} ${classes.iconRoot}`}
                        data-page-object={`${bc.ckPageObject}-clear`}
                    >
                        <Icon iconfont="times" />
                    </IconButton>
                ) : null}
                {this.hideTrigger ? null : chevron}
            </div>
        );
    };

    renderDownshiftContent = (downshiftProps: DownshiftContentType) => {
        const {getInputProps, inputValue, toggleMenu, isOpen, selectItem, setHighlightedIndex} = downshiftProps;
        const {errorText, InputProps, disabled, classes = {}, store, bc, field, pageStore} = this.props;
        const {
            suggestions,
            recordsStore: {isLoading},
        } = store;

        const content = (
            <div className={classes.contentRoot}>
                {disabled ? null : this.renderInputButton(downshiftProps)}
                <FieldComboDownshiftInput
                    error={this.props.error}
                    onBlur={this.handleBlur}
                    getInputProps={getInputProps}
                    InputProps={InputProps}
                    disabled={disabled}
                    InputLabelProps={this.props.InputLabelProps}
                    inputValue={inputValue}
                    errorText={errorText}
                    fullWidth={this.props.fullWidth}
                    fieldId={this.props.field.id}
                    toggleMenu={toggleMenu}
                    store={store}
                    bc={bc}
                    field={field}
                    inputRef={this.setInputRef}
                    selectItem={selectItem}
                    tabIndex={this.props.tabIndex}
                    style={this.props.style}
                    setHighlightedIndex={setHighlightedIndex}
                    onChange={this.handleChange}
                />
            </div>
        );

        return (
            <div className={classes.downshiftContent} data-page-object={bc.ckPageObject}>
                <Trigger
                    popup={
                        <FieldComboDownshiftContent
                            {...downshiftProps}
                            bc={bc}
                            classes={classes}
                            store={store}
                            field={field}
                            pageStore={pageStore}
                            noPure={{}}
                        />
                    }
                    popupAlign={POPUP_ALIGN}
                    stretch="width"
                    destroyPopupOnHide
                    mask={false}
                    builtinPlacements={placements}
                    popupPlacement="bottomLeft"
                    prefixCls="rc-field-combo-downshift"
                    popupVisible={isOpen && (suggestions.length > 0 || isLoading)}
                >
                    {content}
                </Trigger>
            </div>
        );
    };

    render() {
        const {store, hidden, field} = this.props;
        // TODO нужно что бы работал mobx
        // eslint-disable-next-line no-unused-vars
        const {isLoading} = store.recordsStore;
        // eslint-disable-next-line no-unused-vars
        const {suggestions} = store;

        if (hidden) {
            return null;
        }

        return (
            <Downshift onChange={this.handleChange} selectedItem={field.value} onStateChange={this.handleStateChange}>
                {this.renderDownshiftContent}
            </Downshift>
        );
    }
}

export default compose(
    withStyles(styles),
    withModelDecorator(
        (bc: BuilderFieldType, {field, pageStore}: OwnPropsType) => new ComboFieldModel({bc, field, pageStore}),
    ),
    observer,
)(FieldComboDownshift);
