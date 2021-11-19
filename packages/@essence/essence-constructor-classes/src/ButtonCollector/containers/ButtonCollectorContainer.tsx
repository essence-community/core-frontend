import * as React from "react";
import cn from "clsx";
import {IClassProps, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {Popover, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {
    IPopoverTransfromOrigin,
    IPopoverAnchorOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {
    VAR_RECORD_PAGE_OBJECT_ID,
    VAR_RECORD_DISPLAYED,
    VAR_RECORD_PARENT_ID,
} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton, useTheme} from "@material-ui/core";
import {useStyles} from "./ButtonCollectorContainer.styles";

const anchorOrigins: Record<number | "window", IPopoverAnchorOrigin> = {
    1: {
        horizontal: "left",
        vertical: "bottom",
    },
    2: {
        horizontal: "right",
        vertical: "center",
    },
    window: {
        horizontal: "left",
        vertical: "top",
    },
};

const transformOrigins: Record<number | "window", IPopoverTransfromOrigin> = {
    1: {
        horizontal: "left",
        vertical: 2,
    },
    2: {
        horizontal: -8,
        vertical: "center",
    },
    window: {
        horizontal: "left",
        vertical: "bottom",
    },
};
const MAX_HEIGHT = 300;

function getTranformName(theme: IEssenceTheme, position?: string): number | "window" {
    switch (true) {
        case position === "window":
            return "window";
        case position === "theme":
            return theme.essence.layoutTheme;
        default:
            return theme.essence.layoutTheme;
    }
}

export const ButtonCollectorContainer: React.FC<IClassProps> = (props) => {
    const [trans] = useTranslation("meta");
    const {pageStore, bc, disabled} = props;
    const classes = useStyles();
    const theme = useTheme<IEssenceTheme>();
    const tranformName = getTranformName(theme, bc.position);
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const qtip = bc.tipmsg || displayed;
    const btns = React.useMemo(
        () =>
            bc.topbtn &&
            bc.topbtn.map(
                (btn: IBuilderConfig): IBuilderConfig => ({
                    ...btn,
                    [VAR_RECORD_PARENT_ID]:
                        btn[VAR_RECORD_PARENT_ID] === bc[VAR_RECORD_PAGE_OBJECT_ID]
                            ? bc[VAR_RECORD_PARENT_ID]
                            : btn[VAR_RECORD_PARENT_ID],
                    onlyicon: false,
                    uitype: "8",
                }),
            ),
        [bc.topbtn],
    );

    return (
        <Popover
            transformOrigin={transformOrigins[tranformName]}
            anchorOrigin={anchorOrigins[tranformName]}
            popoverContent={() => {
                return (
                    <Scrollbars autoHeight autoHeightMax={MAX_HEIGHT}>
                        <div className={classes.popoverContent}>
                            {mapComponents(btns, (ChildCmp, childBc) => (
                                <ChildCmp key={childBc[VAR_RECORD_PAGE_OBJECT_ID]} {...props} bc={childBc} />
                            ))}
                        </div>
                    </Scrollbars>
                );
            }}
            container={pageStore.pageEl}
            paperClassName={cn(classes.popoverRoot, {[classes.popoverWindowRoot]: tranformName === "window"})}
            width="auto"
            pageStore={pageStore}
            hideOnScroll
            focusableMount
            restoreFocusedElement
            tabFocusable={false}
        >
            {({open, onOpen, onClose}) => {
                const className =
                    tranformName === "window"
                        ? cn(classes.iconButtonWindowRoot, {[classes.iconButtonWindowOpenRoot]: open})
                        : cn(classes.iconButtonRoot, {[classes.iconButtonOpenRoot]: open});

                return (
                    <IconButton
                        className={className}
                        onClick={open ? onClose : onOpen}
                        disabled={disabled}
                        data-page-object={bc[VAR_RECORD_PAGE_OBJECT_ID]}
                        data-qtip={qtip ? trans(qtip) : ""}
                        color="inherit"
                    >
                        {bc.iconfont ? (
                            <Icon
                                iconfont={bc.iconfont}
                                iconfontname={bc.iconfontname as "fa" | "mdi"}
                                color="inherit"
                            />
                        ) : null}
                    </IconButton>
                );
            }}
        </Popover>
    );
};
