// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import memoize from "lodash/memoize";
import {BuilderPanel, BuilderForm, PageModel, withModelDecorator} from "@essence/essence-constructor-components";
import {saveToStore, removeFromStore, WithT, withTranslation} from "@essence/essence-constructor-share/utils";
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
type PropsType = WithT & StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
    authStore: stores.authStore,
});

const getConfig = memoize((trans) => ({
    childs: [
        {
            ckPageObject: "theme",
            clearable: "false",
            column: "theme",
            cvDisplayed: "0b5e4673fa194e16a0c411ff471d21d2",
            datatype: "combo",
            displayfield: "name",
            noglobalmask: "true",
            querymode: "remote",
            records: [
                {name: trans("66ef0068472a4a0394710177f828a9b1"), value: "dark"},
                {name: trans("fd7c7f3539954cc8a55876e3514906b5"), value: "light"},
            ],
            type: "IFIELD",
            valuefield: "value",
        },
    ],
    ckPageObject: "ChangeTheme",
    readonly: "false",
    type: "PANEL",
}));

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
        const config = getConfig(this.props.t);
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
    withTranslation("meta"),
    observer,
)(MenuTheme);
