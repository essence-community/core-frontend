interface IClassClasses {
    [className: string]: React.CSSProperties | (() => React.CSSProperties) | undefined;
}

export interface IOverrides {
    [name: string]: undefined | IClassClasses;
}

export function mergeOverridesDeep<T extends IOverrides>(origin?: T, changes?: T): T | undefined {
    if (!changes || !origin) {
        return origin || changes;
    }

    const clonedOrigin = {...origin};

    for (const key in changes) {
        if (Object.prototype.hasOwnProperty.call(changes, key)) {
            const classes: IClassClasses | undefined = origin[key];
            const clonedProperties: IClassClasses = classes ? {...classes} : {};
            const newComponentClasses = changes[key];

            for (const className in newComponentClasses) {
                if (Object.prototype.hasOwnProperty.call(newComponentClasses, className)) {
                    clonedProperties[className] = {
                        ...clonedProperties[className],
                        ...newComponentClasses[className],
                    };
                }
            }

            (clonedOrigin as any)[key] = clonedProperties;
        }
    }

    return clonedOrigin;
}
