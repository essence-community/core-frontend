import {List, ListItem, Popover} from "@material-ui/core";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import useStyles from "./OpenPageMenuContext.style";
import { IOpenPageMenuContextProps } from "./OpenPageMenuContext.types";

export const OpenPageMenuContext = (props: IOpenPageMenuContextProps) => {
    const classes: Record<string, string> = useStyles(props);
    const {open, position, onCloseMenu} = props;
    const menuListProps = {
        className: classes.listItem,
        disableGutters: true,
    };
    const handleClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        event.stopPropagation();

        if (props.value) {
            props.pagesStore.removePageAction(props.value);
        }

        props.onCloseMenu(event);
    };

    const handleCloseOther = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.value) {
            props.pagesStore.removePageOtherAction(props.value);
        }

        props.onCloseMenu(event);
    };

    const handleCloseAll = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        props.pagesStore.removeAllPagesAction();
        props.onCloseMenu(event);
    };

    const handleRefresh = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.value) {
            props.pagesStore.reloadPageAction(props.value);
        }

        props.onCloseMenu(event);
    };

    const handleCloseAllRight = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.value) {
            props.pagesStore.removeAllPagesRightAction(props.value);
        }

        props.onCloseMenu(event);
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
                {...menuListProps}
                className={cn([classes.listItem, classes.listItemDivider])}
            >
                Обновить
            </ListItem>
            <ListItem onClick={handleClose} {...menuListProps}>
                Закрыть вкладку
            </ListItem>
            <ListItem onClick={handleCloseOther} {...menuListProps}>
                Закрыть другие вкладки
            </ListItem>
            <ListItem onClick={handleCloseAllRight} {...menuListProps}>
                Закрыть вкладки справа
            </ListItem>
            <ListItem onClick={handleCloseAll} {...menuListProps}>
                Закрыть все вкладки
            </ListItem>
        </List>
    </Popover>
        ));
};