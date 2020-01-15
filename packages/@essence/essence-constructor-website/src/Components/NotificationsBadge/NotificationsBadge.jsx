// @flow
import * as React from "react";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {Badge} from "@material-ui/core";
import {snackbarStore} from "@essence-community/constructor-share/models";

type PropsType = {
    children: React.Node,
    classes: Object,
};

const NotificationsBadge = ({classes, children}: PropsType) =>
    snackbarStore.snackbarsCount ? (
        <Badge classes={classes} badgeContent={snackbarStore.snackbarsCount} max={99} color="primary">
            {children}
        </Badge>
    ) : (
        children
    );

export default compose(observer)(NotificationsBadge);
