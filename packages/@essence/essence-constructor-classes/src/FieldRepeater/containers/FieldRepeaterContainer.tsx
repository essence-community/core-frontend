import * as React from "react";
import {
    IClassProps,
    mapComponents,
    IBuilderConfig,
    useModel,
    FieldValue,
    IRecord,
} from "@essence-community/constructor-share";
import {ApplicationContext, ParentFieldContext} from "@essence-community/constructor-share/context";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Grid} from "@material-ui/core";
import {useObserver} from "mobx-react-lite";
import {useField} from "@essence-community/constructor-share/Form";
import {reaction} from "mobx";
import {IParentFieldContext} from "@essence-community/constructor-share/Form/types";
import {Group} from "../components/Group";
import {FieldRepeaterModel} from "../Store/FieldRepeaterModel";
import {RepeaterGroup} from "../components/RepeaterGroup";

export const FieldRepeaterContainer: React.FC<IClassProps> = (props) => {
    const {bc, pageStore, disabled, hidden} = props;
    const field = useField({bc, disabled, hidden, isArray: true, pageStore});
    const applicationStore = React.useContext(ApplicationContext);
    const [trans] = useTranslation("meta");
    const modelOptions = useModel((options) => new FieldRepeaterModel(options), {
        applicationStore,
        bc,
        disabled,
        field,
        hidden,
        pageStore,
    });
    // eslint-disable-next-line prefer-destructuring
    const storeName = modelOptions[2];
    const addLabel = trans("static:3a5239ee97d9464c9c4143c18fda9815");
    const addBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_DISPLAYED]: addLabel,
            [VAR_RECORD_MASTER_ID]: storeName,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_add`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            disabled: bc.maxvalue,
            handler: "onAdd",
            iconfont: "plus",
            onlyicon: "true",
            type: "BTN",
        }),
        [addLabel, bc, storeName],
    );

    // CORE-1538 - minzise - guaranteed minimum fields for the repeater
    React.useEffect(() => {
        const val = (Array.isArray(field.value) ? [...field.value] : []) as FieldValue[];
        const minSize = bc.minsize ? parseInt(bc.minsize, 10) : undefined;

        if (minSize && val.length < minSize) {
            for (let idx = val.length; idx < minSize; idx += 1) {
                val.push({});
            }
            field.onChange(val);
        }
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
        const value = (field.value || []) as FieldValue[];
        const maxSize = bc.maxsize && /[g_]/u.test(bc.maxsize) ? pageStore.globalValues.get(bc.maxsize) : bc.maxsize;
        const minSize = bc.minsize && /[g_]/u.test(bc.minsize) ? pageStore.globalValues.get(bc.minsize) : bc.minsize;
        const isHiddenAdd = (maxSize && maxSize <= value.length) || hidden;
        const isDisabledDel = (minSize && minSize >= value.length) || disabled;

        return (
            <Group error={Boolean(!disabled && !field.isValid)} isRow={false} bc={props.bc}>
                <Grid item xs={12}>
                    {value.map((childField: IRecord, idx: number) => (
                        <ParentFieldContext.Provider key={idx} value={parentContext[idx]}>
                            <RepeaterGroup
                                {...props}
                                idx={idx}
                                isDisabledDel={isDisabledDel}
                                storeName={storeName}
                                deleteLabel={trans("static:f7e324760ede4c88b4f11f0af26c9e97")}
                            />
                        </ParentFieldContext.Provider>
                    ))}
                </Grid>
                <Grid item xs={12} container justify="flex-end">
                    {mapComponents([addBtnConfig], (ChildCmp, bcChild) => (
                        <Grid item key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}>
                            <ChildCmp {...props} bc={bcChild} hidden={isHiddenAdd} />
                        </Grid>
                    ))}
                </Grid>
            </Group>
        );
    });
};
