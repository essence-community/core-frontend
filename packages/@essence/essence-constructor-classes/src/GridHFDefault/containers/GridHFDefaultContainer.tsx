/* eslint-disable sort-keys */
/* eslint-disable max-lines-per-function */
import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {isEmpty, useTranslation} from "@essence-community/constructor-share/utils";
import {IField} from "@essence-community/constructor-share/Form";
import {useObserver} from "mobx-react";
import {mapComponentOne, FormContext, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share";
import {Checkbox, Divider, Grid, Typography} from "@material-ui/core";
import {useStyles} from "./GridHFDefaultContainer.styles";

export const GridHFDefaultContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const form = React.useContext(FormContext);
    const [trans] = useTranslation("static");
    const classes = useStyles();
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
                datatype: "text",
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
                datatype: "text",
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

    const handleChangeCheckEq = (event: React.SyntheticEvent) => {
        fields.eqEnable.onChange(!fields.eqEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckNe = (event: React.SyntheticEvent) => {
        fields.neEnable.onChange(!fields.neEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckNull = (event: React.SyntheticEvent) => {
        fields.nullEnable.onChange(!fields.nullEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckNotNull = (event: React.SyntheticEvent) => {
        fields.notNullEnable.onChange(!fields.notNullEnable.value);

        return form.onSubmit(event);
    };

    return useObserver(() => (
        <Grid container direction="column" spacing={1}>
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
