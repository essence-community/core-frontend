// @flow

import * as React from "react";
import cn from "classnames";
import keycode from "keycode";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List/List";
import Paper from "@material-ui/core/Paper";
import Trigger from "rc-trigger";
import FocusableArrow from "../../../Components/Focusable/FocusableArrow";
import {type PageModelType} from "../../../stores/StoreTypes";
import {type BuilderGridType} from "../../BuilderGridType";
import commonDecorator, {type CommonDecoratorInjectType} from "../../../decorators/commonDecorator";
import GridColumnLinkItem from "./GridColumnLinkItem";
import styles from "./GridColumnLinkStyle";

type PropsType = CommonDecoratorInjectType & {
    bc: Object,
    gridBc: BuilderGridType,
    classes: {
        [$Keys<$Call<typeof styles, any>>]: string,
    },
    iconComponent: React.Node,
    pageStore: PageModelType,
    record?: Object,
    hidden?: boolean,
    disabled?: boolean,
    visible: boolean,
    theme?: Object,
};

type StateType = {
    isOpen: boolean,
    openTop: boolean,
};

const POPUP_ALIGN = {
    offset: [0, 0],
    overflow: {adjustY: true},
    points: ["tl", "bl"],
};

class GridColumnLink extends React.Component<PropsType, StateType> {
    state = {
        isOpen: false,
        openTop: false,
    };

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isOpen && this.state.isOpen) {
            this.props.pageStore.addScrollEvent(this.handleScroll);
        }
    }

    componentWillUnmount() {
        this.props.pageStore.removeScrollEvent(this.handleScroll);
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleScroll = () => {
        this.props.pageStore.removeScrollEvent(this.handleScroll);
        this.setState({isOpen: false});
    };

    handleClose = () => {
        this.setState((prevState) => (prevState.isOpen ? {isOpen: false} : null));
    };

    handlePopupAlign = (popupDomNode, align) => {
        const {openTop} = this.state;

        if (align.points[0] === "bl" && !openTop) {
            this.setState({openTop: true});
        }
        if (align.points[0] === "tl" && openTop) {
            this.setState({openTop: false});
        }
    };

    handlePopupVisibleChange = (isOpen) => {
        this.setState({isOpen});

        if (isOpen) {
            document.addEventListener("keydown", this.handleKeyDown);
        } else {
            document.removeEventListener("keydown", this.handleKeyDown);
        }
    };

    handleKeyDown = (event: KeyboardEvent) => {
        if (keycode(event) === "esc") {
            this.setState({isOpen: false});
            document.removeEventListener("keydown", this.handleKeyDown);
        }
    };

    getInnerEl = () => this.props.pageStore.pageInnerEl;

    renderIcon = (open) => {
        const {classes = {}, iconComponent, gridBc, disabled} = this.props;
        const {openTop} = this.state;

        return (
            <IconButton
                color="primary"
                disableRipple
                className={cn(classes.iconButtonRoot, {
                    [classes.iconButtonOpenRoot]: open,
                    [classes.iconButtonOpentop]: openTop,
                })}
                tabIndex="-1"
                disabled={disabled}
                data-page-object={`${gridBc.ckPageObject}-redirect-icon`}
                data-tabindex-grid="0"
            >
                {iconComponent}
            </IconButton>
        );
    };

    render() {
        if (this.props.hidden) {
            return null;
        }

        const {gridBc, pageStore, record, classes = {}, visible, theme} = this.props;
        const {openTop} = this.state;
        const {contextmenus = []} = gridBc;
        const linkClasses = {
            listItemRoot: classes.listItemRoot,
        };
        const popoverContent = (
            <Paper
                elevation={openTop ? 0 : 2}
                classes={{
                    root: openTop ? classes.popoverRootOpenTop : classes.popoverRoot,
                }}
            >
                <FocusableArrow focusableMount restoreFocusedElement>
                    <List className={classes.listRoot} disablePadding dense>
                        {contextmenus.map((bcMenu) => (
                            <GridColumnLinkItem
                                key={bcMenu.ckPageObject}
                                bc={bcMenu}
                                onClosePopover={this.handleClose}
                                record={record}
                                classes={linkClasses}
                                pageStore={pageStore}
                                visible={visible}
                            />
                        ))}
                    </List>
                </FocusableArrow>
            </Paper>
        );

        return (
            <Trigger
                action={["click"]}
                popup={popoverContent}
                popupAlign={POPUP_ALIGN}
                destroyPopupOnHide
                mask={false}
                popupPlacement="bottomLeft"
                prefixCls="rc-grid-column-link"
                popupVisible={this.state.isOpen}
                onPopupAlign={this.handlePopupAlign}
                getPopupContainer={this.getInnerEl}
                getDocument={this.getInnerEl}
                onPopupVisibleChange={this.handlePopupVisibleChange}
                popupStyle={{position: "absolute"}}
                zIndex={theme.zIndex.linkPopover}
            >
                {this.renderIcon(this.state.isOpen)}
            </Trigger>
        );
    }
}

export default compose(
    commonDecorator,
    withStyles(styles, {withTheme: true}),
)(GridColumnLink);
