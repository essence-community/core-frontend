// @flow
import * as React from "react";
import {mount, shallow} from "enzyme";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {themeVars} from "../Theme";

export {ANIMATION_TIMEOUT} from "../constants";
export {sleep} from "./base";

export const theme = createMuiTheme(themeVars);
export const MIN_REQUEST_TIME = 30;
export const MAX_REQUEST_TIME = 100;

const InjectProps = ({el, ...props}) => (
    <MuiThemeProvider theme={theme}>
        {React.Children.map(el, (child) => React.cloneElement(child, props))}
    </MuiThemeProvider>
);

export const mountWithTheme = (el: React.Node) => mount(<InjectProps el={el} />);
export const mountShallowWithTheme = (el: React.Node) => mount(shallow(<InjectProps el={el} />).get(0));

export const getBaseBc = (name: string, props?: Object) => ({
    ckObject: name,
    ckPageObject: name,
    cvName: name,
    datatype: name,
    ...props,
});
