import * as React from "react";
import {commonDecorator, ICommonHOCProps} from "@essence-community/constructor-share";
import {useTab} from "../../hooks/useTab";
import {TabPanelModel} from "../../store/TabPanelModel";
import {useStyles} from "./TabPopoverItem.styles";

interface ITabPopoverItemComponentProps extends ICommonHOCProps {
    isActive: boolean;
    store: TabPanelModel;
    label: string;
    value: string;
}

export const TabPopoverItemComponent: React.FC<ITabPopoverItemComponentProps> = (props) => {
    const {onChangeTab} = useTab(props);
    const classes = useStyles();

    return (
        <div className={`${classes.root} ${classes.rootTheme}`} onClick={onChangeTab}>
            <div className={classes.label}>{props.label}</div>
        </div>
    );
};

export const TabPopoverItem = commonDecorator(TabPopoverItemComponent);
