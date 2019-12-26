// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {Grid} from "@material-ui/core";
import {setComponent, mapComponents} from "@essence/essence-constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {withTranslation, WithT} from "@essence/essence-constructor-share/utils";
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

type PropsType = WithT & PropsStoreType & BuilderPanelDynamicType;

export class BaseBuilderPanelDynamic extends React.Component<PropsType> {
    render() {
        const {store, bc, disabled, hidden, editing, readOnly, pageStore, visible} = this.props;

        if (hidden) {
            return null;
        }

        const content = (
            <Grid container spacing={0} direction="column" data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}>
                {mapComponents(store.recordsStore.records, (ChildComp, child, index) => {
                    let childBc = child;

                    if (!child[VAR_RECORD_PAGE_OBJECT_ID]) {
                        childBc = {
                            ...child,
                            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_child_${index}`,
                        };
                        logger(
                            this.props.t("static:c3513e8150484b31a4ad4227f9664e7f", {
                                name: childBc[VAR_RECORD_PAGE_OBJECT_ID],
                            }),
                        );
                    }

                    return (
                        <Grid item key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
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
    withTranslation("meta"),
    commonDecorator,
    observer,
)(BaseBuilderPanelDynamic);

setComponent("DYNAMICPANEL", BuilderPanelDynamic);

export default BuilderPanelDynamic;
