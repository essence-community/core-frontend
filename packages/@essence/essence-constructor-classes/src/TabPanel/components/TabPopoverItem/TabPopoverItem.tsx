import * as React from "react";
import cn from "clsx";
import {IClassProps} from "@essence-community/constructor-share/types";
import {useCommon} from "@essence-community/constructor-share/hooks";
import {useTab} from "../../hooks/useTab";
import {TabPanelModel} from "../../store/TabPanelModel";
import {useStyles} from "./TabPopoverItem.styles";

interface ITabPopoverItemProps extends IClassProps {
    isActive: boolean;
    store: TabPanelModel;
    label: string;
    value: string;
    onClose: (event: React.SyntheticEvent) => void;
}

export const TabPopoverItem: React.FC<ITabPopoverItemProps> = (props) => {
    const {hidden, disabled} = useCommon(props);
    const {onChangeTab} = useTab({...props, disabled, hidden});
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
        <div className={className} onClick={handleClick} data-qtip={props.label}>
            <div className={classes.label}>{props.label}</div>
        </div>
    );
};
