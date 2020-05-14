import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useField} from "@essence-community/constructor-share/Form";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {FormContext} from "@essence-community/constructor-share/context";
import {Grid, Checkbox, Divider} from "@material-ui/core";
import {useObservable, useObserver} from "mobx-react-lite";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {reaction} from "mobx";
import {useStyles} from "./GridHFDateContainer.styles";

/*
 * !
 * const isFilled = () => {
 *     return ["St", "En", ""].some((fieldType: string) => {
 *         const key = `${column}${fieldType}`;
 *         if (!checkStatus[`check${fieldType || "Eq"}` as keyof typeof checkStatus]) {
 *             return false;
 *         }
 *         const field = form.select(key);
 *         if (field) {
 *             return Boolean(field.value);
 *         }
 *         return false;
 *     });
 * };
 */

// eslint-disable-next-line max-lines-per-function
export const GridHFDateContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore} = props;
    const classes = useStyles();
    const form = React.useContext(FormContext);
    const checkStatus = useObservable({
        checkEn: false,
        checkEq: false,
        checkSt: false,
    });
    const column = React.useMemo(() => {
        return bc.column || "TODO: generate uniq column";
    }, [bc.column]);
    const configs = React.useMemo(
        () => ({
            en: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:f806e79ffa3342ff81b150ce2279099f",
                column: `${column}Eb`,
                type: "IFIELD",
            },
            eq: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:e001f50e66034472a486099ea5f96218",
                column: `${column}Eq`,
                type: "IFIELD",
            },
            st: {
                ...bc,
                [VAR_RECORD_DISPLAYED]: "static:6aa4a0027b7e41309787b086de051536",
                column: `${column}St`,
                type: "IFIELD",
            },
        }),
        [bc, column],
    );

    useField({
        bc: configs.st,
        output: (field) =>
            checkStatus.checkSt && field.value
                ? {datatype: bc.datatype, format: bc.format, operator: "ge", property: column, value: field.value}
                : "",
        pageStore,
    });
    useField({
        bc: configs.en,
        output: (field) =>
            checkStatus.checkEn && field.value
                ? {datatype: bc.datatype, format: bc.format, operator: "le", property: column, value: field.value}
                : "",
        pageStore,
    });
    useField({
        bc: configs.eq,
        output: (field) =>
            checkStatus.checkEq && field.value
                ? {datatype: bc.datatype, format: bc.format, operator: "eq", property: column, value: field.value}
                : "",
        pageStore,
    });

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.st.column)?.value,
                () => {
                    checkStatus.checkEq = false;
                    checkStatus.checkSt = true;
                },
            ),
        [checkStatus, configs.st, form],
    );

    React.useEffect(() => {
        return reaction(
            () => form.select(configs.en.column)?.value,
            () => {
                checkStatus.checkEn = true;
                checkStatus.checkEq = false;
            },
        );
    }, [checkStatus, configs.en, form]);

    React.useEffect(
        () =>
            reaction(
                () => form.select(configs.eq.column)?.value,
                () => {
                    checkStatus.checkEn = false;
                    checkStatus.checkSt = false;
                    checkStatus.checkEq = true;
                },
            ),
        [checkStatus, configs.eq, form],
    );

    const handleChangeCheckSt = () => {
        checkStatus.checkEq = false;
        checkStatus.checkSt = !checkStatus.checkSt;

        return form.submit();
    };

    const handleChangeCheckEn = () => {
        checkStatus.checkEq = false;
        checkStatus.checkEn = !checkStatus.checkEn;

        return form.submit();
    };

    const handleChangeCheckEq = () => {
        checkStatus.checkEn = false;
        checkStatus.checkSt = false;
        checkStatus.checkEq = !checkStatus.checkEq;

        return form.submit();
    };

    return useObserver(() => (
        <Grid container direction="column" spacing={1}>
            <Grid item>
                <Grid container spacing={1} wrap="nowrap" alignItems="center">
                    <Grid item>
                        <Checkbox
                            checked={checkStatus.checkSt}
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
                            checked={checkStatus.checkEn}
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
                            checked={checkStatus.checkEq}
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
