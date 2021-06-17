import * as React from "react";
import {useField, IField, IForm} from "@essence-community/constructor-share/Form";
import {Grid} from "@material-ui/core";
import {mapComponents} from "@essence-community/constructor-share/components";
import {ParentFieldContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {toColumnStyleWidth, entriesMapSort} from "@essence-community/constructor-share/utils/transform";
import {IClassProps, IRecord, FieldValue} from "@essence-community/constructor-share/types";

const MAX_PANEL_WIDTH = 12;
const CLEAR_VALUE: FieldValue[] = [];

export const FieldSetContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const parentField = React.useContext(ParentFieldContext);
    const output = React.useMemo(() => {
        return (field: IField, form: IForm) => {
            const obj: IRecord = {};
            const keyChild = new RegExp(`^${field.key}\\.(\\d+)\\.([^\\.]+)$`, "u");

            entriesMapSort(form.fields).forEach(([key, fieldChild]) => {
                if (keyChild.test(key)) {
                    const keyParent = key.replace(keyChild, "$1");

                    obj[keyParent] = fieldChild.output(fieldChild, form);
                }
            });

            return parentField && parentField.output
                ? parentField.output(field, form, Object.values(obj))
                : Object.values(obj);
        };
    }, [parentField]);
    const outputChild = React.useCallback((field: IField, form: IForm, value) => {
        return {
            column: field.bc.column,
            datatype: field.bc.datatype,
            value: value || field.value,
        };
    }, []);
    const inputChild = React.useCallback((initialValues: IRecord, field: IField, form: IForm): any => {
        const parent = field.key.split(".");
        const key = parent.pop();

        parent.pop();
        const fieldParent = form.select(parent.join("."));

        if (!fieldParent || !fieldParent.value || !Array.isArray(fieldParent.value)) {
            return [false, undefined];
        }
        const value = fieldParent.value.find((val) => val.column === key);

        if (value) {
            return [true, value.value];
        }

        return field.defaultValue ? [true, field.defaultValue] : [false, undefined];
    }, []);
    const field = useField({bc, clearValue: CLEAR_VALUE, disabled, hidden, isArray: true, output, pageStore});
    const {contentview} = bc;
    const isRow = contentview === "hbox";
    const parentContext = React.useMemo(
        () =>
            (bc.childs || []).map((val, index) => ({
                input: inputChild,
                key: `${field.key}.${index}`,
                output: outputChild,
                parentFieldKey: field.key,
            })),
        [bc, inputChild, field, outputChild],
    );

    return (
        <Grid container spacing={1} direction={isRow ? "row" : "column"} wrap={isRow ? "nowrap" : "wrap"}>
            {mapComponents(bc.childs, (ChildComp, child, index) => (
                <ParentFieldContext.Provider
                    key={child[VAR_RECORD_PAGE_OBJECT_ID] ? child[VAR_RECORD_PAGE_OBJECT_ID] : `child_${index}`}
                    value={parentContext[index]}
                >
                    <Grid item xs={isRow ? true : MAX_PANEL_WIDTH} style={toColumnStyleWidth(child.width)}>
                        <ChildComp {...props} bc={child} />
                    </Grid>
                </ParentFieldContext.Provider>
            ))}
        </Grid>
    );
};
