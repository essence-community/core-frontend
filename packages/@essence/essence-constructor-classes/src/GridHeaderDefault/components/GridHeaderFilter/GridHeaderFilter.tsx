import * as React from "react";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import {IClassProps, IBuilderConfig} from "@essence-community/constructor-share/types";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {GridHFContent} from "../GridHFContent";
import {GridHFIcon} from "../GridHFIcon";

const anchorOrigin: IPopoverAnchorOrigin = {
    horizontal: "left",
    vertical: "bottom",
};

const transformOrigin: IPopoverTransfromOrigin = {
    horizontal: "left",
    vertical: "top",
};

interface IGridHeaderFilterProps extends IClassProps {
    classNameIcon?: string;
}

export const GridHeaderFilter: React.FC<IGridHeaderFilterProps> = ({classNameIcon, ...classProps}) => {
    const {disabled, pageStore, bc} = classProps;
    const filterActionBc = React.useMemo<IBuilderConfig>(
        () => ({
            [VAR_RECORD_DISPLAYED]: bc[VAR_RECORD_DISPLAYED],
            [VAR_RECORD_PAGE_OBJECT_ID]: `${bc[VAR_RECORD_PAGE_OBJECT_ID]}_filter`,
            [VAR_RECORD_PARENT_ID]: bc[VAR_RECORD_PAGE_OBJECT_ID],
            column: bc.column,
            datatype: bc.datatype,
            displayfield: bc.displayfield,
            format: bc.format,
            type: "GRID_HEADER_FILTER",
            valuefield: bc.valuefield,
        }),
        [bc],
    );

    if (bc.datatype === "boolean" || bc.datatype === "checkbox") {
        return null;
    }

    return (
        <Popover
            container={pageStore.pageEl}
            popoverContent={<GridHFContent {...classProps} bc={filterActionBc} />}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            width={250}
            focusableMount
            pageStore={pageStore}
            hideOnScroll
        >
            <GridHFIcon className={classNameIcon} disabled={disabled} bc={filterActionBc} />
        </Popover>
    );
};
