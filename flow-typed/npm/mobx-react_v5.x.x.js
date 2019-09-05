declare module "mobx-react" {
    declare function Provider(props: {children: React$Node}): React$Node;
    declare function observer<T: React$ComponentType<*>>(component: T): T;

    /*
     * We can't know at design time the type of properties on the object returned
     * by mapperFunction, flow can't require specific props
     */
    declare function inject<Props>(
        mapperFunction: Function,
    ): (component: React$ComponentType<Props>) => React$ComponentType<*>;

    declare function onError((Error) => mixed): void;

    /**
     * disposeOnUnmount
     */
    declare type Disposer = () => mixed;
    declare function disposeOnUnmount(target: React$Component<any, any>, propertyKey: string): void;
    declare function disposeOnUnmount(
        target: React$Component<any, any>,
        fn: Disposer | Disposer[]
    ): void;
}
