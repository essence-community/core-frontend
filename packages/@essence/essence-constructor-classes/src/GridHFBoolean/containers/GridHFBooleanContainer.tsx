import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {Grid, Checkbox} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useStyles} from "./GridHFBooleanContainer.styles";

const getValue = (value: string, valueType?: string) => {
    if (valueType === "integer") {
        return parseInt(value, 10);
    }
    if (valueType === "boolean") {
        return Boolean(parseInt(value, 10));
    }
    if (valueType === "text-boolean") {
        return `${Boolean(parseInt(value, 10))}`;
    }
    if (valueType === "text-integer") {
        return `${parseInt(value, 10)}`;
    }

    return value;
};

// eslint-disable-next-line max-lines-per-function
export const GridHFBooleanContainer: React.FC<IClassProps> = (props) => {
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
            filter: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:8e4039d067b24d83af302fa59168e46f",
                column: `${column}_filter`,
                contentview: "vbox",
                datatype: "radio",
                displayfield: "name",
                idproperty: "value",
                localization: "static" as any,
                records: [
                    {name: "static:dacf7ab025c344cb81b700cfcc50e403", value: "1"},
                    {name: "static:f0e9877df106481eb257c2c04f8eb039", value: "0"},
                ] as any,
                type: "IFIELD",
                valuefield: [{in: "value"}],
            },
            filterEnable: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: undefined,
                column: `${column}_filter_enable`,
                datatype: "checkbox",
                type: "IFIELD",
            },
        }),
        [bc, column],
    );

    // Skip remove value when unmounting in useField
    const fields = React.useMemo(
        () => ({
            filter:
                form.select(configs.filter.column) ||
                form.registerField(configs.filter.column, {
                    bc: configs.filter,
                    output: (field, frm) =>
                        frm.select(configs.filterEnable.column)?.value && typeof field.value === "string"
                            ? {
                                  datatype: bc.valuetype || bc.datatype,
                                  format: bc.format,
                                  operator: "eq",
                                  property: column.replace("###", "."),
                                  value: getValue(field.value, field.bc.valuetype),
                              }
                            : undefined,
                    pageStore,
                }),
            filterEnable:
                form.select(configs.filterEnable.column) ||
                form.registerField(configs.filterEnable.column, {
                    bc: configs.filterEnable,
                    output: () => undefined,
                    pageStore,
                }),
        }),
        [bc, column, configs, form, pageStore],
    );

    const handleChangeCheck = (event: React.SyntheticEvent) => {
        fields.filterEnable.onChange(!fields.filterEnable.value);

        return form.onSubmit(event);
    };

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.filter.column)?.value,
                () => {
                    fields.filterEnable.onChange(true);
                },
            ),
        [configs, fields, form],
    );

    return useObserver(() => (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={Boolean(fields.filterEnable.value)}
                            onChange={handleChangeCheck}
                            className={classes.checkBoxSize}
                        />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                        {mapComponentOne(configs.filter, (ChildCmp, childBc) => (
                            <ChildCmp {...props} bc={childBc} />
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    ));
};
