// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import Grid from "@material-ui/core/Grid/Grid";
import {setComponent, mapComponents} from "@essence/essence-constructor-share";
import {loggerRoot} from "../constants";
import withModelDecorator from "../decorators/withModelDecorator";
import {type PageModelType} from "../stores/PageModel";
import {type BuilderBaseType} from "../BuilderType";
import commonDecorator, {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {DynamicPanelModel, type DynamicPanelType} from "../stores/DynamicPanelModel";

const logger = loggerRoot.extend("DynamicPanel");

export type BuilderPanelDynamicBCType = BuilderBaseType & {
    type: "DYNAMICPANEL",
    childs?: Array<Object>,
};

export type BuilderPanelDynamicType = CommonDecoratorInjectType & {
    bc: BuilderPanelDynamicBCType,
    editing?: boolean,
    pageStore: PageModelType,
};

type PropsStoreType = {|
    store: DynamicPanelModel,
|};

type PropsType = PropsStoreType & BuilderPanelDynamicType;

export class BaseBuilderPanelDynamic extends React.Component<PropsType> {
    render() {
        const {store, bc, disabled, hidden, editing, readOnly, pageStore, visible} = this.props;

        if (hidden) {
            return null;
        }

        const content = (
            <Grid container spacing={0} direction="column" data-page-object={bc.ckPageObject}>
                {mapComponents(store.recordsStore.records, (ChildComp, child, index) => {
                    let childBc = child;

                    if (!child.ckPageObject) {
                        childBc = {
                            ...child,
                            ckPageObject: `${bc.ckPageObject}_child_${index}`,
                        };
                        logger(
                            "Поле может работать некорректно без ck_page_object, автогенерируемое значение:",
                            childBc.ckPageObject,
                        );
                    }

                    return (
                        <Grid item key={childBc.ckPageObject}>
                            <ChildComp
                                bc={childBc}
                                editing={editing}
                                disabled={disabled}
                                readOnly={readOnly}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        );

        return content;
    }
}

const BuilderPanelDynamic = compose(
    withModelDecorator(
        (bc: BuilderPanelDynamicBCType, {pageStore}: BuilderPanelDynamicType): DynamicPanelType =>
            new DynamicPanelModel({bc, pageStore}),
    ),
    commonDecorator,
    observer,
)(BaseBuilderPanelDynamic);

setComponent("DYNAMICPANEL", BuilderPanelDynamic);

export default BuilderPanelDynamic;
