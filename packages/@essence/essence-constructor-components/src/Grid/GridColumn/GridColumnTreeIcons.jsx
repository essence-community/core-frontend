// @flow
import * as React from "react";
import cn from "classnames";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {Icon} from "@essence/essence-constructor-share/Icon";
import {VAR_RECORD_LEAF} from "@essence/essence-constructor-share/constants";

const style = (theme: any) => ({
    icon: {
        color: theme.palette.text.dark,
        height: 17,
        marginRight: 10,
        width: "17px !important",
    },
    whiteColor: {
        color: theme.palette.common.white,
    },
});

export const GridColumnTreeIcons = ({color, classes = {}, store, record}: any) => (
    <React.Fragment>
        {record[VAR_RECORD_LEAF] === "true" ? (
            <Icon
                iconfont="file-o"
                tabIndex="-1"
                className={cn(classes.icon, {
                    [classes[`${color}Color`]]: color,
                })}
            />
        ) : (
            <Icon
                iconfont={
                    (record[store.recordsStore.recordId] === "root" && store.rootNode) ||
                    store.expansionRecords.get(record[store.recordsStore.recordId])
                        ? "folder-open-o"
                        : "folder-o"
                }
                tabIndex="-1"
                className={cn(classes.icon, {
                    [classes[`${color}Color`]]: color,
                })}
            />
        )}
    </React.Fragment>
);

export default withStyles(style)(observer(GridColumnTreeIcons));
