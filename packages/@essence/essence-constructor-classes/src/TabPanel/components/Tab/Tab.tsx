import * as React from "react";
import cn from "clsx";
import {commonDecorator, ICommonHOCProps} from "@essence-community/constructor-share/decorators";
import {TabPanelModel} from "../../store/TabPanelModel";
import {useTab} from "../../hooks/useTab";
import {TabPanelPosition} from "../../TabPanel.types";
import {useStyles} from "./Tab.styles";

interface ITabComponentProps extends ICommonHOCProps {
    isActive: boolean;
    store: TabPanelModel;
    label: string;
    value: string;
    positonName: TabPanelPosition;
}

export const TabComponent: React.FC<ITabComponentProps> = React.memo((props) => {
    const {isActive, label, positonName, hidden, disabled} = props;
    const classes = useStyles();
    const {onChangeTab} = useTab(props);
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

export const Tab = commonDecorator(TabComponent);
