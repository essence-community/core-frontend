import type {ReactElement} from "react";
import type {IClassProps, IBuilderConfig, IModuleConfig} from "@essence-community/constructor-types";
import {VAR_RECORD_CV_VALUE, VAR_RECORD_CV_CV_TYPE, VAR_RECORD_CLASS_ATTRIBUTES, VAR_RECORD_CK_ATTR} from "./constants";
import {loadFiles} from "./browser";

interface IComponent {
    component: React.ComponentType<IClassProps>;
}

interface IComponents {
    [$name: string]: IComponent;
}

interface IModuleLoader {
    loadingPromise: null | Promise<void[]>;
    isReady: false;
    moduleName: string;
    load: () => Promise<void[]>;
}

interface IModules {
    [$name: string]: IModuleLoader;
}

type TResolve = (ChildComp: React.ComponentType<IClassProps>, bc: IBuilderConfig, index: number) => null | ReactElement;

const components: IComponents = {};
const modules: IModules = {};

(window as any).components = components;
(window as any).modules = modules;

function findClassName(config: IModuleConfig): string {
    const datatypeAttribute = config[VAR_RECORD_CLASS_ATTRIBUTES].find(
        (attribute) => attribute[VAR_RECORD_CK_ATTR] === "datatype",
    );

    if (datatypeAttribute && datatypeAttribute[VAR_RECORD_CV_VALUE]) {
        return `${config.class[VAR_RECORD_CV_CV_TYPE]}.${datatypeAttribute[VAR_RECORD_CV_VALUE].toUpperCase()}`;
    }

    return config.class[VAR_RECORD_CV_CV_TYPE];
}

export function setComponent(componentName: string, componentInstance: React.ComponentType<IClassProps>): void {
    if (!(componentName in components)) {
        components[componentName] = {
            component: componentInstance,
        };
    }
}

export function setModule(moduleName: string, files: string[], configs: IModuleConfig[]): void {
    const moduleEssence: IModuleLoader = {
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
export function loadComponentsFromModules(componentNames: string[]): Promise<void[][]> {
    // Get modules from all components
    const modulesToLoad = componentNames
        .filter((componentName: string) => Boolean(modules[componentName]))
        .map((componentName) => modules[componentName]);

    return Promise.all(
        // eslint-disable-next-line id-length
        modulesToLoad.map((m: IModuleLoader) => {
            return m.isReady ? undefined : m.load();
        }),
    );
}

export function getComponent(componentName: string): React.ComponentType<IClassProps> | null {
    const componentConfig = components[componentName];

    return componentConfig ? componentConfig.component : null;
}

export function getComponentByBc(bc: IBuilderConfig): React.ComponentType<IClassProps> | undefined {
    let componentConfig = bc.datatype ? components[`${bc.type}.${bc.datatype}`] : components[bc.type];

    if (!componentConfig && bc.datatype) {
        componentConfig = components[bc.type];
    }

    if (!componentConfig) {
        return undefined;
    }

    return componentConfig ? componentConfig.component : undefined;
}

/**
 * Render components by childs config.
 */
export function mapComponents(childs?: IBuilderConfig[], resolve?: TResolve): null | (null | ReactElement)[] {
    if (!childs) {
        return null;
    }

    return childs.map((child, index) => {
        const ChildComp = getComponentByBc(child);

        return resolve && ChildComp !== undefined ? resolve(ChildComp, child, index) : null;
    });
}

/**
 * Render components by one child config.
 */
export function mapComponentOne(child: IBuilderConfig, resolve?: TResolve): null | React.ReactElement {
    const ChildComp = getComponentByBc(child);

    return resolve && ChildComp !== undefined ? resolve(ChildComp, child, 0) : null;
}
