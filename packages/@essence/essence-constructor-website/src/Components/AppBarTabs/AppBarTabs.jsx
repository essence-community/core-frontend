// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {ToolBarTabs, ToolBarTab} from "@essence-community/constructor-components";
import {VAR_RECORD_NAME, VAR_RECORD_ICON_NAME} from "@essence-community/constructor-share/constants";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";
import TabMenuContext from "../TabMenuContext/TabMenuContext";

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

    render() {
        const {
            applicationStore: {pagesStore},
        } = this.props;
        const {isOpenMenu, menuPageValue, menuPosition} = this.state;

        return (
            <React.Fragment>
                <ToolBarTabs
                    value={pagesStore.activePage ? pagesStore.activePage.pageId : false}
                    onChange={this.handleChangePage}
                >
                    {pagesStore.pages.map(({route, pageId}) => {
                        const iconName = route[VAR_RECORD_ICON_NAME];

                        return (
                            <ToolBarTab
                                key={pageId}
                                label={route[VAR_RECORD_NAME]}
                                iconfont={iconName}
                                value={pageId}
                                onClose={pagesStore.removePageAction}
                                onContextMenu={this.handleContextMenu}
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

export default inject(mapStoresToProps)(observer(AppBarTabs));
