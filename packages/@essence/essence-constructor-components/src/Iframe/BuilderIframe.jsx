// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {setComponent} from "@essence/essence-constructor-share";
import {camelCaseMemoized, toSize} from "@essence/essence-constructor-share/utils";
import cn from "classnames";
import {observer} from "mobx-react";
import {compose} from "recompose";
import commonDecorator from "../decorators/commonDecorator";
import LineLoader from "../Components/Loaders/LineLoader";
import withModelDecorator from "../decorators/withModelDecorator";
import {IframeModel} from "../stores/IframeModel";
import {type BuilderBaseType} from "../BuilderType";
import styles from "./BuilderIframeStyles";
import {type PropsType, type DecoratorPropsType} from "./BuilderIframeTypes";

export const BuilderIframeComponent = (props: PropsType) => {
    const {bc, classes, pageStore, disabled, hidden, visible, store} = props;
    const {column} = bc;
    const {selectedRecord} = store.recordsStore;
    const height = bc.height ? toSize(bc.height) : undefined;
    const url = selectedRecord ? selectedRecord[camelCaseMemoized(column)] : "";

    if (hidden || !visible) {
        return null;
    }

    return (
        <div className={cn(classes.root)} style={{height}}>
            {disabled ? <div className={classes.disabled} /> : null}
            {store.recordsStore.isLoading ? (
                <div className={classes.loaderContainer}>
                    <LineLoader
                        loaderType={pageStore.applicationStore.settingsStore.settings.projectLoader}
                        size={100}
                    />
                </div>
            ) : (
                <iframe
                    className={classes.iframe}
                    title={bc.ckPageObject}
                    width="100%"
                    height={height}
                    src={url}
                    allowFullScreen
                />
            )}
        </div>
    );
};

const BuilderIframe = compose(
    withModelDecorator((bc: BuilderBaseType, {pageStore}: DecoratorPropsType) => new IframeModel({bc, pageStore})),
    commonDecorator,
    withStyles(styles),
    observer,
)(BuilderIframeComponent);

export default BuilderIframe;

setComponent("IFRAME", BuilderIframe);
