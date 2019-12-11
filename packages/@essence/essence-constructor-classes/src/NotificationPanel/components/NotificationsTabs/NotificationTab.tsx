import {commonDecorator} from "@essence/essence-constructor-share/decorators";
import {VAR_RECORD_DISPLAYED} from "@essence/essence-constructor-share/constants/variables";
import {useTranslation} from "@essence/essence-constructor-share/utils";
import {Tab, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useStyles} from "./NotificationsTab.styles";
import {INotificationsTabProps} from "./NotificationsTab.types";

export const NotificationsTab: React.FC<INotificationsTabProps> = (props) => {
    const {bc, selected, hidden} = props;
    const classes = useStyles(props);
    const [trans] = useTranslation("meta");
    // @ts-ignore
    const cvDisplayed = trans(bc[VAR_RECORD_DISPLAYED]);

    return useObserver(() => (
        <Tab
            value={bc.value}
            data-qtip={cvDisplayed}
            data-page-object={`tab-${bc.value}`}
            tabIndex={-1}
            label={
                <React.Fragment>
                    <Typography
                        variant="body2"
                        noWrap
                        color="inherit"
                        className={clsx(classes.tabText, selected ? "selected" : false)}
                    >
                        {cvDisplayed}
                    </Typography>
                </React.Fragment>
            }
            classes={{
                root: classes.tabRoot,
            }}
            disableRipple
            style={{display: hidden ? "none" : undefined}}
            hidden={hidden}
            {...props}
        />
    ));
};

export default commonDecorator(NotificationsTab);
