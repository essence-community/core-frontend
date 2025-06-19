declare module '@rsbuild/core' {
  export function defineConfig(config: any): any;
  export const rspack: any;
}

declare module '@rsbuild/plugin-react' {
  export function pluginReact(): any;
}

declare module '@module-federation/rsbuild-plugin' {
  export function pluginModuleFederation(options: any): any;
} 