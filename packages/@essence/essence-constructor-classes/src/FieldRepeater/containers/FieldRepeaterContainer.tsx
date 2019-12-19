import * as React from "react";
import {IClassProps, mapComponents, IBuilderConfig, useModel} from "@essence/essence-constructor-share";
import {ApplicationContext, EditorContex} from "@essence/essence-constructor-share/context";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence/essence-constructor-share/constants";
import {Grid} from "@material-ui/core";
import {Field, FormType} from "@essence/essence-constructor-share/types/Base";
import {useObserver} from "mobx-react-lite";
import {Group} from "../compoennts/Group";
import {FieldRepeaterModel} from "../Store/FieldRepeaterModel";
import {RepeaterGroup} from "../compoennts/RepeaterGroup";

interface IProps extends IClassProps {
    field: Field;
    form: FormType;
}

export const FieldRepeaterContainer: React.FC<IProps> = (props) => {
    const {field, bc, pageStore, disabled, hidden} = props;
    const applicationStore = React.useContext(ApplicationContext);
    const editorValue = React.useContext(EditorContex);
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
    const addBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_MASTER_ID]: storeName,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_add`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            disabled: bc.maxvalue,
            handler: "onAdd",
            iconfont: "plus",
            onlyicon: "true",
            type: "BTN",
        }),
        [bc, storeName],
    );

    return useObserver(() => {
        const maxSize = bc.maxsize && /[g_]/u.test(bc.maxsize) ? pageStore.globalValues.get(bc.maxsize) : bc.maxsize;
        const minSize = bc.minsize && /[g_]/u.test(bc.minsize) ? pageStore.globalValues.get(bc.minsize) : bc.minsize;
        const isHiddenAdd = (maxSize && maxSize <= field.fields.size) || hidden;
        const isDisabledDel = (minSize && minSize >= field.fields.size) || disabled;

        return (
            <Group error={Boolean(!disabled && !field.isValid)} isRow={false} bc={props.bc}>
                <Grid item xs={12}>
                    {[...field.fields.values()].map((childField: Field) => (
                        <RepeaterGroup
                            key={childField.id}
                            {...props}
                            mode={editorValue?.mode}
                            field={childField}
                            isDisabledDel={isDisabledDel}
                            storeName={storeName}
                        />
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
