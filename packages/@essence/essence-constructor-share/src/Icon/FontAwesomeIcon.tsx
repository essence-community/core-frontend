import cn from "classnames";
import * as React from "react";
import FontAwesome from "react-fontawesome";

interface IProps {
    iconfont: string;
    className?: string;
    size?: "xs" | "lg" | "2x" | "3x" | "4x" | "5x" | "";
}

const FontAwesomeIcon = ({iconfont, size = "", className: classNameParent, ...otherProps}: IProps) => {
    const name = iconfont.replace("fa-", "");
    const className = cn(classNameParent, {[`fa-${size}`]: size});

    return <FontAwesome {...otherProps} name={name} className={className} />;
};

export default FontAwesomeIcon;
