// @flow
import * as React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import Popover from "../Popover/Popover";
import {styleTheme} from "../constants";
import {StyleToolBarLight} from "./StyleToolBarLight";
import {StyleToolBarDark} from "./StyleToolBarDark";

const styles = styleTheme === "light" ? StyleToolBarLight : StyleToolBarDark;

type PropsType = {
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    children?: any,
    iconfont: string,
    popoverProps?: Object,
};

const popoverPosition = {
    anchorOrigin: {
        horizontal: "right",
        vertical: "bottom",
    },
    transformOrigin: {
        horizontal: "right",
        vertical: "top",
    },
};

class ToolBarPopoverButton extends React.Component<PropsType> {
    renderButton = ({onOpen}) => {
        const {classes, iconfont} = this.props;

        return (
            <ButtonBase classes={{root: classes.button}} onClick={onOpen} disableRipple>
                <Icon iconfont={iconfont} size="2x" className={classes.icon} />
            </ButtonBase>
        );
    };

    render() {
        const {classes = {}, children} = this.props;

        return (
            <React.Fragment>
                <Popover popoverContent={children} paperClassName={classes.popoverPaper} {...popoverPosition}>
                    {this.renderButton}
                </Popover>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ToolBarPopoverButton);
