
    export type RemoteKeys = 'app2/App';
    type PackageType<T> = T extends 'app2/App' ? typeof import('app2/App') :any;