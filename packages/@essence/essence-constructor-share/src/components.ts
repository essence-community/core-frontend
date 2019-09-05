// @ts-ignore
if (!window.components) {
    // @ts-ignore
    window.components = {};
}

// Const components = {};

export function setComponent(componentName: string, componentInstance: any) {
    // @ts-ignore
    if (!(componentName in window.components)) {
        // @ts-ignore
        window.components[componentName] = componentInstance;
    }
}

export function getComponent(componentName: string, componentCutomId: string) {
    const name = componentCutomId ? `${componentName}.${componentCutomId}` : componentName;
    // @ts-ignore
    return window.components[name] || null;
}

export function mapComponents(childs: any[], resolve: any) {
    if (!childs) {
        return null;
    }

    return childs.map((child, index) => {
        const ChildComp = getComponent(child.type, child.customid);

        if (!ChildComp) {
            return null;
        }

        return resolve(ChildComp, child, index);
    });
}
