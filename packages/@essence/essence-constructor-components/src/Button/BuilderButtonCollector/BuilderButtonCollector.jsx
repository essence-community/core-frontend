// @flow
import * as React from "react";
import {compose} from "recompose";
import cn from "classnames";
import {withStyles} from "@material-ui/core/styles";
import {ListItem, List} from "@material-ui/core";
import noop from "lodash/noop";
import {setComponent} from "@essence/essence-constructor-share";
import {VAR_RECORD_PARENT_ID, VAR_RECORD_PAGE_OBJECT_ID} from "@essence/essence-constructor-share/constants";
import {Popover} from "@essence/essence-constructor-share/uicomponents";
import {styleTheme} from "../../constants";
import commonDecorator, {type CommonDecoratorInjectType} from "../../decorators/commonDecorator";
import Scrollbars from "../../Components/Scrollbars/Scrollbars";
import {type ButtonPropsType} from "../ButtonTypes";
import BuilderMobxButton from "../BuilderMobxButton";
import styles from "./BuilderButtonCollectorStyles";

const anchorOrigins = {
    dark: {
        horizontal: "right",
        vertical: "center",
    },
    window: {
        horizontal: "left",
        vertical: "top",
    },
};

const transformOrigins = {
    dark: {
        horizontal: -8,
        vertical: "center",
    },
    light: {
        horizontal: "left",
        vertical: 2,
    },
    window: {
        horizontal: "left",
        vertical: "bottom",
    },
};

const listItemProps = {
    button: true,
    disableGutters: true,
    tabIndex: 0,
};

const MAX_HEIGHT = 300;

type OwnPropsType = {
    tranformName: string,
    renderGridButtons: (props: Object) => React.Node,
    classes: Object,
    visible: boolean,
};
type PropsType = ButtonPropsType & CommonDecoratorInjectType & OwnPropsType;

class BaseBuilderButtonCollector extends React.Component<PropsType> {
    static defaultProps = {
        classes: {},
        preventFocus: false,
        renderGridButtons: noop,
        tranformName: styleTheme,
    };

    btns: Array<Object> = [];

    constructor(props: PropsType) {
        super(props);

        const {topbtn = []} = props.bc;

        this.btns = topbtn.map((btn) => ({
            ...btn,
            [VAR_RECORD_PARENT_ID]: props.bc[VAR_RECORD_PARENT_ID],
        }));
    }

    renderIcon = ({open, onOpen, onClose}) => {
        const {classes, tranformName, ...btnProps} = this.props;

        const className =
            tranformName === "window"
                ? cn(classes.iconButtonWindowRoot, {[classes.iconButtonWindowOpenRoot]: open})
                : cn(classes.iconButtonRoot, {[classes.iconButtonOpenRoot]: open});

        return (
            <BuilderMobxButton
                {...btnProps}
                readOnly={false}
                className={className}
                handleClick={open ? onClose : onOpen}
            />
        );
    };

    renderPopoverContnet = ({onClose}) => {
        const {
            pageStore,
            bc: {btncollectorall},
            classes,
            visible,
        } = this.props;

        const buttonProps = {
            className: classes.listItem,
            classNameIcon: classes.internalIcon,
            component: ListItem,
            componentProps: listItemProps,
            onlyicon: false,
        };

        return (
            <Scrollbars autoHeight autoHeightMax={MAX_HEIGHT}>
                <List disablePadding dense>
                    {this.btns.map((btn) => (
                        <BuilderMobxButton
                            key={btn[VAR_RECORD_PAGE_OBJECT_ID]}
                            component={ListItem}
                            bc={btn}
                            componentProps={listItemProps}
                            className={classes.listItem}
                            onClick={onClose}
                            classNameIcon={classes.internalIcon}
                            pageStore={pageStore}
                            visible={visible}
                        />
                    ))}
                    {btncollectorall === "true"
                        ? this.props.renderGridButtons({buttonProps, handleClose: onClose})
                        : null}
                </List>
            </Scrollbars>
        );
    };

    render() {
        const {hidden, pageStore, tranformName, classes} = this.props;

        if (hidden) {
            return null;
        }

        return (
            <Popover
                transformOrigin={transformOrigins[tranformName]}
                anchorOrigin={anchorOrigins[tranformName]}
                popoverContent={this.renderPopoverContnet}
                container={pageStore.pageEl}
                paperClassName={cn(classes.popoverRoot, {[classes.popoverWindowRoot]: tranformName === "window"})}
                width="auto"
                pageStore={pageStore}
                hideOnScroll
                focusableMount
                restoreFocusedElement
                tabFocusable={false}
            >
                {this.renderIcon}
            </Popover>
        );
    }
}

const BuilderButtonCollector = compose(commonDecorator, withStyles(styles))(BaseBuilderButtonCollector);

setComponent("BTNCOLLECTOR", BuilderButtonCollector);

export default BuilderButtonCollector;
