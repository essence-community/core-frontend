import * as React from "react";
import {reaction} from "mobx";
import cn from "clsx";
import {Grid, Radio, RadioGroup, FormLabel} from "@material-ui/core";
import {toColumnStyleWidth, useTranslation} from "@essence-community/constructor-share/utils";
import {
    VALUE_SELF_FIRST,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {TextFieldLabel, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {IClassProps, FieldValue} from "@essence-community/constructor-share/types";
import {
    useModel,
    useTextFieldProps,
    useFieldGetGlobal,
    useFieldSetGlobal,
    useDefaultValueQuery,
} from "@essence-community/constructor-share/hooks";
import {useField} from "@essence-community/constructor-share/Form";
import {useObserver} from "mobx-react-lite";
import {FieldRadioModel} from "../stores/FieldRadioModel";
import {getFirstValues} from "../utils";
import {ISuggestion} from "../FieldRadio.types";
import {useStyles} from "./FieldRadioContainer.styles";

// eslint-disable-next-line max-lines-per-function, max-statements
export const FieldRadioContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, visible, readOnly} = props;
    const {getgloballist} = bc;
    const [focused, setFocused] = React.useState(false);
    const [store] = useModel((options) => new FieldRadioModel(options), props);
    const field = useField({bc, disabled, hidden, pageStore});
    const classes = useStyles();
    const [trans] = useTranslation("meta");
    const textFieldProps = useTextFieldProps({bc, disabled, field, readOnly});
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const displayedTrans = displayed && trans(displayed);

    const handleReactValue = React.useCallback(
        (value: FieldValue) => {
            if (!store.recordsStore.isLoading && value === VALUE_SELF_FIRST) {
                const val = getFirstValues(store.recordsStore);

                field.onChange(val);
                store.setSelectRecord(val);
            }
        },
        [field, store],
    );

    const handleChangeSuggestions = React.useCallback(() => {
        const {recordsState} = store.recordsStore;

        if (recordsState.defaultValueSet && field.value === VALUE_SELF_FIRST) {
            const val = getFirstValues(store.recordsStore);

            field.onChange(val);
            store.setSelectRecord(val);
        }
    }, [field, store]);

    useFieldGetGlobal({bc, field, pageStore});
    useFieldSetGlobal({bc, field, pageStore});
    useDefaultValueQuery({bc, field, pageStore});

    React.useEffect(() => reaction(() => field.value, handleReactValue), [field, handleReactValue]);
    React.useEffect(() => reaction(() => store.suggestions, handleChangeSuggestions), [handleChangeSuggestions, store]);

    React.useEffect(() => {
        if (getgloballist) {
            return reaction(
                () => pageStore.globalValues.get(getgloballist),
                (records) => {
                    if (Array.isArray(records)) {
                        store.recordsStore.setRecordsAction(records);
                    }
                },
                {fireImmediately: true},
            );
        }

        return undefined;
    }, [getgloballist, pageStore.globalValues, store.recordsStore]);

    const handleChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;

        field.onChange(value);
        store.setSelectRecord(value);
    };

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const renderRadio = (record: ISuggestion) => {
        const {label, value} = record;
        const isInline = bc.edittype && bc.edittype === "inline";

        return (
            <label
                className={cn(classes.root, {
                    [classes.setInline]: isInline,
                    [classes.disabled]: textFieldProps.disabled,
                    [classes.focused]: focused,
                })}
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                key={value}
                data-qtip={trans(label)}
            >
                <FormLabel
                    {...textFieldProps.InputLabelProps}
                    classes={{root: classes.formLabel}}
                    error={!field.isValid}
                >
                    <TextFieldLabel
                        bc={{...bc, [VAR_RECORD_DISPLAYED]: label}}
                        info={bc.info}
                        error={!field.isValid}
                        isRequired={false}
                    />
                </FormLabel>
                <Radio
                    checked={String(value) === String(field.value)}
                    value={value}
                    onChange={handleChange}
                    className={classes.radioRoot}
                    disabled={textFieldProps.disabled}
                    color="default"
                    disableRipple
                    tabIndex={visible ? undefined : -1}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </label>
        );
    };

    return useObserver(() => {
        const content = (
            <Scrollbars autoHeight autoHeightMax={371} autoHeightMin={30} hideTracksWhenNotNeeded preventAltScroll>
                <div style={{height: bc.height ? `${bc.height}px` : "auto"}}>
                    <RadioGroup onChange={handleChange}>
                        <Grid
                            container
                            spacing={1}
                            {...((bc.contentview && GRID_CONFIGS[bc.contentview]) || GRID_CONFIGS["hbox-wrap"])}
                            {...((bc.contentview && bc.align && GRID_ALIGN_CONFIGS[`${bc.align}-${bc.contentview}`]) ||
                                GRID_ALIGN_CONFIGS["left-hbox"])}
                            style={{overflow: "hidden", width: "100%"}}
                        >
                            {store.suggestions.map((record) => (
                                <Grid key={record.value} item xs={12} style={toColumnStyleWidth(bc.contentwidth)}>
                                    {renderRadio(record)}
                                </Grid>
                            ))}
                        </Grid>
                    </RadioGroup>
                </div>
            </Scrollbars>
        );

        if (bc[VAR_RECORD_DISPLAYED]) {
            return (
                <Grid
                    container
                    spacing={1}
                    className={cn(classes.gridRoot, {
                        [classes.gridRootError]: !field.isValid,
                    })}
                >
                    <Grid container className={classes.label} wrap="nowrap">
                        <Grid item className={classes.labelTextStartAngle}>
                            &nbsp;
                        </Grid>
                        <Grid item className={classes.labelTextWrapper}>
                            <span data-qtip={displayedTrans} className={classes.labelText}>
                                {displayedTrans}
                            </span>
                        </Grid>
                        {field && field.rules && field.rules.indexOf("required") >= 0 ? (
                            <Grid item>
                                <span className={classes.required}>*</span>
                            </Grid>
                        ) : null}
                        <Grid item xs className={classes.labelTextEndAngle}>
                            &nbsp;
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {content}
                    </Grid>
                </Grid>
            );
        }

        return <React.Fragment>{content}</React.Fragment>;
    });
};
