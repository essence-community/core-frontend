// @flow
import * as React from "react";
import {withStyles} from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import styles from "./TabMenuContextStyles";

export type PopoverPositionType = {
    left: number,
    top: number,
};
type PropsType = {
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
                        Обновить
                    </ListItem>
                    <ListItem onClick={this.handleClose} {...menuListProps}>
                        Закрыть вкладку
                    </ListItem>
                    <ListItem onClick={this.handleCloseOther} {...menuListProps}>
                        Закрыть другие вкладки
                    </ListItem>
                    <ListItem onClick={this.handleCloseAllRight} {...menuListProps}>
                        Закрыть вкладки справа
                    </ListItem>
                    <ListItem onClick={this.handleCloseAll} {...menuListProps}>
                        Закрыть все вкладки
                    </ListItem>
                </List>
            </Popover>
        );
    }
}

export default withStyles(styles)(TabMenuContext);
