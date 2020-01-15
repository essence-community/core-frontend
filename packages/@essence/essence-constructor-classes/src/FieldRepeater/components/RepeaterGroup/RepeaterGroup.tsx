import * as React from "react";
import {Grid} from "@material-ui/core";
import {mapComponents, IBuilderConfig, toColumnStyleWidth} from "@essence-community/constructor-share";
import {EditorContex, IEditorContext} from "@essence-community/constructor-share/context";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_MASTER_ID,
    VAR_RECORD_PARENT_ID,
    VAR_RECORD_DISPLAYED,
    GRID_CONFIGS,
    GRID_ALIGN_CONFIGS,
} from "@essence-community/constructor-share/constants";
import {IRepeaterGroupProps} from "./RepeaterGroup.types";

export const RepeaterGroup: React.FC<IRepeaterGroupProps> = (props) => {
    // eslint-disable-next-line no-unused-vars
    const {bc, field, form, mode, isDisabledDel, storeName, deleteLabel, ...fieldProps} = props;
    const {contentview = "", align} = bc;

    const deleteBtnConfig: IBuilderConfig = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_DISPLAYED]: deleteLabel,
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
        [bc, deleteLabel, field.key, storeName],
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
            <Grid
                item
                xs
                container
                {...GRID_CONFIGS[contentview]}
                {...GRID_ALIGN_CONFIGS[`${align}-${contentview}`]}
                spacing={1}
            >
                <EditorContex.Provider value={editorValue}>
                    {mapComponents(bc.childs, (ChildCmp, bcChild) => (
                        <Grid
                            item
                            key={bcChild[VAR_RECORD_PAGE_OBJECT_ID]}
                            xs
                            style={toColumnStyleWidth(bcChild.width)}
                        >
                            <ChildCmp {...fieldProps} bc={bcChild} />
                        </Grid>
                    ))}
                </EditorContex.Provider>
            </Grid>
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
