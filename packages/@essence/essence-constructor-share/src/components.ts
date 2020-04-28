import {ReactChild} from "react";
import {VAR_RECORD_CV_VALUE, VAR_RECORD_CV_CV_TYPE, VAR_RECORD_CLASS_ATTRIBUTES, VAR_RECORD_CK_ATTR} from "./constants";
import {IClassProps, IBuilderConfig} from "./types";
import {loadFiles} from "./utils/browser";

interface IComponent {
    component: React.ComponentType<IClassProps>;
}

interface IComponents {
    [$name: string]: IComponent;
}

interface IModule {
    loadingPromise: null | Promise<any>;
    isReady: false;
    moduleName: string;
    load: () => Promise<boolean>;
}

interface IModules {
    [$name: string]: IModule;
}

type TResolve = (ChildComp: React.ComponentType<IClassProps>, bc: IBuilderConfig, index: number) => null | ReactChild;

const components: IComponents = {};
const modules: IModules = {};

// @ts-ignore
window.components = components;
// @ts-ignore
window.modules = modules;

function findClassName(config: any): string {
    const datatypeAttribute = config[VAR_RECORD_CLASS_ATTRIBUTES].find(
        (attribute: any) => attribute[VAR_RECORD_CK_ATTR] === "datatype",
    );

    if (datatypeAttribute && datatypeAttribute[VAR_RECORD_CV_VALUE]) {
        return `${config.class[VAR_RECORD_CV_CV_TYPE]}.${datatypeAttribute[VAR_RECORD_CV_VALUE].toUpperCase()}`;
    }

    return config.class[VAR_RECORD_CV_CV_TYPE];
}

export function setComponent(componentName: string, componentInstance: React.ComponentType<IClassProps>) {
    if (!(componentName in components)) {
        components[componentName] = {
            component: componentInstance,
        };
    }
}

export function setModule(moduleName: string, files: string[], configs: any[]) {
    const moduleEssence: IModule = {
        isReady: false,
        load: () => {
            if (!moduleEssence.loadingPromise) {
                moduleEssence.loadingPromise = loadFiles(files);
            }

            return moduleEssence.loadingPromise;
        },
        loadingPromise: null,
        moduleName,
    };

    configs.forEach((config) => {
        const className: string = findClassName(config);

        modules[className] = moduleEssence;
    });
}

/**
 * Load modules for specific components
 *
 * @param componentNames {string[]} Name of components. Should be only name of modules.
 */
export function loadComponentsFromModules(componentNames: string[]) {
    // Get modules from all components
    const modulesToLoad = componentNames
        .filter((componentName: string) => Boolean(modules[componentName]))
        .map((componentName) => modules[componentName]);

    return Promise.all(
        // eslint-disable-next-line id-length
        modulesToLoad.map((m: IModule) => {
            return m.isReady ? true : m.load();
        }),
    );
}

export function getComponent(componentName: string): React.ComponentType<IClassProps> | null {
    const componentConfig = components[componentName];

    return componentConfig ? componentConfig.component : null;
}

/**
 * Render components by childs config.
 */
export function mapComponents(childs?: IBuilderConfig[], resolve?: TResolve) {
    if (!childs) {
        return null;
    }

    return childs.map((child, index) => {
        if (!child.type) {
            return null;
        }

        let ChildComp = child.datatype ? getComponent(`${child.type}.${child.datatype}`) : getComponent(child.type);

        if (!ChildComp && child.datatype) {
            ChildComp = getComponent(child.type);
        }

        if (!ChildComp) {
            return null;
        }

        return resolve ? resolve(ChildComp, child, index) : null;
    });
}

/**
 * Render components by one child config.
 */
export function mapComponentOne(child: IBuilderConfig, resolve?: TResolve) {
    if (!child || !child.type) {
        return null;
    }

    let ChildComp = child.datatype ? getComponent(`${child.type}.${child.datatype}`) : getComponent(child.type);

    if (!ChildComp && child.datatype) {
        ChildComp = getComponent(child.type);
    }

    if (!ChildComp) {
        return null;
    }

    return resolve ? resolve(ChildComp, child, 0) : null;
}
