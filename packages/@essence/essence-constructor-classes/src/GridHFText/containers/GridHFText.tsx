import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {Grid, Checkbox, Divider} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useStyles} from "./GridHFText.styles";

// eslint-disable-next-line max-lines-per-function
export const GridHFText: React.FC<IClassProps> = (props) => {
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
                datatype: "text",
                type: "IFIELD",
            },
            eqEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_eq_enable`,
                datatype: "checkbox",
                type: "IFIELD",
            },
            like: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:ad5617f1592240b6be5bc1d681c071ff",
                column: `${column}_ge`,
                datatype: "text",
                type: "IFIELD",
            },
            likeEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_ge_enable`,
                datatype: "checkbox",
                type: "IFIELD",
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
        }),
        [bc, column, configs, form, pageStore],
    );

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.like.column)?.value,
                () => {
                    fields.likeEnable.onChange(true);
                    fields.eqEnable.onChange(false);
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
                    fields.likeEnable.onChange(false);
                },
            ),
        [configs.eq, fields, form],
    );

    const handleChangeCheckLike = (event: React.SyntheticEvent) => {
        fields.eqEnable.onChange(false);
        fields.likeEnable.onChange(!fields.likeEnable.value);

        return form.onSubmit(event);
    };

    const handleChangeCheckEq = (event: React.SyntheticEvent) => {
        fields.likeEnable.onChange(false);
        fields.eqEnable.onChange(!fields.eqEnable.value);

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
        </Grid>
    ));
};
