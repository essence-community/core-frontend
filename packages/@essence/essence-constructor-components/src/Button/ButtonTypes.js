// @flow
import * as React from "react";
import {type PageModelType} from "../stores/PageModel";
import {type ButtonConfigType} from "../stores/ButtonModel";

export type {ButtonConfigType};

export type ButtonPropsType = {
    bc: ButtonConfigType,
    children?: React.Node,
    component?: React.ComponentType<any>,
    pageStore: PageModelType,
    onlyicon?: boolean,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    readOnly?: boolean,
    className?: string,
    classNameIcon?: string,
    color: "primary" | "secondary" | "inherit",
    variant?: "icon" | "fab",
    componentProps?: Object,
    preventFocus: boolean,
    tabIndex?: string,
    highlight?: boolean,
    onClick?: (event: SyntheticEvent<HTMLButtonElement>) => void,
    handleClick?: (event: SyntheticEvent<HTMLButtonElement>) => void,
};
