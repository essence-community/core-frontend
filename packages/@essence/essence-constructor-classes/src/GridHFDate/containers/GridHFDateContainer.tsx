/* eslint-disable sort-keys */
import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {Grid, Checkbox, Divider, Typography} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {useStyles} from "./GridHFDateContainer.styles";

// eslint-disable-next-line max-lines-per-function
export const GridHFDateContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles();
    const form = React.useContext(FormContext);
    const [trans] = useTranslation("static");
    const column = React.useMemo(() => {
        return bc.column && bc.column.indexOf(".") > -1
            ? bc.column.replace(".", "###")
            : bc.column || "TODO: generate uniq column";
    }, [bc.column]);
    const configs = React.useMemo(
        () => ({
            en: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:f806e79ffa3342ff81b150ce2279099f",
                column: `${column}_en`,
                type: "IFIELD",
            },
            enEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_en_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            eq: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:e001f50e66034472a486099ea5f96218",
                column: `${column}_eq`,
                type: "IFIELD",
            },
            eqEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_eq_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
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
            st: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:6aa4a0027b7e41309787b086de051536",
                column: `${column}_st`,
                type: "IFIELD",
            },
            stEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_st_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            nullEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_null_enable`,
                datatype: "checkbox",
                type: "IFIELD",
                valuetype: "boolean",
            },
            notNullEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_not_null_enable`,
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
            en:
                form.select(configs.en.column) ||
                form.registerField(configs.en.column, {
                    bc: configs.en,
                    output: (field, frm) =>
                        frm.select(configs.enEnable.column)?.value && field.value
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
            enEnable:
                form.select(configs.enEnable.column) ||
                form.registerField(configs.enEnable.column, {
                    bc: configs.enEnable,
                    output: () => undefined,
                    pageStore,
                }),
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
                        frm.select(configs.eqEnable.column)?.value && field.value
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
            st:
                form.select(configs.st.column) ||
                form.registerField(configs.st.column, {
                    bc: configs.st,
                    output: (field, frm) =>
                        frm.select(configs.stEnable.column)?.value && field.value
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
            stEnable:
                form.select(configs.stEnable.column) ||
                form.registerField(configs.stEnable.column, {
                    bc: configs.stEnable,
                    output: () => undefined,
                    pageStore,
                }),
            nullEnable:
                form.select(configs.nullEnable.column) ||
                form.registerField(configs.nullEnable.column, {
                    bc: configs.nullEnable,
                    output: (field) =>
                        field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "null",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : undefined,
                    pageStore,
                }),
            notNullEnable:
                form.select(configs.notNullEnable.column) ||
                form.registerField(configs.notNullEnable.column, {
                    bc: configs.nullEnable,
                    output: (field) =>
                        field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "not null",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : undefined,
                    pageStore,
                }),
        }),
        [bc, column, configs, form, pageStore],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.st.column)?.value,
                () => {
                    fields.stEnable.onChange(true);
                },
            ),
        [configs.st, fields, form],
    );

    React.useEffect(() => {
        return reaction(
            () => form.select(configs.en.column)?.value,
            () => {
                fields.enEnable.onChange(true);
            },
        );
    }, [configs.en, fields, form]);

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.eq.column)?.value,
                () => {
                    fields.eqEnable.onChange(true);
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
                },
            ),
        [configs.ne, fields, form],
    );

    const handleChangeCheckSt = (event: React.SyntheticEvent) => {
        fields.stEnable.onChange(!fields.stEnable.value);
    };

    const handleChangeCheckEn = (event: React.SyntheticEvent) => {
        fields.enEnable.onChange(!fields.enEnable.value);
    };

    const handleChangeCheckEq = (event: React.SyntheticEvent) => {
        fields.eqEnable.onChange(!fields.eqEnable.value);
    };

    const handleChangeCheckNe = (event: React.SyntheticEvent) => {
        fields.neEnable.onChange(!fields.neEnable.value);
    };

    const handleChangeCheckNull = (event: React.SyntheticEvent) => {
        fields.nullEnable.onChange(!fields.nullEnable.value);
    };

    const handleChangeCheckNotNull = (event: React.SyntheticEvent) => {
        fields.notNullEnable.onChange(!fields.notNullEnable.value);
    };

    return useObserver(() => (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.stEnable.value)}
                            onChange={handleChangeCheckSt}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.st, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.enEnable.value)}
                            onChange={handleChangeCheckEn}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.en, (ChildCmp, childBc) => (
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

            <Divider />

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.nullEnable.value)}
                            onChange={handleChangeCheckNull}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography>{trans("static:bac3b02e620a4d9189b03dc8ef7dd845")}</Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Divider />

            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.notNullEnable.value)}
                            onChange={handleChangeCheckNotNull}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        <Typography>{trans("static:8001cb3d99fb41cdb4af7ed7f34ac6ef")}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ));
};
