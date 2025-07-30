import './index.css';
interface AppProps extends Record<string, any> {
    test?: string;
    test2?: string;
}
export declare const App: ({ dispatchMessage, ...nested }: AppProps) => import("react/jsx-runtime").JSX.Element;
declare const bridgeApp: () => {
    render(info: import("@module-federation/bridge-react").RenderParams): Promise<void>;
    destroy(info: import("@module-federation/bridge-react").DestroyParams): void;
};
export default bridgeApp;
