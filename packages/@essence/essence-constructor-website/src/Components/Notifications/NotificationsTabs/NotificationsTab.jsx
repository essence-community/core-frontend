// @flow
import * as React from "react";
import cn from "classnames";
import {Grid, Typography} from "@material-ui/core";

export type ValueType = "all" | "info" | "error" | "warning" | "notification" | "debug";

type PropsType = {
    classes: Object,
    value: ValueType,
    selectedValue: ValueType,
    label: string,
    onChangeTab: (value: ValueType) => void,
};

class NotificationsTab extends React.Component<PropsType> {
    handleClick = () => {
        this.props.onChangeTab(this.props.value);
    };

    render() {
        const {classes, selectedValue, value, label} = this.props;

        return (
            <Grid
                item
                className={cn(classes.tabRoot, {[classes.selectedTab]: value === selectedValue})}
                onClick={this.handleClick}
            >
                <Typography variant="body2" color="inherit">
                    {label}
                </Typography>
            </Grid>
        );
    }
}

export default NotificationsTab;
