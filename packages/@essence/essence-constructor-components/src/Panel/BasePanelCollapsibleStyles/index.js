// @flow
import merge from "lodash/merge";
import {styleTheme} from "../../constants";
import {BasePanelCollapsibleDark} from "./BasePanelCollapsibleDark";
import {BasePanelCollapsibleLight} from "./BasePanelCollapsibleLight";

const styles = styleTheme === "light" ? BasePanelCollapsibleLight : BasePanelCollapsibleDark;

const BasePanelCollapsibleStyles = (theme: any) => merge(styles(theme), {});

export default BasePanelCollapsibleStyles;
