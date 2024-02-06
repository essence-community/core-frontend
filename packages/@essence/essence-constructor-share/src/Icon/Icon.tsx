import * as React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";

interface IProps {
    className?: string;
    iconfontname?: "fa" | "mdi";
    iconfont: string;
    color?: string;
    size?: "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x";
    onClick?(event: React.SyntheticEvent): void;
}

interface IChildIconProps {
    iconfont: string;
    className?: string;
    color?: string;
    size?: "xs" | "lg" | "1x" | "2x" | "3x" | "4x" | "5x" | "";
}

interface IMapComponents {
    fa: React.ComponentType<IChildIconProps>;
    mdi?: React.ComponentType<IChildIconProps>;
}

export const mapComponents: IMapComponents = {
    fa: FontAwesomeIcon,
};

export const Icon: React.FC<IProps> = (props) => {
    const {iconfontname = "fa", iconfont, ...otherProps} = props;
    const Component = React.useMemo(() => mapComponents[iconfontname], [iconfontname]);

    return Component && iconfont ? (
        <React.Suspense fallback={null}>
            <Component iconfont={iconfont} {...otherProps} />
        </React.Suspense>
    ) : null;
};
