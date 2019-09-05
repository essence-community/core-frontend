import {camelCase, upperFirst} from "lodash";
import * as mdiIcons from "mdi-react";
import * as React from "react";

interface IProps {
    iconfont: string;
    size: "xs" | "lg" | "2x" | "3x" | "4x" | "5x";
}

const SIZE_MAP = {
    "2x": 48,
    "3x": 72,
    "4x": 96,
    "5x": 120,
    lg: 32,
    xs: 18,
};

const MDIIcon = ({iconfont, size, ...otherPops}: IProps) => {
    const name = upperFirst(camelCase(iconfont.replace("mdi-", "")));
    // @ts-ignore
    const IconComponent = mdiIcons[`${name}Icon`];

    return IconComponent ? <IconComponent size={SIZE_MAP[size]} {...otherPops} /> : null;
};

export default MDIIcon;
