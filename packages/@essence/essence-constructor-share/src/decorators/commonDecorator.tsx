// eslint-disable-next-line import/named
import {autorun, IReactionDisposer} from "mobx";
import * as React from "react";
import {VAR_RECORD_MASTER_ID} from "../constants";
import {IClassProps} from "../types/Class";
import {parseMemoize} from "../utils/parser";
import {IRecord} from "../types";
import {RecordContext, FormContext, ParentFieldContext} from "../context";
import {isDisabled} from "../hooks/useCommon/isDisabled";
import {deepFind} from "../utils";
import {IForm, IParentFieldContext} from "../Form";

export interface ICommonHOCState {
    disabled: boolean;
    hidden: boolean;
    readOnly?: boolean;
}

export interface ICommonHOCProps extends IClassProps {
    record?: IRecord;
    form?: IForm;
    parentField?: IParentFieldContext;
}

// eslint-disable-next-line max-lines-per-function
export function commonDecorator<Props extends IClassProps>(
    WrappedComponent: React.ComponentType<Props>,
): React.ComponentType<Props> {
    class CommonHOC extends React.Component<ICommonHOCProps, ICommonHOCState> {
        public state: ICommonHOCState = {
            disabled: this.props.bc.disabled === true,
            hidden: this.props.bc.hidden === true,
            readOnly:
                typeof this.props.bc.readonly === "undefined"
                    ? this.props.pageStore.isReadOnly
                    : this.props.bc.readonly,
        };

        private disposers: IReactionDisposer[] = [];

        private unmounted = false;

        public componentDidMount() {
            const {bc} = this.props;
            const {reqsel, disabledrules, hiddenrules, readonlyrules, disabledemptymaster} = bc;

            if ((reqsel && bc[VAR_RECORD_MASTER_ID]) || disabledrules || disabledemptymaster) {
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
            if (prevProps.bc.disabled !== this.props.bc.disabled) {
                this.handleDisabled();
            }
            if (prevProps.bc.hidden !== this.props.bc.hidden) {
                this.handleHidden();
            }
            if (prevProps.bc.readonly !== this.props.bc.readonly) {
                this.handleReadOnly();
            }
            if (
                prevProps.record !== this.props.record ||
                prevProps.form !== this.props.form ||
                prevProps.parentField !== this.props.parentField
            ) {
                const {reqsel, disabledrules, hiddenrules, readonlyrules, disabledemptymaster} = this.props.bc;

                if ((reqsel && this.props.bc[VAR_RECORD_MASTER_ID]) || disabledrules || disabledemptymaster) {
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
            const {disabled, visible} = this.props;
            const hidden = this.props.hidden || this.state.hidden;

            if (hidden) {
                return null;
            }

            return (
                <WrappedComponent
                    {...(this.props as any)}
                    disabled={disabled || this.state.disabled}
                    hidden={hidden}
                    visible={hidden || visible}
                    readOnly={this.getReadOnly()}
                />
            );
        }

        private getValue = (name: string) => {
            const {record, form, parentField, pageStore} = this.props;

            if (name.charAt(0) === "g") {
                return pageStore.globalValues.get(name);
            }

            if (record) {
                const [isExistRecord, recValue] = deepFind(record, name);

                if (isExistRecord) {
                    return recValue;
                }
            }

            if (form) {
                const values = form.values;

                if (parentField) {
                    const [isExistParent, val] = deepFind(values, `${parentField.key}.${name}`);

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

            return (
                readOnly ||
                (typeof this.props.bc.readonly === "undefined"
                    ? this.props.pageStore.isReadOnly
                    : this.props.bc.readonly)
            );
        }

        private getReadOnly = () => {
            const {readOnly} = this.props;

            if (this.state.readOnly === undefined) {
                return this.props.readOnly;
            }

            if (
                typeof this.props.bc.readonly === "boolean" &&
                !this.props.bc.readonly &&
                !this.props.bc.readonlyrules
            ) {
                return this.props.bc.readonly;
            }

            return (
                readOnly ||
                this.state.readOnly ||
                (typeof this.props.bc.readonly === "undefined"
                    ? this.props.pageStore.isReadOnly
                    : this.props.bc.readonly)
            );
        };
    }

    return (props) => {
        const record = React.useContext(RecordContext);
        const form = React.useContext(FormContext);
        const parentField = React.useContext(ParentFieldContext);

        return <CommonHOC {...props} originProps={props} record={record} form={form} parentField={parentField} />;
    };
}
