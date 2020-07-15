import {commonDecorator} from "@essence-community/constructor-share/decorators";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants/variables";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Tab, Typography} from "@material-ui/core";
import clsx from "clsx";
import {useObserver} from "mobx-react";
import * as React from "react";
import {useStyles} from "./NotificationsTab.styles";
import {INotificationsTabProps} from "./NotificationsTab.types";

export const NotificationsTab: React.FC<INotificationsTabProps> = (props) => {
    const {bc, selected, hidden} = props;
    const classes = useStyles(props);
    const [trans] = useTranslation("meta");
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const label = displayed && trans(displayed);

    return useObserver(() => (
        <Tab
            value={bc.defaultvalue}
            data-qtip={label}
            data-page-object={`tab-${bc.defaultvalue}`}
            tabIndex={-1}
            label={
                <React.Fragment>
                    <Typography
                        variant="body2"
                        noWrap
                        color="inherit"
                        className={clsx(classes.tabText, selected ? "selected" : false)}
                    >
                        {label}
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
