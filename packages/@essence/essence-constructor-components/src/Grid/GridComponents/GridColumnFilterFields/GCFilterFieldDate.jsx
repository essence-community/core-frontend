// @flow
import * as React from "react";
import {Grid, Divider, Checkbox} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import uniqueId from "lodash/uniqueId";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import BuilderField from "../../../TextField/BuilderField";
import styles from "./GridColumnFilterFieldsStyles";
import {type GCFilterFieldBaseType} from "./GCFilterFieldTypes";

type PropsType = GCFilterFieldBaseType & {
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
};

type StateType = {|
    checkSt: boolean,
    checkEn: boolean,
    checkEq: boolean,
|};

class GCFilterFieldDate extends React.Component<PropsType, StateType> {
    state = {
        checkEn: false,
        checkEq: false,
        checkSt: false,
    };

    bcSt: Object;

    bcEn: Object;

    bcEq: Object;

    column: string;

    constructor(...args: Array<*>) {
        super(...args);

        const {bc, form, pageStore} = this.props;
        const {column, datatype, format} = bc;

        this.column = column || uniqueId("builderField");

        form.registerField(`${this.column}St`, {
            bc,
            output: (field) =>
                this.state.checkSt && field.value
                    ? {datatype, format, operator: "ge", property: column, value: field.value}
                    : "",
            pageStore,
        });

        form.registerField(`${this.column}En`, {
            bc,
            output: (field) =>
                this.state.checkEn && field.value
                    ? {datatype, format, operator: "le", property: column, value: field.value}
                    : "",
            pageStore,
        });

        form.registerField(`${this.column}`, {
            bc,
            output: (field) =>
                this.state.checkEq && field.value
                    ? {datatype, format, operator: "eq", property: column, value: field.value}
                    : "",
            pageStore,
        });

        this.prepareConfigs();
    }

    isFilled = () => {
        const {form} = this.props;

        return ["St", "En", ""].some((fieldType: string) => {
            const key = `${this.column}${fieldType}`;

            return this.state[`check${fieldType || "Eq"}`] && Boolean(form.has(key) && form.$(key).value);
        });
    };

    prepareConfigs = () => {
        const {bc} = this.props;

        this.bcSt = {
            ...bc,
            [VAR_RECORD_DISPLAYED]: "static:6aa4a0027b7e41309787b086de051536",
            column: `${this.column}St`,
        };

        this.bcEn = {
            ...bc,
            [VAR_RECORD_DISPLAYED]: "static:f806e79ffa3342ff81b150ce2279099f",
            column: `${this.column}En`,
        };

        this.bcEq = {
            ...bc,
            [VAR_RECORD_DISPLAYED]: "static:e001f50e66034472a486099ea5f96218",
            column: this.column,
        };
    };

    handleChangeSt = () => {
        this.setState({checkEq: false, checkSt: true});
    };

    handleChangeEn = () => {
        this.setState({checkEn: true, checkEq: false});
    };

    handleChangeEq = () => {
        this.setState({checkEn: false, checkEq: true, checkSt: false});
    };

    handleChangeCheckSt = () => {
        this.setState((prevState) => ({checkEq: false, checkSt: !prevState.checkSt}));

        return this.props.form.submit();
    };

    handleChangeCheckEn = () => {
        this.setState((prevState) => ({checkEn: !prevState.checkEn, checkEq: false}));

        return this.props.form.submit();
    };

    handleChangeCheckEq = () => {
        this.setState((prevState) => ({checkEn: false, checkEq: !prevState.checkEq, checkSt: false}));

        return this.props.form.submit();
    };

    // eslint-disable-next-line max-lines-per-function
    render() {
        const {classes, renderPopover, ...fieldProps} = this.props;
        const isFilled = this.isFilled();

        const fieldContent = (
            <Grid container direction="column" spacing={1}>
                <Grid item>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Checkbox
                                checked={this.state.checkSt}
                                onChange={this.handleChangeCheckSt}
                                className={classes.checkBoxSize}
                            />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <BuilderField
                                {...fieldProps}
                                bc={this.bcSt}
                                onChange={this.handleChangeSt}
                                autoremove={false}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Checkbox
                                checked={this.state.checkEn}
                                onChange={this.handleChangeCheckEn}
                                className={classes.checkBoxSize}
                            />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <BuilderField
                                {...fieldProps}
                                bc={this.bcEn}
                                onChange={this.handleChangeEn}
                                autoremove={false}
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Divider />

                <Grid item>
                    <Grid container spacing={1} wrap="nowrap" alignItems="center">
                        <Grid item>
                            <Checkbox
                                checked={this.state.checkEq}
                                onChange={this.handleChangeCheckEq}
                                className={classes.checkBoxSize}
                            />
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <BuilderField
                                {...fieldProps}
                                bc={this.bcEq}
                                onChange={this.handleChangeEq}
                                autoremove={false}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );

        return renderPopover({fieldContent, isFilled});
    }
}

export default withStyles(styles)(GCFilterFieldDate);
