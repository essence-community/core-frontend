// @flow
import * as React from "react";
import {compose} from "recompose";
import {observe} from "mobx";
import {inject, observer, disposeOnUnmount} from "mobx-react";
import {BuilderPanel, BuilderForm, PageModel, withModelDecorator} from "@essence/essence-constructor-components";
import {saveToStore, removeFromStore} from "@essence/essence-constructor-share/utils";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import {type AuthModelType} from "../../Stores/AuthModel";
import {styleTheme} from "../../constants";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
    authStore: AuthModelType,
};
type OwnPropsType = {
    pageStore: Object,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
    authStore: stores.authStore,
});

const config = {
    childs: [
        {
            ckPageObject: "theme",
            clearable: "false",
            column: "theme",
            cvDisplayed: "Тема",
            datatype: "combo",
            displayfield: "name",
            noglobalmask: "true",
            querymode: "remote",
            records: [{name: "Темная тема", value: "dark"}, {name: "Светлая тема", value: "light"}],
            type: "IFIELD",
            valuefield: "value",
        },
    ],
    ckPageObject: "ChangeTheme",
    readonly: "false",
    type: "PANEL",
};

class MenuTheme extends React.Component<PropsType> {
    prevValues = {};

    handleSubmit = (values) => {
        if (styleTheme !== values.theme) {
            if (values.theme) {
                saveToStore("theme", values.theme);
            } else {
                removeFromStore("theme");
            }
            document.location.reload();
        }

        this.prevValues = values;
    };

    render() {
        const {pageStore} = this.props;
        const initialValues = {
            theme: styleTheme,
        };

        return (
            <BuilderForm
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
                submitOnChange
                pageStore={pageStore}
            >
                <BuilderPanel editing={true} bc={config} pageStore={pageStore} />
            </BuilderForm>
        );
    }
}

export default compose(
    inject(mapStoresToProps),
    withModelDecorator(
        (bc, {applicationStore}) =>
            new PageModel({
                applicationStore,
                ckPage: "info",
                initialBc: [],
            }),
        "pageStore",
    ),
    observer,
)(MenuTheme);
