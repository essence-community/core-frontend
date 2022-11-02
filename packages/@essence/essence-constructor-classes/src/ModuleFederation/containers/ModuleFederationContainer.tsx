import * as React from "react";
import {Grid} from "@material-ui/core";
import {deepFind, toColumnStyleWidthBc} from "@essence-community/constructor-share/utils/transform";
import {IClassProps, IModuleClassProps, IPageModel} from "@essence-community/constructor-share/types";
import {loadRemoteModule} from "@essence-community/constructor-share/utils/federationModule";
import {snackbarStore} from "@essence-community/constructor-share/models";
import {
    VAR_RECORD_NAME,
    VAR_RECORD_RES_STACK_TRACE,
    VAR_RESULT_MESSAGE,
} from "@essence-community/constructor-share/constants";
import {parseMemoize} from "@essence-community/constructor-share/utils";
import {
    RecordContext,
    FormContext,
    ParentFieldContext,
    WindowContext,
} from "@essence-community/constructor-share/context";
import {reaction} from "mobx";
import {useModel} from "@essence-community/constructor-share/hooks/useModel";
import {IBuilderClassConfig} from "../types";
import {ModuleFederationModel} from "../store/ModuleFederationModel";
import {useStyles} from "./ModuleFederationContainer.style";

const DEFAULT_PROPS = {};

const checkValue = (
    bc: IBuilderClassConfig,
    pageStore: IPageModel,
    val: string | Record<string, any>,
    defaultValue = DEFAULT_PROPS,
) => {
    let res = defaultValue;

    try {
        res = typeof val === "string" ? JSON.parse(val) : JSON.parse(JSON.stringify(val));
    } catch (err) {
        res = defaultValue;
        snackbarStore.checkValidResponseAction(
            {
                [VAR_RECORD_RES_STACK_TRACE]: err.stack,
                [VAR_RESULT_MESSAGE]: {
                    error: [[`Component ${bc[VAR_RECORD_NAME]}: Module Federation load config error`]],
                },
            } as any,
            {applicationStore: pageStore.applicationStore},
        );
    }

    return res;
};

export const ModuleFederationContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const {bc, disabled, hidden, pageStore} = props;
    const [storeComponent, setStoreComponent] = React.useState<{Component: React.FC<IModuleClassProps>}>(null);
    const [propsComponent, setPropsComponent] = React.useState(DEFAULT_PROPS);
    const recordContext = React.useContext(RecordContext);
    const formContext = React.useContext(FormContext);
    const parentFieldContext = React.useContext(ParentFieldContext);
    const windowContext = React.useContext(WindowContext);
    const [store] = useModel((options) => new ModuleFederationModel(options), {
        applicationStore: pageStore.applicationStore,
        bc,
        disabled,
        hidden,
        pageStore,
    });
    const classes = useStyles();

    React.useEffect(() => {
        store.setFormContext(formContext);
        store.setParentFieldContext(parentFieldContext);
        store.setRecordContext(recordContext);
        store.setWindowContext(windowContext);
    }, [formContext, parentFieldContext, recordContext, store, windowContext]);

    const contentStyle = React.useMemo(
        () => ({
            height: bc.height,
            maxHeight: bc.maxheight ?? "100%",
            minHeight: bc.minheight,
            ...toColumnStyleWidthBc(bc),
        }),
        [bc],
    );

    React.useEffect(() => {
        if (bc.mfconfig) {
            loadRemoteModule(bc.mfconfig).then(
                (comp) => {
                    setStoreComponent({Component: comp[bc.mfconfig.className || "default"]});
                },
                (err: Error) => {
                    snackbarStore.checkValidResponseAction(
                        {
                            [VAR_RECORD_RES_STACK_TRACE]: err.stack,
                            [VAR_RESULT_MESSAGE]: {
                                error: [[`Component ${bc[VAR_RECORD_NAME]}: Module Federation load error`]],
                            },
                        } as any,
                        {applicationStore: pageStore.applicationStore},
                    );
                },
            );
        }
    }, [bc, pageStore.applicationStore]);
    React.useEffect(() => {
        if (bc.mfcomponentconfig) {
            setPropsComponent((oldValue) => checkValue(bc, pageStore, bc.mfcomponentconfig, oldValue));
        }

        if (bc.mfcomponentconfigrule) {
            const getValue = (name: string) => {
                if (name.charAt(0) === "g") {
                    return pageStore.globalValues.get(name);
                }

                if (recordContext) {
                    const [isExistRecord, recValue] = deepFind(recordContext, name);

                    if (isExistRecord) {
                        return recValue;
                    }
                }

                if (formContext) {
                    const values = formContext.values;

                    if (parentFieldContext) {
                        const [isExistParent, val] = deepFind(values, `${parentFieldContext.key}.${name}`);

                        if (isExistParent) {
                            return val;
                        }
                    }

                    const [isExist, val] = deepFind(values, name);

                    if (isExist) {
                        return val;
                    }
                }

                return undefined;
            };

            setPropsComponent((oldValue) =>
                checkValue(bc, pageStore, parseMemoize(bc.mfcomponentconfigrule).runer({get: getValue}), oldValue),
            );

            return reaction(
                () => parseMemoize(bc.mfcomponentconfigrule).runer({get: getValue}),
                (val) => {
                    setPropsComponent((oldValue) => checkValue(bc, pageStore, val, oldValue));
                },
            );
        }
    }, [bc, formContext, pageStore, parentFieldContext, recordContext]);

    const finalPropsComponent = React.useMemo(
        () =>
            ({
                style: contentStyle,
                ...(props ? props : DEFAULT_PROPS),
                ...(propsComponent ? propsComponent : DEFAULT_PROPS),
                dispatchMessage: (...arg) => store.handleEventComponent(...arg),
            } as IModuleClassProps),
        [contentStyle, props, propsComponent, store],
    );

    if (!storeComponent) {
        return null;
    }

    return (
        <Grid container item spacing={0} alignItems="stretch" style={contentStyle}>
            <Grid item xs={12} alignItems="stretch" zeroMinWidth>
                <storeComponent.Component {...finalPropsComponent} />
            </Grid>
            <div className={disabled ? classes.disabled : ""}></div>
        </Grid>
    );
};
