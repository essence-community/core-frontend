/* eslint-disable max-lines-per-function */
import * as React from "react";
import { Grid } from "@material-ui/core";
import { toColumnStyleWidthBc } from "@essence-community/constructor-share/utils/transform";
import { IClassProps, IModuleClassProps } from "@essence-community/constructor-share/types";
import { loadRemoteModule } from "@essence-community/constructor-share/utils/federationModule";
import { settingsStore, snackbarStore } from "@essence-community/constructor-share/models";
import { VAR_RECORD_NAME, VAR_SETTING_PROJECT_LOADER } from "@essence-community/constructor-share/constants";
import { noop, parseMemoize } from "@essence-community/constructor-share/utils";
import { WindowContext } from "@essence-community/constructor-share/context";
import { reaction } from "mobx";
import { useModel } from "@essence-community/constructor-share/hooks/useModel";
import { useObserver } from "mobx-react";
import cn from "clsx";
import { useGetValue } from "@essence-community/constructor-share/hooks/useCommon/useGetValue";
import { IBuilderClassConfig, IConfigMF } from "../types";
import { ModuleFederationModel } from "../store/ModuleFederationModel";
import { useStyles } from "./ModuleFederationContainer.style";
import { ErrorBoundary, PageLoader } from "@essence-community/constructor-share/uicomponents";
import { createRemoteComponent } from "@module-federation/bridge-react";

const DEFAULT_PROPS = {};

const checkValue = (
    val: string | Record<string, any>,
    defaultValue = DEFAULT_PROPS,
    errorCalcBack: (err: Error) => void = noop,
) => {
    let res = defaultValue;

    try {
        res = typeof val === "string" ? JSON.parse(val) : JSON.parse(JSON.stringify(val));
    } catch (err) {
        res = defaultValue;
        errorCalcBack(err);
    }

    return res;
};

export const ModuleFederationContainer: React.FC<IClassProps<IBuilderClassConfig>> = (props) => {
    const { bc, disabled, hidden, pageStore } = props;
    const [storeComponent, setStoreComponent] = React.useState<{ Component: Record<string, React.FC<IModuleClassProps>>, export: string }>(null);
    const [propsComponent, setPropsComponent] = React.useState(DEFAULT_PROPS);
    const [mfConfig, setMfConfig] = React.useState<IConfigMF>(null);
    const getValue = useGetValue({ pageStore });
    const windowContext = React.useContext(WindowContext);
    const [store] = useModel((options) => new ModuleFederationModel(options), {
        applicationStore: pageStore.applicationStore,
        bc,
        disabled,
        getValue,
        hidden,
        pageStore,
    });
    const classes = useStyles();

    React.useEffect(() => {
        store.setGetValue(getValue);
        store.setWindowContext(windowContext);
    }, [getValue, store, windowContext]);

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
        const getError = (err: Error) => {
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: `Component name ${bc[VAR_RECORD_NAME]}: Module Federation config parse error`,
                },
                pageStore.route,
            );

            snackbarStore.snackbarOpenAction(
                {
                    status: "debug",
                    text: err.stack,
                },
                pageStore.route,
            );
        };

        if (bc.mfconfig) {
            setMfConfig((oldValue) => checkValue(bc.mfconfig, oldValue, getError) as IConfigMF);
        }
        if (bc.mfconfigrule) {
            return reaction(
                () => parseMemoize(bc.mfconfigrule).runer({ get: store.getValue }) as string | Record<string, any>,
                (val) => {
                    setMfConfig((oldValue) => checkValue(val, oldValue, getError) as IConfigMF);
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [bc, pageStore, store]);

    React.useEffect(() => {
        const getError = (err: Error) => {
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: `Component ${bc[VAR_RECORD_NAME]}: Module Federation load error`,
                },
                pageStore.route,
            );

            snackbarStore.snackbarOpenAction(
                {
                    status: "debug",
                    text: err.stack,
                },
                pageStore.route,
            );
        };

        const loadFail = (err: Error) => {
            if (bc.mfconfigfail) {
                return loadRemoteModule(bc.mfconfigfail).then(
                    (comp) => {
                        setStoreComponent({ Component: comp, export: bc.mfconfigfail.className || "default" });
                    },
                    () => {
                        getError(err);
                    },
                );
            }
            getError(err);
        };

        if (mfConfig) {
            loadRemoteModule(mfConfig).then(
                (comp) => {
                    setStoreComponent({ Component: comp, export: mfConfig.className || "default" });
                },
                (err: Error) => {
                    return loadFail(err);
                },
            );
        }
    }, [bc, mfConfig, pageStore]);
    React.useEffect(() => {
        const getError = (err: Error) => {
            snackbarStore.snackbarOpenAction(
                {
                    status: "error",
                    text: `Component name ${bc[VAR_RECORD_NAME]}: Module Federation load component config error`,
                },
                pageStore.route,
            );

            snackbarStore.snackbarOpenAction(
                {
                    status: "debug",
                    text: err.stack,
                },
                pageStore.route,
            );
        };

        if (bc.mfcomponentconfig) {
            setPropsComponent((oldValue) => checkValue(bc.mfcomponentconfig, oldValue, getError));
        }

        if (bc.mfcomponentconfigrule) {
            return reaction(
                () =>
                    parseMemoize(bc.mfcomponentconfigrule).runer({ get: store.getValue }) as string | Record<string, any>,
                (val) => {
                    setPropsComponent((oldValue) => checkValue(val, oldValue, getError));
                },
                {
                    fireImmediately: true,
                },
            );
        }
    }, [bc, pageStore, store]);

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

    return useObserver(() => {
        if (!storeComponent || !storeComponent.Component) {
            return null;
        }

        return (
            <Grid
                container
                item
                spacing={0}
                alignItems="stretch"
                style={contentStyle}
                className={cn({ [classes.fullScreen]: store.isFullScreen })}
            >
                <Grid item xs={12} alignItems="stretch" zeroMinWidth>
                    <ErrorBoundary fallback={React.createElement(createRemoteComponent({
                        loader: async () => storeComponent.Component,
                        loading: (<PageLoader
                            container={pageStore.pageEl}
                            isLoading
                            loaderType={
                                settingsStore.settings[VAR_SETTING_PROJECT_LOADER] as "default" | "bfl-loader"
                            }
                        />),
                        fallback: null,
                        export: storeComponent.export,
                    }), finalPropsComponent)}>
                        {React.createElement(storeComponent.Component[storeComponent.export], finalPropsComponent)}
                    </ErrorBoundary>

                </Grid>
            </Grid>
        );
    });
};
