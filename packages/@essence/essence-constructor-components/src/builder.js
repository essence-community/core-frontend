// @flow
import * as React from "react";

type ComponentsType = {
    [key: string]: React.Node,
};

export const components: ComponentsType = {};

export const addComponent = (name: string, component: React.Node) => {
    components[name] = component;
};
