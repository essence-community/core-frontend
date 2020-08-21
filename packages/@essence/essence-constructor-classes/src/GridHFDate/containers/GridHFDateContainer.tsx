import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {Grid, Checkbox, Divider} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useStyles} from "./GridHFDateContainer.styles";

// eslint-disable-next-line max-lines-per-function
export const GridHFDateContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles();
    const form = React.useContext(FormContext);
    const column = React.useMemo(() => {
        return bc.column || "TODO: generate uniq column";
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
                                  property: column,
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
                                  property: column,
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
                                  property: column,
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
        }),
        [bc, column, configs, form, pageStore],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.st.column)?.value,
                () => {
                    fields.stEnable.onChange(true);
                    fields.eqEnable.onChange(false);
                },
            ),
        [configs.st, fields, form],
    );

    React.useEffect(() => {
        return reaction(
            () => form.select(configs.en.column)?.value,
            () => {
                fields.enEnable.onChange(true);
                fields.eqEnable.onChange(false);
            },
        );
    }, [configs.en, fields, form]);

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.eq.column)?.value,
                () => {
                    fields.stEnable.onChange(false);
                    fields.enEnable.onChange(false);
                    fields.eqEnable.onChange(true);
                },
            ),
        [configs.eq, fields, form],
    );

    const handleChangeCheckSt = (event: React.SyntheticEvent) => {
        fields.eqEnable.onChange(false);
        fields.stEnable.onChange(!fields.stEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckEn = (event: React.SyntheticEvent) => {
        fields.eqEnable.onChange(false);
        fields.enEnable.onChange(!fields.enEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckEq = (event: React.SyntheticEvent) => {
        fields.enEnable.onChange(false);
        fields.stEnable.onChange(false);
        fields.eqEnable.onChange(!fields.eqEnable.value);

        return form.onSubmit(event);
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
        </Grid>
    ));
};
