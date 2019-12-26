// @flow
import * as React from "react";
import {observer} from "mobx-react";
import {Badge, ButtonBase} from "@material-ui/core";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {WithT, withTranslation} from "@essence/essence-constructor-share/utils";

type PropsType = WithT & {
    classes: {
        badge: string,
        badgeDisabled: string,
        btn: string,
        disabledBtn: string,
    },
    snackbarStore: any,
};
const MAX_SNACKBARS_BADGE = 99;

// eslint-disable-next-line id-length
const NotificationsReadButton = ({snackbarStore, classes, t}: PropsType) => {
    const disabled = !snackbarStore.snackbarsInStatusToReadCount;
    const button = (
        <ButtonBase
            onClick={snackbarStore.readActiveSnackbarsAction}
            classes={{
                disabled: classes.disabledBtn,
                root: classes.btn,
            }}
            disabled={disabled}
            disableRipple
            disableFocusRipple
            data-qtip={t("static:f42e28fe1287412fa6ec91b421377139")}
            data-page-object="snackbar-read-all"
        >
            <Icon iconfont="bell" iconfontname="fa" size="2x" />
        </ButtonBase>
    );

    return (
        <Badge
            badgeContent={
                snackbarStore.snackbarsInStatusToReadCount > MAX_SNACKBARS_BADGE
                    ? MAX_SNACKBARS_BADGE
                    : snackbarStore.snackbarsInStatusToReadCount
            }
            classes={{badge: disabled ? `${classes.badge} ${classes.badgeDisabled}` : classes.badge}}
            color="primary"
        >
            {button}
        </Badge>
    );
};

export default withTranslation("meta")(observer(NotificationsReadButton));
