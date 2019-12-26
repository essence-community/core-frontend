// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Popover, ListItem, List} from "@material-ui/core";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";
import styles from "./TabMenuContextStyles";

export type PopoverPositionType = {
    left: number,
    top: number,
};
type PropsType = WithT & {
    classes?: Object,
    open: boolean,
    position: PopoverPositionType,
    value?: string | number,
    pagesStore: any,
    onCloseMenu: (event: SyntheticEvent<>) => void,
    onClose: (value: string | number) => void,
};

class TabMenuContext extends React.Component<PropsType> {
    handleClose = (event: SyntheticEvent<>) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.props.value) {
            this.props.pagesStore.removePageAction(this.props.value);
        }

        this.props.onCloseMenu(event);
    };

    handleCloseOther = (event: SyntheticEvent<>) => {
        if (this.props.value) {
            this.props.pagesStore.removePageOtherAction(this.props.value);
        }

        this.props.onCloseMenu(event);
    };

    handleCloseAll = (event: SyntheticEvent<>) => {
        this.props.pagesStore.removeAllPagesAction();
        this.props.onCloseMenu(event);
    };

    handleRefresh = (event: SyntheticEvent<>) => {
        if (this.props.value) {
            this.props.pagesStore.reloadPageAction(this.props.value);
        }

        this.props.onCloseMenu(event);
    };

    handleCloseAllRight = (event: SyntheticEvent<>) => {
        if (this.props.value) {
            this.props.pagesStore.removeAllPagesRightAction(this.props.value);
        }

        this.props.onCloseMenu(event);
    };

    handlePopoverContextClick = (event: SyntheticEvent<>) => {
        event.preventDefault();
    };

    render() {
        const {open, position, onCloseMenu, classes = {}} = this.props;
        const menuListProps = {
            className: classes.listItem,
            disableGutters: true,
        };

        return (
            <Popover
                open={open}
                anchorReference="anchorPosition"
                anchorPosition={position}
                onClose={onCloseMenu}
                onContextMenu={this.handlePopoverContextClick}
                transformOrigin={{
                    horizontal: "left",
                    vertical: "top",
                }}
                classes={{paper: classes.popoverRoot}}
            >
                <List disablePadding dense>
                    <ListItem
                        onClick={this.handleRefresh}
                        {...menuListProps}
                        className={`${classes.listItem} ${classes.listItemDivider}`}
                    >
                        {this.props.t("static:33c9b02a9140428d9747299b9a767abb")}
                    </ListItem>
                    <ListItem onClick={this.handleClose} {...menuListProps}>
                        {this.props.t("static:74776ef247274a55a2a76f7df34ffe41")}
                    </ListItem>
                    <ListItem onClick={this.handleCloseOther} {...menuListProps}>
                        {this.props.t("static:63b54227225e4ea5a2ba644eced838ec")}
                    </ListItem>
                    <ListItem onClick={this.handleCloseAllRight} {...menuListProps}>
                        {this.props.t("static:bceed776538747b9a0c88d4f73b70711")}
                    </ListItem>
                    <ListItem onClick={this.handleCloseAll} {...menuListProps}>
                        {this.props.t("static:a0cb66a96d8740a19397ece02d537f86")}
                    </ListItem>
                </List>
            </Popover>
        );
    }
}

export default withTranslation("meta")(withStyles(styles)(TabMenuContext));
