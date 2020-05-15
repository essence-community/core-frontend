import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {TableCell} from "@material-ui/core";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants";

export const GridHeaderIconContainer: React.FC<IClassProps> = (props) => {
    const {bc} = props;

    return (
        <TableCell padding="none" data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}>
            <span />
        </TableCell>
    );
};
