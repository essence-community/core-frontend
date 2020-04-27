import {isString} from "lodash";
// eslint-disable-next-line import/named
import {autorun, IReactionDisposer} from "mobx";
import * as React from "react";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {IClassProps} from "../types/Class";
import {RowRecord} from "../types/StoreBaseModel";
import {isEmpty} from "../utils/base";
import {parseMemoize} from "../utils/parser";

export interface ICommonHOCProps extends IClassProps {
    record?: RowRecord;
}

export interface ICommonHOCState {
    disabled: boolean;
    hidden: boolean;
    readOnly?: boolean;
}

const HIDDEN_CLASS_TYPES = [
    "GRID",
    "TREEGRID",
    "PANEL",
    "FILEPANEL",
    "HISTORYPANEL",
    "TABPANEL",
    "SERVICE_HIDDEN",
    "BTN",
    "BTNCOLLECTOR",
    "AUDIT_INFO",
];

// eslint-disable-next-line max-lines-per-function
export function commonDecorator<Props extends ICommonHOCProps>(
    WrappedComponent: React.ComponentType<Props>,
): React.ComponentType<Props> {
    class CommonHOC extends React.Component<Props, ICommonHOCState> {
        public state: ICommonHOCState = {
            disabled: this.props.bc.disabled === "true",
            hidden: this.props.bc.hidden === "true",
            readOnly: isEmpty(this.props.bc.readonly) ? undefined : this.props.bc.readonly === "true",
        };

        private disposers: IReactionDisposer[] = [];

        private unmounted = false;

        public componentDidMount() {
            const {bc} = this.props;
            const {reqsel, disabledrules, hiddenrules, readonlyrules, disabledemptymaster} = bc;

            if ((reqsel === "true" && bc[VAR_RECORD_MASTER_ID]) || disabledrules || disabledemptymaster === "true") {
                this.disposers.push(autorun(this.handleDisabled));
            }

            if (hiddenrules) {
                this.disposers.push(autorun(this.handleHidden));
            }

            if (readonlyrules) {
                this.disposers.push(autorun(this.handleReadOnly));
            }
        }

        public componentDidUpdate(prevProps: ICommonHOCProps) {
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

        public componentWillUnmount() {
            this.disposers.forEach((dispose) => dispose());
            this.disposers = [];

            this.unmounted = true;
        }

        public render() {
            const {disabled, visible, bc} = this.props;
            const hidden = this.props.hidden || this.state.hidden;

            if (hidden && bc.type && HIDDEN_CLASS_TYPES.indexOf(bc.type) !== -1) {
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

        private getValue = (name: string) => {
            const {record, pageStore} = this.props;

            return record && name.charAt(0) !== "g" ? record[name] : pageStore.globalValues.get(name);
        };

        private handleDisabled = () => {
            const disabled = this.isDisabled();

            if (!this.unmounted) {
                this.setState((prevState) => {
                    if (prevState.disabled !== disabled && typeof disabled === "boolean") {
                        return {disabled} as any;
                    }

                    return {};
                });
            }
        };

        private handleHidden = () => {
            const hidden = this.isHidden();

            if (!this.unmounted) {
                this.setState((prevState) => {
                    if (prevState.hidden !== hidden && typeof hidden === "boolean") {
                        return {hidden} as any;
                    }

                    return {};
                });
            }
        };

        private handleReadOnly = () => {
            const readOnly = this.isReadOnly();

            if (!this.unmounted) {
                this.setState((prevState: ICommonHOCState) => {
                    if (prevState.readOnly !== readOnly && typeof readOnly === "boolean") {
                        return {readOnly};
                    }

                    return {};
                });
            }
        };

        // eslint-disable-next-line max-statements, complexity
        private isDisabled() {
            const {pageStore, disabled, bc} = this.props;
            const {reqsel, disabledrules, disabledemptymaster, type} = bc;
            const masterId = bc[VAR_RECORD_MASTER_ID];

            if (disabledrules) {
                return Boolean(parseMemoize(disabledrules).runer({get: this.getValue}));
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
                                // @ts-ignore
                                masterStore.selectedRecord[masterStore.recordId].indexOf("auto-") === 0)
                        );
                    }

                    if (masterStore.recordsStore) {
                        return (
                            !masterStore.recordsStore.selectedRecord ||
                            (isString(masterStore.recordsStore.selectedRecord[masterStore.recordsStore.recordId]) &&
                                // @ts-ignore
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

            return Boolean(disabled);
        }

        private isHidden() {
            const {hidden} = this.props;
            const {hiddenrules} = this.props.bc;

            if (hiddenrules) {
                return parseMemoize(hiddenrules).runer({get: this.getValue});
            }

            return hidden;
        }

        private isReadOnly() {
            const {readOnly} = this.props;
            const {readonlyrules} = this.props.bc;

            if (!readOnly && readonlyrules) {
                return parseMemoize(readonlyrules).runer({get: this.getValue});
            }

            return readOnly;
        }

        private getReadOnly = () => {
            const {readOnly} = this.props;

            if (this.state.readOnly === undefined) {
                return this.props.readOnly;
            }

            return readOnly || this.state.readOnly;
        };
    }

    return CommonHOC;
}
