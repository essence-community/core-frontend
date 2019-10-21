import {commonDecorator} from "@essence/essence-constructor-share/decorators";
import {Tab, Typography} from "@material-ui/core";
import cn from "classnames";
import {useObserver} from "mobx-react-lite";
import * as React from "react";
import {useStyles} from "./NotificationsTab.styles";
import {INotificationsTabProps} from "./NotificationsTab.types";

export const NotificationsTab: React.FC<INotificationsTabProps> = (props) => {
    const {bc, selected, hidden} = props;
    const classes = useStyles(props);

    return useObserver(() => (
        <Tab
            value={bc.value}
            data-qtip={bc.cvDisplayed}
            data-page-object={`tab-${bc.value}`}
            component={"div"}
            tabIndex={-1}
            label={
                <React.Fragment>
                    <Typography
                        variant="body2"
                        noWrap
                        color="inherit"
                        className={cn([classes.text, selected ? "selected" : ""])}
                    >
                        {bc.cvDisplayed}
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
