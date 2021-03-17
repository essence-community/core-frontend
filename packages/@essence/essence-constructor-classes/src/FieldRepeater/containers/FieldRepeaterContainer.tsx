import * as React from "react";
import {IClassProps, IBuilderConfig, FieldValue, IRecord} from "@essence-community/constructor-share/types";
import {ApplicationContext, ParentFieldContext} from "@essence-community/constructor-share/context";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Grid} from "@material-ui/core";
import {useObserver} from "mobx-react";
import {useField} from "@essence-community/constructor-share/Form";
import {reaction} from "mobx";
import {IParentFieldContext} from "@essence-community/constructor-share/Form/types";
import {useModel, useFieldDisabled} from "@essence-community/constructor-share/hooks";
import {mapComponents} from "@essence-community/constructor-share/components";
import {Group} from "../components/Group";
import {FieldRepeaterModel} from "../Store/FieldRepeaterModel";
import {RepeaterGroup} from "../components/RepeaterGroup";

export const FieldRepeaterContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden, readOnly} = props;
    const clearValue = React.useMemo(() => {
        return [...Array(parseInt(bc.minsize || "0", 10))].map(() => ({}));
    }, [bc.minsize]);
    const defaultValueFn = React.useCallback(
        (field, onChange) => {
            if (bc.defaultvalue && typeof bc.defaultvalue === "string") {
                const val = JSON.parse(bc.defaultvalue);

                onChange(Array.isArray(val) ? val : []);
            } else if (Array.isArray(bc.defaultvalue)) {
                onChange(bc.defaultvalue);
            } else {
                onChange(clearValue);
            }
        },
        [bc.defaultvalue, clearValue],
    );

    const field = useField({
        bc,
        clearValue,
        defaultValueFn,
        disabled,
        hidden,
        isArray: true,
        pageStore,
    });
    const applicationStore = React.useContext(ApplicationContext);
    const [trans] = useTranslation("meta");
    const [store, , storeName] = useModel((options) => new FieldRepeaterModel(options), {
        applicationStore,
        bc,
        disabled,
        field,
        hidden,
        pageStore,
    });
    const addLabel = trans("static:3a5239ee97d9464c9c4143c18fda9815");
    const isDisabled = useFieldDisabled({disabled, form: field.form, readOnly});
    const addBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        (): IBuilderConfig => ({
            [VAR_RECORD_DISPLAYED]: addLabel,
            [VAR_RECORD_MASTER_ID]: storeName,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_add`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            disabled: bc.maxvalue !== undefined,
            handler: "onAdd",
            iconfont: "plus",
            onlyicon: true,
            type: "BTN",
        }),
        [addLabel, bc, storeName],
    );

    React.useEffect(() => {
        store.setField(field);
    }, [store, field]);

    // CORE-1538 - minzise - guaranteed minimum fields for the repeater
    React.useEffect(() => {
        const changeRepeat = () => {
            const val = (Array.isArray(field.value) ? [...field.value] : []) as FieldValue[];
            const minSize = bc.minsize ? parseInt(bc.minsize, 10) : undefined;

            if (minSize && val.length < minSize) {
                for (let idx = val.length; idx < minSize; idx += 1) {
                    val.push({});
                }
                field.onChange(val);
            }
        };

        if (field.form.editing) {
            changeRepeat();
        }

        return reaction(
            () => [field.form.editing, field.form.mode],
            ([isEdit]) => {
                if (isEdit) {
                    changeRepeat();
                }
            },
        );
    }, [bc.minsize, field]);

    const [parentContext, setParentContext] = React.useState<IParentFieldContext[]>([]);

    React.useEffect(() => {
        if (field) {
            setParentContext(
                Array.isArray(field.value) ? field.value.map((value, idx) => ({key: `${field.key}.${idx}`})) : [],
            );

            return reaction(
                () => field.value,
                (val) =>
                    setParentContext(Array.isArray(val) ? val.map((value, idx) => ({key: `${field.key}.${idx}`})) : []),
            );
        }

        return undefined;
    }, [field]);

    return useObserver(() => {
        const value = (Array.isArray(field.value) ? field.value : []) as FieldValue[];
        const maxSize = bc.maxsize && /[g_]/u.test(bc.maxsize) ? pageStore.globalValues.get(bc.maxsize) : bc.maxsize;
        const minSize = bc.minsize && /[g_]/u.test(bc.minsize) ? pageStore.globalValues.get(bc.minsize) : bc.minsize;
        const isHiddenAdd = (maxSize && maxSize <= value.length) || hidden;
        const isDisabledDel = (minSize && minSize >= value.length) || isDisabled;

        return (
            <Group error={Boolean(!isDisabled && !field.isValid)} isRow={false} bc={props.bc}>
                <Grid item xs={12}>
                    {value.map((childField: IRecord, idx: number) => (
                        <ParentFieldContext.Provider key={idx} value={parentContext[idx]}>
                            <RepeaterGroup
                                {...props}
                                disabled={isDisabled}
                                idx={idx}
                                isDisabledDel={isDisabledDel}
                                isHiddenDel={!field.form.editing}
                                storeName={storeName}
                                deleteLabel={trans("static:f7e324760ede4c88b4f11f0af26c9e97")}
                            />
                        </ParentFieldContext.Provider>
                    ))}
                </Grid>
                <Grid item xs={12} container justify="flex-end">
                    {mapComponents([addBtnConfig], (ChildCmp, bcChild) => (
                        <Grid item key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}>
                            <ChildCmp
                                {...props}
                                disabled={isDisabled}
                                bc={bcChild}
                                hidden={!field.form.editing || isHiddenAdd}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Group>
        );
    });
};
