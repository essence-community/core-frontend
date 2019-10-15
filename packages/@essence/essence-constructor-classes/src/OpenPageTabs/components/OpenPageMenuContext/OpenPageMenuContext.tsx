import {List, ListItem, Popover} from "@material-ui/core";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useStyles} from "./OpenPageMenuContext.styles";
import {IOpenPageMenuContextProps} from "./OpenPageMenuContext.types";

export const OpenPageMenuContext: React.FC<IOpenPageMenuContextProps> = (props) => {
    const classes = useStyles(props);
    const {open, position, onCloseMenu, pagesStore, value} = props;
    const menuListProps = {
        className: classes.listItem,
        disableGutters: true,
    };
    const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        if (value) {
            pagesStore.removePageAction(props.value);
        }

        onCloseMenu(event);
    };

    const handleCloseOther = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (value) {
            pagesStore.removePageOtherAction(props.value);
        }

        onCloseMenu(event);
    };

    const handleCloseAll = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        pagesStore.removeAllPagesAction();
        onCloseMenu(event);
    };

    const handleRefresh = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (value) {
            pagesStore.reloadPageAction(props.value);
        }

        onCloseMenu(event);
    };

    const handleCloseAllRight = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (value) {
            pagesStore.removeAllPagesRightAction(props.value);
        }

        onCloseMenu(event);
    };

    const handlePopoverContextClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
    };

    return useObserver(() => (
        <Popover
            open={open}
            anchorReference="anchorPosition"
            anchorPosition={position}
            onClose={onCloseMenu}
            onContextMenu={handlePopoverContextClick}
            transformOrigin={{
                horizontal: "left",
                vertical: "top",
            }}
            classes={{paper: classes.popoverRoot}}
        >
            <List disablePadding dense>
                <ListItem
                    onClick={handleRefresh}
                    button
                    {...menuListProps}
                    className={cn([classes.listItem, classes.listItemDivider])}
                >
                    Обновить
                </ListItem>
                <ListItem onClick={handleClose} button {...menuListProps}>
                    Закрыть вкладку
                </ListItem>
                <ListItem onClick={handleCloseOther} button {...menuListProps}>
                    Закрыть другие вкладки
                </ListItem>
                <ListItem onClick={handleCloseAllRight} button {...menuListProps}>
                    Закрыть вкладки справа
                </ListItem>
                <ListItem onClick={handleCloseAll} button {...menuListProps}>
                    Закрыть все вкладки
                </ListItem>
            </List>
        </Popover>
    ));
};
