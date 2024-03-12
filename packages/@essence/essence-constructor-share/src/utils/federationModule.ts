import {VAR_SETTING_BASE_URL} from "../constants";
import {settingsStore} from "../models";
import {isEmpty} from "./base";

/* eslint-disable @typescript-eslint/ban-ts-comment */
type Scope = unknown;
type Factory = () => any;

interface IContainer {
    init(shareScope: Scope): void;
    get(module: string): Factory;
}

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: {default: Scope};

const moduleMap = {} as Record<string, boolean>;

async function loadRemoteEntry(options: ILoadRemoteModuleOptions): Promise<void> {
    if (moduleMap[options.remoteEntry]) {
        return;
    }
    if (isEmpty(options.remoteEntry)) {
        return Promise.reject(new Error("remoteEntry is empty"));
    }
    const baseUrl = settingsStore.settings[VAR_SETTING_BASE_URL];

    if (options.remoteCssEntry && options.remoteCssEntry.length) {
        await Promise.all(
            options.remoteCssEntry
                .filter((opt) => !isEmpty(opt.remoteEntry))
                .map(
                    (opt) =>
                        new Promise<void>((resolve, reject) => {
                            const remoteEntry = new URL(
                                opt.remoteEntry.startsWith("http") ? opt.remoteEntry : `${baseUrl}${opt.remoteEntry}`,
                            );

                            remoteEntry.searchParams.append("t", `${new Date().getTime()}`);
                            const linkTag = document.createElement("link");

                            linkTag.href = remoteEntry.toString();
                            linkTag.rel = "stylesheet";
                            linkTag.type = "text/css";

                            linkTag.onload = () => resolve();
                            linkTag.onerror = reject;
                            // @ts-ignore
                            linkTag.onreadystatechange = () => resolve();

                            document.body.append(linkTag);
                        }),
                ),
        );
    }
    await new Promise<void>((resolve, reject) => {
        const remoteEntry = new URL(
            options.remoteEntry.startsWith("http") ? options.remoteEntry : `${baseUrl}${options.remoteEntry}`,
        );

        remoteEntry.searchParams.append("t", `${new Date().getTime()}`);
        const script = document.createElement("script");

        script.src = remoteEntry.toString();

        script.onerror = reject;

        script.onload = () => {
            moduleMap[options.remoteEntry] = true;
            resolve(); // window is the global namespace
        };
        // @ts-ignore
        script.onreadystatechange = script.onload;
        document.body.append(script);
    });
}

async function lookupExposedModule<T = any>(remoteName: string, exposedModule: string): Promise<T> {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__("default");
    const container = (window as any)[remoteName] as IContainer; // or get the container somewhere else
    // Initialize the container, it may provide shared modules

    await container.init(__webpack_share_scopes__.default);
    const factory = await container.get(exposedModule);
    const Module = factory();

    return Module as T;
}

export interface ILoadRemoteCssOptions {
    remoteEntry: string;
}

export interface ILoadRemoteModuleOptions {
    remoteEntry: string;
    remoteName: string;
    exposedModule: string;
    remoteCssEntry?: ILoadRemoteCssOptions[];
}

export async function loadRemoteModule<T = any>(options: ILoadRemoteModuleOptions): Promise<T> {
    await loadRemoteEntry(options);

    return await lookupExposedModule<T>(options.remoteName, options.exposedModule);
}
