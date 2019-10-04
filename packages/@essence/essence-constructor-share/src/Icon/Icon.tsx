import * as React from "react";
import FontAwesomeIcon from "./FontAwesomeIcon";
import MDIIcon from "./MDIIcon";

interface IProps {
    className?: string;
    iconfontname: "fa" | "mdi";
    iconfont: string;
    color?: string;
    size?: "xs" | "lg" | "2x" | "3x" | "4x" | "5x";
}

interface IChildIconProps {
    iconfont: string;
    className?: string;
    color?: string;
    size?: "xs" | "lg" | "2x" | "3x" | "4x" | "5x" | "";
}

interface IMapComponents {
    fa: React.ComponentType<IChildIconProps>;
    mdi: React.ComponentType<IChildIconProps>;
}

const mapComponents: IMapComponents = {
    fa: FontAwesomeIcon,
    mdi: MDIIcon,
};

export class Icon extends React.PureComponent<IProps> {
    public static defaultProps = {
        iconfontname: "fa",
    };

    public render() {
        const {iconfontname, iconfont, ...otherProps} = this.props;
        const Component = mapComponents[iconfontname];

        return Component && iconfont ? <Component iconfont={iconfont} {...otherProps} /> : null;
    }
}
