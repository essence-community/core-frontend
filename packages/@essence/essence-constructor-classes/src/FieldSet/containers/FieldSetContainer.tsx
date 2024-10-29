import * as React from "react";
import {useField, IField, IForm} from "@essence-community/constructor-share/Form";
import {Grid} from "@material-ui/core";
import {mapComponents, mapComponentOne} from "@essence-community/constructor-share/components";
import {ParentFieldContext} from "@essence-community/constructor-share/context";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import {entriesMapSort} from "@essence-community/constructor-share/utils/transform";
import {IClassProps, IRecord, FieldValue, IBuilderConfig} from "@essence-community/constructor-share/types";
import {useSizeChild} from "@essence-community/constructor-share/hooks";

const MAX_PANEL_WIDTH = 12;
const CLEAR_VALUE: FieldValue[] = [];

export const FieldSetContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const parentField = React.useContext(ParentFieldContext);
    const output = React.useMemo(() => {
        return (field: IField, form: IForm, value) => {
            const val = value || field.value;
            const obj: Record<string, any> = Array.isArray(val)
                ? val.reduce((res, rec, index) => {
                      res[index] = rec;

                      return res;
                  }, {})
                : {};
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

        if (field.defaultValue) {
            return [true, field.defaultValue];
        }

        if (field.defaultValueFn) {
            field.defaultValueFn(field, field.onChange, field.onClear);

            return [true, field.value];
        }

        return [false, undefined];
    }, []);
    const field = useField({bc, clearValue: CLEAR_VALUE, disabled, hidden, isArray: true, output, pageStore});
    const boxBc = React.useMemo(() => ({...bc, type: "BOX.NOCOMMONDECORATOR"} as IBuilderConfig), [bc]);
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

    const [childs, sizeChild] = useSizeChild(bc.childs);

    return mapComponentOne(boxBc, (ChildBox, childBoxBc) => (
        <ChildBox {...props} bc={childBoxBc}>
            {mapComponents(childs, (ChildComp, child, index) => (
                <ParentFieldContext.Provider
                    key={child[VAR_RECORD_PAGE_OBJECT_ID] ? child[VAR_RECORD_PAGE_OBJECT_ID] : `child_${index}`}
                    value={parentContext[index]}
                >
                    <Grid item xs={isRow ? true : MAX_PANEL_WIDTH} style={sizeChild[child[VAR_RECORD_PAGE_OBJECT_ID]]}>
                        <ChildComp {...props} bc={child} />
                    </Grid>
                </ParentFieldContext.Provider>
            ))}
        </ChildBox>
    ));
};
