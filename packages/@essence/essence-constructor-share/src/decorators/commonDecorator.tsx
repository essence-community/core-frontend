// eslint-disable-next-line import/named
import {autorun, IReactionDisposer} from "mobx";
import * as React from "react";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {IClassProps} from "../types/Class";
import {isEmpty} from "../utils/base";
import {parseMemoize} from "../utils/parser";
import {IRecord} from "../types";
import {RecordContext} from "../context";
import {isDisabled} from "../hooks/useCommon/isDisabled";

export interface ICommonHOCState {
    disabled: boolean;
    hidden: boolean;
    readOnly?: boolean;
}

// eslint-disable-next-line max-lines-per-function
export function commonDecorator<Props extends IClassProps>(
    WrappedComponent: React.ComponentType<Props>,
): React.ComponentType<Props> {
    class CommonHOC extends React.Component<Props, ICommonHOCState> {
        static contextType = RecordContext;

        public state: ICommonHOCState = {
            disabled: this.props.bc.disabled === "true",
            hidden: this.props.bc.hidden === "true",
            readOnly: isEmpty(this.props.bc.readonly) ? undefined : this.props.bc.readonly === "true",
        };

        private disposers: IReactionDisposer[] = [];

        private unmounted = false;

        private prevContext: IRecord;

        public componentDidMount() {
            const {bc} = this.props;
            const {reqsel, disabledrules, hiddenrules, readonlyrules, disabledemptymaster} = bc;

            this.prevContext = this.context;

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

        public componentDidUpdate() {
            if (this.prevContext !== this.context) {
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

                this.prevContext = this.context;
            }
        }

        public componentWillUnmount() {
            this.disposers.forEach((dispose) => dispose());
            this.disposers = [];

            this.unmounted = true;
        }

        public render() {
            const {disabled, visible} = this.props;
            const hidden = this.props.hidden || this.state.hidden;

            if (hidden) {
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
            const record = this.context;
            const {pageStore} = this.props;

            return record && name.charAt(0) !== "g" ? record[name] : pageStore.globalValues.get(name);
        };

        private handleDisabled = () => {
            const disabled = isDisabled({
                bc: this.props.bc,
                getValue: this.getValue,
                pageStore: this.props.pageStore,
            });

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
