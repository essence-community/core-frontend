// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {ToolBarTabs, ToolBarTab, DragComponent} from "@essence-community/constructor-components";
import {VAR_RECORD_NAME, VAR_RECORD_ICON_NAME} from "@essence-community/constructor-share/constants";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import TabMenuContext from "../TabMenuContext/TabMenuContext";
import styles from "./AppBarTabsStyles/AppBarTabsStyles";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type PropsType = {classes?: Object} & StoresPropsType;
type StateType = {
    isOpenMenu: boolean,
    menuPosition: {
        left: number,
        top: number,
    },
    menuPageValue?: number | string,
};

const PAGE_WIDTH = 160;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

class AppBarTabs extends React.Component<PropsType, StateType> {
    state = {
        isOpenMenu: false,
        menuPageValue: "",
        menuPosition: {
            left: 0,
            top: 0,
        },
    };

    handleChangePage = (event, value) => {
        this.props.applicationStore.pagesStore.setPageAction(value);
    };

    handleContextMenu = (event: MouseEvent, value: string | number) => {
        event.preventDefault();

        this.setState({
            isOpenMenu: true,
            menuPageValue: value,
            menuPosition: {
                left: event.pageX,
                top: event.pageY,
            },
        });
    };

    handleCloseMenu = (event: SyntheticEvent<>) => {
        event.stopPropagation();
        this.setState({isOpenMenu: false});
    };

    handleMovePage = (dragIndex: number, hoverIndex: number) => {
        this.props.applicationStore.pagesStore.movePages(dragIndex, hoverIndex);
    };

    renderTabComponent = (props) => <DragComponent {...props} type="page" moveCard={this.handleMovePage} />;

    render() {
        const {
            applicationStore: {pagesStore},
            classes = {},
        } = this.props;
        const {isOpenMenu, menuPageValue, menuPosition} = this.state;

        return (
            <React.Fragment>
                <ToolBarTabs
                    value={pagesStore.activePage ? pagesStore.activePage.pageId : false}
                    onChange={this.handleChangePage}
                >
                    {pagesStore.pages.map(({route, pageId}, index) => {
                        const iconName = route[VAR_RECORD_ICON_NAME];

                        return (
                            <ToolBarTab
                                key={pageId}
                                component={this.renderTabComponent}
                                label={route[VAR_RECORD_NAME]}
                                iconfont={iconName}
                                value={pageId}
                                onClose={pagesStore.removePageAction}
                                onContextMenu={this.handleContextMenu}
                                pageIndex={index}
                                pageId={pageId}
                                className={classes.tabRoot}
                                style={{
                                    transform: `translateX(${index * PAGE_WIDTH}px)`,
                                }}
                            />
                        );
                    })}
                </ToolBarTabs>
                <TabMenuContext
                    open={isOpenMenu}
                    value={menuPageValue}
                    onClose={pagesStore.removePageAction}
                    onCloseMenu={this.handleCloseMenu}
                    position={menuPosition}
                    pagesStore={pagesStore}
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(inject(mapStoresToProps)(observer(AppBarTabs)));
