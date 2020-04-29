// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer, disposeOnUnmount} from "mobx-react";
import {reaction} from "mobx";
import {Grid, Radio, RadioGroup, FormLabel} from "@material-ui/core";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {toColumnStyleWidth, withTranslation, WithT} from "@essence-community/constructor-share/utils";
import {
    VALUE_SELF_FIRST,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {TextFieldLabel} from "@essence-community/constructor-share/uicomponents/TextFieldLabel";
import withModelDecorator from "../../../decorators/withModelDecorator";
import {FieldRadioGroupModel} from "../../../stores/FieldRadioGroupModel";
import {type BuilderFieldType} from "../../../TextField/BuilderFieldType";
import {getFirstValues} from "../../TFUtils/TFUtils";
import Scrollbars from "../../../Components/Scrollbars/Scrollbars";
import FieldRadioGroupStyles from "./FieldRadioGroupStyles";
import {type FieldRadioGroupPropsType} from "./FieldRadioGroupType";

type StateType = {
    focused: boolean,
};

class FieldRadioGroup extends React.Component<FieldRadioGroupPropsType & WithT, StateType> {
    state = {
        focused: false,
    };

    componentDidMount() {
        const {store, onInitGlobal} = this.props;

        onInitGlobal(store);
        this.setReacions();
    }

    componentDidUpdate(prevProps: FieldRadioGroupPropsType & WithT) {
        if (this.props.value !== prevProps.value) {
            this.handleReactValue(this.props.value);
        }
    }

    setReacions() {
        const {bc, store, pageStore} = this.props;

        disposeOnUnmount(this, [reaction(() => store.suggestions, this.handleChangeSuggestions)]);

        if (bc.getgloballist) {
            disposeOnUnmount(this, [
                reaction(
                    () => pageStore.globalValues.get(bc.getgloballist),
                    (records) => {
                        if (Array.isArray(records)) {
                            // $FlowFixMe
                            store.recordsStore.setRecordsAction(records);
                        }
                    },
                    {fireImmediately: true},
                ),
            ]);
        }
    }

    handleReactValue = (value: any) => {
        const {store, onChange} = this.props;

        if (!store.recordsStore.isLoading && value === VALUE_SELF_FIRST) {
            const val = getFirstValues(store.recordsStore);

            onChange(null, val);
            store.setSelectRecord(val);
        }
    };

    handleChangeSuggestions = () => {
        const {value, store, onChange} = this.props;
        const {recordsState} = store.recordsStore;

        if (recordsState.defaultValueSet && value === VALUE_SELF_FIRST) {
            const val = getFirstValues(store.recordsStore);

            onChange(null, val);
            store.setSelectRecord(val);
        }
    };

    handleChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;
        const {store, onChange} = this.props;

        onChange(null, value);
        store.setSelectRecord(value);
    };

    handleFocus = () => {
        this.setState({focused: true});
    };

    handleBlur = () => {
        this.setState({focused: false});
    };

    renderRadio = (record: Object) => {
        // eslint-disable-next-line id-length
        const {InputLabelProps, disabled, classes, error, bc, tabIndex, t} = this.props;
        const {focused} = this.state;
        const {label, value} = record;
        const isInline = bc.edittype && bc.edittype === "inline";

        return (
            <label
                className={cn(classes.root, {
                    [classes.setInline]: isInline,
                    [classes.disabled]: disabled,
                    [classes.focused]: focused,
                })}
                data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                key={value}
                data-qtip={t(label)}
            >
                <FormLabel {...InputLabelProps} classes={{root: classes.formLabel}} error={error}>
                    <TextFieldLabel
                        bc={{...bc, [VAR_RECORD_DISPLAYED]: label}}
                        info={bc.info}
                        error={error}
                        isRequired={false}
                    />
                </FormLabel>
                <Radio
                    checked={String(value) === String(this.props.value)}
                    value={value}
                    onChange={this.handleChange}
                    className={classes.radioRoot}
                    disabled={disabled}
                    color="default"
                    disableRipple
                    tabIndex={tabIndex}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />
            </label>
        );
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        // eslint-disable-next-line id-length
        const {store, bc, classes, error, field, t} = this.props;
        const {contentview = "", align} = bc;

        const content = (
            <Scrollbars autoHeight autoHeightMax={371} autoHeightMin={30} hideTracksWhenNotNeeded preventAltScroll>
                <div style={{height: bc.height ? `${bc.height}px` : "auto"}}>
                    <RadioGroup onChange={this.handleChange}>
                        <Grid
                            container
                            spacing={1}
                            {...GRID_CONFIGS[contentview]}
                            {...GRID_ALIGN_CONFIGS[`${align}-${contentview}`]}
                            style={{overflow: "hidden", width: "100%"}}
                        >
                            {store.suggestions.map((record) => (
                                <Grid key={record.value} item xs={12} style={toColumnStyleWidth(bc.contentwidth)}>
                                    {this.renderRadio(record)}
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
                        [classes.gridRootError]: error,
                    })}
                >
                    <Grid container className={classes.label} wrap="nowrap">
                        <Grid item className={classes.labelTextStartAngle}>
                            &nbsp;
                        </Grid>
                        <Grid item className={classes.labelTextWrapper}>
                            <span data-qtip={t(bc[VAR_RECORD_DISPLAYED])} className={classes.labelText}>
                                {t(bc[VAR_RECORD_DISPLAYED])}
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
    }
}

export default compose(
    withStyles(FieldRadioGroupStyles, {name: "EssenceFieldRadioGroup"}),
    withTranslation("meta"),
    withModelDecorator(
        (bc: BuilderFieldType, {pageStore}: FieldRadioGroupPropsType) => new FieldRadioGroupModel({bc, pageStore}),
    ),
    observer,
)(FieldRadioGroup);
