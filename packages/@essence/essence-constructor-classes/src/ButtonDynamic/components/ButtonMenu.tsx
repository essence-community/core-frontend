import {IBuilderConfig, IClassProps, IEssenceTheme} from "@essence-community/constructor-share/types";
import {useTranslation} from "@essence-community/constructor-share/utils";
import {VAR_RECORD_DISPLAYED} from "@essence-community/constructor-share/constants";
import {
    IPopoverAnchorOrigin,
    IPopoverTransfromOrigin,
} from "@essence-community/constructor-share/uicomponents/Popover/Popover.types";
import * as React from "react";
import {Popover, Scrollbars} from "@essence-community/constructor-share/uicomponents";
import {mapComponentOne} from "@essence-community/constructor-share/components";
import {RecordContext} from "@essence-community/constructor-share";
import {VAR_RECORD_PAGE_OBJECT_ID} from "@essence-community/constructor-share/constants/variables";
import cn from "clsx";
import {Icon} from "@essence-community/constructor-share/Icon";
import {IconButton, useTheme} from "@material-ui/core";
import {IChildren} from "../store/DynamicButtonModel";
import {useStyles} from "./ButtonMenu.styles";

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

interface IButtonMenuClass extends IClassProps {
    btns: IChildren[];
}

export const ButtonMenu: React.FC<IButtonMenuClass> = (props) => {
    const {bc, btns, disabled, pageStore} = props;
    const classes = useStyles();
    const [trans] = useTranslation("meta");
    const theme = useTheme<IEssenceTheme>();
    const tranformName = getTranformName(theme, bc.position);
    const displayed = bc[VAR_RECORD_DISPLAYED];
    const qtip = bc.tipmsg || displayed;

    return (
        <Popover
            transformOrigin={transformOrigins[tranformName]}
            anchorOrigin={anchorOrigins[tranformName]}
            popoverContent={() => {
                return (
                    <Scrollbars autoHeight autoHeightMax={MAX_HEIGHT}>
                        <div className={classes.popoverContent}>
                            {btns.map(({rec, bc}) =>
                                mapComponentOne(
                                    bc,
                                    (Child: React.ComponentType<IClassProps>, childBc: IBuilderConfig) => (
                                        <RecordContext.Provider value={rec} key={childBc[VAR_RECORD_PAGE_OBJECT_ID]}>
                                            <Child {...props} bc={childBc} />
                                        </RecordContext.Provider>
                                    ),
                                ),
                            )}
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
                        <Icon iconfont="mdi-dots-horizontal" iconfontname="mdi" color="inherit" />
                    </IconButton>
                );
            }}
        </Popover>
    );
};
