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
import {useStyles} from "./GridHFText.styles";

// eslint-disable-next-line max-lines-per-function
export const GridHFText: React.FC<IClassProps> = (props) => {
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
            like: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:ad5617f1592240b6be5bc1d681c071ff",
                column: `${column}_l`,
                datatype: "text",
                type: "IFIELD",
            },
            likeEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_l_enable`,
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
            notLike: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:fc5dea49bf684ec7bd9d9f58133cd89a",
                column: `${column}_nl`,
                datatype: "text",
                type: "IFIELD",
            },
            notLikeEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_nl_enable`,
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
            like:
                form.select(configs.like.column) ||
                form.registerField(configs.like.column, {
                    bc: configs.like,
                    output: (field, frm) =>
                        frm.select(configs.likeEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "like",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            likeEnable:
                form.select(configs.likeEnable.column) ||
                form.registerField(configs.likeEnable.column, {
                    bc: configs.likeEnable,
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
            notLike:
                form.select(configs.notLike.column) ||
                form.registerField(configs.notLike.column, {
                    bc: configs.notLike,
                    output: (field, frm) =>
                        frm.select(configs.notLikeEnable.column)?.value && field.value
                            ? {
                                  datatype: bc.datatype,
                                  format: bc.format,
                                  operator: "not like",
                                  property: column.replace("###", "."),
                                  value: field.value,
                              }
                            : "",
                    pageStore,
                }),
            notLikeEnable:
                form.select(configs.notLikeEnable.column) ||
                form.registerField(configs.notLikeEnable.column, {
                    bc: configs.notLikeEnable,
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
                () => form.select(configs.like.column)?.value,
                () => {
                    fields.likeEnable.onChange(true);
                },
            ),
        [configs.like, fields, form],
    );

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

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.notLike.column)?.value,
                () => {
                    fields.notLikeEnable.onChange(true);
                },
            ),
        [configs.notLike, fields, form],
    );

    const handleChangeCheckLike = (event: React.SyntheticEvent) => {
        fields.likeEnable.onChange(!fields.likeEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckEq = (event: React.SyntheticEvent) => {
        fields.eqEnable.onChange(!fields.eqEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckNotLike = (event: React.SyntheticEvent) => {
        fields.notLikeEnable.onChange(!fields.notLikeEnable.value);

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
                            checked={Boolean(fields.likeEnable.value)}
                            onChange={handleChangeCheckLike}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.like, (ChildCmp, childBc) => (
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
                            checked={Boolean(fields.notLikeEnable.value)}
                            onChange={handleChangeCheckNotLike}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.notLike, (ChildCmp, childBc) => (
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
