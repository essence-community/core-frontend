import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents, IBuilderConfig, toColumnStyleWidth} from "@essence/essence-constructor-share";
import {EditorContex, IEditorContext} from "@essence/essence-constructor-share/context";
import {IRepeaterGroupProps} from "./RepeaterGroup.types";

export const RepeaterGroup: React.FC<IRepeaterGroupProps> = (props) => {
    // eslint-disable-next-line no-unused-vars
    const {bc, field, form, mode, isDisabledDel, storeName, deleteLabel, ...fieldProps} = props;

    const deleteBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        () => ({
            ckMaster: storeName,
            ckPageObject: `${bc.ckPageObject}_delete`,
            ckParent: bc.ckPageObject,
            cvDisplayed: deleteLabel,
            defaultvalue: field.key,
            disabled: bc.maxvalue,
            handler: "onDel",
            hiddenrules: bc.minvalue,
            iconfont: "close",
            onlyicon: "true",
            type: "BTN",
        }),
        [bc.ckPageObject, bc.maxvalue, bc.minvalue, deleteLabel, field.key, storeName],
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
                    <Grid item key={bcChild.ckPageObject} xs style={toColumnStyleWidth(bcChild.width)}>
                        <ChildCmp {...fieldProps} bc={bcChild} />
                    </Grid>
                ))}
            </EditorContex.Provider>
            <Grid item>
                {mapComponents([deleteBtnConfig], (ChildCmp, bcChild) => (
                    <ChildCmp key={bcChild.ckPageObject} {...props} bc={bcChild} disabled={isDisabledDel} />
                ))}
            </Grid>
        </Grid>
    );
};
