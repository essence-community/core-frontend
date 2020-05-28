import * as React from "react";
import cn from "clsx";
import {useCommon} from "@essence-community/constructor-share/hooks";
import {IClassProps} from "@essence-community/constructor-share/types";
import {TabPanelModel} from "../../store/TabPanelModel";
import {useTab} from "../../hooks/useTab";
import {TabPanelPosition} from "../../TabPanel.types";
import {useStyles} from "./Tab.styles";

interface ITabProps extends IClassProps {
    isActive: boolean;
    store: TabPanelModel;
    label: string;
    value: string;
    positonName: TabPanelPosition;
}

export const Tab: React.FC<ITabProps> = React.memo((props) => {
    const {isActive, label, positonName} = props;
    const {hidden, disabled} = useCommon(props);
    const classes = useStyles();
    const {onChangeTab} = useTab({...props, disabled, hidden});
    const positionClassName = classes[positonName];

    return (
        <div
            className={cn(classes.root, classes.rootTheme, positionClassName, {
                [classes.active]: isActive,
                [classes.hidden]: hidden,
                [classes.disabled]: disabled,
            })}
            onClick={onChangeTab}
            data-qtip={label}
        >
            <div className={classes.label}>{label}</div>
        </div>
    );
});
