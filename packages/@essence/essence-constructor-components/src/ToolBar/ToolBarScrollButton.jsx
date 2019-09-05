// @flow
import * as React from "react";
import get from "lodash/get";
import ButtonBase from "@material-ui/core/ButtonBase";
import {withStyles} from "@material-ui/core/styles";
import {animate} from "@essence/essence-constructor-share/utils";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {styleTheme} from "../constants";

const styles = (theme: any) => ({
    active: {
        color: theme.palette.primary.main,
    },
    button: {
        width: 30,
    },
    disable: {
        color: theme.palette.grey.arrow,
    },
    lightButton: {
        borderLeft: `1px solid ${theme.palette.primary.main}`,
        borderRight: `1px solid ${theme.palette.primary.main}`,
        width: 30,
    },
});

type PropsType = {
    direction: "left" | "right",
    onClick?: Function,
    visible?: boolean,
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
};

const MENU_WIDTH = 160;

function calcLeftSctoll(toolbars: HTMLElement, scrollLeft: number): number {
    const maxWidth = toolbars.children[0].children.length * MENU_WIDTH;
    const hiddenRightWidth = maxWidth - scrollLeft - toolbars.offsetWidth;

    const scrollRight = Math.floor(hiddenRightWidth / MENU_WIDTH) * MENU_WIDTH;

    return maxWidth - toolbars.offsetWidth - scrollRight;
}

class ToolBarScrollButton extends React.Component<PropsType> {
    handleCickScroll = (event: SyntheticEvent<HTMLButtonElement>) => {
        const {direction} = this.props;
        const {currentTarget} = event;
        const toolbars: HTMLElement = get(currentTarget, "parentElement.children.1");
        const scrollLeft =
            direction === "left"
                ? toolbars.scrollLeft - toolbars.offsetWidth
                : toolbars.scrollLeft + toolbars.offsetWidth;

        const newScrollLeft =
            direction === "left"
                ? calcLeftSctoll(toolbars, scrollLeft)
                : Math.floor(scrollLeft / MENU_WIDTH) * MENU_WIDTH;

        animate("scrollLeft", toolbars, newScrollLeft);
    };

    render() {
        const {direction, visible, classes} = this.props;

        return (
            <ButtonBase
                onClick={this.handleCickScroll}
                className={styleTheme === "light" ? classes.lightButton : classes.button}
                disableRipple
                tabIndex="-1"
            >
                <Icon
                    iconfont={direction === "left" ? "arrow-left" : "arrow-right"}
                    size="2x"
                    className={visible ? classes.active : classes.disable}
                />
            </ButtonBase>
        );
    }
}

export default withStyles(styles)(ToolBarScrollButton);
