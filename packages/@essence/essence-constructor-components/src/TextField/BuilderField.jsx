/* eslint-disable max-lines */
// @flow
import * as React from "react";
import get from "lodash/get";
import cn from "classnames";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {type ObserverCallPropsType, Field} from "mobx-react-form";
import {withStyles} from "@material-ui/core/styles";
import {IconButton, InputAdornment} from "@material-ui/core";
import {setComponent, Icon} from "@essence/essence-constructor-share";
import commonDecorator from "../decorators/commonDecorator";
import {isEmpty} from "../utils/base";
import {makeRedirect} from "../utils/redirect";
import withFieldDecorator from "../decorators/withFieldDecorator";
import {getFieldInstance} from "./Fields";
import TextField from "./TextField";
import {type BuilderFieldType, type BuilderFieldPropsType} from "./BuilderFieldType";
import {disabledSelfGlobal, inputTypes} from "./TFUtils/TFConstants";
import {initGetGlobal, initSetGlobal} from "./TFUtils/TFGlobals";
import styles from "./BuilderFieldStyle";

type StateType = {
    BuilderFieldComponent?: string,
    endAdornment?: React.Node,
    isDisabled: boolean,
};

export class BuilderFieldBase extends React.Component<BuilderFieldPropsType, StateType> {
    disposers: Array<Function> = [];

    static defaultProps = {
        editing: true,
    };

    static getDerivedStateFromProps({disabled, editing}: BuilderFieldPropsType) {
        const isDisabled = disabled || !editing;

        return {isDisabled};
    }

    constructor(...args: any[]) {
        super(...args);

        const {bc} = this.props;

        this.state = {
            BuilderFieldComponent: getFieldInstance(bc),
            isDisabled: false,
        };
    }

    componentDidMount() {
        const {
            bc: {datatype = "", clIsMaster},
            field,
            form,
        } = this.props;
        const {value} = field;

        if (!(datatype in disabledSelfGlobal)) {
            setTimeout(this.handleInitGlobal, 0);
        }

        if (clIsMaster) {
            if (!isEmpty(value)) {
                this.handleChangeField({
                    change: {
                        newValue: value,
                        type: "update",
                    },
                    field,
                    form,
                });
            }
            field.observe(this.handleChangeField);
        }
    }

    handleInitGlobal = (store: any) => {
        const {bc, form, pageStore, field} = this.props;

        if (bc.getglobal) {
            this.disposers.push(initGetGlobal({bc, disposers: this.disposers, field, form, pageStore, store}));
        }

        if (bc.setglobal) {
            this.disposers.push(initSetGlobal({bc, disposers: this.disposers, field, form, pageStore, store}));
        }
    };

    componentWillUnmount() {
        const {form} = this.props;

        if (form && this.props.bc.clIsMaster && this.props.pageStore) {
            this.props.pageStore.removeFieldValueMaster(this.props.bc.ckPageObject);
        }

        this.disposers.forEach((disposer) => disposer());
        this.disposers = [];
    }

    handleInitGetGlobal = (store: any) => {
        const {bc, form, pageStore, field} = this.props;

        this.disposers.push(initGetGlobal({bc, disposers: this.disposers, field, form, pageStore, store}));
    };

    handleInitSetGlobal = (store: any) => {
        const {bc, form, pageStore, field} = this.props;

        this.disposers.push(initSetGlobal({bc, disposers: this.disposers, field, form, pageStore, store}));
    };

    handleChangeField = async ({change}: ObserverCallPropsType) => {
        if (this.props.pageStore && change.type === "update") {
            const {ckPageObject} = this.props.bc;

            await this.props.pageStore.addFieldValueMaster(ckPageObject, change.newValue);

            this.props.pageStore.stores.forEach((store) => {
                if (store && store.bc && store.bc.ckMaster === ckPageObject) {
                    store.reloadStoreAction();
                    store.clearAction && store.clearAction();
                }
            });
        }
    };

    handleClick = () => {
        const {bc, pageStore, form} = this.props;
        const {ckPageObject, columnsfilter, extraplugingate, redirecturl, redirectusequery} = bc;

        if (redirecturl || redirectusequery) {
            makeRedirect(
                {ckPageObject, columnsfilter, extraplugingate, redirecturl, redirectusequery},
                pageStore,
                form.values(),
            );
        }
    };

