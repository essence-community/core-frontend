import * as React from "react";
import cn from "clsx";
import {commonDecorator, ICommonHOCProps} from "@essence-community/constructor-share";
import {useTab} from "../../hooks/useTab";
import {TabPanelModel} from "../../store/TabPanelModel";
import {useStyles} from "./TabPopoverItem.styles";

interface ITabPopoverItemComponentProps extends ICommonHOCProps {
    isActive: boolean;
    store: TabPanelModel;
    label: string;
    value: string;
    onClose: (event: React.SyntheticEvent) => void;
}

export const TabPopoverItemComponent: React.FC<ITabPopoverItemComponentProps> = (props) => {
    const {onChangeTab} = useTab(props);
    const classes = useStyles();
    const className = cn(classes.root, classes.rootDefault, {
        [classes.active]: props.isActive,
        [classes.disabled]: props.disabled,
        [classes.hidden]: props.hidden,
    });

    const handleClick = (event: React.SyntheticEvent) => {
        onChangeTab(event);
        props.onClose(event);
    };

    return (
        <div className={className} onClick={handleClick}>
            <div className={classes.label}>{props.label}</div>
        </div>
    );
};

export const TabPopoverItem = commonDecorator(TabPopoverItemComponent);
