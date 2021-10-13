import * as React from "react";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {UIForm} from "@essence-community/constructor-share/uicomponents/UIForm";
import {useModel} from "@essence-community/constructor-share/hooks/useModel";
import {useObserver} from "mobx-react";
import {noop} from "@essence-community/constructor-share/utils";
import {createPortal} from "react-dom";
import {FormPanelModel} from "../store/FormPanelModel";
import {FormPanelGlobals} from "../components/FormPanelGlobals";
import {IBuilderClassConfig} from "../types";
import {useStyles} from "./FormPanelContainer.styles";

const EMPTY_OBJECT = {};

export const FormPanelContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {children, bc, pageStore} = props;
    const classes = useStyles();
    const boxBc = React.useMemo<IBuilderConfig>(() => ({...bc, type: "BOX.NOCOMMONDECORATOR"}), [bc]);
    const [store] = useModel((options) => new FormPanelModel(options), props);

    return useObserver(() => (
        <UIForm
            onSubmit={noop}
            className={classes.form}
            bc={bc}
            mode={store.mode}
            editing={store.editing}
            initialValues={store.selectedRecord || EMPTY_OBJECT}
            pageStore={pageStore}
        >
            {children
                ? children
                : mapComponentOne(boxBc, (Child, childBc) => (
                      <Child key={childBc.ck_page_object} {...props} bc={childBc} />
                  ))}
            <FormPanelGlobals bc={bc} pageStore={pageStore} />
            {store.editing ? createPortal(<div className={classes.mask}></div>, pageStore.pageEl) : null}
        </UIForm>
    ));
};
