import React from "react";
import type {ReactElement} from "react";
import type {IClassProps} from "@essence-community/constructor-share/types";
import {useModel} from "@essence-community/constructor-share/hooks";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";
import {mapComponents} from "@essence-community/constructor-share/components";
import {FormContext} from "@essence-community/constructor-share/context";
import {Box, Grid} from "@material-ui/core";
import {Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {GuiEditorPropertyModel} from "../stores/GuiEditorPropertyModel";

export function GuiEditorPropertyContainer(props: IClassProps): ReactElement {
    const {pageStore, bc} = props;
    const {applicationStore} = pageStore;
    const [store] = useModel((options) => new GuiEditorPropertyModel({...options, applicationStore}), props);

    return (
        <FormContext.Provider value={store.form}>
            <Scrollbars>
                <Box margin={2}>
                    <Grid container spacing={2} direction="column">
                        {mapComponents(bc.childs, (Child, childBc) => (
                            <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                <Child {...props} bc={childBc} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Scrollbars>
        </FormContext.Provider>
    );
}
