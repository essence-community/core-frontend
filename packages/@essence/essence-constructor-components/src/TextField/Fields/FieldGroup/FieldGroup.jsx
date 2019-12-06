// @flow
import * as React from "react";
import {reaction} from "mobx";
import cn from "classnames";
import {compose} from "recompose";
import {disposeOnUnmount} from "mobx-react";
import {Grid} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {toColumnStyleWidth, camelCaseMemoized, withTranslation, WithT} from "@essence/essence-constructor-share/utils";
import {mapComponents, Icon} from "@essence/essence-constructor-share";
import {parseMemoize} from "@essence/essence-constructor-share/utils/parser";
import {BuilderTypeContext} from "../../../Contexts";
import {isEmpty} from "../../../utils/base";
import {type TextFieldChildProps} from "../../BuilderFieldType";
import styles from "./FieldGroupStyles";

type PropsType = TextFieldChildProps &
    WithT & {
        classes: {
            [$Keys<$Call<typeof styles, any>>]: string,
        },
    };
type StateType = {
    reqCount: number,
};

const getColumns = (childs?: Array<Object>) => (childs ? childs.map((child) => camelCaseMemoized(child.column)) : []);

class FieldGroup extends React.Component<PropsType, StateType> {
    static contextType = BuilderTypeContext;

    state = {
        reqCount: 0,
    };

    columns: Array<string>;

    runerReqCount: (values: Object) => mixed = () => "0";

    _isMounted: boolean = false;

    componentDidMount() {
        const {
            bc: {reqcountrules, childs, reqcount},
            field,
        } = this.props;

        this.columns = getColumns(childs);

        field.set("value", this.handleGetValues());
        field.set("default", this.handleGetValues());

        this.handleChangeReqCount(reqcount || "0");

        disposeOnUnmount(this, reaction(this.handleGetValues, this.handleChangeValue));

        if (reqcountrules) {
            this.runerReqCount = parseMemoize(reqcountrules).runer;
            disposeOnUnmount(
                this,
                reaction(this.handleRegCountRules, this.handleChangeReqCount, {fireImmediately: true}),
            );
        }

        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    /**
     * @returns {number} fieldStatus - признак заполнения полей.
     * Если меньше 0 - количество полей с ошибками.
     * Если больше 0 - количество пустых полей.
     */
    handleGetValues = (): number => {
        const {form} = this.props;
        let emptyFieldsCount = 0;
        let invalidFieldsCount = 0;

        this.columns.forEach((column) => {
            const field = form.has(column) && form.$(column);

            if (field) {
                if (isEmpty(field.value)) {
                    emptyFieldsCount += 1;
                }

                if (!field.isValid) {
                    invalidFieldsCount -= 1;
                }
            }
        });

        return invalidFieldsCount || emptyFieldsCount;
    };

    handleChangeValue = (status: number) => {
        const {field} = this.props;

        field.set("value", status);
        field.set("default", status);
        field.validate({showErrors: true});
    };

    handleRegCountRules = (): string => {
        const {globalValues} = this.props.pageStore;

        return String(this.runerReqCount(globalValues));
    };

    handleChangeReqCount = (reqcount: string) => {
        const reqCount = parseInt(reqcount, 10) || 0;

        this.props.field.set("rules", [`reqcount:${reqCount},${this.columns.length}`]);

        if (this._isMounted) {
            this.props.field.validate({showErrors: true});
        }

        this.setState({reqCount});
    };

    renderTip = () => {
        const {bc} = this.props;
        const value = Number(this.props.value);

        if (value < 0) {
            return `0 / ${value * -1}`;
        }

        const columnsCount = bc.childs ? bc.childs.length : 0;

        return ` ${columnsCount - value} / ${this.state.reqCount}`;
    };

    isIncorrect = () => {
        const {bc} = this.props;
        const value = Number(this.props.value);
        const columnsCount = bc.childs ? bc.childs.length : 0;

        return columnsCount - value < this.state.reqCount;
    };

    renderSuccess = () => {
        const {reqcount, reqcountrules} = this.props.bc;

        return reqcount || reqcountrules ? <Icon iconfont="check" /> : null;
    };

    render() {
        // eslint-disable-next-line id-length
        const {bc, pageStore, editing, visible, classes, form, error, readOnly, t} = this.props;
        const isRow = bc.contentview === "hbox";
        const inFilter = this.context === "filter";
        const status = error || this.isIncorrect() ? `${this.renderTip()} *` : this.renderSuccess();

        return (
            <Grid
                container
                spacing={1}
                className={cn(classes.root, {
                    [classes.rootError]: error,
                    [classes.filterRoot]: inFilter,
                    [classes.panelRoot]: !inFilter,
                })}
                direction={isRow ? "row" : "column"}
                wrap={isRow ? "nowrap" : "wrap"}
                data-qtip={error ? t("a5a5d7213d1f4f77861ed40549ee9c57") : ""}
            >
                <Grid container className={classes.label} wrap="nowrap" justify="space-between">
                    <Grid item className={classes.labelTextStartAngle}>
                        &nbsp;
                    </Grid>
                    {Boolean(bc.cvDisplayed) && (
                        <Grid item className={`${classes.labelDisplay}`}>
                            <span className={classes.labelText}>{t(bc.cvDisplayed)}</span>
                        </Grid>
                    )}
                    <Grid item xs className={classes.labelTextLine}>
                        &nbsp;
                    </Grid>
                    {Boolean(status) && (
                        <Grid item className={`${classes.labelStatus}`}>
                            {status}
                        </Grid>
                    )}
                    <Grid item className={classes.labelTextEndAngle}>
                        &nbsp;
                    </Grid>
                </Grid>
                {mapComponents(bc.childs, (ChildCmp, child) => (
                    <Grid
                        item
                        xs={12}
                        key={child.ckPageObject}
                        className={classes.child}
                        style={toColumnStyleWidth(child.width)}
                    >
                        <ChildCmp
                            pageStore={pageStore}
                            editing={editing}
                            bc={child}
                            readOnly={readOnly}
                            visible={visible}
                            form={form}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default compose(
    withTranslation("meta"),
    withStyles(styles),
)(FieldGroup);
