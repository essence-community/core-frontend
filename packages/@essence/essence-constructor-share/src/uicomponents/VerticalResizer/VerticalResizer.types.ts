export interface IVerticalResizerProps {
    minHeight?: number;
    maxHeight?: number;
    height: number;
    className?: string;
    onChangeHeight: (height: number) => void;
    getInitialHeight?: () => number;
}
