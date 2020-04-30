import * as React from "react";
import {IClassProps} from "@essence-community/constructor-share/types";
import {Popover, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_PARENT_ID} from "@essence-community/constructor-share/constants";
import {mapComponents, mapComponentOne} from "@essence-community/constructor-share/components";
import {IPopoverTransfromOrigin} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {useTheme} from "@material-ui/core";
import {useStyles} from "./ColumnIconLink.styles";

const MAX_HEIGHT = 300;

const transformOrigins: Record<"light" | "dark", IPopoverTransfromOrigin> = {
    dark: {
        horizontal: "left",
        vertical: "top",
    },
    light: {
        horizontal: "left",
        vertical: 2,
    },
};

export const ColumnIconLink: React.FC<IClassProps> = (props) => {
    const {pageStore, bc} = props;
    const classes = useStyles();
    const theme = useTheme();
    const parentStore = pageStore.stores.get(bc[VAR_RECORD_PARENT_ID]);
    const btnBc = React.useMemo(
        () => ({
            ...bc,
            handler: "onPopoverToggle",
        }),
        [bc],
    );

    return (
        <Popover
            popoverContent={
                <Scrollbars autoHeight autoHeightMax={MAX_HEIGHT}>
                    <div className={classes.popoverContent}>
                        {mapComponents(parentStore && parentStore.bc.contextmenus, (ChildCmp, childBc) => (
                            <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                        ))}
                    </div>
                </Scrollbars>
            }
            paperClassName={classes.popoverRoot}
            container={pageStore.pageEl}
            dataPageObjectPopover={`${bc[VAR_RECORD_PAGE_OBJECT_ID]}-links`}
            width="auto"
            pageStore={pageStore}
            transformOrigin={transformOrigins[theme.palette.type]}
            hideOnScroll
            disableEscapeKeyDown={false}
        >
            {mapComponentOne(btnBc, (ChildCmp, childBc) => (
                <ChildCmp {...props} bc={childBc} />
            ))}
        </Popover>
    );
};
