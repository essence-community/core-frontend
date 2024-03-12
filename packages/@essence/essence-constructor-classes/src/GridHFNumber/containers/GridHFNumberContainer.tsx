/* eslint-disable sort-keys */
import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {Grid, Checkbox, Divider} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useStyles} from "./GridHFNumberContainer.styles";

// eslint-disable-next-line max-lines-per-function
export const GridHFNumberContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles();
    const form = React.useContext(FormContext);
    const column = React.useMemo(() => {
        return bc.column && bc.column.indexOf(".") > -1
            ? bc.column.replace(".", "###")
            : bc.column || "TODO: generate uniq column";
    }, [bc.column]);
    const configs = React.useMemo(
        () => ({
            eq: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:8e4039d067b24d83af302fa59168e46f",
                column: `${column}_eq`,
                type: "IFIELD",
                valuetype: "boolean",
            },
            eqEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_eq_enable`,
                datatype: "checkbox",
                type: "IFIELD",
            },
            ne: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:9baf4c2c21d04afeac62bf945ca651ce",
                column: `${column}_ne`,
                type: "IFIELD",
            },
            neEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_ne_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            ge: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:cba377a98c1b41cdab8d62bbed66df33",
                column: `${column}_ge`,
                type: "IFIELD",
            },
            geEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_ge_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            gt: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:2f2d76d4879841f2bfc4fa9722a77563",
                column: `${column}_gt`,
                type: "IFIELD",
            },
            gtEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_gt_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            le: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:5ca97aa339e64723b386c2bc845bbe60",
                column: `${column}_le`,
                type: "IFIELD",
            },
            leEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_le_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            lt: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:2f9def1991e74c40903c47dc20e411d7",
                column: `${column}_lt`,
                type: "IFIELD",
            },
            ltEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_lt_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
        }),
        [bc, column],
    );

    // Skip remove value when unmounting in useField
    const fields = React.useMemo(
        () => ({
            eq:
                form.select(configs.eq.column) ||
                form.registerField(configs.eq.column, {
                    bc: configs.eq,
                    output: (field, frm) =>
                        frm.select(configs.eqEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "eq",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            eqEnable:
                form.select(configs.eqEnable.column) ||
                form.registerField(configs.eqEnable.column, {
                    bc: configs.eqEnable,
                    output: () => undefined,
                    pageStore,
                }),
            ne:
                form.select(configs.ne.column) ||
                form.registerField(configs.ne.column, {
                    bc: configs.ne,
                    output: (field, frm) =>
                        frm.select(configs.neEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "ne",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            neEnable:
                form.select(configs.neEnable.column) ||
                form.registerField(configs.neEnable.column, {
                    bc: configs.neEnable,
                    output: () => undefined,
                    pageStore,
                }),
            ge:
                form.select(configs.ge.column) ||
                form.registerField(configs.ge.column, {
                    bc: configs.ge,
                    output: (field, frm) =>
                        frm.select(configs.geEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "ge",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            geEnable:
                form.select(configs.geEnable.column) ||
                form.registerField(configs.geEnable.column, {
                    bc: configs.geEnable,
                    output: () => undefined,
                    pageStore,
                }),
            gt:
                form.select(configs.gt.column) ||
                form.registerField(configs.gt.column, {
                    bc: configs.gt,
                    output: (field, frm) =>
                        frm.select(configs.gtEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "gt",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            gtEnable:
                form.select(configs.gtEnable.column) ||
                form.registerField(configs.gtEnable.column, {
                    bc: configs.gtEnable,
                    output: () => undefined,
                    pageStore,
                }),
            le:
                form.select(configs.le.column) ||
                form.registerField(configs.le.column, {
                    bc: configs.le,
                    output: (field, frm) =>
                        frm.select(configs.leEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "le",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            leEnable:
                form.select(configs.leEnable.column) ||
                form.registerField(configs.leEnable.column, {
                    bc: configs.leEnable,
                    output: () => undefined,
                    pageStore,
                }),
            lt:
                form.select(configs.lt.column) ||
                form.registerField(configs.lt.column, {
                    bc: configs.lt,
                    output: (field, frm) =>
                        frm.select(configs.ltEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "lt",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            ltEnable:
                form.select(configs.ltEnable.column) ||
                form.registerField(configs.ltEnable.column, {
                    bc: configs.ltEnable,
                    output: () => undefined,
                    pageStore,
                }),
        }),
        [bc, column, configs, form, pageStore],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.le.column)?.value,
                () => {
                    fields.leEnable.onChange(true);
                    fields.ltEnable.onChange(false);
                    fields.eqEnable.onChange(false);
                    fields.neEnable.onChange(false);
                },
            ),
        [configs.le, fields, form],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.lt.column)?.value,
                () => {
                    fields.ltEnable.onChange(true);
                    fields.leEnable.onChange(false);
                    fields.eqEnable.onChange(false);
                    fields.neEnable.onChange(false);
                },
            ),
        [configs.lt, fields, form],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.ge.column)?.value,
                () => {
                    fields.geEnable.onChange(true);
                    fields.gtEnable.onChange(false);
                    fields.eqEnable.onChange(false);
                    fields.neEnable.onChange(false);
                },
            ),
        [configs.ge, fields, form],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.gt.column)?.value,
                () => {
                    fields.gtEnable.onChange(true);
                    fields.geEnable.onChange(false);
                    fields.eqEnable.onChange(false);
                    fields.neEnable.onChange(false);
                },
            ),
        [configs.gt, fields, form],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.eq.column)?.value,
                () => {
                    fields.eqEnable.onChange(true);
                    fields.geEnable.onChange(false);
                    fields.gtEnable.onChange(false);
                    fields.leEnable.onChange(false);
                    fields.ltEnable.onChange(false);
                    fields.neEnable.onChange(false);
                },
            ),
        [configs.eq, fields, form],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.ne.column)?.value,
                () => {
                    fields.neEnable.onChange(true);
                    fields.geEnable.onChange(false);
                    fields.gtEnable.onChange(false);
                    fields.leEnable.onChange(false);
                    fields.ltEnable.onChange(false);
                    fields.eqEnable.onChange(false);
                },
            ),
        [configs.ne, fields, form],
    );

    const handleChangeCheckLe = (event: React.SyntheticEvent) => {
        fields.ltEnable.onChange(false);
        fields.eqEnable.onChange(false);
        fields.neEnable.onChange(false);
        fields.leEnable.onChange(!fields.leEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckLt = (event: React.SyntheticEvent) => {
        fields.leEnable.onChange(false);
        fields.eqEnable.onChange(false);
        fields.neEnable.onChange(false);
        fields.ltEnable.onChange(!fields.ltEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckGe = (event: React.SyntheticEvent) => {
        fields.gtEnable.onChange(false);
        fields.eqEnable.onChange(false);
        fields.neEnable.onChange(false);
        fields.geEnable.onChange(!fields.geEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckGt = (event: React.SyntheticEvent) => {
        fields.geEnable.onChange(false);
        fields.eqEnable.onChange(false);
        fields.neEnable.onChange(false);
        fields.gtEnable.onChange(!fields.gtEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckEq = (event: React.SyntheticEvent) => {
        fields.leEnable.onChange(false);
        fields.ltEnable.onChange(false);
        fields.geEnable.onChange(false);
        fields.gtEnable.onChange(false);
        fields.neEnable.onChange(false);
        fields.eqEnable.onChange(!fields.eqEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckNe = (event: React.SyntheticEvent) => {
        fields.leEnable.onChange(false);
        fields.ltEnable.onChange(false);
        fields.geEnable.onChange(false);
        fields.gtEnable.onChange(false);
        fields.eqEnable.onChange(false);
        fields.neEnable.onChange(!fields.neEnable.value);

        return form.onSubmit(event);
    };

    return useObserver(() => (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.geEnable.value)}
                            onChange={handleChangeCheckGe}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.ge, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.gtEnable.value)}
                            onChange={handleChangeCheckGt}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.gt, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.leEnable.value)}
                            onChange={handleChangeCheckLe}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.le, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.ltEnable.value)}
                            onChange={handleChangeCheckLt}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.lt, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.eqEnable.value)}
                            onChange={handleChangeCheckEq}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.eq, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.neEnable.value)}
                            onChange={handleChangeCheckNe}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.ne, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ));
};
