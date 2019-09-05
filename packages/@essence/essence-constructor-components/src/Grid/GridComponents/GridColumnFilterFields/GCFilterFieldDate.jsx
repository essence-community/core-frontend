// @flow
import * as React from "react";
import camelCase from "lodash/camelCase";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import {withStyles} from "@material-ui/core/styles";
import uniqueId from "lodash/uniqueId";
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

        const {bc, form} = this.props;
        const {column, datatype, format} = bc;

        this.column = camelCase(column) || uniqueId("builderField");

        form.add({
            key: `${this.column}St`,
            options: {
                bc,
                output: (value) =>
                    this.state.checkSt && value ? {datatype, format, operator: "ge", property: column, value} : "",
            },
        });
        form.add({
            key: `${this.column}En`,
            options: {
                bc,
                output: (value) =>
                    this.state.checkEn && value ? {datatype, format, operator: "le", property: column, value} : "",
            },
        });
        form.add({
            key: `${this.column}`,
            options: {
                bc,
                output: (value) =>
                    this.state.checkEq && value ? {datatype, format, operator: "eq", property: column, value} : "",
            },
        });

        this.prepareConfigs();
    }

    isFilled = () => {
        const {form} = this.props;

        return ["St", "En", ""].some((fieldType: string) => {
            const key = `${this.column}${fieldType}`;

            return this.state[`check${fieldType || "Eq"}`] && Boolean(form.has(key) && form.$(key).get("value"));
        });
    };

    prepareConfigs = () => {
        const {bc} = this.props;

        this.bcSt = {
            ...bc,
            column: `${this.column}St`,
            cvDisplayed: "Дата с",
        };

        this.bcEn = {
            ...bc,
            column: `${this.column}En`,
            cvDisplayed: "Дата по",
        };

        this.bcEq = {
            ...bc,
            column: this.column,
            cvDisplayed: "Точная дата",
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

    render() {
        const {classes, renderPopover, ...fieldProps} = this.props;
        const isFilled = this.isFilled();

        const fieldContent = (
            <Grid container direction="column" spacing={8}>
                <Grid item>
                    <Grid container spacing={8} wrap="nowrap" alignItems="center">
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
                    <Grid container spacing={8} wrap="nowrap" alignItems="center">
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
                    <Grid container spacing={8} wrap="nowrap" alignItems="center">
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
