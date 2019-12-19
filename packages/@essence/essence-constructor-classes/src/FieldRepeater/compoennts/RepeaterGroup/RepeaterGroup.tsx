import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents, IBuilderConfig, toColumnStyleWidth} from "@essence/essence-constructor-share";
import {EditorContex, IEditorContext} from "@essence/essence-constructor-share/context";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence/essence-constructor-share/constants";
import {IRepeaterGroupProps} from "./RepeaterGroup.types";

export const RepeaterGroup: React.FC<IRepeaterGroupProps> = (props) => {
    // eslint-disable-next-line no-unused-vars
    const {bc, field, form, mode, isDisabledDel, storeName, ...fieldProps} = props;

    const deleteBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_MASTER_ID]: storeName,
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_delete`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            defaultvalue: field.key,
            disabled: bc.maxvalue,
            handler: "onDel",
            hiddenrules: bc.minvalue,
            iconfont: "close",
            onlyicon: "true",
            type: "BTN",
        }),
        [bc, field.key, storeName],
    );
    const editorValue: IEditorContext = React.useMemo(
        () => ({
            form: field,
            mode: mode || "1",
        }),
        [field, mode],
    );

    return (
        <Grid container spacing={1}>
            <EditorContex.Provider value={editorValue}>
                {mapComponents(bc.childs, (ChildCmp, bcChild) => (
                    <Grid item key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]} xs style={toColumnStyleWidth(bcChild.width)}>
                        <ChildCmp {...fieldProps} bc={bcChild} />
                    </Grid>
                ))}
            </EditorContex.Provider>
            <Grid item>
                {mapComponents([deleteBtnConfig], (ChildCmp, bcChild) => (
                    <ChildCmp
                        key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}
                        {...props}
                        bc={bcChild}
                        disabled={isDisabledDel}
                    />
                ))}
            </Grid>
        </Grid>
    );
};
