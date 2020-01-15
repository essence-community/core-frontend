// @flow
import * as React from "react";
import cn from "classnames";
import omit from "lodash/omit";
import noop from "lodash/noop";
import {Tab as MaterialTab, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence-community/constructor-share/Icon";
import {WithT, withTranslation} from "@essence-community/constructor-share/utils";
import {styleTheme} from "../constants";
import {StyleToolBarLight} from "./StyleToolBarLight";
import {StyleToolBarDark} from "./StyleToolBarDark";

const styles = styleTheme === "light" ? StyleToolBarLight : StyleToolBarDark;

type PropsType<ValueType> = WithT & {
    classes?: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    value: ValueType,
    iconfont?: string,
    label?: string,
    selected?: boolean,
    component?: React.Node,
    onClose?: (value: ValueType) => void,
    onContextMenu: (event: SyntheticEvent<>, value: string | number) => void,
};

class ToolBarTab extends React.Component<PropsType<string | number>> {
    static defaultProps = {
        onContextMenu: noop,
    };

    handleClose = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.props.onClose) {
            this.props.onClose(this.props.value);
        }
    };

    handleClickContext = (event: SyntheticEvent<>) => {
        this.props.onContextMenu(event, this.props.value);
    };

    render() {
        // eslint-disable-next-line id-length
        const {classes = {}, value, iconfont, label, t, ...materialTabProps} = this.props;
        const isActive = this.props.selected;
        const iconNode = iconfont && (
            <Icon iconfont={iconfont} className={cn(classes.tabIcon, {[classes.activeTabIcon]: isActive})} />
        );
        const translatedLabel = t(label);

        return (
            <MaterialTab
                value={value}
                icon={iconNode}
                data-qtip={translatedLabel}
                data-page-object={`tab-${value}`}
                component={this.props.component || "div"}
                tabIndex="-1"
                label={
                    <React.Fragment>
                        <Typography variant="body2" noWrap color="inherit" className={classes.text}>
                            {translatedLabel}
                        </Typography>
                        <Icon
                            iconfont="times"
                            onClick={this.handleClose}
                            className={isActive ? classes.activeCloseIcon : classes.closeIcon}
                        />
                    </React.Fragment>
                }
                classes={{
                    root: classes.tabRoot,
                    selected: classes.activeTab,
                    wrapper: isActive ? classes.activeTabWrapper : classes.tabWrapper,
                }}
                disableRipple
                {...omit(materialTabProps, ["onClose"])}
                onContextMenu={this.handleClickContext}
            />
        );
    }
}

export default withStyles(styles)(withTranslation("meta")(ToolBarTab));
