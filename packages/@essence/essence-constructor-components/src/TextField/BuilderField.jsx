// @flow
import * as React from "react";
import cn from "classnames";
import {useObserver} from "mobx-react";
import {IconButton, InputAdornment, makeStyles} from "@material-ui/core";
import {setComponent} from "@essence-community/constructor-share/components";
import {Icon} from "@essence-community/constructor-share/Icon";
import {
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_CL_IS_MASTER,
} from "@essence-community/constructor-share/constants";
import {makeRedirect, noop} from "@essence-community/constructor-share/utils";
import {FormContext} from "@essence-community/constructor-share";
import {useField} from "@essence-community/constructor-share/Form";
import {reaction} from "mobx";
import commonDecorator from "../decorators/commonDecorator";
import {isEmpty} from "../utils/base";
import {getFieldInstance} from "./Fields";
import TextField from "./TextField";
import {type BuilderFieldType} from "./BuilderFieldType";
import {disabledSelfGlobal, inputTypes} from "./TFUtils/TFConstants";
import {initGetGlobal, initSetGlobal} from "./TFUtils/TFGlobals";
import styles from "./BuilderFieldStyle";

const useStyles = makeStyles(styles, {name: "BuilderField"});

// eslint-disable-next-line max-statements, max-lines-per-function
export const BuilderFieldBase = (props) => {
    const form = React.useContext(FormContext);
    const {bc, pageStore, disabled, editing = true, onChange, tabIndex, hidden, readOnly, noLabel, visible} = props;
    const classes = useStyles();
    const field = useField({bc, disabled, hidden, pageStore});
    const disposers = React.useMemo(() => [], []);
    const isDisabled = disabled || !editing;

    const handleInitGlobal = (store: any) => {
        if (bc.getglobal) {
            disposers.push(initGetGlobal({bc, disposers, field, form, pageStore, store}));
        }

        if (bc.setglobal) {
            disposers.push(initSetGlobal({bc, disposers, field, form, pageStore, store}));
        }
    };

    const handleChangeField = React.useCallback(
        async (newValue) => {
            const ckPageObject = bc[VAR_RECORD_PAGE_OBJECT_ID];

            await pageStore.addFieldValueMaster(ckPageObject, newValue);

            pageStore.stores.forEach((store) => {
                if (store && store.bc && store.bc[VAR_RECORD_MASTER_ID] === ckPageObject) {
                    store.reloadStoreAction();
                    store.clearAction && store.clearAction();
                }
            });
        },
        [bc, pageStore],
    );

    React.useEffect(() => {
        let disposeMaster = noop;

        if (bc.datatype && !(bc.datatype in disabledSelfGlobal)) {
            setTimeout(handleInitGlobal, 0);
        }

        if (bc[VAR_RECORD_CL_IS_MASTER]) {
            if (!isEmpty(field.value)) {
                handleChangeField(field.value);
            }

            disposeMaster = reaction(() => field.value, handleChangeField);
        }

        return () => {
            if (bc[VAR_RECORD_CL_IS_MASTER]) {
                pageStore.removeFieldValueMaster(bc[VAR_RECORD_PAGE_OBJECT_ID]);
            }

            disposeMaster();
            disposers.forEach((disposer) => disposer());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInitGetGlobal = (store: any) => {
        disposers.push(initGetGlobal({bc, disposers, field, form, pageStore, store}));
    };

    const handleInitSetGlobal = (store: any) => {
        disposers.push(initSetGlobal({bc, disposers, field, form, pageStore, store}));
    };

    const handleClick = () => {
        const {
            [VAR_RECORD_MASTER_ID]: ckMaster,
            [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
            columnsfilter,
            extraplugingate,
            getmastervalue,
            redirecturl,
            redirectusequery,
        } = bc;

        if (redirecturl || redirectusequery) {
            makeRedirect(
                {
                    [VAR_RECORD_MASTER_ID]: ckMaster,
                    [VAR_RECORD_PAGE_OBJECT_ID]: ckPageObject,
                    columnsfilter,
                    extraplugingate,
                    getmastervalue,
                    redirecturl,
                    redirectusequery,
                },
                pageStore,
                form.values,
            );
        }
    };

    const handleResetChilds = (ckPageObject: string) => {
        const childs: Array<Field> = pageStore.masters[ckPageObject];

        if (childs) {
            childs.forEach((childField: Field) => {
                const ckPageObjectChild: ?string = childField?.bc?.[VAR_RECORD_PAGE_OBJECT_ID];

                childField.clear();
                childField.resetValidation();

                if (ckPageObjectChild) {
                    handleResetChilds(ckPageObjectChild);
                }
            });
        }
    };

    const handleChange = (event: SyntheticEvent, value: mixed) => {
        handleResetChilds(bc[VAR_RECORD_PAGE_OBJECT_ID]);

        if (onChange) {
            onChange(event, value);
        }

        if (typeof value === "undefined") {
            field.onChange(event.target.value);
        } else {
            field.onChange(value);
        }

        if (field.hasError) {
            field.resetValidation();
        }
    };

    const handleClear = (event: SyntheticEvent) => {
        if (event) {
            event.stopPropagation();
        }

        handleResetChilds(bc[VAR_RECORD_PAGE_OBJECT_ID]);
        field.clear();

        if (field.hasError) {
            field.resetValidation();
        }
    };

    const handleStop = (event: SyntheticEvent<>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const renderTips = ({datatype, currencysign}: BuilderFieldType): Array<React.Node> => {
        const tips = [];

        if (datatype === "numeric" && currencysign) {
            tips.push(<div key="currencysign">{currencysign}</div>);
        }

        if (!isEmpty(field.value) && !isDisabled) {
            tips.push(
                <IconButton
                    color="secondary"
                    key="clear-value"
                    className={classes.clearButton}
                    onClick={handleClear}
                    onFocus={handleStop}
                    tabIndex={-1}
                    disableRipple
                >
                    <Icon iconfont="times" size="xs" />
                </IconButton>,
            );
        }

        return tips;
    };

    const endAdornments = renderTips(bc, field);
    const BuilderFieldComponent = getFieldInstance(bc);

    // eslint-disable-next-line max-lines-per-function
    return useObserver(() => {
        if ((!(bc.datatype in disabledSelfGlobal) && hidden) || !BuilderFieldComponent) {
            return null;
        }

        return (
            <BuilderFieldComponent
                onChange={handleChange}
                onClear={handleClear}
                hidden={hidden}
                disabled={isDisabled}
                field={field}
                form={form}
                bc={bc}
                value={field.value}
                bfClasses={classes}
                className={cn(classes.inputRoot, {
                    [classes.linkInputRoot]: (bc.redirecturl || bc.redirectusequery) && Boolean(field.value),
                })}
                InputProps={{
                    className: classes.inputDisable,
                    endAdornment: endAdornments.length ? (
                        <InputAdornment position="end">{endAdornments}</InputAdornment>
                    ) : null,
                    type: inputTypes[bc.datatype || "text"],
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
                pageStore={pageStore}
                noLabel={noLabel}
                tips={endAdornments}
                editing={readOnly ? false : editing}
                onClick={handleClick}
                onInitGlobal={handleInitGlobal}
                onInitGetGlobal={handleInitGetGlobal}
                onInitSetGlobal={handleInitSetGlobal}
                imask={bc.imask}
                visible={visible}
                error={Boolean(!disabled && !field.isValid)}
                tabIndex={tabIndex}
                textField={TextField}
            />
        );
    });
};

const BuilderField = commonDecorator(BuilderFieldBase);

setComponent("IFIELD", BuilderField);
setComponent("CUSTOM", BuilderField);
setComponent("CUSTOM.ADDRFIELD", BuilderField);
setComponent("CUSTOM.MOFIELD", BuilderField);

export default BuilderField;