    handleChange = (event: SyntheticEvent<>, value: mixed) => {
        const {field, onChange, bc, form} = this.props;

        this.handleResetChilds(bc.ckPageObject);

        if (onChange) {
            onChange(event, value);
        }

        if (typeof value === "undefined") {
            field.onChange(event);
        } else {
            field.set(value);
        }

        if (field.hasError) {
            field.resetValidation();
        }

        form.execHook("onFieldChange");
    };

    handleClear = (event: ?SyntheticEvent<>) => {
        const {field, bc, form} = this.props;

        if (event) {
            event.stopPropagation();
        }

        this.handleResetChilds(bc.ckPageObject);
        field.clear();

        if (field.hasError) {
            field.resetValidation();
        }

        form.execHook("onFieldClear");
    };

    handleResetChilds = (ckPageObject: string) => {
        const {pageStore} = this.props;
        const childs: Array<Field> = pageStore.masters[ckPageObject];

        if (childs) {
            childs.forEach((childField: Field) => {
                const ckPageObjectChild: ?string = get(childField, "options.bc.ckPageObject");

                childField.clear();
                childField.resetValidation();

                if (ckPageObjectChild) {
                    this.handleResetChilds(ckPageObjectChild);
                }
            });
        }
    };

    handleStop = (event: SyntheticEvent<>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    renderTips = ({datatype, currencysign}: BuilderFieldType, field: Field): Array<React.Node> => {
        const {classes = {}} = this.props;
        const tips = [];
        const {value} = field;
        const disabled = this.props.disabled || !this.props.editing;

        if (datatype === "numeric" && currencysign) {
            tips.push(<div key="currencysign">{currencysign}</div>);
        }

        if (!isEmpty(value) && !disabled) {
            tips.push(
                <IconButton
                    color="secondary"
                    key="clear-value"
                    className={classes.clearButton}
                    onClick={this.handleClear}
                    onFocus={this.handleStop}
                    tabIndex={-1}
                    disableRipple
                >
                    <Icon iconfont="times" size="xs" />
                </IconButton>,
            );
        }

        return tips;
    };

    render() {
        const {bc, editing, readOnly, hidden, classes, form, field, visible, disabled, tabIndex} = this.props;
        const {BuilderFieldComponent} = this.state;
        const isDisabled = disabled || !editing;
        const {datatype = "text", imask} = bc;
        const inputType = inputTypes[datatype];
        const {value} = field;
        const endAdornments = this.renderTips(bc, field);

        if ((!(datatype in disabledSelfGlobal) && hidden) || !BuilderFieldComponent) {
            return null;
        }

        return (
            <BuilderFieldComponent
                onChange={this.handleChange}
                onClear={this.handleClear}
                hidden={hidden}
                disabled={isDisabled}
                field={field}
                form={form}
                bc={bc}
                value={value}
                bfClasses={classes}
                className={cn(classes.inputRoot, {
                    [classes.linkInputRoot]: (bc.redirecturl || bc.redirectusequery) && Boolean(value),
                })}
                InputProps={{
                    className: classes.inputDisable,
                    endAdornment: endAdornments.length ? (
                        <InputAdornment position="end">{endAdornments}</InputAdornment>
                    ) : null,
                    type: inputType,
                }}
                // eslint-disable-next-line
                inputProps={{
                    className: classes.input,
                    maxLength: bc.maxsize,
                    tabIndex,
                }}
                InputLabelProps={{
                    className: classes.formLabelRoot,
                }}
                pageStore={this.props.pageStore}
                noLabel={this.props.noLabel}
                tips={endAdornments}
                editing={readOnly ? false : editing}
                onClick={this.handleClick}
                onInitGlobal={this.handleInitGlobal}
                onInitGetGlobal={this.handleInitGetGlobal}
                onInitSetGlobal={this.handleInitSetGlobal}
                imask={imask}
                visible={visible}
                error={Boolean(!disabled && !field.get("isValid"))}
                tabIndex={tabIndex}
                textField={TextField}
            />
        );
    }
}

const BuilderField = compose(
    commonDecorator,
    withFieldDecorator(),
    withStyles(styles),
    observer,
)(BuilderFieldBase);

setComponent("IFIELD", BuilderField);
setComponent("CUSTOM", BuilderField);
setComponent("CUSTOM.ADDRFIELD", BuilderField);
setComponent("CUSTOM.MOFIELD", BuilderField);

export default BuilderField;
