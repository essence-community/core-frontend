// @flow
import * as React from "react";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import Badge from "@material-ui/core/Badge";
import {type ApplicationModelType} from "../../Stores/ApplicationModel";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type PropsType = StoresPropsType & {
    children: React.Node,
    classes: Object,
};

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});
const MAX_SNACKBARS = 99;

const NotificationsBadge = ({
    applicationStore: {
        snackbarStore: {snackbarsCount},
    },
    children,
}: PropsType) =>
    snackbarsCount ? (
        <Badge badgeContent={snackbarsCount > MAX_SNACKBARS ? "99" : snackbarsCount} color="primary">
            {children}
        </Badge>
    ) : (
        children
    );

export default compose(
    inject(mapStoresToProps),
    observer,
)(NotificationsBadge);
