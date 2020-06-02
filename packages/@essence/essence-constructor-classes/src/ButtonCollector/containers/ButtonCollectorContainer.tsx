import * as React from "react";
import cn from "clsx";
import {IClassProps, IBuilderConfig, IEssenceTheme} from "@essence-community/constructor-share/types";
import {Popover, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {
    IPopoverTransfromOrigin,
    IPopoverAnchorOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import {mapComponents} from "@essence-community/constructor-share/components";
import {VAR_RECORD_PAGE_OBJECT_ID, VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton, useTheme} from "@material-ui/core";
import {useStyles} from "./ButtonCollectorContainer.styles";

const anchorOrigins: Record<"dark" | "light" | "window", IPopoverAnchorOrigin> = {
    dark: {
        horizontal: "right",
        vertical: "center",
    },
    light: {
        horizontal: "left",
        vertical: "bottom",
    },
    window: {
        horizontal: "left",
        vertical: "top",
    },
};

const transformOrigins: Record<"dark" | "light" | "window", IPopoverTransfromOrigin> = {
    dark: {
        horizontal: -8,
        vertical: "center",
    },
    light: {
        horizontal: "left",
        vertical: 2,
    },
    window: {
        horizontal: "left",
        vertical: "bottom",
    },
};
const MAX_HEIGHT = 300;

function getTranformName(theme: IEssenceTheme, position?: string): "dark" | "light" | "window" {
    switch (true) {
        case position === "window":
            return "window";
        case position === "theme":
            return theme.palette.type;
        default:
            return theme.palette.type;
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
            bc.topbtn.map((btn: IBuilderConfig): IBuilderConfig => ({...btn, onlyicon: false, uitype: "8"})),
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
