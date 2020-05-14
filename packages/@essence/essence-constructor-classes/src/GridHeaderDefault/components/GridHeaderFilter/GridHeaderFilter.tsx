import * as React from "react";
import {Popover} from "@essence-community/constructor-share/uicomponents";
import {IClassProps} from "@essence-community/constructor-share/types";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
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

// Const filterAttrs = ["datatype", "column", "format", "displayfield", "valuefield", VAR_RECORD_DISPLAYED];

export const GridHeaderFilter: React.FC<IClassProps> = (props) => {
    const {disabled, pageStore, bc} = props;
    const filterActionBc = React.useMemo(
        () => ({
            ...bc,
            type: "GRID_HEADER_FILTER",
        }),
        [bc],
    );

    /*
     * Constructor(props: PropsType) {
     *     super(props);
     *     this.column = props.bc.column;
     *     this.bc = {
     *         ...pick(props.bc, filterAttrs),
     *         [VAR_RECORD_PAGE_OBJECT_ID]: `${props.bc[VAR_RECORD_PAGE_OBJECT_ID]}Filter`,
     *     };
     * }
     */

    if (bc.datatype === "boolean" || bc.datatype === "checkbox") {
        return null;
    }

    return (
        <Popover
            container={pageStore.pageEl}
            popoverContent={<GridHFContent {...props} />}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
            width={250}
            focusableMount
            pageStore={pageStore}
            hideOnScroll
        >
            <GridHFIcon disabled={disabled} bc={filterActionBc} />
        </Popover>
    );
};
