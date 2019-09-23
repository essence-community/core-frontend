// @flow
import * as React from "react";
import {Tabs} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {styleTheme} from "../constants";
import ScrollButton from "./ToolBarScrollButton";
import {StyleToolBarLight} from "./StyleToolBarLight";
import {StyleToolBarDark} from "./StyleToolBarDark";

const styles = styleTheme === "light" ? StyleToolBarLight : StyleToolBarDark;

type Props = {
    classes?: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    children?: any,
    onChange?: (event: SyntheticEvent<>, tabValue: string) => void,
    value?: string,
};

class ToolBarTabs extends React.Component<Props> {
    render() {
        const {classes = {}, children, value, onChange} = this.props;

        return (
            <Tabs
                value={value}
                classes={{
                    flexContainer: classes.tabsFlexContainer,
                    indicator: classes.indicator,
                    root: classes.tabsRoot,
                    scroller: classes.scroller,
                }}
                onChange={onChange}
                variant="scrollable"
                scrollButtons="on"
                ScrollButtonComponent={ScrollButton}
            >
                {children}
            </Tabs>
        );
    }
}

export default withStyles(styles)(ToolBarTabs);
