// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer, disposeOnUnmount} from "mobx-react";
import {reaction} from "mobx";
import {Grid, Radio, RadioGroup, FormLabel} from "@material-ui/core";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {camelCaseMemoized, toColumnStyleWidth, withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {VALUE_SELF_FIRST} from "@essence/essence-constructor-share/constants";
import TextFieldLabel from "../../TextFieldComponents/TextFieldLabel/TextFieldLabel";
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
                    () => pageStore.globalValues.get(camelCaseMemoized(bc.getgloballist)),
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
        const {store} = this.props;

        if (!store.recordsStore.isLoading && value === VALUE_SELF_FIRST) {
            this.props.onChange(null, getFirstValues(store.recordsStore));
        }
    };

    handleChangeSuggestions = () => {
        const {value, store, onChange} = this.props;
        const {recordsState} = store.recordsStore;

        if (recordsState.defaultValueSet && value === VALUE_SELF_FIRST) {
            onChange(null, getFirstValues(store.recordsStore));
        }
    };

    handleChange = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
        const {value} = event.currentTarget;

        this.props.onChange(null, value);
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
                data-page-object={bc.ckPageObject}
                key={value}
                data-qtip={t(label)}
            >
                <FormLabel {...InputLabelProps} classes={{root: classes.formLabel}} error={error}>
                    <TextFieldLabel bc={{...bc, cvDisplayed: label}} info={bc.info} error={error} isRequired={false} />
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

    render() {
        // eslint-disable-next-line id-length
        const {store, bc, classes, error, field, t} = this.props;
        const isRow = bc.contentview === "hbox";

        const content = (
            <Scrollbars autoHeight autoHeightMax={371} autoHeightMin={30} hideTracksWhenNotNeeded preventAltScroll>
                <div style={{height: bc.height ? `${bc.height}px` : "auto"}}>
                    <RadioGroup onChange={this.handleChange}>
                        <Grid
                            container
                            spacing={1}
                            direction={isRow ? "row" : "column"}
                            wrap={isRow ? "nowrap" : "wrap"}
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

        if (bc.cvDisplayed) {
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
                            <span data-qtip={t(bc.cvDisplayed)} className={classes.labelText}>
                                {t(bc.cvDisplayed)}
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
