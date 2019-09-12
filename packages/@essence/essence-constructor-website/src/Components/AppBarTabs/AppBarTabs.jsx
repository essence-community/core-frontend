/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {ToolBarTabs, ToolBarTab, DragComponent} from "@essence/essence-constructor-components";
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
                    value={pagesStore.activePage ? pagesStore.activePage.ckPage : false}
                    onChange={this.handleChangePage}
                >
                    {pagesStore.pages.map(({route, ckPage}, index) => {
                        const iconName = route.cvIconName;

                        return (
                            <ToolBarTab
                                key={ckPage}
                                component={this.renderTabComponent}
                                label={route.cvName}
                                iconfont={iconName}
                                value={ckPage}
                                onClose={pagesStore.removePageAction}
                                onContextMenu={this.handleContextMenu}
                                pageIndex={index}
                                pageId={ckPage}
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
