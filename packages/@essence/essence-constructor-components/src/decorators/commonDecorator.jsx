// @flow
import * as React from "react";
import {autorun} from "mobx";
import isString from "lodash/isString";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {VAR_RECORD_MASTER_ID} from "@essence/essence-constructor-share/constants";
import {type PageModelType} from "../stores/PageModel";
import {isEmpty} from "../utils/base";

export type CommonDecoratorInjectType = {
    record?: Object,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
};

// Bc: BuilderFieldType | GridColumnLinkType,
type CommonHOCProps = {
    bc: Object,
    record?: Object,
    pageStore: PageModelType,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
};

type CommonHOCState = {
    disabled: boolean,
    hidden: boolean,
    readOnly?: boolean,
};

type InjectProps = {
    hidden?: boolean | void,
    disabled?: boolean | void,
    readOnly?: boolean | void,
};

const HIDDEN_CLASS_TYPES = ["GRID", "TREEGRID", "PANEL", "FILEPANEL", "HISTORYPANEL", "TABPANEL"];

// eslint-disable-next-line max-lines-per-function
function commonDecorator<Props: CommonHOCProps>(
    WrappedComponent: React.ComponentType<Props>,
): React.ComponentType<$Diff<Props, InjectProps>> {
    class CommonHOC extends React.Component<Props, CommonHOCState> {
        static defaultProps = {
            bc: {},
        };

        state = {
            disabled: this.props.bc.disabled === "true",
            hidden: this.props.bc.hidden === "true",
            readOnly: isEmpty(this.props.bc.readonly) ? undefined : this.props.bc.readonly === "true",
        };

        disposers: Array<Function> = [];

        unmounted = false;

        componentDidMount() {
            const {bc} = this.props;
            const {reqsel, disabledrules, hiddenrules, readonlyrules, disabledemptymaster} = bc;

            if ((reqsel === "true" && bc[VAR_RECORD_MASTER_ID]) || disabledrules || disabledemptymaster === "true") {
                this.disposers.push(autorun(this.handleDisabled, {fireImmediately: true}));
            }

            if (hiddenrules) {
                this.disposers.push(autorun(this.handleHidden, {fireImmediately: true}));
            }

            if (readonlyrules) {
                this.disposers.push(autorun(this.handleReadOnly, {fireImmediately: true}));
            }
        }

        componentDidUpdate(prevProps) {
            if (prevProps.record !== this.props.record) {
                const {reqsel, disabledrules, hiddenrules, readonlyrules, disabledemptymaster} = this.props.bc;

                if (
                    (reqsel === "true" && this.props.bc[VAR_RECORD_MASTER_ID]) ||
                    disabledrules ||
                    disabledemptymaster === "true"
                ) {
                    this.handleDisabled();
                }

                if (hiddenrules) {
                    this.handleHidden();
                }

                if (readonlyrules) {
                    this.handleReadOnly();
                }
            }
        }

        componentWillUnmount() {
            this.disposers.forEach((dispose) => dispose());
            this.disposers = [];

            this.unmounted = true;
        }

        getValue = (name: string) => {
            const {record, pageStore} = this.props;

            return record && name.charAt(0) !== "g" ? record[name] : pageStore.globalValues.get(name);
        };

        handleDisabled = () => {
            const disabled = this.isDisabled();

            if (!this.unmounted) {
                this.setState((prevState) => {
                    if (prevState.disabled !== disabled && typeof disabled === "boolean") {
                        return {disabled};
                    }

                    return {};
                });
            }
        };

        handleHidden = () => {
            const hidden = this.isHidden();

            if (!this.unmounted) {
                this.setState((prevState) => {
                    if (prevState.hidden !== hidden && typeof hidden === "boolean") {
                        return {hidden};
                    }

                    return {};
                });
            }
        };

        handleReadOnly = () => {
            const readOnly = this.isReadOnly();

            if (!this.unmounted) {
                this.setState((prevState) => {
                    if (prevState.readOnly !== readOnly && typeof readOnly === "boolean") {
                        return {readOnly};
                    }

                    return {};
                });
            }
        };

        // eslint-disable-next-line max-statements, complexity, max-lines-per-function
        isDisabled() {
            const {pageStore, disabled} = this.props;
            const {reqsel, disabledrules, disabledemptymaster, type} = this.props.bc;
            const masterId = this.props.bc[VAR_RECORD_MASTER_ID];

            if (disabledrules) {
                return parseMemoize(disabledrules).runer({get: this.getValue});
            }

            if (reqsel === "true" && masterId) {
                const masterStore = pageStore.stores.get(masterId);

                if (masterStore) {
                    if (masterStore.bc && masterStore.bc.collectionvalues === "array" && type === "IFIELD") {
                        return masterStore.selectedEntries && masterStore.selectedEntries.length === 0;
                    }

                    if (typeof masterStore.selectedRecord !== "undefined") {
                        return (
                            !masterStore.selectedRecord ||
                            (isString(masterStore.selectedRecord[masterStore.recordId]) &&
                                masterStore.selectedRecord[masterStore.recordId].indexOf("auto-") === 0)
                        );
                    }

                    if (masterStore.recordsStore) {
                        return (
                            !masterStore.recordsStore.selectedRecord ||
                            (isString(masterStore.recordsStore.selectedRecord[masterStore.recordsStore.recordId]) &&
                                masterStore.recordsStore.selectedRecord[masterStore.recordsStore.recordId].indexOf(
                                    "auto-",
                                ) === 0)
                        );
                    }
                }
            }

            if (disabledemptymaster === "true" && masterId) {
                const masterStore = pageStore.stores.get(masterId);

                if (masterStore && masterStore.recordsStore) {
                    return masterStore.recordsStore.records.length === 0;
                }
            }

            return disabled;
        }

        isHidden() {
            const {hidden} = this.props;
            const {hiddenrules} = this.props.bc;

            if (hiddenrules) {
                return parseMemoize(hiddenrules).runer({get: this.getValue});
            }

            return hidden;
        }

        isReadOnly() {
            const {readOnly} = this.props;
            const {readonlyrules} = this.props.bc;

            if (!readOnly && readonlyrules) {
                return parseMemoize(readonlyrules).runer({get: this.getValue});
            }

            return readOnly;
        }

        getReadOnly = () => {
            const {readOnly} = this.props;

            if (this.state.readOnly === undefined) {
                return this.props.readOnly;
            }

            return readOnly || this.state.readOnly;
        };

        render() {
            const {disabled, visible, bc} = this.props;
            const hidden = this.props.hidden || this.state.hidden;

            if (hidden && HIDDEN_CLASS_TYPES.indexOf(bc.type) !== -1) {
                return null;
            }

            return (
                <WrappedComponent
                    {...this.props}
                    disabled={disabled || this.state.disabled}
                    hidden={hidden}
                    visible={hidden || visible}
                    readOnly={this.getReadOnly()}
                />
            );
        }
    }

    return CommonHOC;
}

export default commonDecorator;
