import {List, ListItem, Popover} from "@material-ui/core";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useTranslation} from "@essence-community/constructor-share/utils";
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

    const [trans] = useTranslation("meta");

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
                    {trans("static:33c9b02a9140428d9747299b9a767abb")}
                </ListItem>
                <ListItem onClick={handleClose} button {...menuListProps}>
                    {trans("static:74776ef247274a55a2a76f7df34ffe41")}
                </ListItem>
                <ListItem onClick={handleCloseOther} button {...menuListProps}>
                    {trans("static:63b54227225e4ea5a2ba644eced838ec")}
                </ListItem>
                <ListItem onClick={handleCloseAllRight} button {...menuListProps}>
                    {trans("static:bceed776538747b9a0c88d4f73b70711")}
                </ListItem>
                <ListItem onClick={handleCloseAll} button {...menuListProps}>
                    {trans("static:a0cb66a96d8740a19397ece02d537f86")}
                </ListItem>
            </List>
        </Popover>
    ));
};
